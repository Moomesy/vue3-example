import { inject } from 'vue'

const helper = {
    formatTimestamp: (time) => {
        const date = new Date(time);
        return date.toLocaleString() + '.' + date.getMilliseconds()
    }
}
const pluginName = Symbol('helper');
const useHelper = () => inject(pluginName);
export default {
    install: (app) => {
        app.config.globalProperties[pluginName] = helper
        Object.defineProperty(app.config.globalProperties, pluginName, {
            get: () => helper,
        })
        app.provide(pluginName, helper);
    }
};
export {
    useHelper
}