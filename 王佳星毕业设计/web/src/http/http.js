import axios from './index';
import { Message } from 'element-ui';
import * as api from '@/api';
import qs from 'qs';
let httpList = {};
for (let i in api) {
    // 封装每一条api请求
  httpList[i] = param => {
    // 请求数据的url，方法，数据和额外配置
    let url = api[i].url || null;
    let method = api[i].method.toLowerCase() || POST;
    let data = method === 'post' ? param || {} : { param: param || {} };
    data = qs.stringify(data);
    // 请求数据的自定义配置，比如说请求成功的提示语等
    let config = api[i].config || {};
    // 返回一个Promise对象
    return new Promise((resolve, reject)=>{
        axios[method](url, data).then(res=>{
            // 请求成功
            let resData = res.data || {};
            if(resData.code && resData.code == 200){
                // 请求成功，优先取自定义提示> 后端接口提示> 默认提示
                let msg = config.msg || resData.message || null;
                if(msg){
                    Message.success(msg)
                }
                resolve(res.data)
            }else{
                let msg = res.data.message || '请求失败';
                Message.error(msg)
                reject(res)
            }
        }).catch(err=>{
            // 请求失败
            Message.error('网络异常！')
            reject(err)
        })
    });
  };
}
export default httpList;
