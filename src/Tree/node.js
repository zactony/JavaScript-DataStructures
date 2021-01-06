/* eslint-disable max-classes-per-file */

import { COLOR } from '../utils.js';

/**
 * @private
 */
export class Node {
  /**
   * 左侧键索引
   * @public
   * @type {Node}
   */
  left = null

  /**
   * 右侧键索引
   * @public
   * @type {Node}
   */
  right = null

  constructor(key) {
    this.key = key;
  }
}

export class RedBlackNode extends Node {
  /**
   * 颜色属性
   * @public
   */
  color = COLOR.RED

  /**
   * 父节点索引
   */
  parent = null

  isRed() {
    return this.color === COLOR.RED;
  }
}
