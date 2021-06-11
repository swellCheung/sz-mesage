/**
 * 消息中心简化版(es6)
 * @author swellz
 */
class Message {
    
  /// 事件缓存
  eventMap = {}

  static target = null

  /**
   * 单例方法
   * @returns 实例对象
   */
  static instance() {
    if (!this.target) {
      this.target = new Message()
    }
    return this.target
  }

  /**
   * 增加监听器,支持重复绑定
   * @param {string} name 唯一名称
   * @param {function} block 回调函数
   * @returns 
   */
  addListener(name, block) {
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
  removeListener(id) {
    for (let name in this.eventMap) {
      for (let subId in this.eventMap[name]) {
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
  postMessage(name, param) {
    if (this.eventMap[name]) {
      for (let subId in this.eventMap[name]) {
        this.eventMap[name][subId] && this.eventMap[name][subId](param)
      }
    }
  }
}

export default Message;