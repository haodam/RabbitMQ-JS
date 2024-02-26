const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost')
        if(!connection) throw new Error('Connection not established')

        const channel = await connection.createchannel()

        return {channel, connection}

    } catch (error) {
        console.error(`Error connecting to RabbitMQ`, error )
        throw error
    }
}

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, { durable: true })
        console.log(`Watting for messsages...`);
        channel.consume(queueName, msg => {
            console.log(`Received message: ${queueName}::,`, msg.connect.toString());
        }, {
            noArck: true
        })
    } catch (error) {
        console.log('error publishing message to RabbitMQ', error)
        throw error
    }
}

const connectToRabbitMQForTest = async () => {
    try {

       const { channel , connection} = await connectToRabbitMQ()
       //publish message to a queue
       const queue = 'test-queue'
       const message = 'Hello World!'
       await channel.assertQueue(queue)
       await channel.sendToQueue(queue, Buffer.from(message)) // Buffer.from giup truyen tai it bang thong

       //close the connection
       await connection.close()

    } catch (error) {

        console.error(`Error connecting to RabbitMQ`, error )

    }
}


module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue
}