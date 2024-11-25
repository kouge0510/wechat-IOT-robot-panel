Page({
  // 跳转到主页
  goToMain: function() {
    wx.navigateTo({
      url: '/pages/main/index',
      success: function() {
        console.log('跳转到主页成功');
      },
      fail: function() {
        console.log('跳转失败');
      }
    });
  },

  // 跳转到日志页面
  goToLogs: function() {
    wx.navigateTo({
      url: '/pages/logs/logs',
      success: function() {
        console.log('跳转到日志页面成功');
      },
      fail: function() {
        console.log('跳转失败');
      }
    });
  },

  // 跳转到 Grafana 页面
  goToGrafana: function() {
    wx.navigateTo({
      url: '/pages/grafana/grafana',
      success: function() {
        console.log('跳转到 Grafana 页面成功');
      },
      fail: function() {
        console.log('跳转失败');
      }
    });
  }
});
