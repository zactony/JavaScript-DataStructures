import {
  isFunction, isObject, isSet, isSymbol,
} from '../utils.js';

/** 数据结构 - 集合 */
class Set {
  /**
   * 存储数据的集合
   * @private
   */
  #items= {}

  /**
   * 集合新增一个数据
   * @public
   * @param element {any} 待新增的值
   * @throws {TypeError} 参数不是基本数据类型
   * @returns {Object} 返回新增后的集合
   */
  add(element) {
    if (isFunction(element) || isObject(element)) throw new TypeError(`${element} isn't primitive value`);
    if (this.has(element)) return false;
    this.#items[element] = element;
    return { ...this.#items };
  }

  /**
   * 删除集合里面指定的值
   * @public
   * @param element {any} 待删除的值
   * @returns {boolean} 删除是否成功
   */
  delete(element) {
    if (!this.has(element)) return false;
    delete this.#items[element];
    return true;
  }

  /**
   * 检测集合是否有指定的值
   * @public
   * @param element {any} 待检测的值
   * @returns {boolean} 是否存在
   */
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.#items, element);
  }

  /**
   * 集合是否为空
   * @public
   * @returns {boolean} 是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 清空集合
   * @public
   */
  clear() {
    this.#items = {};
  }

  /**
   * 集合的长度
   * @public
   * @returns {number} 集合长度
   */
  size() {
    return Object.keys(this.#items).length;
  }

  /**
   * 获取集合所有值
   * @public
   * @returns {Array} 集合值数组
   */
  values() {
    return Object.values(this.#items);
  }

  /**
   * 集合字符串化
   * @returns {string} 集合字符串
   */
  toString() {
    let value = '';

    if (!this.isEmpty()) {
      value = this.values().filter((item) => !isSymbol(item)).join(',');
    }

    return value;
  }

  /**
   * 对传入的集合取并集
   * @public
   * @param set {Set} 传入的集合
   * @throws {TypeError} 参数必须是Set类型
   * @returns {Set} 并集
   */
  union(set) {
    if (!isSet(set)) throw new TypeError(`${set} isn't Set`);
    const value = new Set();
    this.values().map((item) => value.add(item));
    set.values().map((item) => value.add(item));
    return value;
  }

  /**
   * 对传入的集合取交集
   * @public
   * @param set {Set} 传入的集合
   * @throws {TypeError} 参数必须是Set类型
   * @returns {Set} 交集
   */
  intersection(set) {
    if (!isSet(set)) throw new TypeError(`${set} isn't Set`);
    const value = new Set();
    Object.keys(
      this.size() <= set.size()
        ? this.#items
        : set,
    )
      .map((item) => set.has(item) && value.add(item));
    return value;
  }

  /**
   * 对传入的集合取自身差集
   * @public
   * @param set {Set} 传入的集合
   * @throws {TypeError} 参数必须是Set类型
   * @returns {Set} 差集
   */
  difference(set) {
    if (!isSet(set)) throw new TypeError(`${set} isn't Set`);
    const value = new Set();

    this.values().map((item) => !set.has(item) && value.add(item));
    return value;
  }

  /**
   * 对传入的集合检测是它的子集
   * @public
   * @param set {Set} 传入的集合
   * @throws {TypeError} 参数必须是Set类型
   * @returns {boolean} 是否为子集
   */
  isSubsetOf(set) {
    if (!isSet(set)) throw new TypeError(`${set} isn't Set`);
    if (this.size() >= set.size()) return false;
    return this.values().every((item) => set.has(item));
  }
}

export default Set;
