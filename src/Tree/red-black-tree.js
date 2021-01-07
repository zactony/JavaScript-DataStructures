import {
  COLOR, isNull, isNumber,
} from '../utils.js';
import AVLTree from './avl-tree.js';
import { RedBlackNode } from './node.js';

/**
 * 数据结构 - 红黑树
 * @public
 * @extends AVLTree
 */
class RedBlackTree extends AVLTree {
  /**
   * 插入节点
   * @public
   * @override
   * @throws {TypeError} 参数必须是number
   * @param key {number}
   */
  insert(key) {
    if (!isNumber(key)) throw new TypeError(`${key} isn't number`);
    if (isNull(this.root)) {
      this.root = new RedBlackNode(key);
      this.root.color = COLOR.BLACK;
    } else {
      const node = this.#insertNode(this.root, key);
      this.#fixTreeProperties(node);
    }
  }

  /**
   * 插入节点
   * @private
   * @param node {RedBlackNode} 红黑树节点对象
   * @param key {number} 键
   * @returns {RedBlackNode} 红黑树节点对象
   */
  #insertNode(node, key) {
    if (this.compareFn(node.key, key) === CompareEnum.AEC) {
      if (isNull(node.left)) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.#insertNode(node.left, key)
      }
    } else if (isNull(node.right)) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    } else {
      return this.#insertNode(node.right, key)
    }
  }

  /**
   * @private
   * @param node {RedBlackNode} 红黑树节点对象
   */
  #fixTreeProperties(node) {
    while(node && node.parent && node.parent.isRed() && node.isRed()) {
      let parent = node.parent
      const grandParent = parent.parent

      // A: 父节点是左侧节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right
        // 1A: 叔节点也是红色 重新填色即可
        if (uncle && uncle.isRed()) {
          grandParent.color= COLOR.RED
          parent.color = COLOR.BLACK
          uncle.color = COLOR.BLACK
          node = grandParent
        } else {
          // 2A: 节点是右侧子节点 左旋转
          if (node === parent.right) {
            this.#rotationRR(parent)
            node = parent
            parent = node.parent
          }

          // 3A: 节点是左侧子节点 右旋转
          this.#rotationLL(grandParent)
          parent.color = COLOR.BLACK
          grandParent.color = COLOR.RED
          node = parent
        }
      } else {
        // B: 父节点是右侧子节点
        const uncle = grandParent.left

        // 1B: 叔节点也是红色 重新填色即可
        if (uncle && uncle.isRed()) {
          grandParent.color = COLOR.RED
          parent.color = COLOR.BLACK
          uncle.color = COLOR.BLACK
          node = grandParent
        } else {
          // 2B: 节点是左侧子节点 右旋转
          if (node === parent.left) {
            this.#rotationLL(parent)
            node = parent
            parent = node.parent
          }

          // 3B: 节点是右侧子节点 左旋转
          this.#rotationRR(grandParent)
          parent.color = COLOR.BLACK
          grandParent.color = COLOR.RED
          node = parent
        }
      }
    }
    this.root.color = COLOR.BLACK
  }

  /**
   * 向右单旋转
   * @private
   * @override
   * @param node {RedBlackNode} 红黑树节点对象
   */
  #rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right

    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }

    tmp.parent = node.parent

    if (!node.parent) {
      this.root = tmp
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }

    tmp.right = node
    node.parent = tmp
  }

  /**
   * 向左单旋转
   * @private
   * @override
   * @param node {RedBlackNode} 红黑树节点对象
   */
  #rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left

    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }

    tmp.parent = node.parent

    if (!node.parent) {
      this.root = tmp
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }

    tmp.left = node
    node.parent = tmp
  }
}

export default RedBlackTree;
