const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const mongo = new MongoClient(url);
const dbName = 'my-resume';
let connectionInstance = null;


async function getDb() {
    if (connectionInstance) return connectionInstance;
    let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    connectionInstance = client.db(dbName);
    return connectionInstance;
}

async function save(feedback) {
    let db = await getDb();
    db.collection('feedback').insertOne(feedback);
}

module.exports = {
    save
}