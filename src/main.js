import Vue from 'vue';
import App from './App.vue';
import ElementUI, {MessageBox, Message} from 'element-ui';
import '../theme/index.css';
import router from './router';
import store from './store';
import axios from 'axios';
import {connectSocket,postFormRequest, getRequest, postRequest} from "./util/api";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.postFormRequest = postFormRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.connectSocket = connectSocket;

router.beforeEach((to,from,next) => {
    if(to.path === '/login'){
        next();
        return;
    }
    let user = store.state.user;
    if(user === '未登录'){
        if(to.meta.requireAuth){
            next({path:'/',query:{redirect:to.path}})
        } else {
            next();
        }
    } else {
        next();
    }
});

axios.interceptors.response.use(response => {
    const resp = response.data;
    if(resp && resp.status === 1){
        return resp.data;
    } else {
        Message.error(resp.data.msg);
    }
},error => {
    if(error.response && error.response.status === 401){
        let errorInfo = error.response.data.msg;
        MessageBox.alert(errorInfo,"提示",{
            confirmButtonText:'确定',
            callback:() => {
                postFormRequest('/logout',{}).then(() => {
                    router.push("/login");
                })
            }
        })
    } else {
        return Promise.reject(error);
    }
});


new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
