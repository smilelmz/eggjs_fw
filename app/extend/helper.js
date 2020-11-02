'use strict'
const bcrypt = require('bcryptjs')
const { HttpException, AuthFailed, NotFound, Existing, ParameterException } = require('../core/exception')

module.exports = {
  // 基本服务端接口格式化
  success(ctx, msg = '查询成功', code = 200) {
    ctx.body = {
      msg,
      code,
      error: false
    }
    ctx.status = 200
  },
  json(ctx, data, msg = '查询成功', code = 200) {
    ctx.body = {
      data,
      msg,
      code,
      error: false
    }
    ctx.status = 200
  },
  error(ctx, msg = '服务器异常', code = 500, ohter = {}) {
    ctx.body = {
      msg,
      code,
      error: true,
      ...ohter
    }
    ctx.status = 500
  },
  // 异常实例化
  http_exception(msg, code) {
    return new HttpException(msg, code)
  },
  auth_failed(msg) {
    return new AuthFailed(msg)
  },
  not_found(msg) {
    return new NotFound(msg)
  },
  existing(msg) {
    return new Existing(msg)
  },
  parameter_exception(msg) {
    return new ParameterException(msg)
  },
  // 加密解密
  encrypt(password) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
  },
  decrypt(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}
