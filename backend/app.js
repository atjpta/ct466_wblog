const express = require("express");
const cors = require("cors");
const route = require('./app/routes')
const app = express();

var corsOptions = {
  origin: 'https://wblog-beta.vercel.app/'
}


app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
        limit: '50mb',
        extended: true,
    })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" + req.url});
});


route.Start(app);


// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date()
//   res.end(d.toString())
// }

// app.use(handler(allowCors))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next(res.status(404).json({ message: "Resource not found" + req.url }))
});
app.use((error, req, res, next) => {
    if (res == null) {
      res.status(error.status || 500).json({ message: error.message + req.url || "internal Server Error" })
    }
    else {
        console.log(error);
    }
});

module.exports = app;