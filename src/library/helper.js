const helper = {
    formatTimestamp: (time)=>{
        const date = new Date(time);
        return date.toLocaleString() + '.' + date.getMilliseconds()
    }
}
const pluginName = '$helper';

export default {
    install: (app) => {
        app.config.globalProperties[pluginName] = helper
        Object.defineProperty(app.config.globalProperties, pluginName, {
            get: () => helper,
        })
        app.provide(pluginName, helper);
    }
};