<template>
	<div class="wrap"><br>
		<div>一些技巧记录在此</div>
		<br> <hr> <br>
		<div>
			默认过去七天时间期间：
			<DatePicker v-model="date" type="daterange" :split-panels="true" placeholder="开始日期 ~ 结束日期"></DatePicker>
		</div>
		<div>
			最大自能选择到昨天：
			<DatePicker v-model="datemax" type="daterange" :options="optionsmax" placeholder="开始日期 ~ 结束日期"></DatePicker>
		</div>
	</div>
</template>

<script>
export default {
	name: "Note.vue",
	data () {
		return {
			date: [new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), new Date(new Date().getTime())],
			
			datemax: [],
			optionsmax: {
                disabledDate (time) {
                    return time.getTime() > (Date.now() - 86400000);
                }
            }
		}
	}
}
</script>

<style lang="scss" scoped>
	
</style>