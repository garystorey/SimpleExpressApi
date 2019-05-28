const express = require(`express`);
const app = express();
const compression = require('compression');
const helmet = require('helmet');

app.listen(3333, ()=> {
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

app.get(`/all`, (request, response) => {
    let json = {
        len: data.length,
        data
    };
    response.status(200).send(json).end();
});

app.get(`/add`, (req, res) => {

    const {n:name,s:slogan} = req.query;

    if (!name || !slogan) {
        res.status(500).send({result:"Name or slogan not supplied"}).end();
    }
    data.push({name,slogan});
    res.status(200).send({result:"Added successfully"}).end();

});
