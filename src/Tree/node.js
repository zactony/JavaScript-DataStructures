/* eslint-disable max-classes-per-file */

/**
 * @private
 */
class Node {
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

export default Node;
