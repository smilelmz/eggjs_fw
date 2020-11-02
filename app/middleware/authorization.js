'use strict'

module.exports = (option, app) => {
  return async (ctx, next) => {
    if (option.find(item => item === ctx.url)) {
      await next()
    } else {
      const { Authorization = '' } = ctx.header;
      const token = Authorization.replace('Bearer ', '')
      if (!Authorization) {
        ctx.helper.error(ctx, '请先登录')
        return
      }
      let user = {};
      try {
        user = app.jwt.verify(token, app.config.jwt.secret)
      } catch (err) {
        ctx.helper.error(ctx, '登录失效')
        return
      }
      app.config.user = user
      await next()
    }
  }
}
