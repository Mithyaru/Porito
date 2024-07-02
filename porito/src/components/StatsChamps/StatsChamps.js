import { useEffect, useState } from "react"
import '../StatsChamps/StatsChamps.css'

const StatsChamps = ({ userData, gameList }) => {

    const [puuid, setPuuid] = useState('')
    const [championStats, setChampionStats] = useState([]);

    useEffect(() => {
        if (userData && userData.puuid) {
            setPuuid(userData.puuid);
        }
    }, [userData])

    useEffect(() => {
        if (puuid && gameList.length > 0) {
            const userMatches = gameList.flatMap(game =>
                game.info.participants.filter(participant => participant.puuid === puuid)
            );

            const champStats = userMatches.reduce((stats, match) => {
                const { championName, kills, deaths, assists, win } = match;
                if (!stats[championName]) {
                    stats[championName] = { championName, kills: 0, deaths: 0, assists: 0, games: 0, wins: 0, losses: 0 };
                }
                stats[championName].kills += kills;
                stats[championName].deaths += deaths;
                stats[championName].assists += assists;
                stats[championName].games += 1;
                if (win) {
                    stats[championName].wins += 1;
                } else {
                    stats[championName].losses += 1;
                }
                return stats;
            }, {});

            const sortedChampionStats = Object.values(champStats)
                .map(champ => ({
                    ...champ,
                    averageKills: champ.kills / champ.games,
                    averageDeaths: champ.deaths / champ.games,
                    averageAssists: champ.assists / champ.games,
                    kdaRatio: champ.deaths === 0 ? (champ.kills + champ.assists) : (champ.kills + champ.assists) / champ.deaths,
                    winRate: champ.games ? (champ.wins / champ.games) * 100 : 0
                }))
                .sort((a, b) => {
                    if (b.games === a.games) {
                        return b.kdaRatio - a.kdaRatio;
                    }
                    return b.games - a.games;
                });

            setChampionStats(sortedChampionStats);
        }



    }, [puuid, gameList]);

    return (
        <>
        {championStats.length !== 0 ? <>
            <div className="champStats">
                <h3>Campeões jogados nas ultimas 20 partidas</h3>
                {championStats.map((champion, index) => (
                    <div key={index} className="columnChampInfo">

                        <img alt="a" width='35' src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/' + champion.championName + '.png'}></img>
                        <div>KDA - {champion.kdaRatio.toFixed(1)}</div>
                        <div>{champion.winRate.toFixed(1)}%({champion.wins}V - {champion.losses}D)</div>

                    </div>
                ))}

            </div>
        </>: <></>}
            
        </>
    )
}

export default StatsChamps