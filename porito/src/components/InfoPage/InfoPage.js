import Partidas from "../HistoricoPartidas/Partidas"
import MaestryData from "../MaestryData/Maestrydata"
import MainUser from "../MainUserData/MainUser"
import RankedData from "../RankedData/RankedData"


const InfoPage = ({ errorCntrl, userMaestry, userMaestryInfo, userData, riotUser, userRank, gameList }) => {

    return (
        <>
        {errorCntrl === true ?
        <>
          <p>Deu erro</p>
          {/* Mensagem de erro */}
        </>
        :
        <>
          <MainUser userData={userData} riotUser={riotUser} userRank={userRank}></MainUser>
          <br></br>
          <div className='ContainerDashboard'>
            <div className='Column'>
              <RankedData userRank={userRank}></RankedData>
              <MaestryData userMaestry={userMaestry} userMaestryInfo={userMaestryInfo}></MaestryData>
            </div>
            <Partidas gameList={gameList}></Partidas>
          </div>
          <br></br>

        </>}
        </>
    )
}

export default InfoPage