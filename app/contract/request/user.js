/*
 * @Author: lmz
 * @Date: 2020-03-18 15:35:57
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 18:07:34
 * @Description: file content
 */
'use strict'

module.exports = {
  login: {
    username: { type: 'string', required: true, example: '1565977454' },
    password: { type: 'string', required: true, example: '123456' }
  },
  register: {
    mobile: { type: 'integer', required: true, example: '15659774564' },
    code: { type: 'integer', required: true, example: '123456' },
    password1: { type: 'integer', required: true, example: '123456' },
    password2: { type: 'integer', required: true, example: '123456' }
  }
}
