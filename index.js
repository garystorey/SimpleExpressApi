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

const data = {
    length:2,
    quotes: [
        { name:`Nike`,text:`Just Do it`},
        { name:`McDonalds`,text:`I'm lovin' it`},
    ]
};


/*Controllers */
const getRootResponse = (req,res) => {
    const route = req.route.path;
    const name = req.query.n || `World`;
    const snippet = `
        <div>
            <h1>Hello ${name}!</h1>
            <p>Get request at <strong>${route}</strong>
        </div>`;
    res.status(200).send(snippet).end();
};


/* Routes */

app.get(`/`, getRootResponse);

app.get(`/json`, (request, response) => {
    response.status(200).send(JSON.stringify(data)).end();
});