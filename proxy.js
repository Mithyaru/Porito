let express = require('express')
let cors = require('cors')
let axios = require('axios')

let championURL = 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/pt_BR/champion.json'
let globalMaestry = []
let summonerID = ''


let app = express()

app.use(cors())

const apiKey = 'RGAPI-9df4b501-dcaa-434b-ab27-dcf2fc16bab3'

function getPlayerPUUID(tagLine, gameName){
    return axios.get("https://americas.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + gameName + '/' + tagLine + "?api_key=" + apiKey)
        .then(async response => {
            let accData = response.data
            return accData
            
        }).catch(err => {
            let erro = err
            return erro
            
        })
}


app.get('/gameUser', async (req, res) => {
    let tagLine = req.query.tag
    let gameName = req.query.username

    const PUUIDcall = await getPlayerPUUID(tagLine, gameName)
    const userCall = 'https://br1.api.riotgames.com' + '/lol/summoner/v4/summoners/by-puuid/' + PUUIDcall.puuid + "?api_key=" + apiKey

    const userInfo = await axios.get(userCall)
        .then(async response => {
            const userData = await response.data
            summonerID = userData.id
            console.log('con1')
            console.log(response)
            return userData
        })
        .catch(err => {
            const erro = 'error'
            console.log('con2')
            console.log(erro)
            return erro 
        })
    res.json(userInfo) 
    //console.log(userInfo)
})

app.get('/riotUser', async (req, res) => {
    let tagLine = req.query.tag
    let gameName = req.query.username
    const userCall = "https://americas.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + gameName + '/' + tagLine + "?api_key=" + apiKey

    const riotUserInfo = await axios.get(userCall)
    .then(async response => {
        const accData = response.data
        return accData
    }).catch(err => {
        const erro = err
        return erro
    })
    res.json(riotUserInfo)
    //console.log(riotUserInfo)
})

app.get('/ranked', async (req, res) => {  
    // // console.log(summonerID)  
    const userCall ='https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID + '?api_key=' + apiKey
    const rankedCall = await axios.get(userCall)
    .then( async response => {
        const ranked = await response.data
        return ranked
    }).catch(err => {
        return err
    })
    res.json(rankedCall)
    // console.log(rankedCall)
})

app.get('/maestry', async (req, res) => {
    let tagLine = req.query.tag
    let gameName = req.query.username

    const PUUIDcall = await getPlayerPUUID(tagLine, gameName)
    let linkMaestria = 'https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/' + PUUIDcall.puuid  + "/top?count=5&api_key=" + apiKey

    const response = await fetch(linkMaestria)
    const responsejson = await response.json()
    var topMaestry = []
    function percorrer(){
        for (var item in responsejson) {
            topMaestry.push(responsejson[item])
        }
    }
    percorrer()
    // console.log(topMaestry)
    globalMaestry = topMaestry
    res.json(topMaestry)
})

app.get('/champInfo', async (req, res) => {

    let topMaestry = globalMaestry

    const championsCall = await fetch(championURL)
    const champions = await championsCall.json()
    let infochampions = await champions.data
    let resultado = []
    function percorrer2() {
        for (let item2 in infochampions) {
            resultado.push(infochampions[item2])
        }
    }
    percorrer2()

    let maestryInfo = []

    for (i = 0; i < topMaestry.length; i++) {
        for (j = 0; j < resultado.length; j++) {
            if(topMaestry[i].championId == resultado[j].key) {
                maestryInfo.push(resultado[j])
                // console.log(maestryInfo[i].id)
            }
        }
    }
    res.json(maestryInfo)

})

app.get('/matches', async (req, res) => {
    let tagLine = req.query.tag
    let gameName = req.query.username

    const PUUIDcall = await getPlayerPUUID(tagLine, gameName)
    const PUUID = await PUUIDcall.puuid
    const matchIDS = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + PUUID + '/ids?start=0&count=20&api_key=' + apiKey
    const matchIDGet = await axios.get(matchIDS)
    .then (async response => {
        const matchIds =  await response.data
        return matchIds
    }).catch(erro => {
        return erro
    })
    let matchInfoArray = []
    for(i = 0; i < matchIDGet.length; i++){
        const matchID = matchIDGet[i]

        const matchData = await axios.get('https://americas.api.riotgames.com/lol/match/v5/matches/'+ matchID +'?api_key=' + apiKey)
        .then(response => response.data) 
        .catch(err => err)
        matchInfoArray.push(matchData)
    }
    res.json(matchInfoArray)
})





app.listen(4000, function(){
    console.log("Iniciou na porta 4000")
})