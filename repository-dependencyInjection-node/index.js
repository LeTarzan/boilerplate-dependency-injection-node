const app = require('./src/app');

const port = process.env.PORT || 3000;
// eslint-disable-next-line

app.listen(port, '0.0.0.0', console.log(`Listening to 0.0.0.0:${port}`));
