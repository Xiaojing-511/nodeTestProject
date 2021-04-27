module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    devServer: {
        open: true,
        hot:true,
        proxy:
        {
            '/': {
                // 此处的写法，目的是为了 将 / 替换成 http://localhost:3000
                target: 'http://127.0.0.1:3000/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
            }
        }
    }
}