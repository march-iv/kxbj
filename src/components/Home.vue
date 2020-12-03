<template>
	<div page="Home.vue">
		<div class="banner">
			<Banner :usetype="'slot'" :amend="peizhi">
				<div class="swiper-slide movie">
					<dl>
						<dd :style="{left: '8px', top: '8px', backgroundImage: 'url(/static/images/movie/coco1.jpg)'}"></dd>
						<dd :style="{left: '53px', top: '22px', zIndex: 2, backgroundImage: 'url(/static/images/movie/coco2.jpg)'}"></dd>
						<dd :style="{left: '98px', top: '8px', backgroundImage: 'url(/static/images/movie/coco3.jpg)'}"></dd>
					</dl>
					<div class="info">
						<h4>寻梦环游记</h4>
						<p>动画 / 美国 / 105分钟</p>
						<h5>
							评分：
							<div class="start">
								<span class="is" style="width: 90%"></span>
							</div>
						</h5>
						<p class="des">简介：在一场意外中，米格尔竟然穿越到了亡灵国度之中, 该怎么回家？</p>
						<a href="https://movie.douban.com/subject/20495023/" target="_blank" class="btn">我要看 !</a>
					</div>
				</div>
				<div class="swiper-slide news">
					<a href="https://www.nasa.gov/press-release/nasa-marshall-to-lead-artemis-program-s-human-lunar-lander-development" target="_blank" style="background-image: url(http://n.sinaimg.cn/sina_vr/transform/53/w550h303/20190514/ad8d-hwzkfpu0348008.jpg)">
						<span>NASA Marshall 将领导开发建造「Artemis计划」人类月球着陆器</span>
					</a>
				</div>
				<div class="swiper-slide music">
					<div class="left">
						<span class="cover" :style="{animationPlayState: musicPaused ? 'paused' : 'running'}" style="background-image: url(http://pic.xiami.net/images/album/img10/279318510/18793235821379323593.jpg)"></span>
					</div>
					<div class="info">
						<h4>🎵 Gravity 地心引力</h4>
						<h5>- Original Motion Picture Soundtrack</h5>
						<h5>- Steven Price</h5>
						<div class="player">
							<div class="btn">
								<!-- <audio controls="controls">
									<source src="/static/media/shibei.mp3" type="audio/mp3">
								</audio> -->
								<span><i class="iconfont">&#xe61b;</i></span>
								<span @click="musicplay" v-if="musicPaused || musicPos === '0%'"><i class="iconfont">&#xe968;</i></span>
								<span @click="musicplay" v-else><i class="iconfont">&#xe607;</i></span>
								<span><i class="iconfont">&#xeca8;</i></span>
							</div>
							<div class="bar">
								<span class="pos" :style="{width: musicPos}"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-slide book" :style="{backgroundImage: 'url(/static/images/Planetary-engine.jpg)'}">
					<div class="cont">
						<p>"所有的人都用泪眼探望着老师指的方向，星空在泪水中扭曲抖动，惟有那个星星是不动的，那是黑夜大海狂浪中远方陆地的灯塔，那是冰雪荒原中快要冻死的孤独旅人前方隐现的火光，那是我们心中的太阳，是人类在未来一百代人的苦海中惟一的希望和支撑……"
						<router-link to="/xiangMu/Book/BookIn"  class="link" style="color: lightgreen">点我阅读《流浪地球》</router-link>
						</p>
					</div>
				</div>
				<div class="swiper-slide game">
					<div class="cover" style="background-image: url(/static/images/game/eve1.jpg)"></div>
					<div class="info">
						<dl>
							<dd style="background-image: url(/static/images/game/eve2.jpg)"></dd>
							<dd style="background-image: url(/static/images/game/eve3.jpg)"></dd>
							<dd style="background-image: url(/static/images/game/eve4.jpg)"></dd>
							<dd style="background-image: url(/static/images/game/eve5.jpg)"></dd>
						</dl>
						<p style="position: relative; line-height: 30px; text-align: center;perspective:  800px;">
							这宇宙，属于你！
							<a href="http://evepc.163.com/" target="_blank" class="btn">我要玩 !</a>
						</p>
					</div>
				</div>
				<div class="swiper-slide mall">
					<a href="https://market.douban.com/campaign/umbrella?index=6&r=banner&utm_medium=app&utm_source=douban&utm_campaign=douban_frodo_default" target="_blank"></a>
				</div>
			</Banner>
		</div>

		<!-- 菜单 -->
		<dl class="menu">
			<router-link tag="dd" to="/xiangMu/Movie">
				<span><i class="iconfont" style="color: #1983b3">&#xe601;</i></span>
				<p>影片</p>
			</router-link>
			<router-link tag="dd" to="/xiangMu/News">
				<span><i class="iconfont" style="color: blueviolet">&#xe612;</i></span>
				<p>新闻</p>
			</router-link>
			<router-link tag="dd" to="/xiangMu/Music">
				<span><i class="iconfont" style="color: green">&#xe604;</i></span>
				<p>音乐</p>
			</router-link>
			<router-link tag="dd" to="/xiangMu/Book">
				<span><i class="iconfont" style="color: blue">&#xe663;</i></span>
				<p>图书</p>
			</router-link>
			<router-link tag="dd" to="/xiangMu/Game">
				<span><i class="iconfont" style="color: lightcoral;">&#xe613;</i></span>
				<p>游戏</p>
			</router-link>
		</dl>

		<!-- 影视 -->
		<div class="movies">
			<div class="tap">
				<label>
					<input type="radio" checked value="1" v-model="moviestap" name="moviestap">
					<span>正在热映</span>
				</label>
				<label>
					<input type="radio" value="2" v-model="moviestap" name="moviestap">
					<span>即将上映</span>
				</label>
				<router-link to="/xiangMu/Movie">全部 <i class="iconfont">&#xe620;</i></router-link>
			</div>
			<ul v-show="moviestap === '1'">
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/哪吒之魔童降世.jpg)'}"></div>
					<h5>哪吒之魔童降世 <span>9.0</span></h5>
					<div class="start">
						<span class="is" style="width: 90%"></span>
					</div>
				</li>
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/上海堡垒.jpg)'}"></div>
					<h5>上海堡垒 <span>3.3</span></h5>
					<div class="start">
						<span class="is" style="width: 33%"></span>
					</div>
				</li>
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/绿皮书.jpg)'}"></div>
					<h5>绿皮书 <span>8.9</span></h5>
					<div class="start">
						<span class="is" style="width: 89%"></span>
					</div>
				</li>
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/疾速备战.jpg)'}"></div>
					<h5>疾速备战 <span>8.0</span></h5>
					<div class="start">
						<span class="is" style="width: 80%"></span>
					</div>
				</li>
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/沦落人.jpg)'}"></div>
					<h5>沦落人<span>8.2</span></h5>
					<div class="start">
						<span class="is" style="width: 82%"></span>
					</div>
				</li>
				<li>
					<div class="cover" :style="{backgroundImage: 'url(/static/images/movie/流浪地球.jpg)'}"></div>
					<h5>流浪地球<span>7.9</span></h5>
					<div class="start">
						<span class="is" style="width: 79%"></span>
					</div>
				</li>
			</ul>
			<ul v-show="moviestap === '2'">
				<Load :type="'css3-B'"></Load>
			</ul>
		</div>

		<!-- 新闻 -->
		<div class="Newss">
			<div class="tap">
				<label>
					<input type="radio" checked value="1" v-model="newstap" name="newstap">
					<span>天文</span>
				</label>
				<label>
					<input type="radio" value="2" v-model="newstap" name="newstap">
					<span>航天</span>
				</label>
				<label>
					<input type="radio" value="3" v-model="newstap" name="newstap">
					<span>科技</span>
				</label>
				<router-link to="/xiangMu/News">全部 <i class="iconfont">&#xe620;</i></router-link>
			</div>
			<ul v-show="newstap === '1'">
				<div class="zt">
					<a href="https://hubblesite.org/contents/media/images/2019/35/4548-Image" target="_blank" :style="{backgroundImage: 'url(/static/images/news/NGC-3147.jpg)'}">
						<span>NGC 3147 中心黑洞</span>
					</a>
					<a href="https://www.nasa.gov/press-release/nasa-marshall-to-lead-artemis-program-s-human-lunar-lander-development/" target="_blank" :style="{backgroundImage: 'url(/static/images/news/Artemis.jpg)'}">
						<span>Artemis 计划登陆器</span>
					</a>
				</div>
				<li>
					<a target="_blank" href="https://exoplanets.nasa.gov/life-and-death/intro/">
						<span>【行星】行星系统的生死</span>
						<span>3小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://exoplanets.nasa.gov/news/1481/new-clues-to-compositions-of-trappist-1-planets/">
						<span>【行星】TRAPPIST-1行星组成的新线索</span>
						<span>8小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://hubblesite.org/contents/news-releases/2019/news-2019-36">
						<span>【哈勃】哈勃望远镜最新拍摄的木星照片</span>
						<span>3天前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://hubblesite.org/contents/news-releases/2019/news-2019-28">
						<span>【哈勃】新的哈勃恒定测量增加了宇宙膨胀率之谜</span>
						<span>3天前</span>
					</a>
				</li>
			</ul>
			<ul v-show="newstap === '2'">
				<li>
					<a target="_blank" href="https://exoplanets.nasa.gov/tess/">
						<span>【探索】探索美国宇航局最新的行星猎人TESS</span>
						<span>1小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.nasa.gov/mission_pages/juno/main/index.html">
						<span>【探索】Juno - 对木星的使命</span>
						<span>1小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.nasa.gov/mission_pages/msl/index.html">
						<span>【探索】好奇号火星漫游者</span>
						<span>3小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.nasa.gov/press-release/nasa-television-to-broadcast-sixth-meeting-of-the-national-space-council">
						<span>【NASA】美国宇航局电视台播出国家空间委员会第六次会议</span>
						<span>8小时前</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="https://www.nasa.gov/specials/moon2mars/">
						<span>【NASA】我们要前往月球并留下：探索月球到火星</span>
						<span>昨天</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="http://www.cnsa.gov.cn/n6759533/c6807099/content.html">
						<span>【CNSA】嫦娥四号着陆器和“玉兔二号”巡视器进入第八月夜</span>
						<span>前天</span>
					</a>
				</li>
				<li>
					<a target="_blank" href="http://www.cnsa.gov.cn/n6758824/n6759219/c6807042/content.html">
						<span>【CNSA】「中国天眼」将建扩展阵 为寻找地外生命“做功课”</span>
						<span>前天</span>
					</a>
				</li>
			</ul>
			<ul  v-show="newstap === '3'">
				<Load :type="'css3-B'"></Load>
			</ul>
		</div>

		<!-- 音乐 -->
		<div class="musics">
			<div class="tap">
				<label>
					<input type="radio" checked value="1" v-model="musictap" name="musictap">
					<span>音乐</span>
				</label>
				<label>
					<input type="radio" value="2" v-model="musictap" name="musictap">
					<span>分类</span>
				</label>
				<label>
					<input type="radio" value="3" v-model="musictap" name="musictap">
					<span>电台</span>
				</label>
				<label>
					<input type="radio" value="4" v-model="musictap" name="musictap">
					<span>随便听听</span>
				</label>
				<router-link to="/xiangMu/Music">全部 <i class="iconfont">&#xe620;</i></router-link>
			</div>
			<ul class="top" v-show="musictap === '1'">
				<li ws>
					<div><i class="iconfont">&#xec61;</i></div>
					<div :style="{backgroundImage: 'url(/static/images/music/Spring-In-Pink.jpg)'}"></div>
					<div>Spring in pink</div>
					<div>何真真</div>
					<div>02:50</div>
				</li>
				<li>
					<div><i class="iconfont">&#xec61;</i></div>
					<div :style="{backgroundImage: 'url(/static/images/music/late-In-Autumn.jpg)'}"></div>
					<div>Late in autumn</div>
					<div>八木沼悟志</div>
					<div>06:09</div>
				</li>
				<li ws>
					<div><i class="iconfont">&#xec61;</i></div>
					<div :style="{backgroundImage: 'url(/static/images/music/The-Sound-Of-The-Mountains.jpg)'}"></div>
					<div>The Sound Of The Mountains</div>
					<div>Milan Records</div>
					<div>02:01</div>
				</li>
				<li>
					<div><i class="iconfont">&#xec61;</i></div>
					<div :style="{backgroundImage: 'url(/static/images/music/Heros-Theme.jpg)'}"></div>
					<div>The Sound Of The Mountains</div>
					<div>Sumthing Else</div>
					<div>03:07</div>
				</li>
				<li ws>
					<div><i class="iconfont">&#xec61;</i></div>
					<div :style="{backgroundImage: 'url(/static/images/music/小螺号.jpg)'}"></div>
					<div>小螺号</div>
					<div>包晗言</div>
					<div>01:31</div>
				</li>
			</ul>
			<ul v-show="musictap === '2'">
				<div class="leibie">
					<a tt href="https://music.163.com/#/discover/playlist/?cat=流行" target="_blank">流行</a>
					<a lg href="https://music.163.com/#/discover/playlist/?cat=摇滚" target="_blank">摇滚</a>
					<a ws href="https://music.163.com/#/discover/playlist/?cat=古典" target="_blank">古典</a>
					<a sk href="https://music.163.com/#/discover/playlist/?cat=轻音乐" target="_blank">轻音乐</a>
					<a wt href="https://music.163.com/#/discover/playlist/?cat=独立" target="_blank">独立</a>
					<a tt href="https://music.163.com/#/discover/playlist/?cat=民谣" target="_blank">民谣</a>
					<a si href="https://music.163.com/#/discover/playlist/?cat=舞曲" target="_blank">舞曲</a>
					<a le href="https://music.163.com/#/discover/playlist/?cat=儿歌" target="_blank">儿歌</a>
				</div>
			</ul>
			<ul v-show="musictap === '3'">
				<Empty :tip="'什么电台都没有看到'"></Empty>
			</ul>
			<ul v-show="musictap === '4'">
				<Empty :tip="'什么都没有，是空的'"></Empty>
			</ul>
		</div>

		<!-- 游戏 -->
		<div class="games">
			<div class="tap">
				<label>
					<input type="radio" checked value="1" v-model="gametap" name="gametap">
					<span>热销游戏</span>
				</label>
				<label>
					<input type="radio" value="2" v-model="gametap" name="gametap">
					<span>折扣</span>
				</label>
				<router-link to="/xiangMu/Game">全部 <i class="iconfont">&#xe620;</i></router-link>
			</div>
			<div class="list" v-show="gametap === '1'">
				<a target="_blank" href="https://store.steampowered.com/app/434650/Lost_Castle/?snr=1_4_4__139_1" style="background-image: url(/static/images/game/失落城堡.jpg)"></a>
				<a target="_blank" href="https://store.steampowered.com/app/275850/No_Mans_Sky/?snr=1_4_4__139_1" style="background-image: url(/static/images/game/无人之地.jpg)"></a>
				<a target="_blank" href="https://store.steampowered.com/app/942970/Unheard/?snr=1_4_4__139_1" style="background-image: url(/static/images/game/疑案追声.jpg)"></a>
				<a target="_blank" href="https://store.steampowered.com/app/220200/Kerbal_Space_Program/?snr=1_4_4__139_1" style="background-image: url(/static/images/game/坎巴拉太空计划.jpg)"></a>
			</div>
			<div class="list" v-show="gametap === '2'">
				<Empty :tip="'没有折扣 !'"></Empty>
			</div>
			<div class="fenlei">
				<a href="https://store.steampowered.com/tags/zh-cn/独立/" target="_blank" dg>独立</a>
				<a href="https://store.steampowered.com/tags/zh-cn/模拟/" target="_blank" cb>模拟</a>
				<a href="https://store.steampowered.com/tags/zh-cn/竞速/" target="_blank" in>竞速</a>
				<a href="https://store.steampowered.com/tags/zh-cn/冒险/" target="_blank" db>冒险</a>
			</div>
			<br>
		</div>
	</div>
