import LinkedList from './linked-list.js';
import { Node } from './node.js';
import { isNumber } from '../utils.js';

/**
 * 数据结构 - 循环列表
 * @public
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
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回新增后的链表
   */
  insert(element, index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    if (index < 0 || index > this.size()) return false;
    const node = new Node(element);

    /**
     * 第一种情况：如果指针为零，且链表为空，则直接添加链表做好头尾相接即可
     * 第二种情况：如果指针为零，且链表不为空，首先获取到当前链表的尾部节点，
     *            然后将下级索引链接到新节点，接着新节点的下级索引链接到现
     *            有链表，然后更新存储的链表
     * 第三种情况：如果指针不为零，则需要获取到待插入位置的前一位，将新节点的
     *            下级索引链接到前者的下级索引，然后将前者的下级索引链接到新节点
     */

    if (!index) {
      if (this.isEmpty()) {
        this.head = node;
        node.next = this.head;
      } else {
        const tail = this.getElementAt(this.size() - 1);
        node.next = this.head;
        tail.next = node;
        this.head = node;
      }
    } else {
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }

    this.count += 1;
    return { ...this.head };
  }

  /**
   * 根据指定指针移除具体节点
   * @public
   * @override
   * @param index {number} 指定指针
   * @throws {TypeError} 参数必须是 number 类型
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回对应的链表
   */
  removeAt(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);

    if (index < 0 || index >= this.size()) return false;
    let current = this.head;

    /**
     * 第一种情况：如果指针为零，且链表长度为1，则直接清空当前链表
     * 第二种情况：如果指针为零，且链表长度大于1，首先获取到当前链表
     *            的尾部节点，然后链表更新头部节点，尾部节点链接到
     *            新的头部节点
     * 第三种情况：如果指针不为零，首先获取到待移除位置的前序节点，然后
     *            将前序节点的下级索引链接到待移除位置的下级索引
     */

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
    return { ...current };
  }
}

export default CircularLinkedList;
