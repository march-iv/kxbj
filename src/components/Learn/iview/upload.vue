<template>
	
	<div class="wrap"><br>
		<div>图片上传：超过大小压缩</div> <br> <hr> <br>
		<p>压缩工具官网： <a href="https://www.npmjs.com/package/compressorjs" target="_blank">compressorjs</a> </p>
		<br>
		<div>
			<Upload :action = "'https://dfxcsaas.secxun.com/dfserver/Client/Article/uploadFile'"
				:data = params
				:show-upload-list="false"
				:format = "['jpg','jpeg','png']" :max-size="200"
				:before-upload="handleUpload"
				:on-success="upSuccess"
				:on-error="upError">
				<Button icon="ios-cloud-upload-outline">选择图片</Button>
			</Upload><br>
			<p>图片预览：</p>
			<img :src="bg.result" width="400">
			<div class="cover" :style="'background-image: url(' + bg.result + ')'"></div>
		</div>
	</div>
</template>

<script>
import Compressor from "compressorjs"
export default {
	name: "iviewTree",
	data () {
		return {
			bg: '',
			params: {	// 上传时附带的额外参数
				token: '3d786a134554857b34acae5030ae8691'
			}
		}
	},
	methods: {
		handleUpload (file) {
			return new Promise((resolve, reject) => {
				let pass = file.size / 1024 / 500 < 1;

				if (pass) {
					let reader = new FileReader()	// 设置缩略图
						reader.readAsDataURL(file)
						reader.onload = (e) => { this.bg = reader }
					
					resolve(file);
				} else {
					/* eslint-disable no-new */
					new Compressor(file, {	// 创建压缩插件实例
						quality: 0.3,		// 图片质量, 值在 0 ~ 1
						mimeType: 'auto',	// 默认 auto
						convertSize: 5000000, // 超过此值的PNG文件将转换为JPEG, 禁用此功能只需将值设置为Infinity, 默认5000000
						// width: 500,		// 图片压缩输出宽度, 还有 height
						// maxWidth: 1000,	// 设置最大宽度, 还有 maxHeight
						// minWidth: 1000,	// 设置最小宽度, 还有 minHeight
						beforeDraw (context, canvas) { // 压缩前调用
							console.log("beforeDraw")
							context.fillStyle = '#fff';
							context.fillRect(0, 0, canvas.width, canvas.height);
							context.filter = 'invert(0.7)';
						},
						drew (context, canvas) {
							console.log("drew")
							context.fillStyle = '#fff';
							context.font = '2rem serif';
							context.fillText('watermark', 20, canvas.height - 20);
						},
						success: (res) => {
				        	this.$Message.success("超出大小，压缩成功")
							res = new File([res], res.name, { // 将 blob 对象转 file 对象
								type: res.type,
								lastModified: Date.now()
							});

							let nya = new FileReader()
								nya.readAsDataURL(res)	// 将上传的图片转 base64 编码字符串
							nya.onload = (e) => { this.bg = nya }

							resolve(res);
						},
						error (err) { reject(err) }
					});
				}
			});
		},
		upSuccess () {
        	this.$Message.success("上传成功")
		},
		upError () {
        	this.$Message.error("上传失败")
		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		line-height: 2;
		padding: 0 1em;
		font-size: 16px;
	}
	.cover {
		display: inline-block;
		width: 400px; height: 400px;
		background-size: auto;
		background-position: left center;
		background-repeat: no-repeat;
	}
	ul {
		color: #999;
		line-height: 1.6;
	}
	span.link {
		color: blue;
		cursor: pointer;
	}
</style>