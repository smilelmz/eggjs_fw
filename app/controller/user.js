/*
 * @Author: lmz
 * @Date: 2020-03-18 09:10:55
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:05:19
 * @Description: file content
 */
'use strict'
const BaseController = require('../core/base_controller')
/**
* @controller user
*/
class UserController extends BaseController {
  init() {
    this.setService(this.service.user)
  }
  /**
  * @summary login
  * @description userLogin
  * @router post /api/v1/user/login
  * @request body login
  * @request header string access_token
  * @response 200 baseResponse
  */
  async login() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const validateResult = await ctx.validate('user.login', { username, password })
    if (!validateResult) return
    this.success('登录成功')
  }

  /**
  * @summary register
  * @description userRegister
  * @router post /api/v1/user/register
  * @request body register field_name desc
  * @response 200 baseResponse
  */
  async register() {
    const { ctx, service } = this
    const validateResult = await ctx.validate('user.register', ctx.request.body)
    if (!validateResult) return
    const user = await service.user.create(ctx.request.body)
    this.json(user)
  }

  async index() {
    const result = await this.OpService.getPage(this.getQuery())
    console.log(result)
    this.json(result)
  }
}

module.exports = UserController
