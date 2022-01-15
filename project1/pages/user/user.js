const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad:function(options){
      if (app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })

        this.addUser(app.globalData.userInfo)
    } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })

            this.addUser(res.userInfo)
        }
    } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo

                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })

                this.addUser(app.globalData.userInfo)
            }
        })
    }
      // 页面初始化 options为页面跳转所带来的参数
      app.editTabBar();
    },
    onReady:function(){
      // 页面渲染完成
    },
    onShow:function(){
      // 页面显示
    },
    onHide:function(){
      // 页面隐藏
    },
    onUnload:function(){
      // 页面关闭
    },
    

    getUserInfo (e) {
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo

            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })

            this.addUser(app.globalData.userInfo)

            // wx.switchTab({ url: '/pages/index/index' })
        }
    },

    // 如果数据库没有此用户，则添加
    async addUser (user) {
        if (app.globalData.hasUser) {
            return
        }
        const db=wx.cloud.database()
        let result=await db.collection('user').add({
          data:{
            nickName:user.nickName,
            albums:[]
          }
        })
        app.globalData.nickName = user.nickName
        app.globalData.id = result._id
    }
})
