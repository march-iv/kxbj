<template>
	<div>
		<!--要添加的HTML元素-->
		<!-- 根元素，必须要有pswp类名 -->
		<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

			<!-- PhotoSwipe的背景，这是一个单独的元素，因为animating比rgba()快 -->
			<div class="pswp__bg"></div>

			<!-- Slides wrapper with overflow:hidden. -->
			<div class="pswp__scroll-wrap">

				<!-- 容纳幻灯片的容器。 PhotoSwipe在DOM中只保留3张幻灯片，以节省内存 -->
				<!-- 不要修改这3个pswp__item元素，稍后再添加数据 -->
				<div class="pswp__container">
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
				</div>

				<div class="pswp__ui pswp__ui--hidden"><!-- 默认的布局、按钮等元素，可以修改. -->
					<div class="pswp__top-bar"><!--顶部信息栏-->
						<div class="pswp__counter"></div>
						<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
						<button class="pswp__button pswp__button--share" title="Share"></button>
						<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
						<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
						<!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
						<!-- element will get class pswp__preloader--active when preloader is running -->
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div>
					</div>
					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
		           </button>
					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
		           </button>
					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min'
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

export default {
	props: {
		items: {
			type: Array,
			default: () => []
		},
		amend: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			options: {
				history: false,	// 关闭历史功能
				showAnimationDuration: 0,	// 关闭启动动画，因为这不是图像列，不知道从哪儿开始放大
				hideAnimationDuration: 0,
				errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">图像</a>加载失败</div>',	// 图像加载失败提示语
				showHideOpacity: false,	// 背景层淡入淡出
				shareButtons: [
					{id: 'weibo', label: '新浪微博', url: '当前链接是{{raw_image_url}}'},
					{id: 'weibo', label: '腾讯微博{{text}}', url: '{{image_url}'}],	// 分享按钮
				modal: false,	// photoswipe自定区域显示
				closeOnScroll: false,	// 关闭页面滚动，与photoswipe自定区域显示有关
				getDoubleTapZoom: function (isMouseClick, item) {
				    if (isMouseClick) {
				        return 1
				    } else {
				        // item.initialZoomLevel为幻灯片上图片未缩放时的大小与图片真实大小的比例
				        return item.initialZoomLevel < 0.7 ? 1 : 1.5;
				    }
				}
			}
		}
	},
	created: function () {
		// 合并对象，调用时修改配置参参数
		this.options = {...this.amend, ...this.options}
	},
	methods: {
		openSwipe: function () {
			var pswp;
			var pswpElement = document.querySelectorAll('.pswp')[0];
			pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.items, this.options);
			pswp.listen('updateScrollOffset', function (_offset) {
			    var r = pswp.template.getBoundingClientRect();
			    _offset.x += r.left;
			    _offset.y += r.top;
			});
			pswp.init();

			this.pswp = pswp;
		},
		prev: function () {		// 上一张
			this.pswp.prev()
		},
		next: function () {		// 下一张
			this.pswp.next()
		},
		zoomTo: function () {	// 手动缩放
			this.pswp.zoomTo(0.5, {
					x: this.pswp.viewportSize.x / 2,
					y: this.pswp.viewportSize.y / 2
				}, 300, false, function (now) {}
			)
		},
		addImg: function (img) {	// 添加图片
			this.items.push(img)
		}
	}
}
</script>

<style scoped></style>