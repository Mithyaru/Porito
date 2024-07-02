import { useEffect, useState } from 'react'
import './Partidas.css'
import HatsuneMiku from '../../Assets/HatsuneMiku.png'

const Partidas = ({ gameList, userData, riotUser }) => {
  const [puuid, setPuuid] = useState('')
  let isWinner = ''
  let participant = ''
  let hatsuneMiku = ''

  useEffect(() => {
    if (userData && userData.puuid) {
      setPuuid(userData.puuid);
    }
  }, [userData])



  return (
    <>
      <div className='ContainerHistorico'>
        {gameList !== '[]' ?
          <>
            <section className='ContainerPartidas'>
              {gameList.map((gameList, index) => {
                participant = gameList.info.participants.find(data => data.puuid === puuid);
                isWinner = participant ? (participant.win ? 'Vitoria' : 'Derrota') : null
                hatsuneMiku = participant ? (participant.win ? 'hatsuneMiku' : 'noHatsuneMiku') : null
              return (
                <div key={index} className={isWinner}>
                  <div className='partidaStat'>
                    <span className={'title' + isWinner}> {isWinner} </span>
                    <div className='playersStats'>
                      <div className='Individual'>
                        {gameList.info.participants.map((data, index) => {
                          return (
                          data.puuid === puuid && (
                            
                            <div className='IndividualStat' key={index}>
                              
                              <div className='indChamStat'>

                                <div className='playerPrinp'>
                                  <span>{data.riotIdGameName}</span>
                                  <img alt="a" width='45' src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/' + data.championName + '.png'}></img>
                                  <span className='champGameLvl'>{data.champLevel}</span>
                                </div>
                                <div className='champStatData'>
                                  <div>
                                    <span className='KDA'>
                                      <span className='kdaText'>KDA:</span> {data.kills + ' '} / <span className='deaths'>{ ' ' + data.deaths + ' '}</span> / {data.assists + ' '}
                                    </span>
                                    <span>CS: {data.totalMinionsKilled + data.totalAllyJungleMinionsKilled + data.totalEnemyJungleMinionsKilled}</span>
                                  </div>
                                  <div>
                                    Dano: {data.totalDamageDealtToChampions + ' '}
                                    Visao: {data.visionScore}
                                  </div>
                                </div>
                              </div>
                              <div className='playerItens'>
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item0 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item1 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item2 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item3 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item4 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item5 + '.png'} width='25'></img>}
                                {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item6 + '.png'} width='25'></img>}
                              </div>
                              <br></br>

                            </div>


                          ))
                          })}
                      </div>


                      <div className='Times'>
                        <div className='TimeAzul'>
                          <div className='timeAzulTitle'>TIME AZUL</div>
                          {gameList.info.participants.filter(data => data.teamId === 100).map((data, participantsIndex) =>

                            <div key={participantsIndex} className='Players'>

                              <div className='PlayerList'>
                                <div className='playerPrinp'>
                                  <img alt="a" width='18' height='18' src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/' + data.championName + '.png'}></img>
                                  <span>{data.riotIdGameName}</span>
                                </div>
                                <div className='champPlayerData'>
                                  <div >
                                    <span>
                                      KDA: {data.kills} / {data.deaths} / {data.assists + ' '}
                                    </span>

                                  </div>

                                </div>
                                <div className='playerItensData'>
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item0 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item1 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item2 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item3 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item4 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item5 + '.png'} width='15'></img>}
                                  {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item6 + '.png'} width='15'></img>}
                                </div>
                              </div>

                            </div>

                          )}
                        </div>
                        <div className='TimeVerm'>
                          <div className='timeVermTitle'>TIME VERMELHO</div>
                          {gameList.info.participants.filter(data => data.teamId === 200).map((data, participantsIndex) =>
                            <div className='PlayerList'>
                            <div className='playerPrinp'>
                              <img alt="a" width='18' height='18' src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/' + data.championName + '.png'}></img>
                              <span>{data.riotIdGameName}</span>
                            </div>
                            <div className='champPlayerData'>
                              <div >
                                <span>
                                  KDA: {data.kills} / {data.deaths} / {data.assists + ' '}
                                </span>

                              </div>

                            </div>
                            <div className='playerItensData'>
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item0 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item1 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item2 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item3 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item4 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item5 + '.png'} width='15'></img>}
                              {<img alt='' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/' + data.item6 + '.png'} width='15'></img>}
                            </div>
                          </div>


                          )}
                        </div>
                      </div>
                      <div className={hatsuneMiku}> 
                      <img alt='' src={HatsuneMiku} width={50}></img>
                      </div>
                    </div>
                  </div>
                </div>


)})}
            </section>
          </>
          :
          <>
          </>
        }
      </div>
    </>
  )
}

export default Partidas