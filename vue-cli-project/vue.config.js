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