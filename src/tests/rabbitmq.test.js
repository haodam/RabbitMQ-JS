const amqp = require('amqplib');
const connectToRabbitMQForTest = require('../dbs/init.rabbit');

describe('RabbitMQ Connection', () => {

    if('Should connect to successfull RabbitMQ', async() => {
        const result = await connectToRabbitMQForTest()
        expect(result).toBeUndefined();
    });
})