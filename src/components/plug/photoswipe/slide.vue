<template>
	<div>
		<!-- <img src="../../Learn/plug/photoswipe/Img/bigImg01.jpg"> -->
		<div class="my-gallery">
			<figure>
				<a href="http://wx2.sinaimg.cn/large/67c53c97gy1ftbfw2cnlvj22bc1jke81.jpg">
					<img src="https://wx2.sinaimg.cn/mw1024/67c53c97gy1ftbfw2cnlvj22bc1jke81.jpg" alt="Image description" />
				</a>
				<figcaption itemprop="caption description">Image caption 1 </figcaption>
			</figure>
			<figure v-for="(v, idx) in items" :key="idx">
				<a :href="v.big"> <img :src="v.small"> </a>
				<figcaption itemprop="caption description">{{v.des}}</figcaption>
			</figure>
		</div>

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
		}
	},
	data () {
		return {
			options: {}
		}
	},
	created: function () { },
	mounted () {
		var as = document.querySelectorAll(".main a");
		as.forEach((v, i, a) => {
			let img = new Image();
				img.src = v.getAttribute("href")
				img.onload = function () {
					v.setAttribute("data-size", img.naturalWidth + 'x' + img.naturalHeight)
				}

			if (i === as.length - 1) {
				setTimeout(() => { this.pswp() }, 200)
			}
		})
	},
	methods: {
		pswp: function () {
			var pswp;
			var initPhotoSwipeFromDOM = function (gallerySelector) {
			    var parseThumbnailElements = function (el) {
			    	// 解析缩略图元素,返回items，给插件提供图像列表,参数el是类名为.my-gallery的dom
			        var thumbElements = el.childNodes,
			            numNodes = thumbElements.length,
			            items = [],		// 将要传给photoswipe的参数
			            figureEl,
			            linkEl,
			            size,
			            item;
			        for (var i = 0; i < numNodes; i++) {
			            figureEl = thumbElements[i]; // <figure> element
			            if (figureEl.nodeType !== 1) {
			                continue;
			            }
			            linkEl = figureEl.children[0]; // <a> element
			            size = linkEl.getAttribute('data-size').split('x');
			            item = {
			                src: linkEl.getAttribute('href'),
			                w: parseInt(size[0], 10),
			                h: parseInt(size[1], 10)
			            };
			            if (figureEl.children.length > 1) {
			            	// <figcaption> content
			                item.title = figureEl.children[1].innerHTML; 
			            }
			            if (linkEl.children.length > 0) {
			            	// <img> thumbnail element, retrieving thumbnail url
			                item.msrc = linkEl.children[0].getAttribute('src');
			            } 
			            item.el = figureEl; // save link to element for getThumbBoundsFn
			            items.push(item);
			        }
			        return items;
			    };
			    
			    var closest = function closest (el, fn) {    // 找到最近的父元素
			        return el && (fn(el) ? el : closest(el.parentNode, fn));
			    };
			    
			    var onThumbnailsClick = function (e) {       // 当用户点击缩略图时触发
			        e = e || window.event;
			        e.preventDefault ? e.preventDefault() : e.returnValue = false;
			        var eTarget = e.target || e.srcElement;

			        var clickedListItem = closest(eTarget, function (el) {   // find root element of slide
			            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			        });
			        if (!clickedListItem) {
			            return;
			        }
			        var clickedGallery = clickedListItem.parentNode,
			            childNodes = clickedListItem.parentNode.childNodes,
			            numChildNodes = childNodes.length,
			            nodeIndex = 0,
			            index;
			        for (var i = 0; i < numChildNodes; i++) {
			            if (childNodes[i].nodeType !== 1) { 
			                continue; 
			            }
			            if (childNodes[i] === clickedListItem) {
			                index = nodeIndex;
			                break;
			            }
			            nodeIndex++;
			        }
			        if (index >= 0) {
			            openPhotoSwipe(index, clickedGallery);
			        }
			        return false;
			    };
			    
			    var photoswipeParseHash = function () {      // 解析散列导航
			        var hash = window.location.hash.substring(1),
			        params = {};
			        if (hash.length < 5) {
			            return params;
			        }
			        var vars = hash.split('&');
			        for (var i = 0; i < vars.length; i++) {
			            if (!vars[i]) {
			                continue;
			            }
			            var pair = vars[i].split('=');  
			            if (pair.length < 2) {
			                continue;
			            }           
			            params[pair[0]] = pair[1];
			        }
			        if (params.gid) {
			            params.gid = parseInt(params.gid, 10);
			        }
			        return params;
			    };
			    
			    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
			        var pswpElement = document.querySelectorAll('.pswp')[0], pswp, options, items;
			        
			        items = parseThumbnailElements(galleryElement);
			        
			        options = {
			            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">图像</a>加载失败</div>',
			            showAnimationDuration: 400,
			            hideAnimationDuration: 400,
			            getThumbBoundsFn: function (index) {
			            	// 图片从缩略图所在的位置开始滑出来并放大，用于内联幻灯片
			            	// 找到幻灯片图片img dom对象
			                var thumbnail = items[index].el.getElementsByTagName('img')[0],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                // rect包含了缩略图的宽度，高度，坐标的信息
			                rect = thumbnail.getBoundingClientRect();
			                
			                // return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};     // 全屏显示
			                
			                // 内联显示
			                rect = {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
			                var templateBounds = pswpElement.parentElement.getBoundingClientRect();
			                rect.x -= templateBounds.left;
			                rect.y -= templateBounds.top;
			                return rect;
			            },
			            modal: false,   // 为false表示非全屏显示
			            closeOnScroll: false
			            
			        };
			        if (fromURL) {
			            if (options.galleryPIDs) {
			                for (var j = 0; j < items.length; j++) {
			                    if (items[j].pid === index) {
			                        options.index = j;
			                        break;
			                    }
			                }
			            } else {
			                options.index = parseInt(index, 10) - 1;
			            }
			        } else {
			            options.index = parseInt(index, 10);
			        }
			        if (isNaN(options.index)) {
			            return;
			        }
			        if (disableAnimation) {
			            options.showAnimationDuration = 0;
			        }
			        options.showHideOpacity = 0
			        
			        pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);  // 创建实例
			        
			        /* -----监听事件start----- */
			        pswp.listen('updateScrollOffset', function (_offset) {   // 图片放大以点击的位置为中心，用于内联幻灯片
			            var r = pswp.template.getBoundingClientRect();
			            _offset.x += r.left;
			            _offset.y += r.top;
			        });
			        /* -----监听事件end----- */
			        
			        pswp.init();    // 启动photoswipe！
			    };
			    
			    var galleryElements = document.querySelectorAll(gallerySelector);
			    for (var i = 0, l = galleryElements.length; i < l; i++) {
			        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			        galleryElements[i].onclick = onThumbnailsClick;
			    }
			    var hashData = photoswipeParseHash();
			    if (hashData.pid && hashData.gid) {
			        openPhotoSwipe(hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true);
			    }
			};

			initPhotoSwipeFromDOM('.my-gallery');
		}
	}
}
</script>

<style scoped>
.pswp__zoom-wrap {
	transition: transform 400ms cubic-bezier(0.4, 0, 0.22, 1);
}
.pswp__bg {
	transition: opacity 400ms cubic-bezier(0.4, 0, 0.22, 1);
}
.pswp--animate_opacity {
	transition: opacity 400ms cubic-bezier(0.4, 0, 0.22, 1); 
}
.my-gallery {
	width: 100%;
	float: left;
}
.my-gallery img {
	width: 100%;
	height: auto;
}
.my-gallery figure {
	display: block;
	float: left;
	margin: 0 5px 5px 0;
	width: 150px;
	text-align: center;
}
.my-gallery a {
	display: block;
	overflow: hidden;
	padding: 10px;
	min-height: 100px;
}
.my-gallery figcaption {
	/* display: none; */
}
</style>