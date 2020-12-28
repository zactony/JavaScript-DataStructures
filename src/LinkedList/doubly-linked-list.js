import { DoublyNode } from './node.js';
import LinkedList from './linked-list.js';
import { isNumber } from '../utils.js';

/**
 * 数据结构 - 双端列表
 * @public
 * @extends LinkedList
 */
class DoublyLinkedList extends LinkedList {
  /**
   * 链表尾部存储的内容
   * @protected
   * @type {Object}
   */
  tail = {}

  /**
   * 指定指针处新增节点
   * @public
   * @override
   * @param element {any} 待新增的值
   * @param index {number} 待新增值的指针
   * @throws {TypeError} index 参数必须是 number 类型
   * @returns {boolean | Object} 指针超出范围返回前者，否则返回新增后的链表
   */
  insert(element, index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    if (index < 0 || index > this.size()) return false;
    const doublyNode = new DoublyNode(element);
    let current = this.head;

    /**
     * 第一种情况：如果插入的指针为 0 且链表为空，则直接赋值
     * 第二种情况：如果插入的指针为 0 且链表不为空，则当前头部
     *            节点和待插入的节点互相链接，最后更新整个链表
     * 第三种情况：如果插入的指针等于链表的长度，则将尾部节点和
     *            待插入的节点互相链接，最后更新链表尾部属性
     * 第四种情况：如果插入的指针在链表的范围内，则找到当前指针
     *            存储的节点，然后前序节点、待插入节点、当前节点
     *            三者互相链接
     */

    if (!index) {
      if (this.isEmpty()) {
        this.head = doublyNode;
        this.tail = doublyNode;
      } else {
        current.prev = doublyNode;
        doublyNode.next = current;
        this.head = doublyNode;
      }
    } else if (index === this.count) {
      current = this.tail;
      current.next = doublyNode;
      doublyNode.prev = current;
      this.tail = doublyNode;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      doublyNode.next = current;
      previous.next = doublyNode;
      current.prev = doublyNode;
      doublyNode.prev = previous;
    }

    this.count += 1;
    return { ...this.head };
  }

  /**
   * 根据指定指针移除节点
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
     * 第一种情况：如果删除的指针为 0 ，则头部的引用改为下一个节点，
     *            同时删除下一个节点的前序引用。如果此时链表的长度
     *            为 1，同时删除尾部引用
     * 第二种情况：如果删除的指针为链表的最后一位，则直接操作尾部引用，
     *            将自身的引用改为前序节点，同时将自身的后续节点重置
     * 第三种情况：如果删除的指针为中间，则找到对应的指针节点，接着操作
     *            对应节点的前序和后续节点，让前序和后续节点相互链接
     *
     */

    if (!index) {
      this.head = current.next;
      this.head.prev = undefined;

      if (this.size() === 1) {
        this.tail = undefined;
      }
    } else if (index === this.size() - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {
      current = this.getElementAt(index);
      const previous = current.prev;
      const { next } = current;

      previous.next = next;
      next.prev = previous;
    }
    this.count -= 1;
    return { ...current };
  }
}

export default DoublyLinkedList;
