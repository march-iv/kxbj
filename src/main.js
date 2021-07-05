import Vue from 'vue'			// 完整写法: import Vue from "../node_modules/vue/dist/vue.js"
import App from './App'			// 完整写法: import App from './App.vue'
import router from './router'	// 完整写法: import router from './route.js'
import store from './vuex'

// 引入公共样式
import "@/assets/css/clear.css"
import "@/assets/css/page.css"

// 引入其它 npm 包
import animate from 'animate.css'	// 一种动画插件，只是css

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ViewUI);
Vue.use(ElementUI);

// import echarts from 'echarts'

// 全局注册组件
// import Space from "./components/Space"
// Vue.component("space", Space)

Vue.config.productionTip = false
Vue.config.silent = false
Vue.config.devtools = true	// 启用vue devtools调试功能

// import VueLazyLoad from 'vue-lazyload'	// 延迟加载
// import BaiduMap from 'vue-baidu-map'	// 百度地图
// import store from './store'
// Vue.use(VueLazyLoad, { loading: require('common/image/lazy.png') })
// Vue.use(BaiduMap, { ak: 'OOQlzYw1GOMkx3wkiaUsCjeULORSNpxT' })

Vue.prototype.allHints = function (str) {
	var obj = document.querySelector(".allHints");

	if (obj.style.display !== 'block') {
		obj.querySelector("span").innerHTML = str;
		obj.style.display = 'block';
		setTimeout(function () {
			obj.style.display = 'none';
		}, 1500);
	}
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },  // 注册引入的组件 App
  template: '<App/>'    // 是 <App></App> 的缩写，意思就是把引入的 App.vue 渲染到 el 对应的元素里，这里是 #app
})