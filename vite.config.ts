import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy'

// 自定义组件name插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// API自动导入插件,如 ref reactive等api不需要手动引入
import AutoImport from 'unplugin-auto-import/vite'
// PC端/移动端适配方案
import postcssPxToViewport from 'postcss-px-to-viewport'
// vite打包性能优化之PWA离线存储技术
import { VitePWA } from 'vite-plugin-pwa'
// Element Plus按需引入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 使用svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'

const isProduction = process.env.NODE_ENV === 'production'
console.log('isProduction: ', isProduction)

// https://vitejs.dev/config/
export default defineConfig({
    // 项目根目录
    root: process.cwd(),
    // 在生产中服务时的基本公共路径
    base: isProduction ? './' : '',
    // 配置中指明将会把 serve 和 build 时的模式都覆盖掉,serve 时默认 'development'，build 时默认 'production'
    mode: 'development',
    // 静态资源服务的文件夹, 默认"public"
    publicDir: 'public',
    plugins: [
        vue({
            // web components 模式使用,需要以 .ce.vue 结尾才会开启模式
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.includes('custom-')
                }
            }
        }),
        vueJsx(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        vueSetupExtend(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            dts: 'src/auto-imports.d.ts',
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
            symbolId: 'icon-[dir]-[name]'
        }),
        VitePWA({
            manifest: false,
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /someInterface/i, // 接口缓存 此处填你想缓存的接口正则匹配
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'interface-cache'
                        }
                    },
                    {
                        urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'js-css-cache'
                        }
                    },
                    {
                        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache'
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        // 设置路径别名
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        // 引入文件时忽略的文件后缀
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                require('postcss-import'),
                postcssPxToViewport({
                    unitToConvert: 'px', // 需要转换的单位，默认为px
                    viewportWidth: 1920, // 设计稿的视口宽度
                    unitPrecision: 5, // 单位转换后保留的精度
                    propList: ['*'], // 要进行转换的属性列表，'*'表示匹配所有，'!'表示不转换
                    viewportUnit: 'vw', // 转换后的视口单位
                    fontViewportUnit: 'vw', // 转换后字体使用的视口单位
                    selectorBlackList: ['ignore-'], // 不进行转换的css选择器，继续使用原有单位，
                    minPixelValue: 1, // 设置最小的转换数值，默认值1，小于或等于1px则不进行转换
                    mediaQuery: false, //  设置媒体查询里的单位是否需要转换单位
                    replace: true, // 是否直接更换属性值，而不添加备用属性
                    exclude: [/node_modules/], // 忽略某些文件夹下的文件
                    include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
                    landscape: false, // 是否处理横屏情况
                    landscapeUnit: 'vw', // 横屏时使用的单位
                    landscapeWidth: 1920 // 横屏时使用的视口宽度
                })
            ]
        },
        // 引入全局变量 less
        preprocessorOptions: {
            less: {
                additionalData: `@import '@/styles/variables.less';`
            }
        }
    },
    server: {
        // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        host: '0.0.0.0',
        // 服务器端口号
        port: 9527,
        // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
        strictPort: false,
        // 是否自动打开浏览器
        open: false,
        // 是否开启 https
        https: false,
        // 自定义代理规则
        proxy: {
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                // 跨域
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        // 指定输出路径，默认'dist'
        outDir: 'dist',
        // 指定生成静态资源的存放路径(相对于build.outDir)
        assetsDir: 'assets',
        // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
        assetsInlineLimit: 4096,
        // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
        cssCodeSplit: true,
        // 构建后是否生成source map文件，默认false
        sourcemap: false,
        // 为true时，会生成manifest.json文件，用于后端集成
        manifest: false,
        // 生产环境时移除console,debugger,Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            },
            format: {
                /** 删除注释 */
                comments: false
            }
        }
    }
    // ssr: false,
})
