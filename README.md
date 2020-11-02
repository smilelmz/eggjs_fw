# egg_fw



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### sequelize migrations

- 初始化数据库: mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-fw`;'
- 安装sequelize-cli: npm install --save-dev sequelize-cli
- xian配置.sequelizerc
```javascript
'use strict';
const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```
- 初始化 Migrations 配置文件和目录以及修改database/config.json相关配置
```javascript
npx sequelize init:config
npx sequelize init:migrations
```
- 创建表: npx sequelize migration:generate --name=init-users
- 编辑表, 在database/migrations目录下
```javascript
'use strict';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
```
- 数据库变更
```bash
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
npx sequelize db:migrate:undo:all
```
- 常用命令
```bash
sequelize db:migrate                        运行待执行的迁移
sequelize db:migrate:schema:timestamps:add  更新迁移表以获取时间戳
sequelize db:migrate:status                 列出所有迁移的状态
sequelize db:migrate:undo                   恢复迁移
sequelize db:migrate:undo:all               恢复所有迁移
sequelize db:seed                           运行指定的种子
sequelize db:seed:undo                      撤消最近执行的种子
sequelize db:seed:all                       运行所有种子
sequelize db:seed:undo:all                  撤消所有已执行的种子
sequelize db:create                         创建配置中指定的数据库
sequelize db:drop                           删除配置中指定的数据库
sequelize init                              初始化项目
sequelize init:config                       初始化配置
sequelize init:migrations                   初始化迁移
sequelize init:models                       初始化模型
sequelize init:seeders                      初始化种子
sequelize migration:generate                生成新的迁移文件                      [aliases: migration:create]
sequelize model:generate                    生成一个模模型及期迁移文件                 [aliases: model:create]
sequelize seed:generate                     生成一个新的种子文件                      [aliases: seed:create]
```
- [文档地址](https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html#instance-method-changeColumn)