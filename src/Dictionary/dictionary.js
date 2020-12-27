import { isFunction, isObject, isSymbol } from '../utils.js';
import ValuePair from './value-pair.js';

/** 数据结构 - 字典 */
class Dictionary {
  /**
   * 字典
   * @private
   * @type {Object}
   */
  #items = {}

  /**
   * 字典项新增
   * @public
   * @param key {any} 键
   * @param value {any} 值
   * @returns {boolean} 新增一个字典项是否成功
   */
  set(key, value) {
    const stringKey = Dictionary.keyToString(key);
    this.#items[stringKey] = new ValuePair(key, value);
    return true;
  }

  /**
   * 字典项删除
   * @public
   * @param key {any} 待删除字典的键名
   * @throws {Error} 字典没有该键名
   * @returns {any} 返回对应的字典
   */
  remove(key) {
    const stringKey = Dictionary.keyToString(key);
    if (!this.has(stringKey)) throw new Error(`${key} doesn't exist`);
    const value = this.#items[stringKey];
    delete this.#items[stringKey];
    return value;
  }

  /**
   * 检测字典是否存在该键
   * @public
   * @param key {any} 待检测键名
   * @returns {boolean} 是否存在
   */
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.#items, key);
  }

  /**
   * 获取字典项
   * @public
   * @param key {any} 待获取字典的键名
   * @throws {Error} 字典没有该键名
   * @returns {any} 返回对应的字典
   */
  get(key) {
    const stringKey = Dictionary.keyToString(key);
    if (!this.has(stringKey)) throw new Error(`${key} doesn't exist`);
    return this.#items[stringKey];
  }

  /**
   * 获取字典键数组
   * @public
   * @returns {Array} 键数组
   */
  keys() {
    return this.#values().map(({ key }) => key);
  }

  /**
   * 获取字典值数组
   * @public
   * @returns {Array} 值数组
   */
  values() {
    return this.#values().map(({ value }) => value);
  }

  /**
   * 获取字典键值对数组
   * @public
   * @returns {Array} 键值对数组
   */
  entries() {
    return this.#values().map(({ key, value }) => [key, value]);
  }

  /**
   * 字典是否为空
   * @public
   * @returns {boolean} 是否为空
   */
  isEmpty() {
    return !this.size;
  }

  /**
   * 字典的长度
   * @public
   * @returns {number} 长度
   */
  size() {
    return this.keys().length;
  }

  /**
   * 清空字典
   * @public
   */
  clear() {
    this.#items = {};
  }

  /**
   * 字典字符串化
   * @public
   * @returns {string} 字典字符串
   */
  toString() {
    let value = '';

    if (!this.isEmpty()) {
      value = this.values().filter((item) => !isSymbol(item)).join(',');
    }
    return value;
  }

  /**
   * 获取字典所有值
   * @public
   * @returns {Array<Object>} 对象数组
   */
  #values() {
    return Object.values(this.#items);
  }

  /**
   * 将传入的键名字符串化
   * @public
   * @static
   * @param key {any} 需要处理的键名
   * @throws {TypeError} 参数必须是基本数据类型
   * @returns {string} 字符串化后的键名
   */
  static keyToString(key) {
    if (isFunction(key) || isObject(key)) throw new TypeError(`${key} isn't primitive value`);
    if (key === undefined) return 'UNDEFINED';
    if (key === null) return 'NULL';
    return key.toString().toUpperCase();
  }
}

export default Dictionary;
