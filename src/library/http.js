import { inject } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { GW_AIYILEARNING_COM_PARSE, WWW_AIYILEARNING_COM_PARSE, HttpError } from './http/parse'

// create an axios instance
const axiosClient = axios.create({ baseURL: "", timeout: 1000 * 60 });

// 请求拦截器
const requestFulfilled = (config) => {
    if (config.method.toLowerCase() !== 'post' || typeof config.data === 'string') {
        return config;
    }
    if (config.headers['Content-Type'] && config.headers['Content-Type'].toLowerCase().includes('application/json')) {
        if (typeof config.data !== 'string') {
            config.data = JSON.stringify(config.data)
        }
        return config;
    }
    if (!config.data) {
        config.data = {};
    }

    if (config.headers['Content-Type'] === 'multipart/form-data') {
        let data = new FormData(); //创建form对象
        Object.keys(config.data).forEach(itm => {
            if (!config.data[itm]) {
                return;
            }
            if (typeof config.data[itm] === "object" && config.data[itm].length) {
                for (let i = 0; i < config.data[itm].length; i++) {
                    data.append(`${itm}[${i}]`, config.data[itm][i]);
                }
            } else {
                data.append(itm, config.data[itm]);
            }
        });
        config.data = data;
    } else {
        config.data = qs.stringify(config.data, {
            allowDots: true,
            skipNulls: true
        });
    }
    return config
};
const requestRejected = (error) => {
    console.log(error); // for debug
    return Promise.reject(error)
};

// 响应适配器
const responseParse = (resp) => {
    const url = resp.request.responseURL;
    const body = resp.data;
    if (url.includes('www.aiyilearning.com/mapi_v2')) {
        return WWW_AIYILEARNING_COM_PARSE(body);
    } else if (body.hasOwnProperty('state')) {
        return GW_AIYILEARNING_COM_PARSE(body);
    }
    throw new HttpError("服务器连接超时，请稍后再试");
}

// 响应拦截器
const responseFulfilled = (resp) => {
    if (resp.config.fullResponse) {
        return Promise.resolve(resp);
    }
    if (resp.config.responseType === 'blob' || resp.config.originResponse) {
        return Promise.resolve(resp.data);
    }

    try {
        return Promise.resolve(responseParse(resp))
    } catch (e) {
        return Promise.reject(e)
    }
};
const responseRejected = (error) => {
};

axiosClient.interceptors.request.use(requestFulfilled, requestRejected);
axiosClient.interceptors.response.use(responseFulfilled, responseRejected);

const http = {
    async get(url, params = {}, config = {}, callback = null) {
        return axiosClient.get(url, {
            params: params,
            ...config,
            callback
        })
    },
    async post(url, data = {}, config = {}, callback = null) {
        return axiosClient.post(url, data, {
            ...config,
            callback
        })
    }

}
const pluginName = Symbol('http');
const useHttp = () => inject(pluginName);

export default {
    install: (app) => {
        app.config.globalProperties[pluginName] = http
        Object.defineProperty(app.config.globalProperties, pluginName, {
            get: () => http,
        })
        app.provide(pluginName, http);
    }
};
export {
    useHttp
}