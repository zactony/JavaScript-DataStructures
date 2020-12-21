import LinkedList from './linkedList.js';
import { Node } from './node.js';
import { isNumber } from '../utils.js';

/**
 * 数据结构 - 循环列表
 * @extends LinkedList
 */
class CircularLinkedList extends LinkedList {
  /**
   * 指定指针处新增节点
   * @public
   * @override
   * @param element {any} 待插入的值
   * @param index {number} 待插入值的指针
   * @throws {TypeError} index 参数必须是 number 类型
   * @returns {Object} 新增节点后的链表
   */
  insert(element, index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number type`);
    if (index < 0 || index > this.size()) return false;
    const node = new Node(element);

    if (!index) {
      if (this.isEmpty()) {
        this.head = node;
        node.next = this.head;
      } else {
        node.next = this.head;
        const tail = this.getElementAt(this.size() - 1);
        tail.next = node;
        this.head = node;
      }
    } else {
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }

    this.count += 1;
    return this.head;
  }

  /**
   * 根据指定指针移除具体节点
   * @public
   * @override
   * @param index {number} 指定指针
   * @throws {TypeError} 参数必须是 number 类型
   * @returns {Object} 移除的节点
   */
  removeAt(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number type`);

    if (index < 0 || index >= this.size()) return false;
    let current = this.head;

    if (!index) {
      if (this.size() === 1) {
        this.head = {};
      } else {
        const tail = this.getElementAt(this.size() - 1);
        this.head = current.next;
        tail.next = this.head;
      }
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }

    this.count -= 1;
    return current;
  }
}

export default CircularLinkedList;
