import {
  CompareEnum, defaultCompare, isNull, isNumber,
} from '../utils.js';
import { Node } from './node.js';

/**
 * 数据结构 - 二叉搜索树
 * @public
 */
class BinarySearchTree {
  /**
   * 根节点
   * @protected
   * @type {Object}
   */
  root = null

  /**
   * 比较函数
   * @protected
   * @type {Function}
   */
  compareFn = defaultCompare

  /**
   * 插入新键
   * @public
   * @throws {TypeError} 参数必须是number
   * @param key {number} 键
   */
  insert(key) {
    if (!isNumber(key)) throw new TypeError(`${key} isn't number`);
    this.root = this.insertNode(this.root, key);
  }

  /**
   * 插入新键
   * @protected
   * @param node {Node} 节点
   * @param key {number} 键
   */
  insertNode(node, key) {
    const temp = node;
    if (isNull(temp)) {
      return new Node(key);
    } if (this.compareFn(temp.key, key) === CompareEnum.AEC) {
      temp.left = this.insertNode(temp.left, key);
    } else if (this.compareFn(temp.key, key) === CompareEnum.DESC) {
      temp.right = this.insertNode(temp.right, key);
    }

    return temp;
  }

  /**
   * 搜索键
   * @public
   * @param key {number} 键
   * @returns {boolean} 是否存在
   */
  search(key) {
    return this.searchNode(this.root, key);
  }

  /**
   * 搜索键
   * @protected
   * @param node {Node} 节点
   * @param key {number} 键
   * @returns {boolean} 是否存在
   */
  searchNode(node, key) {
    if (isNull(node)) return false;
    if (this.compareFn(node.key, key) === CompareEnum.NORMAL) return true;
    if (this.compareFn(node.key, key) === CompareEnum.AEC) {
      return this.searchNode(node.left, key);
    }
    return this.searchNode(node.right, key);
  }

  /**
   * 移除键
   * @public
   * @param key {number} 键
   */
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  /**
   * 移除键
   * @protected
   * @param node {Node} 节点
   * @param key {number} 键
   * @returns {Node} 节点
   */
  removeNode(node, key) {
    if (isNull(node)) return null;
    let temp = node;

    /**
     * 第一种情况：当前节点键大于待删除键，则对当前节点的左树递归调用重新赋值
     * 第二种情况：当前节点键小于待删除键，则对当前节点的右树递归调用重新赋值
     * 第三种情况：当前节点键等于待删除键
     *    第一种：当前节点左树和右树都为空，则直接将当前节点重新赋值为空，然后返回节点
     *    第二种：当前节点左树为空，则直接将右树提前作为新的当前节点，然后返回新节点
     *    第三种：当前节点右树为空，则直接将左树提前作为新的当前节点，然后返回新节点
     *    第四种：当前节点的左右树都不为空，将右树最小键提出来作为当前节点的新键，然后
     *           重新对右树递归删除重复的键
     */
    if (this.compareFn(temp.key, key) === CompareEnum.AEC) {
      temp.left = this.removeNode(temp.left, key);
      return temp;
    }

    if (this.compareFn(temp.key, key) === CompareEnum.DESC) {
      temp.right = this.removeNode(temp.right, key);
      return temp;
    }

    if (isNull(temp.left) && isNull(temp.right)) {
      temp = null;
      return temp;
    }

    if (isNull(temp.left)) {
      temp = temp.right;
      return temp;
    }

    if (isNull(temp.right)) {
      temp = temp.left;
      return temp;
    }

    const aux = BinarySearchTree.minNode(node.right);
    temp.key = aux;
    temp.right = this.removeNode(node.right, aux);

    return temp;
  }

  /**
   * 获取最小键
   * @public
   * @returns {number} 键
   */
  min() {
    return BinarySearchTree.minNode(this.root);
  }

  /**
   * 获取最小键
   * @static
   * @param node {Node} 节点
   * @returns {number} 键
   */
  static minNode(node) {
    let current = node;
    while (current && current.left) {
      current = current.left;
    }
    return current.key;
  }

  /**
   * 获取最大键
   * @public
   * @returns {number} 键
   */
  max() {
    return BinarySearchTree.maxNode(this.root);
  }

  /**
   * 获取最小键
   * @static
   * @param node {Node} 节点
   * @returns {number} 键
   */
  static maxNode(node) {
    let current = node;
    while (current && current.right) {
      current = current.right;
    }
    return current.key;
  }

  /**
   * 中序遍历
   * @public
   * @param callback {Function} 回调函数
   */
  inorderTraverse(callback) {
    this.inorderTraverseNode(this.root, callback);
  }

  /**
   * 中序遍历
   * @protected
   * @param node {Node} 节点
   * @param callback {Function} 回调函数
   */
  inorderTraverseNode(node, callback) {
    if (node) {
      this.inorderTraverseNode(node.left, callback);
      callback(node.key);
      this.inorderTraverseNode(node.right, callback);
    }
  }

  /**
   * 先序遍历
   * @public
   * @param callback {Function} 回调函数
   */
  preorderTraversal(callback) {
    this.preorderTraversalNode(this.root, callback);
  }

  /**
   * 先序遍历
   * @protected
   * @param node {Node} 节点
   * @param callback {Function} 回调函数
   */
  preorderTraversalNode(node, callback) {
    if (node) {
      callback(node.key);
      this.preorderTraversalNode(node.left, callback);
      this.preorderTraversalNode(node.right, callback);
    }
  }

  /**
   * 后序遍历
   * @public
   * @param callback {Function} 回调函数
   */
  postorderTraversal(callback) {
    this.postorderTraversalNode(this.root, callback);
  }

  /**
   * 后续遍历
   * @protected
   * @param node {Node} 节点
   * @param callback {Function} 回调函数
   */
  postorderTraversalNode(node, callback) {
    if (node) {
      this.postorderTraversalNode(node.left, callback);
      this.postorderTraversalNode(node.right, callback);
      callback(node.key);
    }
  }
}

export default BinarySearchTree;
