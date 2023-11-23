export const setTeam = () => {
  const el = document.documentElement
  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', '#1e20d3cf')
  el.style.setProperty('--el-color-success', '#4e7306')
}
