const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;


const app = express();
app.use(bodyParser.json());
app.use(cors());

const api = require('./routes/api');
app.use('/api',api);

app.listen(PORT, function() {
    console.log('Server is running on port - '+PORT);
});
