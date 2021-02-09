# vue-cli-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

问题： node服务运行在localhost:3000端口，vue运行在localhost:8080端口，不同端口存在跨域
解决：使用反向代理处理。

在src同级目录下创建文件vue.config.js 
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    devServer: {
        proxy:
        {
            '/': {
                // 此处的写法，目的是为了 将 /api 替换成 http://localhost:3000
                target: 'http://127.0.0.1:3000',
                // 允许跨域
                changeOrigin: true,
                ws: true,
            }
        }
    }
}
注意： mac下 target: 'http://localhost:3000',不可以 需使用 target: 'http://127.0.0.1:3000',

