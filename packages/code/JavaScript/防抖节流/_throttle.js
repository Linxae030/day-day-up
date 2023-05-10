// v1 基本实现
// function throttle(fn, interval) {
// 	let lastTime = 0;
// 	const _throttle = function (...args) {
// 		let nowTime = new Date().getTime();
// 		if (interval - (nowTime - lastTime) <= 0) {
// 			fn.apply(this, args);
// 			lastTime = nowTime;
// 		}
// 	};
// 	return _throttle;
// }

// v2 第一次是否执行
function throttle(fn, interval, option = { leading: true }) {
    const { leading } = option;
    let lastTime = 0;

    const _throttle = (...args) => {
        const nowTime = new Date().getTime();

        /**
         * @description nowTime是一个很大的值，如果leading为true，第一次interval-(nowTime - lastTime)一定为负
         * 若为false，则(nowTime - lastTime)为0，相减后>=0，第一次则不执行
         */
        if (!lastTime && !leading) lastTime = nowTime;
        const remainTime = interval - (nowTime - lastTime);
        if (remainTime <= 0) {
            fn.apply(this, args);
            lastTime = nowTime;
        }
    };
    return _throttle;
}

// v3最后一次是否执行
// function throttle(fn, interval, option = { leading: true, trailing: false }) {
// 	const { leading, trailing } = option;
// 	let lastTime = 0;
// 	let timer = null;

// 	const _throttle = (...args) => {
// 		const nowTime = new Date().getTime();

// 		if (!lastTime && !leading) lastTime = nowTime;

// 		const remainTime = interval - (nowTime - lastTime);

// 		if (remainTime <= 0) {
// 			if (timer) {
// 				clearTimeout(timer);
// 				timer = null;
// 			}
// 			fn.apply(this, args);
// 			lastTime = nowTime;
// 		}

// 		/**
// 		 * @description 若最后一次要执行且此时没有定时器，则开启一个定时器
// 		 * 在remainTime ms后执行
// 		 */
// 		if (trailing && !timer) {
// 			timer = setTimeout(() => {
// 				timer = null;
// 				fn.apply(this, args);
// 				lastTime = new Date().getTime();
// 			}, remainTime);
// 		}
// 	};
// 	return _throttle;
// }

// v3最后一次是否执行
function throttle(fn, interval, option = { leading: true, trailing: false }) {
    let lastTime = 0;
    let timer = undefined;

    const { leading, trailing } = option;

    const _throttle = (...args) => {
        // 获取现在时间
        const nowTime = new Date().getTime();
        // 判断第一次是否执行，若不执行则前后相等确保remainTime大于0
        if (!lastTime && !leading) lastTime = nowTime;
        // 计算离下一次执行还有多少时间
        const remainTime = interval - (nowTime - lastTime);

        if (remainTime <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = undefined;
            }
            fn.apply(this, args);
            lastTime = nowTime;
            return;
        }

        if (trailing && !timer) {
            timer = setTimeout(() => {
                timer = undefined;
                fn.apply(this, args);
                lastTime = new Date().getTime();
            }, remainTime);
        }
    };

    _throttle.cancel = function () {
        if (timer) clearTimeout(timer);
        timer = undefined;
        lastTime = 0;
    };
    return _throttle;
}
