const redis = require('redis')


const client = redis.createClient({
    username: 'default',
    password: 'ys3uZ9njzUE5i1Cy9A55KcXqX8NYFnO4',
    socket: {
        host: 'redis-11746.crce300.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 11746
    }
});

client.on('error', err => console.log('Redis Client Error', err));


module.exports = client
