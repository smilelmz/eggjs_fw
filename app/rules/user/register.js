/*
 * @Author: lmz
 * @Date: 2020-03-18 17:55:00
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:06:58
 * @Description: file content
 */
'use strict'

const rule = {
  mobile: [
    { required: true, type: 'string', message: '手机号不能为空' }
  ],
  code: [
    { required: true, type: 'string', message: '验证码不能为空' }
  ],
  password1: [
    { required: true, type: 'string', min: 6, max: 20, message: '密码至少6个字符，最多22个字符' }
  ],
  password2: [
    { required: true, type: 'string', min: 6, max: 20, message: '密码至少6个字符，最多22个字符' }
  ]
}

module.exports = rule
