/**
 * 窗口阻止导出判断
 * @param {*} url 
 */
export function blocked(url) {
    let blocked = false;

    try {
        let wroxWin = window.open(url);

        if (wroxWin == null) {
            blocked = true;
        }
        
    } catch (error) {
        blocked = true;
    }

    if (blocked) {
        this.$message.warning('此网页上的弹出式窗口已被拦截，请设置弹出式窗口打开方式');
    }
}

/**
 * 深度继承，处理请求数据中的“&”
 * @param {*} oldObj 
 * @param {*} newObj 
 */
export function deepInherit(oldObj, newObj) {
    for (let key in oldObj) {
        let item = oldObj[key];

        if (item instanceof Array) {
            newObj[key] = [];
            deepInherit(item, newObj[key]);
        } else if (item instanceof Object) {
            newObj[key] = {};
            deepInherit(item, newObj[key]);
        } else {
            if (typeof item === 'string' && item.indexOf('&') > -1) {
                newObj[key] = encodeURIComponent(item);
            } else {
                newObj[key] = item;
            }
        }
    }
}