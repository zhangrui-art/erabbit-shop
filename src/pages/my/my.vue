<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/request'

const memberStore = useMemberStore()
const testRequest = async () => {
  const resp = await http<number[]>({
    method: 'GET',
    url: '/home/banner',
  })
  console.log('%c TS ', 'background-color:aqua;color: white;font-size: 40px', resp)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="testRequest" size="mini" plain type="primary">测试请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
