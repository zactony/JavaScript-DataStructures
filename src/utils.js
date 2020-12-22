/**
 * @authors zactony (zactony@outlook.com)
 * @date 2020/12/17
 * @describe 公共函数库
 */

/**
 * 获取传入值的类型
 * @param value {any}
 * @returns {string}
 */
const getValueType = (value) => Object.prototype.toString.call(value);

/**
 * 检测是否是 undefined 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isUndefined = (value) => getValueType(value) === '[object Undefined]';

/**
 * 检测是否是 Symbol 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isSymbol = (value) => getValueType(value) === '[object Symbol]';

/**
 * 检测是否是 Function 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isFunction = (value) => getValueType(value) === '[object Function]';

/**
 * 检测是否是 Number 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isNumber = (value) => getValueType(value) === '[object Number]';

/**
 * 检测是否是 Object 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isObject = (value) => getValueType(value) === '[object Object]';

/**
 * 检测是否是 Set 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isSet = (value) => getValueType(value) === '[object Set]';

/**
 * 比较传入值是否相等
 * @param a {*}
 * @param b {*}
 * @returns {boolean}
 */
export const defaultEquals = (a, b) => a === b;

/**
 * 检测对象是否是空对象
 * @param obj {object} 待检测对象
 * @throws {TypeError} 参数必须是 object 类型
 * @returns {boolean} 对象是否为空
 */
export const objectIsEmpty = (obj) => {
  if (!isObject(obj)) throw new TypeError('obj params must be object type');

  return !Object.keys(obj).length;
};
