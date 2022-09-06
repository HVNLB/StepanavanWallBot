import TelegramBot from "node-telegram-bot-api";
import Censor from "clean-armenian"
import express from "express"
import * as dotenv from 'dotenv'
dotenv.config()
let LastMessage = [];
let Output = 0;
const app = express()
app.use(express.urlencoded({ extended: false }))
const bot = new TelegramBot(process.env.TOKEN, { polling: true });


const fix = function(val){
  console.log (val)
  Output = Censor(val)
  return Output
  }

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  LastMessage[0] = msg.text.toString()
  fix(LastMessage[0])
  bot.sendMessage(chatId, '👍');
});



app.get('/', (req, res) => {
  res.send(`
  <head><link rel="shortcut icon" href="#"></head>
     <h1>Enter your text<h1> 
     <form action = "/send" method="POST">
     <input type = "text" name ="mes">
     <button>Submit</button>
     </form>
     <p>${Output}<p>
     `
     )
     
})

app.get('/output', (req, res) => {
  res.send(`

     <p>${Output}<p>
     `
     )
     
})



app.post('/send',(req,res)=>{
  LastMessage[0] = req.body.mes.toString()
  fix(LastMessage[0])
  res.redirect('/')
  
})

LastMessage[0] = 0;

app.listen(process.env.PORT, () => {
  console.log(`Running`)
})