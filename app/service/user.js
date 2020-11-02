/*
 * @Author: lmz
 * @Date: 2020-03-18 17:39:46
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:25:10
 * @Description: file content
 */
'use strict'

const BaseService = require('../core/base_service')
const shortid = require('shortid')

class UserService extends BaseService {

  init() {
    this.setModel(this.ctx.model.User)
  }

  async create(user) {
    const { ctx } = this
    const mobile = user.mobile
    user.nickname = `用户${mobile.substr(0, 3)}*****${mobile.substr(8)}`
    user.password = ctx.helper.encrypt(user.password1)
    user.invite_code = shortid.generate()
    return this.model.User.create(user)
  }
}

module.exports = UserService
