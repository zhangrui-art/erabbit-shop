<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBanner, getHomeCategory } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem, CategoryItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HomePanel from './components/HomePanel.vue'

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

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="bannerList" />
  <CategoryPanel :list="categoryList" />
  <HomePanel />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
