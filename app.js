var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var helmet = require("helmet");
var rateLimit = require("express-rate-limit");

var indexRouter = require("./routes/index");
var companyRouter = require("./routes/company");
var passport = require("passport");

var app = express();

app.use(cors());

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "ssl")));

app.use(passport.initialize());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/", indexRouter);

var usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.use("/api/company", companyRouter);

// catch error and forward to error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).json({
    status: status,
    message: err.message,
    validation: err.validation,
  });
});

module.exports = app;
