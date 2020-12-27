import { isSymbol } from '../utils.js';

/** 数据结构 - 栈 */
class Stack {
  /**
   * 栈长度
   * @protected
   * @type {number}
   */
  count = 0

  /**
   * 栈存储的内容
   * @protected
   * @type {Object}
   */
  items = {}

  /**
   * 栈顶推入一个数据
   * @param element {any} 待推入的数据
   * @returns {Object} 推入数据后的栈
   */
  push(element) {
    this.items[this.count] = element;
    this.count += 1;

    return { ...this.items };
  }

  /**
   * 栈顶弹出一个数据
   * @public
   * @returns {undefined | *} 栈为空弹出前者，不为空弹出对应的值
   */
  pop() {
    if (this.isEmpty()) return undefined;
    this.count -= 1;
    const value = this.items[this.count];
    delete this.items[this.count];
    return value;
  }

  /**
   * 获取栈顶存储的值
   * @public
   * @returns {undefined | *} 栈为空返回前者，不为空返回对应的值
   */
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }

  /**
   * 检测栈是否为空
   * @public
   * @returns {boolean} 栈是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 获取栈的长度
   * @public
   * @returns {number} 栈长度
   */
  size() {
    return this.count;
  }

  /**
   * 清空栈
   * @public
   */
  clear() {
    this.count = 0;
    this.items = {};
  }

  /**
   * 将栈转换为字符串
   * @public
   * @returns {string} 字符串栈值
   */
  toString() {
    return Object.values(this.items).map((value) => (isSymbol(value) ? '' : value)).join(',');
  }
}

export default Stack;
