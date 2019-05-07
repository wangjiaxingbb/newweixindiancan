// 全局过滤器
import moment from 'moment';
import Vue from 'vue';
Vue.filter('formatDate', function(value) {
    if (!value) {
        return '';
    }
    return moment(Number(value)).format('YYYY-MM-DD HH:mm:ss');
});
Vue.filter('handleMoney', function(value) {
    if (!value) {
        return '￥0';
    }
    return `￥${value}`;
});