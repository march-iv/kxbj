// 数组去重
Array.unique = function () {}

// 对象合并
Object.extend = function () {}

// 内置的 Object.assign 无法合并访问器属性，可使用下面的方法代替
// assignAll 为直接挂在 Object 构造器函数上的，因此要通过构造器调用
// 举例: Object.assignAll(obj)
Object.assignAll = function (target, ...sources) { // 参数分别是目标对象，源对象
	sources.forEach(item => {	// 遍历每个源对象
		let des = Object.keys(item).reduce((hz, currkey, idx, arr) => { // 遍历源对象的每个key
			hz[currkey] = Object.getOwnPropertyDescriptor(item, currkey) // 收集源对象属性描述符
			return hz
		}, {})

		// Object.assign 默认是会拷贝 Symbol 属性的
		// 但上面 Object.keys 无法返回 Symbol 属性，所以上面收集到的属性不包括源对象可能含有的 Symbol 属性
		// 使用 getOwnPropertySymbols 来获取源对象上的 Symbol 属性
		Object.getOwnPropertySymbols(item).forEach(sym => {	// 循环Symbol属性，因为可能有多个
			des[sym] = Object.getOwnPropertyDescriptor(item, sym) // 获取Symbol属性的描述符
		})

		Object.defineProperties(target, des) // 将收集到的源对象的属性及其配置设置到目标对象 target 上
	})
	return target
}

// 对象深拷贝
// 使用举例： let newobj = obj.deepClone(), newobj 是 obj 的深拷贝
// 使用 defineProperty 使得此属性为不可枚举的属性
// 如果是直接挂在 Object.prototype 上，则为可枚举属性，对于 Vue Router 的项目，会把函数体直接拼在URL上
Object.defineProperty(Object.prototype, 'deepClone', {
	// configurable: false,	// 默认就是false
	// writable: false,		// 默认就是false
	value: function () {
		var that = this	// this 指向调用当前函数的对象实例
		var tar = Object.prototype.toString.call(that) === "[object Array]" ? [] : {}	// 创建一个空对象或空数组
		// var tar = new that.constructor()	// 也可以这样，等同于上一句

		for(let key in that) {
			if(that.hasOwnProperty(key)) {	// 判断 key 是对象的自身属性，非继承
				if(typeof that[key] === "object" && that[key] !== null) {	// 判断 key 的值是一个对象，非原始值
					tar[key] = Object.prototype.toString.call(that[key]) === '[object Array]' ? [] : {}	 // 创建内部的空对象或空数组
					tar[key] = that[key].deepClone()
				} else {
					tar[key] = that[key]	// 赋值
				}
			}
		}
		return tar
	}
})

// 防抖函数
// func-执行的函数表达式(非函数声明)名称, scope-多长时间内不允许触发函数, arg-传递给要执行函数的参数
// func 函数内, 第1个参数为传递过来的参数, this 指向事件对象
// 例: document.addEventListener("scroll", Function.debounce(resize, 500))
Function.debounce = (func, scope, arg) => {
    let cd = false;		// 冷却时间，冷却时间过后，首次点击立即执行函数
    let timer = null;

    return (e) => {  // e 是事件对象
        if(!cd) { // 第一次点击不等待
            func.apply(e, [arg]); // 把事件对象 e 绑定到函数内的 this
            timer = 1;
        } else if (!timer) {
            clearTimeout(timer);
            timer = setTimeout( () => {
            	func.apply(e, [arg])
            	timer = null // 过了指定时间后，再次点击又能立即执行函数
            }, scope);
        }

        // 每次点击都要重新计算冷却时间
        if (cd) clearTimeout(cd)
        cd = setTimeout(() => { cd = false }, scope)
    }
}

// 节流函数
// func-执行的函数表达式(非函数声明)名称, scope-多长时间内只触发一次函数, arg-传递给要执行函数的参数
// func 函数内, 第1个参数为传递过来的参数, this 指向事件对象
// 例: element.addEventListener("click", Function.throttle(dian, 1000, {year: 2020}))
Function.throttle = (func, delay, arg) => {
    let cd = false;		// 冷却时间，冷却时间过后，首次点击立即执行函数
    let timer = null;

    return (e) => { // e 是事件对象
    	if (!cd) {	// 冷却时间完成，点击立即执行
 			func.apply(e, [arg]); // 把事件对象 e 绑定到函数内的 this, 并传递参数
    	} else if (!timer) {
            timer = setTimeout(() => {
                func.apply(e, [arg])
                timer = null
            }, delay)
        }

        // 每次点击都要重新计算冷却时间
        if (cd) clearTimeout(cd)
        cd = setTimeout(() => { cd = false }, delay)
    }
}

// 日期格式字符串转日期对象
// 如: Date.toDate("2020-06-11");	Date.toDate("2020/06/11 20:30:20");
Date.prototype.toDate = function (arg) {
	if(!arg) return new Date()
	let str = arg.replace(/-/g, '/') // 用来兼容 IE9
	return new Date(str)
}

