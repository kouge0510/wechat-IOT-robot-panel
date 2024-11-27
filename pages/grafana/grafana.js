Page({
  data: {
    dashboards: [],  // 存储从 Grafana 获取的仪表盘数据
    loading: true,   // 加载状态
    grafanaUrl: '',  // 用来存储当前选中的仪表盘 URL
    animationData: {},  // 动画数据
    alerts: [], // 存放预警数据
    urlAnimationData: {}  // 用于显示 URL 的动画
  },

  onLoad: function() {
    this.fetchGrafanaData();  // 调用函数获取仪表盘数据
    this.fetchAlertData();    //调用警告数据
    this.createLoadingAnimation(); // 初始化加载动画
  },
  onLongTap: function () {
    // 将文本复制到剪贴板
    wx.setClipboardData({// 使用微信复制api
      data: this.data.grafanaUrl,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function () {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  // 获取 Grafana 仪表盘数据
  fetchGrafanaData: function() {
    const url = 'http://192.168.0.100:3000/api/search';  // Grafana API URL
    const username = 'admin';  // Grafana 用户名
    const password = 'kouge';  // Grafana 密码

    const authString = username + ':' + password;
    const arrayBuffer = this.stringToArrayBuffer(authString);
    const base64Auth = wx.arrayBufferToBase64(arrayBuffer);

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Authorization': 'Basic ' + base64Auth
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            dashboards: res.data,
            loading: false
          });
          this.animateDashboardItems();  // 数据加载完成后启动动画
        } else {
          console.error('数据请求失败', res);
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
        this.setData({ loading: false });
      }
    });
  },
    // 获取 Grafana 预警数据
  fetchAlertData: function() {
    const url = 'http://192.168.0.100:3000/api/v1/provisioning/alert-rules';  // Grafana 预警数据 API
    const username = 'admin';  // Grafana 用户名
    const password = 'kouge';  // Grafana 密码

    const authString = username + ':' + password;
    const arrayBuffer = this.stringToArrayBuffer(authString);
    const base64Auth = wx.arrayBufferToBase64(arrayBuffer);

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Authorization': 'Basic ' + base64Auth
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            alerts: res.data
          });
          console.log('预警数据加载成功:', res.data);
        } else {
          console.error('预警数据请求失败', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
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

  // 选中仪表盘后展示图表
  selectDashboard: function(event) {
    const selectedUrl = event.currentTarget.dataset.url;
    if (selectedUrl) {
      const grafanaUrl = 'http://192.168.0.100:3000' + selectedUrl + '?orgId=1&refresh=30m';
      this.setData({
        grafanaUrl: grafanaUrl
      });
      this.animateUrlDisplay();  // 展示 URL 动画
    }
  },

  // 加载动画
  createLoadingAnimation: function() {
    const animation = wx.createAnimation({
      duration: 2500,
      timingFunction: 'ease',
    });
    animation.opacity(1).step();  // 设置动画效果
    this.setData({
      animationData: animation.export()
    });
  },

  // 仪表盘项淡入动画
  animateDashboardItems: function() {
    const animation = wx.createAnimation({
      duration: 1800,
      timingFunction: 'ease-in',
    });
    animation.opacity(1).translateY(0).step();  // 淡入 + 向上平移动画
    this.setData({
      animationData: animation.export()  // 更新动画数据
    });
  },

  // URL 显示动画
  animateUrlDisplay: function() {
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-out',
    });
    animation.translateY(0).opacity(1).step();  // 透明度 + 位移动画
    this.setData({
      urlAnimationData: animation.export()  // 更新 URL 显示动画数据
    });
  }
});
