//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'xly-iusc5',
        traceUser: true,
      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
                success: res => {
                    this.globalData.userInfo = res.userInfo
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                    }
                }
            })
        } else {
            // 跳转登录页面让用户登录
            wx.switchTab({ url: '/pages/user/user' })
        }
      }
    })
  },
  
  editTabBar: function(){
    var tabbar = this.globalData.tabbar,
        currentPages = getCurrentPages(),
        _this = currentPages[currentPages.length - 1],
        pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for(var i in tabbar.list){
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData:{
    hasUser: false, // 判断数据库中是否有用户
    hasUserInfo: false, // 判断小程序的userInfo是否有获取
    userInfo: null,
    checkResult: null,
    code: null,
    openId: null,
    flag: 0,
    nickName: '',
    allData: {
      albums: [],
      folders:[],
    },
    id: null,
    tabbar:{
      color: "#000000",
      selectedColor: "#0f87ff",
      backgroundColor: "#ffffff",
      borderStyle: "black",
      list: [
        {
          pagePath: "/pages/user/user",
          text: "主页",
          iconPath: "/img/tab.png",
          selectedIconPath: "/img/tab0.png",
          selected: true
        },
        {
          pagePath: "/pages/album/album",
          text: "相册",
          iconPath: "/img/tabA.png",
          selectedIconPath: "/img/tabA0.png",
          selected: false
        },
        {
          pagePath: "/pages/cloud/cloud",
          text: "云端",
          iconPath: "/img/tabB.png",
          selectedIconPath: "/img/tabB0.png",
          selected: false
        }
      ],
      position: "bottom"
    }
  }
})