import { useEffect, useState } from "react"
import "../Dashboard/Dashboard.css"
import ApexChart from 'react-apexcharts'



const Dashboard = ({ userData, riotUser, userRank, gameList }) => {
    const [puuid, setPuuid] = useState('')

    const [lanes, setLanes] = useState([]);
    const [lanePercentages, setLanePercentages] = useState({});
    const [averageStats, setAverageStats] = useState({ kills: 0, deaths: 0, assists: 0 });
    const [championStats, setChampionStats] = useState([]);
    const [winLossStats, setWinLossStats] = useState({ wins: 0, losses: 0, winRate: 0 });


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


            const positions = userMatches
                .filter(match => match.individualPosition !== 'Invalid')
                .map(match => match.individualPosition);
            setLanes(positions);
            console.log(positions)
        }
    }, [puuid, gameList]);

    useEffect(() => {
        const positionCounts = lanes.reduce((counts, position) => {
            let actualPosition;
            switch (position) {
                case "UTILITY":
                    actualPosition = "SUP";
                    break;
                case "BOTTOM":
                    actualPosition = "ADC";
                    break;
                default:
                    actualPosition = position;
                    break;
                case "MIDDLE":
                    actualPosition = "MID"
                    break
            }
            counts[actualPosition] = (counts[actualPosition] || 0) + 1;
            return counts;
        }, {});

        const totalCount = lanes.length;

        const percentages = {};
        ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUP'].forEach(position => {
            const count = positionCounts[position] || 0;
            percentages[position] = (count / totalCount) * 100 || 0;
        });

        setLanePercentages(percentages);
        console.log(percentages)
    }, [lanes]);

    useEffect(() => {
        if (puuid && gameList.length > 0) {
            const userMatches = gameList.flatMap(game =>
                game.info.participants.filter(participant => participant.puuid === puuid)
            );



            // Calculando a média de kills, deaths e assists
            const totalStats = userMatches.reduce((totals, match) => {
                totals.kills += match.kills;
                totals.deaths += match.deaths;
                totals.assists += match.assists;
                return totals;
            }, { kills: 0, deaths: 0, assists: 0 });

            const totalGames = userMatches.length;
            const averageStats = {
                kills: totalGames ? (totalStats.kills / totalGames) : 0,
                deaths: totalGames ? (totalStats.deaths / totalGames) : 0,
                assists: totalGames ? (totalStats.assists / totalGames) : 0
            };
            setAverageStats(averageStats);

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

            // Convertendo o objeto em um array e ordenando pela frequência
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

            // Calculando vitórias e derrotas
            const wins = userMatches.filter(match => match.win === true).length;
            const losses = userMatches.filter(match => match.win === false).length;
            const winRate = totalGames ? (wins / totalGames) * 100 : 0;

            setWinLossStats({ wins, losses, winRate });
        }


    }, [puuid, gameList]);

    console.log(Object.keys(lanePercentages))

    const chartData = {
        series: [{
            name: 'Lane Percentages',
            data: Object.values(lanePercentages).map(percentage => parseFloat(percentage.toFixed(1)))
        }],
        options: {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false // Remove o menu de opções
                },
                zoom: {
                    enabled: false // Desabilita o zoom
                },
                animations: {
                    enabled: false // Desativa as animações do gráfico
                },

            },
            plotOptions: {
                bar: {
                    horizontal: false, // Define o gráfico como barras verticais
                    columnWidth: '20%', // Define a largura das colunas (20% do espaço disponível)
                    endingShape: 'flat', // Define a forma de finalização das barras como plana
                    distributed: true,
                    dataLabels: {
                        position: 'top'
                    }, 
                    colors: {
                        ranges: [{
                            from: 0,
                            to: Infinity,
                            hover: false,
                            color: '#5383E8' // Cor das barras
                        }],
                        backgroundBarColors: ['#b0b0b0'], // Cores de fundo das barras
                        backgroundBarOpacity: 1
                    },
                    states: {
                        hover: {
                            opacity: 1, // Define a opacidade do estado hover
                            brightness: 1, // Define o brilho do estado hover
                            highlight: {
                                opacity: 1, // Define a opacidade do destaque
                                brightness: 1 // Define o brilho do destaque
                            }
                        }
                    }
                }
            },
            xaxis: {
                categories: Object.keys(lanePercentages),
                labels: {
                    show: true,
                    style: {
                        colors: '#ffffff', // Adiciona cores para as labels se necessário
                        fontSize: '8px', // Define o tamanho da fonte
                        fontFamily: 'Poppins, sans-serif', // Define a família da fonte
                        fontWeight: 400, // Define o peso da fonte
                    }
                },
                axisBorder: {
                    show: false // Remove a borda do eixo X
                },
                axisTicks: {
                    show: false // Remove as marcas do eixo X
                }
            },
            yaxis: {
                max: 100,
                labels: {
                    show: false // Remove as labels do eixo Y
                },
                axisBorder: {
                    show: false // Remove a borda do eixo Y
                },
                axisTicks: {
                    show: false // Remove as marcas do eixo Y
                }
            },
            grid: {
                show: false // Remove a grade de fundo
            },
            tooltip: {
                enabled: false // Remove o hover
            },
            dataLabels: {
                enabled: false // Remove os labels dos dados
            },
            title: {
                text: undefined // Remove o título
            },
            legend: {
                show: false // Remove a legenda
            }
        },
    
    };

    const donutChartOptions = {
        chart: {
            type: 'donut',
            animations: {
                enabled: false // Desativa as animações do gráfico
            },
            dynamicAnimation: {
                enabled: false
            },
            brush: {
                enabled: false,
                target: undefined,
                autoScaleYaxis: false
            },
            dropShadow: {
                enabled: false,
            },
            events: {
                animationEnd: undefined,
                beforeMount: undefined,
                mounted: undefined,
                updated: undefined,
                mouseMove: undefined,
                mouseLeave: undefined,
                click: function (event, chartContext, config) {
                    event.preventDefault(); // Impede qualquer ação ao clicar no gráfico
                },
                legendClick: undefined,
                markerClick: undefined,
                xAxisLabelClick: undefined,
                selection: undefined,
                dataPointSelection: undefined,
                dataPointMouseEnter: undefined,
                dataPointMouseLeave: undefined,
                beforeZoom: undefined,
                beforeResetZoom: undefined,
                zoomed: undefined,
                scrolled: undefined,
            },
            selection: {
                enabled: false
            },
            sparkline: {
                enabled: false,
            },
            toolbar: {
                show: false // Remove o menu de opções
            },
            zoom: {
                enabled: false // Desabilita o zoom
            },
            states: {
                hover: {
                    enabled: false
                }
            }
        },
        series: [winLossStats.wins, winLossStats.losses], // Apenas um valor para o gráfico de donut
        labels: ['Vitórias', 'Derrotas'], // Rótulo único para mostrar o win rate
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: false // Remove o tooltip
        },
        legend: {
            show: false // Remove a legenda
        },
        colors: ['#5383E8', '#EF5350'], // Cores personalizadas para Vitórias e Derrotas
        stroke: {
            show: false, // Remove as bordas
        },
        plotOptions: {
            pie: {
                hover: {
                    enabled: false // Define o deslocamento de tamanho do efeito hover para zero
                }
            }
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none'
                }
            },
        }
    };;


    return (
        <div className="statsContainer">
            <div className="userStats">
                <div className="laneGraph">
                    <h3>Lanes Mais Jogadas</h3>
                    <div className="columnChart">
                    <ApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={125}
                        width={250}
                    />
                    </div>
                </div>
                <div className="avgStats">
                    <h3>Média dos ultimos 20 jogos</h3>
                    <div className="avgStatsStats">

                    {averageStats.kills.toFixed(1)} / {averageStats.deaths.toFixed(1)} / {averageStats.assists.toFixed(1)}
                    </div>
                </div>
            </div>
            <div className="wrChampStats">
                <div className="wrGraph">
                    <h3>Win Rate:</h3>
                    Vitorias: {winLossStats.wins} -
                    Derrotas: {winLossStats.losses} -
                    Win Rate: {winLossStats.winRate.toFixed(1)}%
                    <div className="donutChart">
                    <ApexChart options={donutChartOptions} series={donutChartOptions.series} type="donut" height={125} width={250} />
                    </div>
                </div>
                <div className="avgChampStats">
                    <h3>Campeões Mais Jogados</h3>
                    {championStats.slice(0, 3).map((champion, index) => (
                        <div key={index} className="champInfoStats">
                            
                            <img alt="a" width='35' src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/champion/' + champion.championName + '.png'}></img>
                            
                            
                            <div>{champion.winRate.toFixed(1)}%
                             ({champion.wins}V - {champion.losses}D)</div> 
                            <div>KDA - {champion.kdaRatio.toFixed(1)}</div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard