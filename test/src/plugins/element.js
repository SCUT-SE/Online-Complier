import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
    size: 'small',
    zIndex: 3000
});
// 全局挂载，可以通过this访问
Vue.prototype.$message = ElementUI.Message