module.exports = {
	mongoURI: 'mongodb+srv://abhijadhavin:abhijeet31@cluster0-9hbmf.mongodb.net/storybooks-dev?retryWrites=true&w=majority',
	googleClientID: '463694277188-cpi25m4qjn6rp612icbcipjd7gcoce9p.apps.googleusercontent.com',
	googleClientSecret: 'tm2cUa5uSJsAKWLy-nMvVopg'
}



/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://abhijadhavin:<password>@cluster0-9hbmf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/