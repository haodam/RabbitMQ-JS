const {
    connectToRabbitMQ,
    consumerQueue
} = require('../dbs/init.rabbit')

const messageService = {
    consummerToQueue: async (queueName) => {
        try {
            const { channel, connecttion } = await connectToRabbitMQ()
            await consumerQueue( channel, queueName )
            // 1. find User folowing taht SHOP
            // 2. Send message to user
            // 3. yes, oke ==> success message
            // 4. error. setup DLX
        } catch (error) {
            console.log(`Error consumerToQueue::`, error)
            throw error
            
        }
    }
}

module.exports = messageService