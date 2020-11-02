'use strict'
/*
 * @Author: lmz
 * @Date: 2020-03-16 21:03:20
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-17 15:56:13
 * @Description: file content
 */

class HttpException extends Error {
  constructor(msg = '服务器异常', code = 500) {
    super()
    this.code = code
    this.msg = msg
    this.error = true
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '登录失效') {
    super()
    this.code = 401
    this.msg = msg
    this.error = true
  }
}

class NotFound extends HttpException {
  constructor(msg = '404找不到') {
    super()
    this.code = 404
    this.msg = msg
    this.error = true
  }
}

class Forbidden extends HttpException {
  constructor(msg = '禁止访问') {
    super()
    this.code = 403
    this.msg = msg
    this.error = true
  }
}

class Existing extends HttpException {
  constructor(msg = '已存在') {
    super()
    this.code = 412
    this.msg = msg
    this.error = true
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误') {
    super()
    this.code = 400
    this.msg = msg
    this.error = true
  }
}

module.exports = {
  HttpException,
  AuthFailed,
  NotFound,
  Forbidden,
  Existing,
  ParameterException
}
