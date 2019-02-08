const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');

var app = express();
var jsonParser = bodyParser.urlencoded();
app.use(jsonParser);

const dbService = process.env.DB_SERVICE;
// console.log(`Serviço: ${dbService}`);
const connectionString = appEnv.getServiceURL(dbService);

// console.log(`Conexão: ${connectionString}`);
const client = new pg.Client(connectionString);
client.connect();

app.use(express.static('public'));

/** 
    ROTAS
*/
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('/', function (req, res) {
    res.send('UI5 app');
});

app.post('/subscriber', function (req, res) {
    const text = 'INSERT  INTO "public"."users" VALUES ($1, $2, NOW()) ON CONFLICT DO NOTHING RETURNING *';

    const values = [req.body.email, req.body.name];

    // callback
    client.query(text, values, (err, user) => {
        if (err) {
            console.log(err.stack)
        } else {
            if (user.rows[0]) {
                res.status(201).json({
                    message: 'OK',
                    user: user.rows[0]
                });
            } else {
                res.status(200).json({
                    message: 'Já cadastrado'
                });
            }
        }
    })
});

app.get('/subscriber', function (req, res) {

    const query = {
        text: 'SELECT * FROM "public"."users"',
    }

    // callback
    client.query(query, (err, users) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.status(200).json({
                message: 'OK',
                betaUsers: users.rows
            });
        }
    })

});


app.listen(appEnv.port, function () {
    console.log(`app iniciado em ${appEnv.url}`);
});
