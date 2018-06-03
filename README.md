# NScan

基于 NodeJs 的网页采集器，像 Vue 一样简易配置

## 快速开始

**数据库配置：**

/app/config/default.js

```javascript
module.exports = {
  mongodb: 'mongodb://'
}
```

**采集示例和配置详见：**

[/app/demo/](/app/demo/)

**启动采集：**

```shell
npm run start
```

## 里程碑

- [x] 分页采集
- [x] 详情页采集
- [x] 静态页面采集
- [ ] 复杂分页采集
- [x] GET 采集
- [x] POST 采集
- [ ] API 采集
- [ ] 定时采集
- [ ] 采集状态持久化
- [ ] 采集日志