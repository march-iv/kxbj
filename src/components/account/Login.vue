<template>
  <div class="vuewrap" page="Login.vue">
        <div style="position: relative; min-height: 600px">
            <header> <br>
                <h4>欢迎登录
                    <span class="ib animated 1 jackInTheBox" style="display: inline-block;">
                    「科学边界」</span>
                </h4>
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
                </li>
            </ul><br>

            <button type="submit" class="allbtn" :class="{okay: full, ing: geting}">
                {{ geting ? '登录中...' : '登录'}}
            </button>
            
            <div style="height: 30px; line-height: 30px; margin: 15px 0;">
                <label>
                    <input type="checkbox" name="kive" class="mC2" v-model="keep">
                    保持我的登录状态
                </label>
                <span class="link fr">找回密码</span>
            </div>
        </form><br><br>
            <div class="inter">
                <h5><span>社交账号登录</span></h5>
                <div class="list">
                    <a href="javascript:;"><i class="iconfont" style="color: DoderBlue">&#xe600;</i></a>
                    <a href="javascript:;"><i class="iconfont" style="color: Crimson">&#xe603;</i></a>
                    <a href="javascript:;"><i class="iconfont" style="color: SeaGreen">&#xe71f;</i></a>
                    <a href="javascript:;"><i class="iconfont" style="color: OrangeRed">&#xe767;</i></a>
                    </div>
                    <p>还没有账号？ <router-link to="./Reg">立即注册</router-link></p>
                    <br><br>
                </div>
          </div>
        </div>
  </div>
</template>
<script>
import md5 from "md5"
import { userService } from '@/request'

export default {
    data () {
        return {
            user: '',
            pwd: '',
            keep: true,
            geting: false
        }
    },
    created: function () {
        if (localStorage.getItem("user")) {
            this.user = localStorage.getItem("user")
            this.pwd = localStorage.getItem("pwd")
        }
    },
    computed: {
        full: function () {
            return !(!this.user || !this.pwd)
        }
    },
    methods: {
        submit: function () {
            if (!this.full || this.geting) return;
            if (this.user.length < 6) {
                this.allHints("有效的用户名至少是6位的")
            } else if (!RegExp.reg.pwd_6a1.test(this.pwd)) {
                this.allHints("有效的密码是6位的，是数字加字母组合")
            } else {
                var arg = {
                    name: this.user,
                    // passwd: md5(this.pwd),
                    passwd: this.pwd,
                    keep: this.keep,
                    email: '8057@qq.com'
                };

                this.geting = true;

                userService.signIn(arg).then(res => {
                    if (res.code === 200) this.$router.push('Home')
                    else this.allHints(res.message)
                }).catch(err => {
                    this.allHints(err)
                }).finally(info => {
                    this.geting = false;
                })
            }
        }
    }
}

</script>
<style lang="scss" scoped>
    label { display: inline-block; }
    .main {  padding: 20px 30px 0; }
    .mC2 {
        position: relative;
        top: -1px;
        width: 22px;
        height: 22px;
        vertical-align: middle;
    }
    .mC2:checked::after {
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
        h4 {
            font-size: 24px;
            margin-bottom: 6px;
        }
    }

    .inter {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        h5 { position: relative; }
        h5::before {
            content: '';
            position: absolute;
            left: 20px; right: 20px; top: 9px;
            height: 1px;
            background-color: #eee;
        }
        h5 span {
            position: relative;
            z-index: 2;
            display: inline-block;
            padding: 0 8px;
            font-size: 14px;
            color: #999;
            background-color: #f9f9f9;
        }
    }
    .inter .list {
        padding: 30px 0;
        a {
            display: inline-block;
            width: 50px; height: 50px;
            line-height: 50px;
        }
        a i { font-size: 40px; }
        a + a { margin-left: 10px; }
    }
    @media (max-width: 330px) {
        .inter {
           position: inherit;
        }
        .inter .list a {
            height: 30px;
            line-height: 30px;
        }
        .inter h5::before {
            left: 0; right: 0;
        }
    }
</style>
