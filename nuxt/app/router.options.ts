import {RouterConfig} from "@nuxt/schema"

export default <RouterConfig>{
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0,
    }
  },
}
