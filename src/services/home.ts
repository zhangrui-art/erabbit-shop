import { http } from '@/utils/request'
import type { BannerItem, CategoryItem, HotItem, GuessLikeItem } from '@/types/home'
import type { PageResult } from '@/types/global'
export const getHomeBanner = (distributionSite: number) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/** 获取前台类目 */
export const getHomeCategory = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

/** 获取首页推荐 */
export const getHomeHot = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

/** 猜你喜欢 */
export const getHomeGoodsGuessLike = () => {
  return http<PageResult<GuessLikeItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
  })
}