</template>

<script>
import Banner from '@/components/plug/swiper/banner'
import Load from '@/components/common/load'
import Empty from '@/components/common/empty'

export default {
	data () {
		return {
			peizhi: {
				loop: true,
				autoplay: false,
				pagination: {
					bulletClass: 'swiper-bullet',
					bulletActiveClass: 'swiper-bullet-active',
					hideOnClick: true
				}
			},

			moviestap: "1",
			newstap: "1",
			gametap: "1",
			musictap: "1",

			timer: null,
			musicPos: 0,
			musicPaused: true
		}
	},
	components: { Banner, Load, Empty },
	methods: {
		musicplay: function () {
			if (this.bannerMusic.paused) {
				this.bannerMusic.play()
				this.musicPaused = false
				this.timer = setInterval(() => {
					this.musicPos = this.bannerMusic.currentTime / this.bannerMusic.duration * 100 + '%';
					if (this.musicPos === '100%') {
						clearInterval(this.timer)
						this.musicPos = '0%'
						this.musicPaused = true
					}
				}, 500)
			} else {
				clearInterval(this.timer)
				this.bannerMusic.pause()
				this.musicPaused = true
			}
		}
	},
	mounted: function () {
		this.bannerMusic = new Audio('/static/media/Steven Price - Gravity.mp3');
		this.bannerMusic.load();

		document.querySelector(".game dl").addEventListener("click", (el, event) => {
			let img = el.target.getAttribute("style")
			document.querySelector(".game .cover").setAttribute("style", img)
		});
	}
}
</script>

<style scoped>
@import url("../assets/css/home.css");
</style>