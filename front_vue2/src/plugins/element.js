import Vue from 'vue'
import{Button,Row} from'element-ui'
import{Form,FormItem} from'element-ui'
import{Input} from'element-ui'
import{Message} from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'


Vue.use(Button)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 全局挂载，可以通过this访问
Vue.prototype.$message = Message