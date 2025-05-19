<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBanner, getHomeCategory, getHomeHot } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HomePanel from './components/HomePanel.vue'
import type { XtxGuessInstance } from '@/types/component'
import PageSkelton from './components/PageSkelton.vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBanner(1)
  bannerList.value = res.result
}

const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategory()
  categoryList.value = res.result
}

const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHot()
  hotList.value = res.result
}

const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

const xtxGuessRef = ref<XtxGuessInstance>()
const onScrollToLower = async () => {
  await xtxGuessRef.value?.getMore()
}
const isRefresherTriggered = ref(false)
const onRefresherRefresh = async () => {
  isRefresherTriggered.value = true
  xtxGuessRef.value?.reset(),
    await Promise.all([
      getHomeBannerData(),
      getHomeCategoryData(),
      getHomeHotData(),
      xtxGuessRef.value?.getMore(),
    ])
  isRefresherTriggered.value = false
}
</script>

<template>
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherRefresh"
    @scrolltolower="onScrollToLower"
    :refresher-triggered="isRefresherTriggered"
    scroll-y
    class="scroll-view"
  >
    <PageSkelton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="categoryList" />
      <HomePanel :list="hotList" />
      <XtxGuess ref="xtxGuessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
