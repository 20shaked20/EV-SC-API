const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
// const barberRoutes = require('./routes/barber-routes)
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use('/api', barberRoutes.routes);

app.listen(config.port,
     ()=> console.log('EV-SC application server is listening on localhost:' + config.port));