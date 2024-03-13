const amqp = require('amqplib');

var channel, connection;
connectQueue();
async function connectQueue() {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log("receiver's message queue is ON")

        channel.assertQueue('queue1');
        channel.consume('queue1', (msg) => {
            if (msg) {
                console.log(msg.content+"");
                        channel.ack(msg);
            }
            })
    }
    catch (err) {
        console.log(err)
    }
}
