# vue3+TS 后台管理系统

项目使用了
[🍁 vue3](https://vuejs.org/)

[🚀🚀 element-plus](https://element-plus.org/zh-CN/)

[💓💓 TypeScript](https://www.typescriptlang.org/)

只使用前端功能，请切换到`vite-admin`分支，运行。

![alt 展示图片](https://i.ibb.co/P1MQycS/20231018173618.png)

![alt 展示图片](https://i.ibb.co/gZZ15XX/20231018174039.png)

如果需要使用自建后台服务请克隆
[node-admin](https://github.com/Seven7v/node-admin)

在 vue.config.ts 中 将代理改到本地服务并启动。

```
server: {
    host: '0.0.0.0',
    port: 4000, //设置服务启动端口号，是一个可选项，不要设置为本机的端口号，可能会发生冲突
    open: true, //是否自动打开浏览器，可选项
    cors: true, //允许跨域。
    // 设置代理
    proxy: {
      // 将请求代理到另一个服务器
      //   '/api': {
      //     target: 'http://rap2api.taobao.org/app/mock/314059/api', //这是你要跨域请求的地址前缀
      //     changeOrigin: true, //开启跨域
      //     rewrite: path => path.replace(/^\/api/, '') //去除前缀api
      //   },
      '/api': {
        target: 'http://localhost:8001/api', //这是你要跨域请求的地址前缀
        changeOrigin: true, //开启跨域
        rewrite: path => path.replace(/^\/api/, '') //去除前缀api
      }
    }
  }
```

安装依赖

```
npm i
```

运行项目

```
npm run dev
```
