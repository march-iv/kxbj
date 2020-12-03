<template>
	<div>
		<div class="loaddiv loadA" :delay="delay" v-if="type === 'css3-A'">
			<div>
				<span></span>
				<p>加载中，请稍后</p>
			</div>
		</div>

		<div class="loaddiv loadE" :delay="delay" v-else-if="type === 'Rotate'">
			<div>
				<span></span>
				<p>loading...</p>
			</div>
		</div>

		<div class="loaddiv loadF" :delay="delay" v-else-if="type === 'css3-B'">
			<div>
				<span>
					<div class="rect1"></div>
				  	<div class="rect2"></div>
				  	<div class="rect3"></div>
				  	<div class="rect4"></div>
				  	<div class="rect5"></div>
			  	</span>
			  	<p>loading...</p>
			</div>
		</div>

		<div class="loaddiv loadH" :delay="delay" v-else-if="type === 'Radar'">
			<div>
				<span></span>
				<p>loading...</p>
			</div>
		</div>

		<div class="loaddiv loadimg" :delay="delay" v-else-if="type === 'Gears'">
			<div>
				<span>
					<img src="/static/icon/load-gears.svg" :style="{width: imgSize}" />
				</span>
			</div>
		</div>

		<div class="loaddiv loadimg" :delay="delay" v-else-if="type === 'Hourglass'">
			<div>
				<span>
					<img src="/static/icon/load-hourglass.svg" :style="{width: imgSize}" />
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'Rotate'
		},
		delay: {
			type: Boolean,
			default: true
		},
		imgSize: {
			type: String,
			default: '80px'
		}
	},
	data () {
		return {}
	}
}
</script>

<style scoped>
.loaddiv {
	position: absolute;
	z-index: 9;
	top: 0; left: 0; bottom: 0;
	width: 100%;
	text-align: center;
	background-color: rgba(255,255,255,0.8);
}
.loaddiv:before {
	content: '';
	display: inline-block;
	vertical-align: middle;
	height: 100%; width: 0;
}
.loaddiv > div {	/*--wrap，里面是动画容器和文字--*/
	position: relative;
	display: inline-block;
	vertical-align: middle;
}
.loaddiv span {		/*--动画容器--*/
	position: relative;
	display: inline-block;
}
.loaddiv span img {	/*--img动画--*/
	max-width: 120px;
}
.loaddiv p {		/*--文字--*/
	margin-top: 4px;
	color: #777;
	text-shadow: 1px 1px 5px rgba(0,0,0,.2);
}
.loaddiv[delay] {
	opacity: 0;
	animation: loaddelay 200ms linear 1500ms forwards;
	-webkit-animation: loaddelay 200ms linear 1500ms forwards;
}
@keyframes loaddelay {
	from{opacity: 0;}
	to{opacity: 1;}
}
@-webkit-keyframes loaddelay {
	from{opacity: 0;}
	to{opacity: 1;}
}
/* ----- loadA ----- */
.loadA span {
	width: 3em; height: 2em;
	background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
	background-repeat: no-repeat;
	background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
	animation: audioWave 1.5s linear infinite;
}
@keyframes audioWave {
	25% {
		background: linear-gradient(#3498db, #3498db) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
		background-repeat: no-repeat;
		background-size: 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
	}
	37.5% {
		background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#3498db, #3498db) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
		background-repeat: no-repeat;
		background-size: 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
	}
	50% {
		background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#3498db, #3498db) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
		background-repeat: no-repeat;
		background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em;
	}
	62.5% {
		background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#3498db, #3498db) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
		background-repeat: no-repeat;
		background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em;
	}
	75% {
		background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#3498db, #3498db) 2.5em 50%;
		background-repeat: no-repeat;
		background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em;
	}
}

/* ----- loadE ----- */
.loadE span {
	width: 30px; height: 30px;
	border: 2px solid transparent;
    border-left: 2px solid #BBB;
	border-radius: 50%;
	transition: none;
    animation: rotation infinite linear 0.6s;
}
@keyframes rotation {
	0% { transform: rotateZ(0deg); }
	100% { transform: rotateZ(360deg); }
}

/* ----- loadF ----- */
.loadF span {
	width: 40px; height: 20px;
	font-size: 10px;
}
.loadF span > div {
  background-color: #67CF22;
  height: 100%; width: 3px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.loadF .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.loadF .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
.loadF .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.loadF .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}
@keyframes stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

/* ----- loadH ----- */
.loadH span {
	width: 60px; height: 60px;
}
.loadH span:before, .loadH span:after {
	content: '';
	position: absolute;
	top: 0; left: 0;
	width: 100%; height: 100%;
	border-radius: 50%;
	background-color: #67CF22;
	opacity: 0.8;
	animation: bounceH 2.0s infinite ease-in-out;
}
.loadH span:after {
	animation-delay: -1.0s;
}
@keyframes bounceH {
	0% {  transform: scale(0.0); opacity: 0.8; }
	100% {  transform: scale(1); opacity: 0; }
}
</style>