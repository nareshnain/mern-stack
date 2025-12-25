const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    // useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const UserRoute = require('./routes/User');
app.use('/user', UserRoute);

const SampleRoute = require('./routes/Sample');
app.use('/sample', SampleRoute);

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});


const { specs, swaggerUi } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
