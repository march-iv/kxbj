import Vue from 'vue'
import Router from 'vue-router'

// ------- 水果组件 -------
  import Apple from '@/components/Learn/fruit/apple'
  import Banana from '@/components/Learn/fruit/banana'
  import Cherry from '@/components/Learn/fruit/cherry'
  import Grape from '@/components/Learn/fruit/grape'
  import Melon from '@/components/Learn/fruit/melon'
  import Mango from '@/components/Learn/fruit/mango'
  import Orange from '@/components/Learn/fruit/orange'
  import Pear from '@/components/Learn/fruit/pear'
  import Strawberry from '@/components/Learn/fruit/strawberry'

const HHome = (resolve) => {
    import('@/components/Home').then((module) => {
        resolve(module)
    })
}

Vue.use(Router)
let routerInstance = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: () => import('@/Index')
        },

        /* ---------- 项目路由 ---------- */
        {
            path: "/xiangMu",
            component: () => import('@/components/As'),
            children: [
                {
                    path: "",
                    alias: 'Login',
                    component: () => import('@/components/account/Login')
                }, {
                    path: "Reg",
                    component: () => import('@/components/account/Reg')
                }, {
                    path: "Home",
                    component: () => import('@/components/Home')
                }, {
                    path: "Movie",
                    name: 'Movie',
                    component: () => import('@/components/Movie')
                }, {
                    path: "News",
                    name: 'News',
                    component: () => import('@/components/News')
                }, {
                    path: "Game",
                    name: 'Game',
                    component: () => import('@/components/Game')
                }, {
                    path: "Music",
                    component: () => import('@/components/Music')
                }, {
                    path: "Book",
                    component: () => import('@/components/Book')
                }, {
                    path: "Book/BookIn",
                    component: () => import('@/components/BookIn')
                }
            ]
        },

        /* --------- 实验室路由 --------- */
        {
            path: "/learn",
            component: () => import('@/components/Learn/Learn'),
            children: [
                // 👉 axios
                {
                    path: "axios",
                    name: "axios",
                    component: () => import('@/components/Learn/axios/ABC'),
                    children: [
                        {
                            path: 'get', alias: "",
                            component: () => import('@/components/Learn/axios/get')
                        }, {
                            path: 'post',
                            component: () => import('@/components/Learn/axios/post')
                        }
                    ]
                },

                // 👉 vue
                {
                    path: "vue",
                    name: "vue",
                    component: () => import('@/components/Learn/vue/ABC'),
                    children: [
                        {
                            path: 'slot', alias: "",    // slot 插槽
                            name: 'slot',
                            component: () => import('@/components/Learn/vue/slots')
                        }, {
                            path: 'data',       // 数据
                            component: () => import('@/components/Learn/vue/data')
                        }, {
                            path: 'computed',   // 计算属性
                            component: () => import('@/components/Learn/vue/computed')
                        }, {
                            path: 'watch',      // 侦听属性
                            component: () => import('@/components/Learn/vue/watch') 
                        }
                    ]
                },

                // 👉 vuex
                {
                    path: "vuex",
                    name: "vuex",
                    component: () => import('@/components/Learn/vuex/ABC'),
                    children: [
                        {
                            path: 'vuexA', alias: "",
                            component: () => import('@/components/Learn/vuex/vuexA')
                        }, {
                            path: 'vuexWrap',
                            component: () => import('@/components/Learn/vuex/vuexWrap')
                        }
                    ]
                },

                // 👉 router
                {
                    path: "router",
                    name: "router",
                    component: () => import('@/components/Learn/router/ABC'),
                    children: [
                        {
                            path: 'base', alias: "",
                            component: () => import('@/components/Learn/router/base')
                        }, {
                            path: 'blog',
                            component: () => import('@/components/Learn/router/blog')
                        }, {
                            path: 'CanShu',
                            name: 'canshu',
                            component: () => import('@/components/Learn/router/CanShu')
                        }, {
                            path: 'Rvx4',
                            component: () => import('@/components/Learn/router/Rvx4'),
                            children: [{
                                path: 'four',
                                components: {
                                    default: { template: `<div>默认的 router-view 容器 </div>` },
                                    apple: Apple,
                                    banana: Banana,
                                    cherry: Cherry
                                }
                            }]
                        }, {
                            path: 'music/:musicName',
                            name: 'yinyue',
                            component: () => import('@/components/Learn/router/YinYue')
                        }
                    ]
                },

                // 👉 zujian
                {
                    path: "zujian",
                    name: "zujian",
                    component: () => import('@/components/Learn/zujian/ABC'),
                    children: [
                        {
                            path: "base", alias: "",
                            component: () => import('@/components/Learn/zujian/base')
                        }, {
                            path: "x4",
                            component: () => import('@/components/Learn/zujian/x4')
                        }
                    ]
                },

                // 👉 echarts
                {
                    path: "echarts",
                    name: "echarts",
                    component: () => import('@/components/Learn/echarts/ABC'),
                    children: [
                        {
                            path: 'bar', alias: "",  // 柱形图
                            component: () => import('@/components/Learn/echarts/bar')
                        }, {
                            path: 'pie',    // 饼状图
                            component: () => import('@/components/Learn/echarts/pie')
                        }, {
                            path: 'line',    // 折现图
                            component: () => import('@/components/Learn/echarts/line')
                        }, {
                            path: 'scatter', // 散点图
                            component: () => import('@/components/Learn/echarts/scatter')
                        },  {
                            path: 'x3',     // 3系图
                            component: () => import('@/components/Learn/echarts/x3')
                        }, {
                            path: 'world',  // 世界地图
                            component: () => import('@/components/Learn/echarts/world')
                        }, {
                            path: 'china',  // 中国地图
                            component: () => import('@/components/Learn/echarts/china')
                        }, {
                            path: 'zuan',   // 下钻图
                            component: () => import('@/components/Learn/echarts/zuan')
                        }
                    ]
                },

                // 👉 element
                {
                    path: "element",
                    name: "element",
                    component: () => import('@/components/Learn/element/ABC'),
                    children: [
                        {
                            path: 'moving', alias: "", // 动态加载
                            component: () => import('@/components/Learn/element/moving')
                        }, {
                            path: 'lazy',   // 懒加载默认勾选
                            component: () => import('@/components/Learn/element/lazy')
                        }, {
                            path: 'needCreate',   // 按需创建级联
                            component: () => import('@/components/Learn/element/needCreate')
                        }, {
                            path: 'level1',   // 按需创建级联
                            component: () => import('@/components/Learn/element/level1')
                        }, {
                            path: 'backset',   // 多层级联回选
                            component: () => import('@/components/Learn/element/backset')
                        }, {
                            path: 'treeLazy',   // 树形控件，逐级请求
                            component: () => import('@/components/Learn/element/treeLazy')
                        }, {
                            path: 'note', // 随时记录
                            component: () => import('@/components/Learn/element/note')
                        }
                    ]
                },

                // 👉 iview
                {
                    path: "iview",
                    name: "iview",
                    component: () => import('@/components/Learn/iview/ABC'),
                    children: [
                        {
                            path: 'demo',
                            component: () => import('@/components/Learn/iview/demo')
                        }, {
                            path: 'selectKids', alias: "", // 子父级关联选择
                            component: () => import('@/components/Learn/iview/selectKids')
                        }, {
                            path: 'table',
                            component: () => import('@/components/Learn/iview/table')
                        }, {
                            path: 'upload', // 图片压缩和上传
                            component: () => import('@/components/Learn/iview/upload')
                        }, {
                            path: 'note', // 随时记录
                            component: () => import('@/components/Learn/iview/note')
                        }
                    ]
                },

                // 👉 photoswipe
                {
                    path: "photoswipe",
                    name: "photoswipe",
                    component: () => import('@/components/Learn/photoswipe/ABC'),
                    children: [
                        {
                            path: 'hdp', alias: "", // 幻灯片示例
                            component: () => import('@/components/Learn/photoswipe/photoswipe1')
                        }, {
                            path: 'hualang',    // 画廊示例
                            component: () => import('@/components/Learn/photoswipe/photoswipe2')
                        }
                    ]
                },

                // 👉 swiper
                {
                    path: "swiper",
                    name: "swiper",
                    component: () => import('@/components/Learn/swiper/ABC'),
                    children: [
                        {
                            path: 'banner',  alias: "", // banner 示例
                            component: () => import('@/components/Learn/swiper/swiper1')
                        }, {
                            path: 'actric',   // 滑动的文章示例
                            component: () => import('@/components/Learn/swiper/swiper2')
                        }
                    ]
                },

                // 👉 腾讯地图
                {
                    path: "map",
                    name: "map",
                    component: () => import('@/components/Learn/map/ABC'),
                    children: [
                        {
                            path: 'bdMap', alias: "",   // 百度地图
                            component: () => import('@/components/Learn/map/baidu/搜索选取')
                        }, {
                            path: 'qqMap',   // 腾讯地图
                            component: () => import('@/components/Learn/map/qq/搜索和选取')
                        }
                    ]
                },

                // 👉 编辑器
                {
                    path: "editor",
                    name: "editor",
                    component: () => import('@/components/Learn/editor/ABC'),
                    children: [
                        {
                            path: 'ueditor', alias: "",   // 百度编辑器
                            component: () => import('@/components/Learn/editor/ueditor')
                        }, {
                            path: 'wangEditor3',    // 王编辑器
                            component: () => import('@/components/Learn/editor/wangEditor3')
                        }, {
                            path: 'kindeditor',     // 类编辑器
                            component: () => import('@/components/Learn/editor/kindeditor')
                        }, {
                            path: 'simpleMDE',     // simpleMDE 编辑器
                            component: () => import('@/components/Learn/editor/simpleMDE')
                        }
                    ]
                },

                // 👉 其它小工具
                {
                    path: "widget",
                    name: "widget",
                    component: () => import('@/components/Learn/widget/ABC'),
                    children: [
                        {
                            path: 'qrcode', alias: "",   // 二维码
                            component: () => import('@/components/Learn/widget/qrcode')
                        }, {
                            path: 'clipboard', alias: "",   // 点击复制
                            component: () => import('@/components/Learn/widget/clipboard')
                        }
                    ]
                }
            ]
        }
    ]
})

// 在这里做全局路由拦截
routerInstance.beforeEach((to, from, next) => {
    return next()
})

export default routerInstance
