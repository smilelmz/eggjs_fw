/*
 * @Author: lmz
 * @Date: 2020-03-17 11:20:43
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 15:42:55
 * @Description: file content
 */
'use strict'

module.exports = app => {
  const { controller, router } = app
  const prefix = '/api/v1/user'
  router.post(`${prefix}/login`, controller.user.login)
  router.post(`${prefix}/register`, controller.user.register)
  app.router.resources('user', '/api/v1/user', app.controller.user)
}
