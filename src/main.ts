import { createApp } from 'vue'
import './style.css'
import './assets/style/common.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { initRouter } from './routes'
import { initI18n } from './i18n'
import { setTeam } from './team'
import * as ElIcons from '@element-plus/icons-vue'

setTeam()
const app = createApp(App)
initI18n(app)
initRouter(app)
app.mount('#app')
for (const name in ElIcons) app.component(name, (ElIcons as any)[name])
