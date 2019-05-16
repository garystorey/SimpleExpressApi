const http = require(`http`);
const express = require(`express`);
const app = express();
const compression = require('compression');
const helmet = require('helmet');

http.createServer(app).listen(3333, ()=>{
    console.log(`Server is running at http://localhost:3333`);
});

/* Middleware */

app.use(compression());
app.use(helmet());



/* Routes */

app.get(`/`, (request, response) => {
    const route = request.route.path;
    const name = request.query.n || `World`;
    const snippet = `
        <div>
            <h1>Hello ${name}!</h1>
            <p>Get request at <strong>${route}</strong>
        </div>`;

    response.status(200).send(snippet).end();
});

app.get(`/json`, (request, response) => {
    const data = {
        length:2,
        quotes: [
            { name:`Nike`,text:`Just Do it`},
            { name:`McDonalds`,text:`I'm lovin' it`},
        ]
    };
    response.status(200).send(JSON.stringify(data)).end();
});