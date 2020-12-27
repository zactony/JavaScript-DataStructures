import {
  isFunction, isNumber, isObject,
} from '../utils.js';
import ValuePair from '../Dictionary/value-pair.js';

/** 数据结构 - 散列表 */
class HashTable {
  /**
   * 散列表
   * @protected
   * @type {Object}
   */
  items = {}

  /**
   * 新增散列值
   * @public
   * @param key {any} 键
   * @param value {any} 值
   * @throws {TypeError} 参数key必须是基本数据类型
   * @return {boolean} 新增是否成功
   */
  put(key, value) {
    this.items[HashTable.generateHashCode(key)] = new ValuePair(key, value);
    return true;
  }

  /**
   * 移除散列值
   * @public
   * @param key {any} 键
   * @throws {TypeError} 参数必须是基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  remove(key) {
    const hashCode = HashTable.generateHashCode(key);
    const value = this.items[hashCode];
    delete this.items[hashCode];
    return value;
  }

  /**
   * 根据key获取对应的散列值
   * @public
   * @param key {any} 键
   * @throws {TypeError} 参数必须是基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  get(key) {
    return this.items[HashTable.generateHashCode(key)];
  }

  /**
   * 清空散列表
   * @public
   */
  clear() {
    this.items = {};
  }

  /**
   * 散列表是否为空
   * @public
   * @return {boolean} 是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 散列表的长度
   * @public
   * @return {number} 长度
   */
  size() {
    return Object.keys(this.items).length;
  }

  /**
   * 字符串化散列表
   * @public
   * @return {string}
   */
  toString() {
    if (this.isEmpty()) return '';
    return Object
      .entries(this.items)
      .map(([hashCode, valuePair]) => `{${hashCode} => [${valuePair.toString()}]}`)
      .join(',');
  }

  /**
   * Hash 传入的字符串参数
   * @public
   * @static
   * @param key {any} 键
   * @throws {TypeError} 参数必须是基本数据类型
   * @return {number} hash后的键名
   */
  static generateHashCode(key) {
    if (isFunction(key) || isObject(key)) throw new TypeError(`${key} isn't primitive value`);
    if (isNumber(key)) return key;
    const str = String(key);
    const seed = 3131;
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash * seed) + str.charCodeAt(i);
    }
    return hash;
  }
}

export default HashTable;
