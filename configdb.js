const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'
const dbname = 'friend_facebook'


const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connectdb = async () => {
    try {
        await client.connect();
        // console.log('Connected to the database');
        const db = client.db(dbname);
        return db
    } catch (error) {
        console.log('Failed to connect to the database');
    }
}
module.exports = connectdb;