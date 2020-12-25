import LinkedList from './linked-list.js';
import { isFunction } from '../utils.js';

/**
 * 数据结构 - 有序链表
 * @extends LinkedList
 */
class SortedLinkedList extends LinkedList {
  /**
   * 排序函数
   * @protected
   */
  sortFn = () => {}

  constructor(equalsFn, sortFn = (a, b) => a - b) {
    super(equalsFn);
    if (!isFunction(sortFn)) throw new TypeError(`${sortFn} isn't function`);
    this.sortFn = sortFn;
  }

  /**
   * 插入节点
   * @public
   * @override
   * @param {any} element 待插入值
   * @returns {Object} 插入新值后的链表
   */
  push(element) {
    return this.insert(element);
  }

  /**
   * 插入节点
   * @public
   * @override
   * @param {any} element 待插入值
   * @returns {Object} 插入新值后的链表
   */
  insert(element) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    const index = this.#getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  /**
   * 根据待插入的值和排序函数找到插入的指针
   * @private
   * @param {any} element 待排序的值
   * @returns {number} 指针
   */
  #getIndexNextSortedElement(element) {
    let current = this.head;
    let index = 0;

    while(!current.next) {
      index += 1;
      if (this.sortFn(element, current.value) <= 0) {
        break;
      }
      current = current.next;
    }

    return index;
  }
}

export default SortedLinkedList;
