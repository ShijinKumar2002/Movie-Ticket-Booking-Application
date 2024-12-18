const express = require("express");
const connection = require("./config/connection");
const loginroutes = require("./routes/login.routes"); // Adjusted path if needed
const TheaterManagementProfile = require("./routes/TheaterManagementRoutes");
const movieRoutes = require("./routes/MovieInformation.routes");
const castRoutes = require("./routes/CastInformation.routes");
const crewRoutes = require("./routes/Crewinformation.routes");
const Showtime = require("./routes/ShowTimeInformation.routes");
const mime = require('mime');
const registerroutes = require("./routes/register.routes")
const userloginRoutes = require("./routes/userlogin.routes");

require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

connection();

// Routes setup
app.use(loginroutes);
app.use(TheaterManagementProfile);
app.use(movieRoutes);
app.use(castRoutes);
app.use(crewRoutes);
app.use(Showtime);
app.use(registerroutes);
app.use(userloginRoutes);
// Serve movie images
app.use(
    "/static/movieimages",
    (req, res, next) => {
        console.log(`Requested movie image: ${req.path}`);
        const mimeType = mime.getType(req.path);
        if (mimeType) {
            res.type(mimeType);
        }
        next();
    },
    express.static(path.join(__dirname, "public/movieimages"))
);

// Serve cast images
app.use(
    "/static/castimages",
    (req, res, next) => {
        console.log(`Requested cast image: ${req.path}`);
        const mimeType = mime.getType(req.path);
        if (mimeType) {
            res.type(mimeType);
        }
        next();
    },
    express.static(path.join(__dirname, "public/castimages"))
);
app.use(
    "/static/crewimages",
    (req, res, next) => {
        console.log(`Requested cast image: ${req.path}`);
        const mimeType = mime.getType(req.path);
        if (mimeType) {
            res.type(mimeType);
        }
        next();
    },
    express.static(path.join(__dirname, "public/crewimages"))
);

const port = 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
