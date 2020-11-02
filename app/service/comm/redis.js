'use strict'

const Service = require('egg').Service
class RedisService extends Service {
  /**
   * 设置redis
   * @param {*} key
   * @param {键值} value
   * @param {存储时间} seconds
   */
  async set(key, value, seconds) {
    const { redis } = this.app
    if (redis) {
      value = JSON.stringify(value)
      if (!seconds) {
        await redis.set(key, value)
      } else {
        // 设置有效时间
        await redis.set(key, value, 'EX', seconds)
      }
    }
  }

  /**
   * 获取redis数据
   * @param {*} key
   */
  async get(key) {
    const { redis } = this.app
    if (redis) {
      let data = await redis.get(key)
      if (!data) return
      data = JSON.parse(data)
      return data
    }
    return
  }

  /**
   * 清空redis
   */
  async flushall() {
    const { redis } = this.app
    if (redis) redis.flushall()
  }
}
module.exports = RedisService
