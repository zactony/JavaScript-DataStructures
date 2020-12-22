import { isFunction, isObject } from '../utils.js';

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
   * 集合字符串化
   * @returns {string} 集合字符串
   */
  toString() {
    return Object.values(this.#items).join(',');
  }

  /**
   * 检测传入的参数是否是 Set 类型
   * @private
   * @param set {any} 待检测参数
   * @returns {boolean} 参数是否是 Set 类型
   */
  #isSetType(set) {
    return Object.prototype.toString.call(set) === '[object Set]'
  }
}

export default Set;
