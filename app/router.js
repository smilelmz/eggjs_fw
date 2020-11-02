/*
 * @Author: lmz
 * @Date: 2020-03-17 15:35:29
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:46:33
 * @Description: file content
 */
'use strict'
const UserRouter = require('./router/user')

module.exports = app => {
  const { router } = app
  router.redirect('/', '/swagger-ui.html', 302)
  UserRouter(app)
}
