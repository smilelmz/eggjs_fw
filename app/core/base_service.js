'use strict'
const { Op } = require('sequelize')
const Service = require('egg').Service

class BaseService extends Service {
  constructor(ctx) {
    super(ctx)
    this.model = null
    this.init()
  }

  init() {}

  setModel(model) {
    this.model = model
  }

  /**
   * 根据ID获取详细信息
   * @param {*} id
   * @param {*} scope
   */
  async getDetail(id, scope = '') {
    let detail = null
    const condition = {
      where: {
        id,
        deleteTime: null
      }
    }
    if (scope) {
      detail = await this.model.scope(scope).findOne(condition)
    } else {
      detail = await this.model.findOne(condition)
    }
    return detail
  }

  /**
   * 数据库删除
   * @param {指定ids} ids
   * @param {是否逻辑删除} logic
   */
  async deleteData(ids, logic = false) {
    const arr = ids.split(';')
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        arr.splice(i, 1)
        i--
      }
    }
    if (logic) {
      await this.model.update({ deleteTime: new Date() }, {
        where: { id: arr }
      });
    } else {
      await this.model.destroy({ where: { id: arr } })
    }
  }

  /**
   * 分页查询
   * @param {查询参数} query
   * @param {其它查询条件} ohter
   */
  async getPage(query, ohter = {
    condition: '',
    scope: ''
  }) {
    const {
      keywords = '',
      pageNumber = 1,
      pageSize = 10,
      order = 'createTime',
      sort = 'desc'
    } = query
    const filter = { deletedTime: null }
    if (keywords) filter.title = { [Op.like]: `%${keywords}%` }
    const condition = {
      limit: pageNumber,
      offset: (pageNumber - 1) * pageSize,
      filter,
      order: [
        [order, sort]
      ],
      ...ohter.condition
    }
    let list
    if (ohter.scope) {
      list = await this.model.scope(ohter.scope).findAndCountAll(condition)
    } else {
      list = await this.model.findAndCountAll(condition)
    }
    return {
      rows: list.rows,
      pageNumber,
      total: list.count,
      pages: Math.floor((list.count + 9) / 10)
    }
  }

  /**
   * 获取所有数据
   */
  async getAll() {
    const list = await this.model.findAll({
      where: { deleteTime: null }
    })
    return list
  }

  /**
   * 创建数据
   * @param {内容数据} body
   */
  async addData(body) {
    await this.model.create(body)
  }

  /**
   * 更新数据
   * @param {*} id
   * @param {内容数据} body
   */
  async updateData(id, body) {
    const data = await this.model.findByPk(id)
    if (!data) {
      return {
        error: true,
        msg: '没有找到相关数据'
      }
    }
    await this.model.update(body, {
      where: {
        id
      }
    });
    return {
      error: false,
      msg: '更新成功'
    }
  }
}
module.exports = BaseService
