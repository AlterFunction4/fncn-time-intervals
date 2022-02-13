export default class Intervals {
    private now: Date;
    private time: Date;
    get timestamp(): number { return this.time.getTime() - this.now.getTime() }

    /**
     * Time of the day that you want to set the interval at. Returns current time if `undefined`
     * @param hour Hour of the day to set interval. Returns current if `undefined`
     * @param minute Minute of the hour to set interval. Returns 0 if `undefined` or current if `hour` is `undefined`
     * @param second Second of the minute to set interval. Returns 0 if `undefined or current if `hour` is `undefined`
     */
    constructor(private hour?: number | null, private minute?: number | null, private second?: number | null) {
        this.now = new Date();
        this.time = new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate(),
            this.hour ?? this.now.getHours(),
            this.minute ?? this.hour ? this.minute ?? 0 : this.now.getMinutes(),
            this.second ?? this.minute ? this.second ?? 0 : this.hour ? 0 : this.now.getSeconds()
        )
    }

    /**
     * Sends `Date` of `this` time constructor to `console.log()`. Use this function before any other function in a chain
     * @returns `this`
     */
    test(): this {
        console.log(this.time);
        return this;
    }

    /**
     * Execute your code on a monthly basis
     * @param callback Code to execute
     * @param date Day of the month to set interval at. Returns current day if `undefined`
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    monthly(callback: (...args: Array<any>) => void, date?: number, ...args: Array<any>): NodeJS.Timeout {
        if (date) this.time.setDate(date);
        if (this.time.getDate() <= this.now.getDate() && this.time.getHours() <= this.now.getHours() && this.time.getMinutes() <= this.now.getMinutes() && this.time.getSeconds() <= this.now.getSeconds()) this.time.setMonth(this.time.getMonth() + 1);
        return setTimeout((...args: Array<any>) => {
            new Intervals().monthly((...args) => callback(...args));
            callback(...args);
        }, this.timestamp, ...args);
    }

    /**
     * Execute your code on a weekly basis
     * @param callback Code to execute
     * @param day Day of the week to set interval. Returns current day if `undefined`
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    weekly(callback: (...args: Array<any>) => void, day?: number | string, ...args: Array<any>): NodeJS.Timeout {
        const dotw: Array<string> = [`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`]
        var setDay: number = 0;
        if (!day) setDay = this.time.getDay();
        else switch (typeof day) {
            case `string`:
                dotw.forEach((d, i) => { if (d.toLowerCase() === day.toLowerCase()) setDay = i + 1; });
                break;
            case `number`:
                if (day > 0 && day < 8) setDay = day;
                break;
            default: console.log(`nope`);
        }
        if (setDay !== this.time.getDay()) this.time.setDate(this.time.getDate() + ((setDay - this.time.getDay()) + (setDay < this.time.getDay() ? dotw.length : 0)));
        else if (this.time.getHours() <= this.now.getHours() && this.time.getMinutes() <= this.now.getMinutes() && this.time.getSeconds() <= this.now.getSeconds()) this.time.setDate(this.time.getDate() + dotw.length);
        this.test();
        return setTimeout((...args: Array<any>) => {
            new Intervals().weekly((...args) => callback(...args));
            callback(...args);
        }, this.timestamp, ...args);
    }

    /**
     * Execute your code on a daily basis
     * @param callback Code to execute
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    daily(callback: (...args: Array<any>) => void, ...args: Array<any>): NodeJS.Timeout {
        if (this.time.getHours() <= this.now.getHours() && this.time.getMinutes() <= this.now.getMinutes() && this.time.getSeconds() <= this.now.getSeconds()) this.time.setDate(this.time.getDate() + 1);
        return setTimeout((...args: Array<any>) => {
            new Intervals().daily((...args) => callback(...args));
            callback(...args);
        }, this.timestamp, ...args);
    }

    /**
     * Execute your code on an hourly basis
     * @param callback Code to execute
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    hourly(callback: (...args: Array<any>) => void, minute?: number, second?: number, ...args: Array<any>): NodeJS.Timeout {
        if (this.time.getMinutes() <= this.now.getMinutes() && this.time.getSeconds() <= this.now.getSeconds()) this.time.setHours(this.time.getHours() + 1);
        return setTimeout((...args: Array<any>) => {
            new Intervals().hourly((...args) => callback(...args));
            callback(...args);
        }, this.timestamp, ...args);
    }
}