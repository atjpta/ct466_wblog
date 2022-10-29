const express = require("express");
const cors = require("cors");
const route = require('./app/routes')
const app = express();


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcom" });
});


route.auth(app);
route.users(app);
route.image(app);
route.blog(app);
route.vote(app);
route.comment(app);
route.hashtag(app);
route.search(app);
route.gem(app);
route.premium(app)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(res.status(404).json({ message: "Resource not found" }))
});
app.use((error, req, res, next) => {
    if (res == null) {
        res.status(error.status || 500).json({ message: error.message || "internal Server Error" })
    }
    else {
        console.log(error);
    }
});

module.exports = app;