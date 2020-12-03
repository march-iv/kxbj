<template>
    <div class="vuewrap" page="Reg.vue">
        <header> <br>
            <h4>欢迎加入「科学边界」</h4>
            <p>越想越怀疑，越算越不对劲！</p>
        </header>
        <div class="main">
            <form name="denglu" @submit.prevent="submit">
                <ul class="mbbar"><br>
                    <li>
                        <div icon><i class="iconfont">&#xeb88;</i></div>
                        <div><input type="text" name="user" maxlength="11" v-model="user" placeholder="用户名"></div>
                        <div></div>
                    </li><br>
                    <li>
                        <div icon><i class="iconfont">&#xe640;</i></div>
                        <div><input type="password" name="pwd" v-model="pwd" placeholder="密码"></div>
                        <div></div>
                    </li><br>
                    <li>
                        <div icon><i class="iconfont">&#xe608;</i></div>
                        <div><input type="text" name="email" v-model="email" placeholder="邮件"></div>
                        <div></div>
                    </li>
                </ul><br>
                <div style="height: 30px; line-height: 30px; margin: 10px 0 20px;">
                    <label>
                        <input type="checkbox" name="kive" class="mC2" v-model="keep">
                        我已阅读并同意 <span class="link">注册协议</span>、
                        <span class="link">隐私政策</span>
                    </label>
                </div>
                <button type="submit" class="allbtn" :class="{okay: full, ing: geting}">
                  {{ geting ? '注册中...' : '注册'}}
                </button>
            </form><br><br>
        </div>
        <div class="dibu">已有账号？ <router-link to="Login">立即登录</router-link></div>
    </div>
</template>

<script>
import md5 from "md5"
import { userService } from '@/request'

export default {
    data () {
        return {
            geting: false,
            user: '', pwd: '', email: '', keep: true
        }
    },
    computed: {
        full: function () {
            return !(!this.user || !this.pwd || !this.email)
        }
    },
    methods: {
        submit: function () {
            if (!this.full || this.geting) return;
            if (this.user.length < 6) {
                this.allHints("用户名太短，应为6位或更多")
            } else if (!RegExp.reg.pwd_6a1.test(this.pwd)) {
                this.allHints("请设置6位及以上数字加字母组合的密码")
            } else if (!RegExp.reg.email.test(this.email)) {
                this.allHints("无效的邮件格式")
            } else {
                let arg = {
                    name: this.user,
                    // passwd: md5(this.pwd),
                    passwd: this.pwd,
                    email: this.email
                }

                this.geting = true;

                userService.signUp(arg).then(res => {
                    if (res) {
                        this.$message.success("注册成功")
                        localStorage.setItem("user", this.user)
                        localStorage.setItem("pwd", this.pwd)
                        localStorage.setItem("email", this.email)
                        this.$router.push('Login');
                    }
                }).finally(info => {
                    this.geting = false;
                })
            }
        }
    }
}
</script>

<style scoped>
.vuewrap {
    height: 100%;
    position: relative;
}
label {
    display: inline-block;
}
.main {
    padding: 20px 30px 0;
}
.mC2 {
    position: relative;
    top: -1px;
    width: 22px;
    height: 22px;
    vertical-align: middle;
}
.mC2:checked:after {
    content: '😄';
    left: -2px;
    border-color: transparent;
}
.mbbar li {
    border-bottom: 1px solid #ddd;
}
header {
    height: 100px;
    text-align: center;
    font-family: 'Source Han Sans CN';
    color: #fff;
    background-color: dodgerblue;
}
header h4 {
    font-size: 24px;
    margin-bottom: 6px;
}
.dibu {
    position: absolute;
    bottom: 20px; left: 0;
    width: 100%;
    text-align: center;
    padding-bottom: 36px;
}
</style>
