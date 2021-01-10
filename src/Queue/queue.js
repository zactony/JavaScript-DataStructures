import { isSymbol } from '../utils.js';

/**
 * 数据格式 - 队列
 * @public
 */
class Queue {
  /**
   * 队列长度
   * @protected
   * @type {number}
   */
  count = 0

  /**
   * 队列
   * @protected
   * @type {Object}
   */
  items = {}

  /**
   * 队列最前端的指针
   * @protected
   * @type {number}
   */
  lowestIndex = 0

  /**
   * 队列新增一个数据
   * @public
   * @param element {any} 待新增的值
   * @returns {Object} 新增后的队列
   */
  push(element) {
    this.items[this.count] = element;
    this.count += 1;

    return { ...this.items };
  }

  /**
   * 队列前端删除一个数据
   * @public
   * @returns {undefined | *} 队列为空删除值为前者，不为空删除对应的值
   */
  shift() {
    if (this.isEmpty()) return undefined;
    const value = this.items[this.lowestIndex];
    delete this.items[this.lowestIndex];
    this.count -= 1;
    this.lowestIndex += 1;

    return value;
  }

  /**
   * 获取队列前端存储的值
   * @public
   * @returns {undefined | *} 队列为空返回前者，不为空返回对应的值
   */
  peek() {
    if (this.isEmpty()) return undefined;

    return this.items[this.lowestIndex];
  }

  /**
   * 检测队列是否为空
   * @public
   * @returns {boolean} 队列是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 获取队列的长度
   * @public
   * @returns {number} 队列长度
   */
  size() {
    return this.count;
  }

  /**
   * 清空队列
   * @public
   */
  clear() {
    this.count = 0;
    this.items = {};
    this.lowestIndex = 0;
  }

  /**
   * 将队列转换为字符串
   * @public
   * @returns {string} 字符串队列值
   */
  toString() {
    return Object.values(this.items).map((value) => (isSymbol(value) ? '' : value)).join(',');
  }
}

export default Queue;
