/**
 * Created by Moudi on 2017/5/3.
 */
const isLocal = true;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');

const cors = require('./middleware/cors');
const { infoLogger, warnLogger } = require('./middleware/logger');
const app = express();

if (!isLocal) {
  // 只开启https服务
  var fs = require('fs');
  var https = require('https');
  var privateKey = fs.readFileSync('/root/ssl/sayMoe/saymoe.key', 'utf8');
  var certificate = fs.readFileSync('/root/ssl/sayMoe/saymoe.pem', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
  var httpsServer = https.createServer(credentials, app);
}



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('X-Powered-By', `${config.app.appName}/${config.app.version}`);
  next();
});
// 跨域中间件
app.use(cors);
app.use(cookieParser());

app.use(infoLogger);

app.use('/api', require('./api'));

app.use((req, res, next) => {
  res.status(404);
  next();
});

app.use(warnLogger);

// fixed: mpromise is deprecated;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.db}`, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('已成功连接到数据库');
    if (isLocal) {
      app.listen(2777, () => {
        console.log('服务启动127.0.0.1:2777');
      });
    } else {
      httpsServer.listen(2777, () => {
        console.log('服务启动https://say.moe');
      });
    }
  }
});
