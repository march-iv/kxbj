<template>
	<div>
		<i class="iconfont" :class="icon" :style="{fontSize: iconsize, color: iconcolor}"></i>
	</div>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: 'iconcaomei1'
		},
		iconsize: {
			type: String,
			default: '50px'
		},
		iconcolor: {
			type: String,
			default: 'yellowgreen'
		}
	},
	data () {
		return {}
	}
}
</script>