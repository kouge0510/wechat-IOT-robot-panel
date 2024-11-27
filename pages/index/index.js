// 获取应用实例
var app = getApp()

Page({
  data: {
    motto: '极速分拣机器人',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "/assets/first.jpg",
          },
          {
            "pic_url": "/assets/second.jpg",
          }
          
        ]
      }
      
    ],
    hotgoods: [
      {
        "id": "1", // 添加 id 字段，用于标识商品
        "name": "跳转到二维码生成器",
        "pic_url": "/assets/zcode.jpg",
        "url": "/pages/main/index" // 每个商品对应的页面
      },
      {
        "id": "2",
        "name": "跳转到文档",
        "summary": "金属机身,指纹解锁,4000mAh大电池",
        "pic_url": "/assets/document.png",
        "url": "/pages/logs/logs" // 每个商品对应的页面
      },
      {
        "id": "3",
        "name": "跳转到Grafana",
        "pic_url": "/assets/grafana.jpg",
        "url": "/pages/grafana/grafana" // 每个商品对应的页面
      },
      {
        "id": "4",
        "name": "跳转到threejs",
        "pic_url": "/assets/three.png",
        "url": "/pages/threejs/threejs" // 每个商品对应的页面
      },
      {
        "id": "5",
        "name": "敬请期待",
        "pic_url": "/assets/qidai.png",
        "url": " " // 每个商品对应的页面
      }
    ]
  },

  onProductClick: function (e) {
    // 获取跳转页面路径
    const url = e.currentTarget.dataset.url;
    const productId = e.currentTarget.dataset.id;

  
    // 打印点击的商品id和跳转的URL
    console.log("点击的商品 ID: ", productId);
    console.log("跳转的页面路径: ", url);
  // 确保跳转路径正确
    if (url) {
      wx.navigateTo({
        url: url // 动态跳转到对应的商品页面
      });
    } else {
      console.log("跳转的 URL 不存在！");
    }
  },
})
