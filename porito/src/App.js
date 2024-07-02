import { useState } from 'react'
import axios from 'axios'
import './App.css';
import MainUser from './components/MainUserData/MainUser';
import MaestryData from './components/MaestryData/Maestrydata';
import Partidas from './components/HistoricoPartidas/Partidas';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register/Register';
import Loader from './components/Loader/Loader';
import porito from './Assets/porito.png'
import StatsChamps from './components/StatsChamps/StatsChamps';


function App() {
  const [errorCntrl, setErrorCntrl] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [userData, setUserData] = useState('')
  const [riotUser, setRiotUser] = useState({})
  const [userRank, setUserRank] = useState(null)
  const [userMaestry, setUserMaestry] = useState([])
  const [userMaestryInfo, setUserMaestryInfo] = useState([])
  const [gameList, setGameList] = useState([])
  const [loading, setLoading] = useState(false)


  async function getUserData() {

    if (searchName === '' || searchTag === '') {
      alert("preencha os campos")
    } else {



      setLoading(true)
      setGameList([])
      setRiotUser({})
      setUserData('')
      setUserMaestry([])
      setUserRank(null)
      setUserMaestryInfo([])
      await axios.get('http://localhost:4000/gameUser/#', { params: { username: searchName, tag: searchTag } })
        .then(function (resposta) {
          if (resposta.data === 'error') {
            setErrorCntrl(true)
            setUserData(resposta.data)
            console.log(resposta)
            console.log('con1')
          }
          else {
            console.log(resposta)
            setUserData(resposta.data)
            setErrorCntrl(false)
          }
        }).catch(function (error) {
          setUserData(error)
        })

      await axios.get('http://localhost:4000/riotUser/#', { params: { username: searchName, tag: searchTag } })
        .then(function (resposta) {
          setRiotUser(resposta.data)

        }).catch(function (error) {
          setUserData(error)
        })

      await axios.get('http://localhost:4000/ranked/#')
        .then(function (response) {
          if (response.data.status === 200) {
            setUserRank(response.data)
            console.log(response.data.status)
          } else {
            setUserRank(null)
          }
        }).catch(function (error) {
          setUserRank(error)
        })

      await axios.get('http://localhost:4000/maestry/#', { params: { username: searchName, tag: searchTag } })
        .then(function (response) {
          setUserMaestry(response.data)

        }).catch(function (error) {
          setUserData(error)
        })

      await axios.get('http://localhost:4000/champInfo/#')
        .then(function (response) {
          setUserMaestryInfo(response.data)

        }).catch(function (error) {
          setUserMaestryInfo(error)
        })

      await axios.get('http://localhost:4000/matches/#', { params: { username: searchName, tag: searchTag } })
        .then(function (response) {
          setGameList(response.data)

        }).catch(function (error) {
          console.log(error)
        })

      setLoading(false)
    }
  }



  return (
    <div className="App">
      <Router>
        <nav className='navBar'>

          <div className='navImg'>

          </div>
          <div className='navLinks'>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/Registro">Registro</Link>
          </div>

        </nav>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/Registro' element={<Register></Register>}></Route>
          <Route path='/' element={
            <div className='centerContainer'>

              <div className='SearchBar'>
                <input placeholder='Nome' type='text' className="Nome" onChange={e => setSearchName(e.target.value)}></input>
                <input placeholder='Tag' type='text' className="Tag" onChange={e => setSearchTag(e.target.value)}></input>

                <button onClick={getUserData}>
                  <img alt='a' src={porito} width={60} height={60}></img>
                </button>
              </div>

              {loading === true ?
                <>
                  <div className='containerLoader'>
                    <Loader></Loader>
                  </div>
                </>
                :
                <>
                  {errorCntrl ?
                    <>
                      <div className='text'>
                        error
                      </div>

                    </>
                    :
                    <>
                      {userData === '' ?
                        <>
                        texto de introdução
                        </>
                        :
                        <>
                          <MainUser userData={userData} riotUser={riotUser} userRank={userRank} gameList={gameList}></MainUser>
                          <br></br>
                          <div className='ContainerDashboard'>
                            <div className='Column'>
                              <StatsChamps userData={userData} gameList={gameList}></StatsChamps>
                              <MaestryData userMaestry={userMaestry} userMaestryInfo={userMaestryInfo}></MaestryData>
                            </div>
                            <Partidas userData={userData} riotUser={riotUser} gameList={gameList}></Partidas>
                          </div>
                          <br></br>

                        </>}

                    </>}
                </>}
            </div>
          }></Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
