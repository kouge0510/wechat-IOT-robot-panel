Page({
  data: {
    dashboards: [],  // 存储从 Grafana 获取的仪表盘数据
    loading: true     // 加载状态
  },

  onLoad: function() {
    this.fetchGrafanaData();  // 调用函数获取仪表盘数据
  },

  // 获取 Grafana 仪表盘数据
  fetchGrafanaData: function() {
    const url = 'http://192.168.0.100:3000/api/search';  // Grafana API URL
    const username = 'admin';  // Grafana 用户名
    const password = 'kouge';  // Grafana 密码

    // 将用户名和密码合并为一个字符串，并转换成 ArrayBuffer
    const authString = username + ':' + password;
    const arrayBuffer = this.stringToArrayBuffer(authString);  // 转换为 ArrayBuffer

    // 使用 wx.arrayBufferToBase64 编码为 Base64 字符串
    const base64Auth = wx.arrayBufferToBase64(arrayBuffer);

    // 使用 wx.request 发起请求
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Authorization': 'Basic ' + base64Auth  // 认证头
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // 数据请求成功后，更新视图
          this.setData({
            dashboards: res.data,  // 获取到多个仪表盘数据
            loading: false        // 设置加载状态为 false
          });
        } else {
          console.error('数据请求失败', res);
          this.setData({
            loading: false  // 请求失败后，更新加载状态
          });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
        this.setData({
          loading: false  // 请求失败后，更新加载状态
        });
      }
    });
  },

  // 辅助函数：将字符串转换为 ArrayBuffer
  stringToArrayBuffer: function(str) {
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
      view[i] = str.charCodeAt(i);
    }
    return buffer;
  },

  // 跳转到仪表盘页面
  goToDashboard: function(event) {
    const uid = event.currentTarget.dataset.uid;  // 获取当前点击的仪表盘的 uid
    const url = 'http://192.168.0.100:3000/d/' + uid;  // Grafana 仪表盘的 URL

    // 在小程序中使用 wx.navigateTo 或 wx.redirectTo 跳转到外部链接
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent(url)  // 跳转到 WebView 页面查看仪表盘
    });
  }
});
