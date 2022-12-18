export const useMobile = () => {
  const route = useRoute()
  const router = useRouter()

  const resizeHandler = () => {
    const width = screen.width
    if (width < 1024) {
      if (route.fullPath.includes('m'))
        return
      else router.push(`m${route.path}`)
    }
    else { router.push(route.fullPath.replace('m/', '')) }
  }

  onMounted(() => {
    window.addEventListener('resize', resizeHandler)
    // 页面首次挂载时调用一次
    resizeHandler()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
