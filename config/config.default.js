/*
 * @Author: lmz
 * @Date: 2020-03-17 15:35:29
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:26:45
 * @Description: file content
 */
'use strict'

module.exports = appInfo => {
  const config = exports = {}
  config.listen = {
    port: 7001
  }
  config.keys = appInfo.name + '_1584430502353_6581'
  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length > 0) {
        ctx.helper.error(ctx, errors[0].message)
      }
    }
  }
  config.middleware = ['errorHandler']
  config.errorHandler = {
    match: '/api'
  }
  config.middleware = ['authorization'];
  config.authorization = ['/api/login']
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.jwt = {
    secret: 'egg_fw_123456'
  }
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_fw',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
  config.redis = {
    client: {
      port: 6379,
      host: '47.107.35.158',
      password: 'sw_platform123.',
      db: 0
    }
  }
  const userConfig = {
  }
  return {
    ...config,
    ...userConfig
  }
}
