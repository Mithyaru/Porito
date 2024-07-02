import './MaestryData.css'

const MaestryData = ({ userMaestry, userMaestryInfo }) => {

    return (
        <div className='MaestryData'>
            {userMaestry.length !== 0 ?
                <>
                    <div className='Container'>
                        <div className='HeaderContent'>
                            <div className='Header'><h3>Maestrias</h3></div>
                            <div className='containerMaestria'>
                                {userMaestryInfo.map((maestryInfo, index) =>
                                    <div className='InfoContainer' key={index}>
                                        <div className='maestria ' >
                                            <img className='maestryImg' width="45" alt="aaa" src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/' + maestryInfo.image.full}></img>
                                            
                                            <div className='maestryIcon'>
                                                {userMaestry[index].championLevel >= '10' ?
                                                    <img alt=' ' src={require(`../../Assets/Maestrias/10.png`)} width='50' ></img>
                                                    :
                                                    <img alt=' ' src={require(`../../Assets/Maestrias/${userMaestry[index].championLevel}.png`)} width='50'></img>
                                                }
                                                <div className='maestryLevel'>
                                                {userMaestry[index].championLevel}
                                                </div>
                                            </div>
                                            <div className='maestryName'>
                                                {maestryInfo.id}
                                            </div>
                                            <div className='maestryPoints'>
                                                {userMaestry[index].championPoints.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                </> :
                <>
                </>
            }


        </div>
    )
}

export default MaestryData