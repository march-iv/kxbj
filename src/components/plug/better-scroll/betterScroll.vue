<!-- 
    使用：
    <template>
        <scroll ref="scrollwrap" class="demo">
            <ul> <li>..</li> </ul>
        </scroll>
    </template>
    <script>
        this.$refs.scrollwrap.refresh()
    </script>
-->

<template>
	<div ref="wrap"><solt></solt></div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        data: { type: Object, default: []  }
    },
    created () {
        this.scroll = new BScroll(this.$refs.wrapper,{})
    },
    methods: {
        enable () {
          this.scroll && this.scroll.enable()
        },
        disable () {
          this.scroll && this.scroll.disable()
        },
        refresh () {
          this.scroll && this.scroll.refresh()
        },
        scrollTo () {
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        }
    }
</script>