import Dashboard from '../Dashboard/Dashboard'
import RankedData from '../RankedData/RankedData'
import './MainUser.css'
// import imagemTeste from '../../Assets/images.jpg'

const MainUser = ({ userData, riotUser, userRank, gameList }) => {

  return (
    <div className='userDiv'>
      {JSON.stringify(userData) !== '{}' ?
        <>
          <div className='UserContainer'>
            <div className='UserDataContainer'>
              <div className='infoUser'>
                <div className='Icon'>
                  <img className='pficon' width="110" alt="aaa" src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/' + userData.profileIconId + '.png'}></img>
                  <div className='Level'>
                    <span>
                      {userData.summonerLevel}
                    </span>
                  </div>
                </div>
                <div className='Info'>
                  <div className='Name'>
                    <h2>
                      <strong>{riotUser.gameName}</strong>
                      <span> {'#' + riotUser.tagLine}</span>
                    </h2>

                  </div>
                </div>

              </div>
              <div className='rankedStats'>
                <RankedData userRank={userRank}></RankedData>
              </div>
            </div>
            <div className='MinorInfo'>
              <Dashboard userData={userData} riotUser={riotUser} userRank={userRank} gameList={gameList}></Dashboard>
            </div>


          </div>
        </> :
        <>
          <p></p>
        </>}
    </div>
  )

}

export default MainUser