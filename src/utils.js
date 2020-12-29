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
 * 检测是否是 String 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isString = (value) => getValueType(value) === '[object String]';

/**
 * 检测是否是 null 类型
 * @param value {any}
 * @returns {boolean}
 */
export const isNull = (value) => getValueType(value) === '[object Null]';

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

/**
 * 比较结果的枚举值
 * @enum
 */
export const CompareEnum = {
  DESC: -1,
  AEC: 1,
  NORMAL: 0,
};

/**
 * 比较参数的大小
 * @param a {any}
 * @param b {any}
 * @returns {number}
 */
export const defaultCompare = (a, b) => {
  if (a === b) return CompareEnum.NORMAL;
  return a > b ? CompareEnum.AEC : CompareEnum.DESC;
};

/**
 * 平衡因子
 * @enum
 */
export const BALANCE_FACTOR = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};
