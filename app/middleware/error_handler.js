/*
 * @Author: lmz
 * @Date: 2020-03-17 15:48:24
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:12:22
 * @Description: file content
 */
'use strict'
const { HttpException } = require('../core/exception')

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next()
    } catch (err) {
      app.emit('error', err, this)
      const status = err.status || 500
      if (status === 401) {
        ctx.helper.error(ctx, '登录失效')
      } else {
        const isHttpException = err instanceof HttpException
        if (isHttpException) {
          ctx.helper.error(ctx, err.msg || err.message, err.code, { request: `${ctx.method} ${ctx.path}` })
        } else {
          ctx.helper.error(ctx, '服务器异常，请联系管理员', 500, { request: `${ctx.method} ${ctx.path}` })
        }
      }

    }
  }
}
