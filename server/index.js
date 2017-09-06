/**
 * Created by Moudi on 2017/5/3.
 */
import fs from 'fs';
import https from 'https';
import express from 'express';
import config from './config/';
import { resolve } from 'path';

global.isProd = config.env === 'production';

const r = path => resolve(__dirname, path);

class ApiServer {
  constructor() {
    this.app = express();

    this.MIDDLEWARE = ['cors', 'bodyParser', 'cookieParser', 'custom', 'apiServerRoutes'];
    this.SERVICES = ['database', 'weatherSystem'];

    this.registerServices();
    this.registerMiddleware(this.app);
  }

  registerMiddleware(app) {
    this.MIDDLEWARE.forEach(middlewareName => {
      require(`${r(`./middlewares/${middlewareName}`)}`)['default'](app);
    });
  }

  registerServices() {
    this.SERVICES.forEach(servicesName => {
      require(`${r(`./services/${servicesName}`)}`)['default']();
    });
  }

  getHttpsServer() {
    const options = {
      key: fs.readFileSync(config.saymoe.key, 'utf8'),
      cert: fs.readFileSync(config.saymoe.cert, 'utf8')
    };
    return https.createServer(options, this.app);
  }

  start() {
    if (isProd) {
      this.getHttpsServer()
        .listen(config.app.port, () => {
          console.log(`线上模式: 端口${config.app.port}`);
        });
    } else {
      this.app.listen(config.app.port, () => {
        console.log(`本地开发模式: 端口${config.app.port}`);
      });
    }
  }
}

const apiServer = new ApiServer();
apiServer.start();