/*
 * @Author: lmz
 * @Date: 2020-03-18 16:57:37
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:19:12
 * @Description: file content
 */
'use strict'
module.exports = appInfo => {
  const config = exports = {}
  config.keys = appInfo.name + '_1584430502353_6581'
  config.swaggerdoc = {
    enable: false
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_fw',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'sw_platform123.',
      db: 0
    }
  }
}
