<template>
    <div style="padding: 30px;">
        <p>基本操作：<span @click="denglu">登录</span></p>
    </div>
</template>

<script>
import axios from "axios"
import qs from "qs"

export default {
    name: "post",
    data () {
        return {}
    },
    methods: {
        denglu () {
            let url = 'https://api.apiopen.top/developerLogin';
            let params = {
                name: 'zqx',
                passwd: '12345'
            }

            //  简单配置
            axios.post(url, qs.stringify(params), {
                timeout: 1000
            }).then(res => {
                this.allHints(res.data.message)
                this.$Message.info(res.data.message)
            })

            // 完整配置
            // axios({
            //     method: 'post',
            //     url: url,
            //     timeout: 1000,
            //     data: qs.stringify(params)
            // }).then((res) => {
            //     console.log(res.config)
            // })
        }
    }
}
</script>

<style scoped>
    span {
        display: inline-block;
        color: blue;
        cursor: pointer;
        margin: 5px;
    }
</style>