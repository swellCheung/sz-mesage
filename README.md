# sz-message
项目开发过程中经常需要实现不同组件间的通讯

该工具借鉴eventBus，全局只存在一个实例，每个加入的订阅者在不再需要监听之后，需要自行调用移除方法，确保软件运行良好

注：*es5和es6的调用方式有不同，主要是防止全局命名空间污染。


# 使用方法
1、引入js脚本
 
 1-1、直接通过script标签引入
 <script type="text/javascript" src="./Message_es5.js"></script>

 1-2、es6中通过import关键字导入
 import Message from '@/Message'


2、在回调组件中添加订阅事件（es5）

    var myMessage = szMessage.Message

    // 添加订阅者
    var id = myMessage.instance().addListener("K_NOTICE_UPDATE", function () {
        console.log('消息通知成功')
    })

3、在通知组件中发布通知，并执行各个回调者中的方法。（es5）

    // 发布通知
    myMessage.instance().postMessage("K_NOTICE_UPDATE")

4、在组件实例被销毁之前，调用移除监听方法事件，传入id

    // 销毁订阅者实例
    myMessage.instance().removeListener(id)