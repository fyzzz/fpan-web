import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    routes:[
        {
            path:'/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            meta: {
                title: '登录 '
            },
            component: () => import('./views/login/login.vue')
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '主页',
                requireAuth:true
            },
            component: () => import('./views/home/home.vue'),
            children:[
                {
                    path: '/personal',
                    name: 'personal',
                    meta: {
                        title: '个人中心',
                        requireAuth:true
                    },
                    component: () => import('./views/personal/personal.vue')
                },
                {
                    path: '/fileList',
                    name: 'fileList',
                    meta: {
                        title: '文件列表',
                        requireAuth:true
                    },
                    component: () => import('./views/bak/fileList.vue')
                },
                {
                    path: '/recordList',
                    name: 'recordList',
                    meta: {
                        title: '日志列表',
                        requireAuth:true
                    },
                    component: () => import('./views/dailyRecord/list')
                },
                {
                    path: '/recordCalendar',
                    name: 'recordCalendar',
                    meta: {
                        title: '日志日历',
                        requireAuth:true
                    },
                    component: () => import('./views/dailyRecord/calendar')
                },
                {
                    path: '/file',
                    name: 'file',
                    meta: {
                        title: '文件列表',
                        requireAuth:true
                    },
                    component: () => import('./views/file/list')
                }
            ]
        },
    ]
})
