/**
 * 消息中心简化版(es5)
 * @author swellz
 */

/// 自定义命名空间
var szMessage = {}

/**
 * 通知类
 */
szMessage.Message = function () {

  /// 事件缓存
  this.eventMap = {}
}

szMessage.Message.target = null

/**
 * 单例方法
 * @returns 实例对象
 */
szMessage.Message.instance = function () {
  if (!this.target) {
    this.target = new szMessage.Message()
  }
  return this.target
}

/**
 * 增加监听器,支持重复绑定
 * @param {string} name 唯一名称
 * @param {function} block 回调函数
 * @returns 
 */
szMessage.Message.prototype.addListener = function (name, block) {
  const id = `${new Date().getTime()}${(Math.random() * 1000).toFixed(0)}`

  if (!this.eventMap[name]) {
    this.eventMap[name] = {}
  }

  this.eventMap[name][id] = block
  return id
}

/**
 * 移除监听器，通过唯一id解绑事件回调
 * @param {string} id 
 */
szMessage.Message.prototype.removeListener = function (id) {
  for (var name in this.eventMap) {
    for (var subId in this.eventMap[name]) {
      if (id == subId) {
        delete this.eventMap[name][subId]
      }
    }
  }
}

/**
 * 通知事件更新
 * @param {string} name 
 * @param {any} param 
 */
szMessage.Message.prototype.postMessage = function (name, param) {
  if (this.eventMap[name]) {
    for (var subId in this.eventMap[name]) {
      this.eventMap[name][subId] && this.eventMap[name][subId](param)
    }
  }
}