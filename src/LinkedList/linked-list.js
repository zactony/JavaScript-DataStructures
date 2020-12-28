import { Node } from './node.js';
import {
  defaultEquals, isNumber, isSymbol,
} from '../utils.js';

/**
 * 数据结构 - 链表
 * @public
 */
class LinkedList {
  /**
   * 链表长度
   * @protected
   * @type {number}
   */
  count = 0

  /**
   * 链表存储的内容
   * @protected
   * @type {Object}
   */
  head = undefined

  /**
   * 链表值比较函数
   * @protected
   * @type {Function}
   */
  equalsFn = defaultEquals

  /**
   * 空指针
   * @protected
   * @constant
   * @readonly
   * @type {number}
   */
  NULL_INDEX = -1

  /**
   * 链表新增一个节点
   * @param element {any} 待新增的值
   * @returns {Object} 新增节点后的链表
   */
  push(element) {
    const node = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.count += 1;
    return { ...this.head };
  }

  /**
   * 获取传入值在链表中的指针
   * @public
   * @param element {any} 需要查询的值
   * @returns {number} 指针
   */
  indexOf(element) {
    let value = this.NULL_INDEX;
    if (this.isEmpty()) return value;
    let current = this.head;
    let searchIndex = this.size();

    while (searchIndex > 0) {
      value += 1;
      if (this.equalsFn(current.value, element)) break;
      searchIndex -= 1;
      current = current.next;
    }

    return value;
  }

  /**
   * 根据指针找到对应的链表
   * @public
   * @param index {number} 需要查询的指针
   * @throws {TypeError} 查询参数必须是 number 类型
   * @returns {undefined | Object} 指针超出范围返回前者，否则返回对应的链表
   */
  getElementAt(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    if (index < 0 || index >= this.size()) return undefined;
    let current = this.head;
    let searchIndex = index;

    while (searchIndex > 0) {
      current = current.next;
      searchIndex -= 1;
    }
    return current;
  }

  /**
   * 指定指针处插入值
   * @public
   * @param element {any} 待插入的值
   * @param index {number} 待插入值的指针
   * @throws {TypeError} index 参数必须是 number 类型
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回新增后的链表
   */
  insert(element, index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    if (index < 0 || index > this.size()) return false;
    const node = new Node(element);
    if (!index) {
      node.next = this.head;
      this.head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }

    this.count += 1;
    return { ...this.head };
  }

  /**
   * 移除链表上具体值
   * @public
   * @param element {any} 待移除的值
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回对应的链表
   */
  remove(element) {
    return this.removeAt(this.indexOf(element));
  }

  /**
   * 根据指定指针移除具体值
   * @public
   * @param index {number} 指定指针
   * @throws {TypeError} 参数必须是 number 类型
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回对应的链表
   */
  removeAt(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);

    if (index < 0 || index >= this.size()) return false;
    let current = this.head;

    if (!index) {
      this.head = current.next;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }

    this.count -= 1;
    return { ...current };
  }

  /**
   * 获取整个链表
   */
  getLinkedList() {
    return this.head;
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
    this.head = {};
  }

  /**
   * 将栈转换为字符串
   * @public
   * @returns {string} 字符串栈值
   */
  toString() {
    let value = '';

    if (!this.isEmpty()) {
      let current = this.head;
      let searchIndex = this.size();

      while (searchIndex > 0) {
        value += isSymbol(current.value) ? '' : `,${current.value}`;
        current = current.next;
        searchIndex -= 1;
      }
    }

    return value;
  }
}

export default LinkedList;
