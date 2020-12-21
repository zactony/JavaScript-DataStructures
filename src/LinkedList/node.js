/* eslint-disable max-classes-per-file */

/**
 * @private
 */
export class Node {
  /**
   * 初始化节点的值
   * @protected
   * @type {undefined}
   */
  value = undefined

  /**
   * 下一个节点的索引
   * @protected
   * @type {undefined}
   */
  next = undefined

  constructor(element) {
    this.value = element;
  }
}

/**
 * @private
 */
export class DoublyNode extends Node {
  /**
   * 前一个节点的索引
   * @protected
   * @type {undefined}
   */
  prev = undefined
}
