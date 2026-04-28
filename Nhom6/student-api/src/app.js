const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes/student.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

app.use("/api/students", routes);

app.use(errorHandler);

module.exports = app;