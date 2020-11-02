/*
 * @Author: lmz
 * @Date: 2020-03-18 15:33:11
 * @LastEditors: lmz
 * @LastEditTime: 2020-03-18 15:35:09
 * @Description: file content
 */
'use strict'

module.exports = {
  baseResponse: {
    error: { type: 'boolean', required: true },
    msg: { type: 'string', required: true },
    data: { type: 'object' }
  }
}
