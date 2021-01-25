const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit to 100 request 
});

module.exports = (app) => {
  // parse body params and attache them to req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // parse HTTP request cookies
  app.use(cookieParser());

  // override HTTP verbs
  app.use(methodOverride('_method'));

  // compress a HTTP message
  app.use(compress());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  // limit requisition per IP
  app.use(limiter);

  // adjusts for performance
  app.set('etag', false);
  app.set('x-powered-by', false);

  app.set('trust proxy', 1);

  // log
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // error handler
  /* eslint no-unused-vars: 0 */
  app.use((err, req, res, next) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: true, msg: err.detail || err.message });
  });

  return app;
};
