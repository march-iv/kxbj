<template>
    <div class="wrap" page="Index.vue">
        <div class="cont">
            <ul class="zuo">
                <li sk v-if="!menu.left" @click="menu.left = true">
                    <div>
                        <i class="iconfont">&#xebd1;</i><br><br>
                        <p>项目</p>
                    </div>
                </li>
                <li v-else style="align-items: stretch" @click.self="menu.left = false">
                    <router-link db to="/xiangMu/Reg">注册</router-link>
                    <router-link db to="/xiangMu/Login">登录</router-link>
                    <router-link in to="/xiangMu/Home">首页</router-link>
                    <router-link dg to="/xiangMu/Movie">影视</router-link>
                    <router-link dg to="/xiangMu/News">新闻</router-link>
                    <router-link dg to="/xiangMu/Game">游戏</router-link>
                    <router-link dg to="/xiangMu/Music">音乐</router-link>
                    <router-link dg to="/xiangMu/Book">图书</router-link>
                    <!-- <router-link in to="/xiangMu/sell">商城</router-link> -->
                    <a href="javascript:;" in @click.stop="menu.left = false">返回</a>
                </li>
            </ul>

            <ul class="you" setBar>
                <li aq v-if="!menu.right" @click="menu.right = true">
                    <div>
                        <i class="iconfont">&#xebfb;</i><br><br>
                        <p>实验室</p>
                    </div>
                </li>
                <li v-else @click.self="menu.right = false"
                     style="align-items: flex-start; align-content: flex-start;">
                    <router-link cb to="/learn/axios/get">axios</router-link>
                    <router-link cb to="/learn/vue">vue</router-link>
                    <router-link cb to="/learn/vuex">vuex</router-link>
                    <router-link cb to="/learn/router">router</router-link>
                    <router-link cb to="/learn/zujian">组件</router-link>
                    <router-link bw to="/learn/element">element</router-link>
                    <router-link bw to="/learn/iview">iview</router-link>
                    <router-link bw to="/learn/echarts">Echarts</router-link>
                    <router-link bw to="/learn/photoswipe">photoswipe</router-link>
                    <router-link bw to="/learn/swiper">swiper</router-link>
                    <router-link bw to="/learn/map">地图</router-link>
                    <router-link bw to="/learn/editor">编辑器</router-link>
                    <router-link bw to="/learn/widget">npm</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            menu: {
                left: false,
                right: false
            }
        }
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        go () {
            this.$router.go(1)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap .cont {
    position: relative;
    width: 800px; height: 500px;
    border: 1px solid #ddd;
    display: flex;

    ul {
        height: 100%;
        flex: 1 1 50%;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
    }
    ul li {
        flex: 1 1 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
    }
    ul li i {
        font-size: 40px;
        transition: all 100ms linear;
    }
    ul li p {
        font-size: 30px;
        font-family: 'Source Han Sans CN';
        transition: all 100ms linear;
    }
    ul li:hover i,
    ul li:hover p {
        font-size: 40px;
        color: blue;
    }
    ul li > a {
        flex: 1 1 26%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        color: #fff;
        font-size: 20px;
        font-family: 'Source Han Sans CN';
        box-sizing: border-box;
        animation: huaban 160ms linear forwards;
    }
    @keyframes huaban {
        0% { transform: scale(0.95); opacity: 0.5 }
        50% { transform: scale(1.04); }
        100% { transform: scale(1); opacity: 1 }
    }
    ul.you li > a {
        height: 100px;
    }
}
</style>
