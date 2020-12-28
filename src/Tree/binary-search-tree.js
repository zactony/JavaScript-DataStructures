import { CompareEnum, defaultCompare } from '../utils.js';
import Node from './node.js';

/** 数据结构 - 二叉搜索树 */
class BinarySearchTree {
  /**
   * 根节点
   * @protected
   * @type {Object}
   */
  root = undefined

  /**
   * 比较函数
   * @protected
   * @type {Function}
   */
  compareFn = defaultCompare

  /**
   * 插入新键
   * @public
   * @param key {number} 键
   */
  insert(key) {
    if (!this.root) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  /**
   * 插入新键
   * @private
   * @param root {BinarySearchTree} 二叉搜索树对象
   * @param key {number} 键
   */
  insertNode(root, key) {
    const node = root;
    if (this.compareFn(node.key, key) === CompareEnum.NORMAL) return;
    if (this.compareFn(node.key, key) === CompareEnum.AEC) {
      if (!node.left) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (!node.right) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
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
   * @private
   * @param node {BinarySearchTree} 二叉搜索树对象
   * @param key {number} 键
   * @returns {boolean} 是否存在
   */
  searchNode(node, key) {
    if (!node) return false;
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
   * @private
   * @param node {BinarySearchTree} 二叉搜索树对象
   * @param key {number} 键
   * @returns {BinarySearchTree} 二叉搜索树对象
   */
  removeNode(node, key) {
    if (!node) return null;
    let root = node;
    if (this.compareFn(root.key, key) === CompareEnum.AEC) {
      root.left = this.removeNode(root.left, key);
      return root;
    }

    if (this.compareFn(root.key, key) === CompareEnum.DESC) {
      root.right = this.removeNode(root.right, key);
      return root;
    }

    if (!root.left && !root.right) {
      root = null;
      return root;
    }

    if (!root.left) {
      root = root.right;
      return root;
    }

    if (!root.right) {
      root = root.left;
      return root;
    }

    const aux = this.minNode(node.right);
    root.key = aux;
    root.right = this.removeNode(node.right, aux);

    return root;
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
   * @param node {BinarySearchTree} 二叉搜索树对象
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
   * @param node {BinarySearchTree} 二叉搜索树对象
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
   * @private
   * @param node {BinarySearchTree} 二叉搜索树对象
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
   * @private
   * @param node {BinarySearchTree} 二叉搜索树对象
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
   * @private
   * @param callback {Function} 回调函数
   */
  postorderTraversal(callback) {
    this.postorderTraversalNode(this.root, callback);
  }

  /**
   * 后续遍历
   * @private
   * @param node {BinarySearchTree} 二叉搜索树对象
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
