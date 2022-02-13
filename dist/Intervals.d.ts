/// <reference types="node" />
export default class Intervals {
    private hour?;
    private minute?;
    private second?;
    private now;
    private time;
    get timestamp(): number;
    /**
     * Time of the day that you want to set the interval at. Returns current time if `undefined`
     * @param hour Hour of the day to set interval. Returns current if `undefined`
     * @param minute Minute of the hour to set interval. Returns 0 if `undefined` or current if `hour` is `undefined`
     * @param second Second of the minute to set interval. Returns 0 if `undefined or current if `hour` is `undefined`
     */
    constructor(hour?: number | null | undefined, minute?: number | null | undefined, second?: number | null | undefined);
    /**
     * Sends `Date` of `this` time constructor to `console.log()`. Use this function before any other function in a chain
     * @returns `this`
     */
    test(): this;
    /**
     * Execute your code on a monthly basis
     * @param callback Code to execute
     * @param date Day of the month to set interval at. Returns current day if `undefined`
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    monthly(callback: (...args: Array<any>) => void, date?: number, ...args: Array<any>): NodeJS.Timeout;
    /**
     * Execute your code on a weekly basis
     * @param callback Code to execute
     * @param day Day of the week to set interval. Returns current day if `undefined`
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    weekly(callback: (...args: Array<any>) => void, day?: number | string, ...args: Array<any>): NodeJS.Timeout;
    /**
     * Execute your code on a daily basis
     * @param callback Code to execute
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    daily(callback: (...args: Array<any>) => void, ...args: Array<any>): NodeJS.Timeout;
    /**
     * Execute your code on an hourly basis
     * @param callback Code to execute
     * @param args Arguments to pass into the `callback`
     * @returns class `NodeJS.Timeout`
     */
    hourly(callback: (...args: Array<any>) => void, minute?: number, second?: number, ...args: Array<any>): NodeJS.Timeout;
}
