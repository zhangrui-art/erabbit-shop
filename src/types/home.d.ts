/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-前台类目数据类型 */
export type CategoryItem = {
  /** 类目id */
  id: string
  /** 类目名称 */
  name: string
  /** 类目图片 */
  icon: string
}

/** 首页-热门推荐数据类型 */
export type HotItem = {
  /** 商品id */
  id: string
  /** 商品标题 */
  title: string
  /** 商品图片 */
  pictures: string[]
  /** 商品价格 */
  target: string
  /** 商品标签 */
  alt: string
  type: number
}

/** 猜你喜欢数据类型 */
export type GuessLikeItem = {
  /** 商品id */
  id: string
  /** 商品标题 */
  desc: string
  name: string
  orderNum: number
  picture: string
  price: number
}
