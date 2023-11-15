import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewengine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";
import cors from "cors"

require("dotenv").config(); // giup chayj dc dong process.env

const app = express();

//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())

//css
// var obj = css.parse('body { font-size: 12px; }',{ source: 'style.css' });
// css.stringify(obj);

viewEngine(app);
initWebRoutes(app);

//test connectionDB


connection();
let port = process.env.PORT || 8080; //Port === undefined => Port = 6060
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  // Pass to next layer of middleware
  next();
});


app.listen(port, () => {
  //callback
  console.log("Running localhost server: " + `localhost:5000`); ///port  tại file .env
});
