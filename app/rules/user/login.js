'use strict'

const rule = {
  username: [
    { required: true, message: '用户名不能为空' },
    { type: 'string', message: '用户名需要是字符串' }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { type: 'string', message: '密码字段需要是字符串' },
    {
      validator(rule, value, callback) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
        if (pattern.test(value)) {
          callback()
          return
        }
        callback({ message: `${rule.field}格式不正确` })
      }
    }
  ]
}

module.exports = rule
