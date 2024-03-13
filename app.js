const express = require('express');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const resolvers = require('./resolver');
const typeDefs=require('./typeDf');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4')

let app='';
let server='';
async function startServer(){
    app = express();
    server= new ApolloServer({
        typeDefs,
        resolvers,
    })

app.use(bodyParser.json());
app.use('*', cors());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());

await server.start();

app.use("/graphql", expressMiddleware(server));

app.use('/', async (req, res, next) => {
    try {
        console.log("halo")
        // await sendMsg("queue1", {
        //     sender: "ASif",
        //     receiver: "random",
        //     msg: "message aaya"
        // });
        if (req.url === '/') {
            return res.sendFile(path.join(__dirname, 'public', 'login.html'))
        }
         }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
})

app.listen(4000, () => console.log("Serevr Started at PORT 4000"));
}


var channel, connection;
async function connectQueue() {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log("message queue is ON")
    }
    catch (err) {
        console.log(err)
    }
}
connectQueue();

async function sendMsg(queueName, data) {
    try {
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
}


const connect = mongoose.connect('mongodb+srv://asif:Asif6070@atlascluster.iko5pu8.mongodb.net/ideaClan?retryWrites=true&w=majority');
connect.then(() => {
    console.log('Connected to MongoDB!');
})
    .catch((err) => {
        console.log(err);
    });

    startServer();







