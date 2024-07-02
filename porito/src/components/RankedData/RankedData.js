import './RankedData.css'



const RankedData = ({ userRank }) => {

    const imgError = (event) => {
        event.target.src(`../../Assets/Ranks/IRON.png`)
    }
    if (userRank === null) {
        return null
    } else {
    return (
        <div className='rankedDiv'>
            {userRank.length === 0 ? <>
                <div className='RankContainer'>
                    <div className='ActualRank'>
                        <div className='Fila'>
                            Flex

                        </div>
                        <div className='elo'>
                            Unranked
                        </div>
                    </div>
                    <div className='ActualRank'>
                        <div className='Fila'>
                            Solo Duo

                        </div>
                        <div className='elo'>
                            Unranked
                        </div>
                    </div>
                </div>
            </>
                :
                <>
                    <div className='RankContainer'>
                        {userRank.map((rank, index) => {
                            if (userRank.length >= 2) {
                                return (
                                    <div className='ActualRank' key={index}>
                                        {rank.queueType.match(/SOLO.*/) ?
                                            <>
                                                <div className='Fila'>
                                                    Solo Duo
                                                </div>
                                                <div className='Elo'>
                                                    <div className='RankImg'>
                                                        <img alt=' ' src={require(`../../Assets/Ranks/${userRank[index].tier}.png`)} width='70' onError={imgError}></img>
                                                    </div>
                                                    <div className='RankInfo'>
                                                        <div className='Tier'>{userRank[index].tier + ' ' + userRank[index].rank}</div>
                                                        <div className='Lp'>{userRank[index].leaguePoints + ' LP'}</div>
                                                    </div>
                                                    <div className='RatioContainer'>
                                                        <div className='WinLose'>
                                                            {userRank[index].wins + 'V ' + userRank[index].losses + 'L '}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='Fila'>
                                                    Flex
                                                </div>
                                                <div className='Elo'>
                                                    <div className='RankImg'>
                                                        <img alt=' ' src={require(`../../Assets/Ranks/${userRank[index].tier}.png`)} width='70' onError={imgError}></img>
                                                    </div>
                                                    <div className='RankInfo'>
                                                        <div className='Tier'>{userRank[index].tier + ' ' + userRank[index].rank}</div>
                                                        <div className='Lp'>{userRank[index].leaguePoints + ' LP'}</div>
                                                    </div>
                                                    <div className='RatioContainer'>
                                                        <div className='WinLose'>
                                                            {userRank[index].wins + 'V ' + userRank[index].losses + 'L '}
                                                        </div>
                                                        
                                                    </div>
                                                </div>


                                            </>}

                                    </div>
                                )
                            }
                            return (
                                <div className="ranked" key={index}>{rank.queueType.match(/SOLO.*/) ?
                                    <>
                                        <div className='ActualRank'>
                                            <div className='Fila'>
                                                Solo Duo
                                            </div>
                                            <div className='Elo'>
                                                <div className='RankImg'>
                                                    <img alt=' ' src={require(`../../Assets/Ranks/${userRank[index].tier}.png`)} width='70' onError={imgError}></img>
                                                </div>
                                                <div className='RankInfo'>
                                                    <div className='Tier'>{userRank[index].tier + ' ' + userRank[index].rank}</div>
                                                    <div className='Lp'>{userRank[index].leaguePoints + ' LP'}</div>
                                                </div>
                                                <div className='RatioContainer'>
                                                    <div className='WinLose'>
                                                        {userRank[index].wins + 'V ' + userRank[index].losses + 'L '}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='ActualRank'>
                                            <div className='Fila'>
                                                Flex

                                            </div>
                                            <div className='elo'>
                                                Unranked
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='ActualRank'>
                                            <div className='Fila'>
                                                Flex
                                            </div>
                                            <div className='Elo'>
                                                <div className='RankImg'>
                                                    <img alt=' ' src={require(`../../Assets/Ranks/${userRank[index].tier}.png`)} width='70' onError={imgError}></img>
                                                </div>
                                                <div className='RankInfo'>
                                                    <div className='Tier'>{userRank[index].tier + ' ' + userRank[index].rank}</div>
                                                    <div className='Lp'>{userRank[index].leaguePoints + ' LP'}</div>
                                                </div>
                                                <div className='RatioContainer'>
                                                    <div className='WinLose'>
                                                        {userRank[index].wins + 'V ' + userRank[index].losses + 'L '}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className='ActualRank'>
                                            <div className='Fila'>
                                                Solo Duo

                                            </div>
                                            <div className='elo'>
                                                Unranked
                                            </div>
                                        </div>
                                    </>
                                }</div>
                            )
                        })}
                    </div>
                </>}
        </div>
    )
}
}

export default RankedData