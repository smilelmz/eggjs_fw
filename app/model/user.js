'use strict'
const moment = require('moment')
module.exports = app => {
  const { STRING, INTEGER, FLOAT, DATE } = app.Sequelize
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: STRING(64),
      allowNull: false,
      comment: '用户昵称'
    },
    mobile: {
      type: STRING(11),
      allowNull: false,
      comment: '手机号码'
    },
    avatar: {
      type: STRING(255),
      comment: '头像'
    },
    invite_code: {
      type: STRING(32),
      allowNull: false,
      comment: '邀请码'
    },
    invite_user: {
      type: INTEGER,
      comment: '邀请人'
    },
    email: {
      type: STRING(128),
      unique: true,
      comment: '邮箱'
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: '密码'
    },
    balance: {
      type: FLOAT,
      defaultValue: 0,
      comment: '账户余额'
    },
    createTime: {
      type: DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
      }
    },
    deletedTime: {
      type: DATE,
      allowNull: true,
      defaultValue: null,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm');
      }
    }
  }, {
    scopes: {
      uv: {
        attributes: {
          exclude: ['password', 'deletedTime']
        }
      },
      iv: {
        attributes: {
          exclude: ['deletedTime']
        }
      }
    }
  })

  return User
}