// 日期对象转日期字符串 (1/2)
// 例: new Date().formatReg("公元：yyyy-MM-dd hh:mm:ss")
Date.prototype.formatReg = function (format) {
	if(!format) format = 'yyyy-MM-dd hh:mm:ss'
	var o = {
		"M+" :this.getMonth() + 1,
		"d+" :this.getDate(),
		"h+" :this.getHours(),
		"m+" :this.getMinutes(),
		"s+" :this.getSeconds(),
		"q+" :Math.floor((this.getMonth() + 3) / 3),
		"S" :this.getMilliseconds()
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

// 日期对象转日期字符串 (2/2)
// 固定用法: new Date().formatIntl()
Date.prototype.formatIntl = function (time) {
	if(window.Intl) {
	    return new Intl.DateTimeFormat("zh", {
	        // timeZone: "Asia/Shanghai",   // 使用的时区
	        // timeZoneName: "long",        // 时区名称， long-'中国标准时间', short-'GMT+8'
	        // era: 'long',                 // 纪元，narrow, short, long, 三个值都是一样的，都是'级元'
	        hour12: false,          		// 小时制，true-12小时制(默认), false-24小时制
	        year: "numeric",        		// 年， 'numeric'-数值(如2020), '2-digit'-两位数(如20)，默认无此值
	        month: "2-digit",       		// 月， 'numeric'-数值(如5)，'2-digit'-两位数(如05)，默认无此值
	        day: "2-digit",         		// 日， 'numeric'-数值，'2-digit'-两位数，默认无此值
	        hour: '2-digit',        		// 时， 'numeric'-数值，'2-digit'-两位数，默认无此值
	        minute: '2-digit',      		// 分   'numeric'-数值，'2-digit'-两位数，默认无此值
	        second: '2-digit',      		// 秒， 'numeric'-数值，'2-digit'-两位数，默认无此值
	    }).format(time).replace(/\//gi, "-")	// 把 '/' 转为 '-'
    } else {
    	throw Error("不支持 Intl 对象，无法在 Date.prototype 上添加 formatIntl 方法")
    	return this.formatReg("yyyy-MM-dd hh:mm:ss")
    }
}

// 一个日期若干天前/后
// 例+5天: Date.addSub('2020-6-28', 5 * 24 * 3600 * 1000, 'yyyy-MM-dd hh:mm:ss')
Date.prototype.addSub = function (now, how, format) {
	let msec = Date.toDate(now).getTime()
	let nd = new Date(msec + how) // 加上指定时间(秒), 然后转回日期对象
	return nd.formatReg(format)
}

// 两个日期相隔的天数
// 例: Date.dateGap('2020/6/12 10:00:00', '2020-6-12 10:30:00')
Date.dateGap = function (dateA, dateB) {
	let msecA = Date.toDate(dateA).getTime()
	let msecB = Date.toDate(dateB).getTime()
	return Math.abs(msecA - msecB)/1000 // 返回间隔秒数
}

// 生成今天或某天，之后或之前一周的日期
// 第二个参数的 Boolean 值为真返回之后的日期(默认)，否则返回之前的日期
// 例: Date.getWeekTime();	Date.getWeekTime('2020-06-28', false)
Date.getWeekTime = function (begin, type) {
	let dir = type === undefined || Boolean(type) ? 1 : -1;
	let now = begin ? Date.toDate(begin).getTime() : Date.now();
	let arr = Array(7);
		arr = [...arr].map((curr, idx, arr) => {
			return new Date(now + idx * 8.64e7 * dir).formatReg('yyyy-MM-dd')
		})
	return arr
}

// 将一个字符串数字千分位加逗号
// 例: '5734545'.setdot();		'5734545.63'.setdot();
// 例(保留2位小数): (465768).toFixed(2).setdot()
String.prototype.setdot = function () {
	let str = this.valueOf();
	if(str.indexOf(".") !== -1) { // 存在小数部分
		return str.split(".")[0].replace(/(\d+?)(?=(?:\d{3})+$)/g, '$1,') + '.' + str.split(".")[1]
	} else {
		return str.split(".")[0].replace(/(\d+?)(?=(?:\d{3})+$)/g, '$1,')
	}
}
// 获取字符串中的汉字
// 例: 'my name is 哥白尼'.getZh();
String.prototype.getZh = function () {
	var str = this.valueOf(), arr = new Array(), i = 0;
	while (i < str.length) {
	    var s = "";
		while (str.charCodeAt(i) < 256) {
			s = s + str.charAt(i);
			i++;
	    }
	 	arr.push(s);	// 非汉字也加入数组
	    
	    var s = "";
	     while (str.charCodeAt(i) > 256) {
			s = s + str.charAt(i);
			i++;
		}
	    arr.push(s);	// 汉字加入数组
	}
	return arr;
}

// 随机生产 n 位大写字母
String.getRanNum = function (n) {
	let abc = '', num = 0, total = n || 4
	for(let i = 0; i < total; i++){
		num = Math.ceil(Math.random() * 25);
		abc += String.fromCharCode(65 + num);
	}
    return abc;
}

// 浮点数四则运算，避免浮点数计算出现的精度损失
// 例: Math.alg(2, 1.10, '-');		Math.alg(0.21, 0.35, '+');
// 例: Math.alg(0.2, 0.4, '*');		Math.alg(0.6, 0.2, '/');
Math.alg = function (a, b, type) {
	let na = a.toString().split(".")
	let nb = b.toString().split(".")
	if(na.length === 1 && nb.length === 1) { // 如果相加的两个数都是整数
		return a + b
	} else {
		let la = na.length === 1 ? 1 : na[1].length
		let lb = nb.length === 1 ? 1 : nb[1].length
		// 取相加的两个数中，小数位数最多的那个
		let t = Math.pow(10, Math.max(la, lb));

		switch (type) {
			case '+': return (a * t + b * t) / t; break;
			case '-': return (a * t - b * t) / t; break;
			case '*': return (a * Math.pow(10, la)) * (b * Math.pow(10, lb)) / Math.pow(10, la + lb); break;
			case '/': return (a * Math.pow(10, la)) / (b * Math.pow(10, lb)) / Math.pow(10, la - lb); break;
			default: return 'chose one: + - * /'
		}
	}
}

// 获取文件 base64 编码
// 例: File.fileToBase64String(input.files[0]).then(res => { console.log(res.base64String) })
File.fileToBase64String = function (file, format = ['jpg', 'jpeg', 'png', 'gif'], size = 100 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') {
    return new Promise((resolve, reject) => {
        // 格式过滤
        let suffix = file.type.split('/')[1].toLowerCase();
        let inFormat = false;
        for (let i = 0; i < format.length; i++) {
            if (suffix === format[i]) {
                inFormat = true;
                break;
            }
        }
        if (!inFormat) reject(formatMsg);

        // 大小过滤
        if (file.size > size) reject(sizeMsg);

        // 转base64字符串
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let res = fileReader.result;
            resolve({base64String: res, suffix: suffix});
            reject('异常文件，请重新选择');
        }
    })
}

// cookie 的值有时很难被自然地处理, mdn 提供了便捷方法
// 此内容来自 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
// 设置: Cookie.setItem(name, value[, end[, path[, domain[, secure]]]])
// 取值: Cookie.getItem(name)
// 移除: Cookie.removeItem(name[, path], domain)
// 判断: Cookie.hasItem(name)
// 获取全部 Cookie 名称: Cookie.keys()
window.Cookie = {
	getItem: function (sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	},
	removeItem: function (sKey, sPath, sDomain) {
		if (!sKey || !this.hasItem(sKey)) { return false; }
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
		return true;
	},
	hasItem: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: function () {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};

// 获取浏览器名称和版本
// 用法: navigator.browser
Navigator.prototype.browser = function() {
	var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { name : "Edge", version : sys.edge };
    if (sys.ie) return { name : "IE", version : sys.ie };
    if (sys.firefox) return { name : "Firefox", version : sys.firefox };
    if (sys.chrome) return { name : "Chrome", version : sys.chrome };
    if (sys.opera) return { name : "Opera", version : sys.opera };
    if (sys.safari) return { name : "Safari", version : sys.safari };
    
    return { name : "", version : "0" };
}();

// 返回 URL 中所有的查询参数, 返回值为一个对象
// 用法: location.query
Location.prototype.query = function () {
    var url = location.search;	// 获取 url 中"?"符后的字串
    var params = new Object();
    if (url.indexOf("?") != -1) {
        let strs = url.substr(1).split("&");
        for(var i = 0; i < strs.length; i ++) {
            params[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return params;
}();

// 常用的正则表达式
// 例: RegExp.reg.tel
RegExp.reg = {
	tel: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g,
	phone: /\d{3}-\d{8}|\d{4}-\d{7}/g,	// 座机号码
	price: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/,
	email: /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/,
	pwd_6a1: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, // 6位数的数字和字母组合
	idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, // 身份证
	zhName: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){1,5}$/,	// 中文名
	postCode: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g,	// 邮编
	color16: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g,	// 16 进制颜色
	trainNum: /^[GCDZTSPKXLY1-9]\d{1,4}$/g,	// 火车车次
	creditCode: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g, // 统一社会信用代码
}

// 为 localStorage 添加一个带有过期时间的项目, (如果想要设置过期时间，推荐使用 cookie)
// 例(60s后过期): localStorage.setItemNew("name", "哥白尼", new Date().getTime() + 60*1000);
Storage.prototype.setItemNew  = function (key, value, timer) {
    var data = { value: value, expirse: new Date(timer).getTime() };
    localStorage.setItem(key, JSON.stringify(data));
}
// 例: localStorage.getItemNew("name")
Storage.prototype.getItemNew = function (key) {
	var data = JSON.parse(localStorage.getItem(key));
    if (data) {
        if (data.expirse && data.expirse < new Date().getTime()) {
            localStorage.removeItem(key);
        } else { return data.value; }
    }
}