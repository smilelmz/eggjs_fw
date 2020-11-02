'use strict'
const { Controller } = require('egg')

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.OpService = null
    this.init()
  }
  /**
   * 初始化
   */
  init() { }

  /**
   * 设置服务
   * @param service
   */
  setService(service) {
    this.OpService = service
  }

  /**
   * 获得query请求参数
   */
  getQuery() {
    return this.ctx.request.query
  }

  /**
   * 获取body请求参数
   */
  getBody() {
    return this.ctx.request.body
  }

  /**
  * 获取params请求参数
  */
  getParams() {
    return this.ctx.request.params
  }

  /**
   * 成功，无返回数据
   * @param {返回数据描述} msg
   * @param {状态码} code
   */
  success(msg = '查询成功', code = 200) {
    const { ctx } = this
    ctx.helper.success(ctx, msg, code)
  }

  /**
   * 成功，带返回数据
   * @param {返回数据} data
   * @param {描述} msg
   * @param {状态码} code
   */
  json(data, msg = '查询成功', code = 200) {
    const { ctx } = this
    ctx.helper.success(ctx, data, msg, code)
  }

  /**
   * 接口一次
   * @param {接口异常描述} msg
   * @param {状态码} code
   * @param {其它数据} ohter
   */
  error(msg = '服务器异常', code = 500, ohter = {}) {
    const { ctx } = this
    ctx.helper.success(ctx, msg, code, ohter)
  }

  /**
   * 获取详情
   */
  async show() {
    const result = await this.OpService.getDetail(this.getParams().id);
    return this.json(result)
  }

  /**
   * 删除成功
   */
  async destroy() {
    await this.OpService.deleteData(this.getParams().id);
    return this.success('删除成功')
  }

  /**
   * 更新成功
   */
  async update() {
    await this.OpService.updateData(this.getParams().id, this.getBody())
  }

  /**
   * 删除成功
   */
  async destroyAll() {
    await this.OpService.deleteData(this.getQuery().ids);
    return this.success('删除成功')
  }
}
module.exports = BaseController;
