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

  insert(key) {
    if (!this.root) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

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

  search(key) {
    return this.searchNode(key);
  }

  searchNode(node, key) {
    if (!node) return false;
    if (this.compareFn(node.key, key) === CompareEnum.NORMAL) return true;
    if (this.compareFn(node.key, key) === CompareEnum.AEC) {
      return this.searchNode(node.left, key);
    }
    return this.searchNode(node.right, key);
  }

  min() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  max() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  inorderTraverse(callback) {
    this.inorderTraverseNode(this.root, callback);
  }

  inorderTraverseNode(node, callback) {
    if (node) {
      this.inorderTraverseNode(node.left, callback);
      callback(node.key);
      this.inorderTraverseNode(node.right, callback);
    }
  }

  preorderTraversal(callback) {
    this.preorderTraversalNode(this.root, callback);
  }

  preorderTraversalNode(node, callback) {
    if (node) {
      callback(node.key);
      this.preorderTraversalNode(node.left, callback);
      this.preorderTraversalNode(node.right, callback);
    }
  }

  postorderTraversal(callback) {
    this.postorderTraversalNode(this.root, callback);
  }

  postorderTraversalNode(node, callback) {
    if (node) {
      this.postorderTraversalNode(node.left, callback);
      this.postorderTraversalNode(node.right, callback);
      callback(node.key);
    }
  }
}

export default BinarySearchTree;
