import { BALANCE_FACTOR, CompareEnum, isNull } from '../utils.js';
import BinarySearchTree from './binary-search-tree.js';

/**
 * 数据结构 - 二叉平衡树
 * @public
 * @extends BinarySearchTree
 */
class AVLTree extends BinarySearchTree {
  /**
   * 插入新键
   * @protected
   * @override
   * @param node {Node} 节点
   * @param key {number} 键
   * @returns {Node}
   */
  insertNode(node, key) {
    let temp = super.insertNode(node, key);

    /**
     * 第一种情况：当左树不平衡的情况下
     *    判断左子树的键和插入键的大小，如果小于插入键则表示右子树发生了倾斜，
     *    调用向左双旋转；否则左子树发生了倾斜调用向右单旋转
     *
     * 第二种情况：当右树不平衡的情况下
     *    判断右子树的键和插入键的大小，如果小于插入键则表示右子树发生了倾斜，
     *    调用向左双旋转；否则左子树发生了倾斜调用向右单旋转
     */
    const balanceFactor = this.getBalanceFactor(temp);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT) {
      if (this.compareFn(temp.left.key, key) === CompareEnum.AEC) {
        temp = AVLTree.rotationLL(temp);
      } else {
        return AVLTree.rotationLR(temp);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT) {
      if (this.compareFn(temp.right.key, key) === CompareEnum.DESC) {
        temp = AVLTree.rotationRR(temp);
      } else {
        return AVLTree.rotationRL(temp);
      }
    }

    return temp;
  }

  /**
   * 移除键
   * @protected
   * @override
   * @param node {Node} 节点
   * @param key {number} 键
   * @returns {Node} 节点
   */
  removeNode(node, key) {
    const temp = super.removeNode(node, key);

    if (isNull(temp)) return temp;

    /**
     * 第一种情况：当左树移除节点后造成了不平衡
     *    首先计算左子树的平衡因子，如果左子树处于向左不平衡的状态，则使用向右单旋转；
     *    如果左子树处于向右不平衡的状态，则使用向左双旋转
     *
     * 第二种情况：当右树移除节点后造成了不平衡
     *    首先计算右子树的平衡因子，如果右子树处于向右不平衡的状态，则使用向左单旋转；
     *    如果左子树处于向右不平衡的状态，则使用向右双旋转
     */
    const balanceFactor = this.getBalanceFactor(temp);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(temp.left);

      if (
        balanceFactorLeft === BALANCE_FACTOR.BALANCED
        || balanceFactorLeft === BALANCE_FACTOR.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return AVLTree.rotationLL(temp);
      }

      if (balanceFactorLeft === BALANCE_FACTOR.SLIGHTLY_UNBALANCED_RIGHT) {
        return AVLTree.rotationLR(temp.left);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(temp.right);

      if (
        balanceFactorRight === BALANCE_FACTOR.BALANCED
        || balanceFactorRight === BALANCE_FACTOR.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return AVLTree.rotationRR(temp);
      }

      if (balanceFactorRight === BALANCE_FACTOR.SLIGHTLY_UNBALANCED_LEFT) {
        return AVLTree.rotationRL(temp.right);
      }
    }

    return temp;
  }

  /**
   * 向右单旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  static rotationLL(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  /**
   * 向左单旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  static rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  /**
   * 向左双旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  static rotationLR(node) {
    node.left = AVLTree.rotationRR(node.left);
    return AVLTree.rotationLL(node);
  }

  /**
   * 向右双旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  static rotationRL(node) {
    node.right = AVLTree.rotationLL(node.right);
    return AVLTree.rotationRR(node);
  }

  /**
   * 获取节点的平衡因子
   * @private
   * @param node {Node} 节点
   * @returns {number}
   */
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BALANCE_FACTOR.UNBALANCED_RIGHT;
      case -1:
        return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BALANCE_FACTOR.UNBALANCED_LEFT;
      default:
        return BALANCE_FACTOR.BALANCED;
    }
  }

  /**
   * 获取节点高度
   * @private
   * @param node {Node} 节点
   * @returns {number}
   */
  getNodeHeight(node) {
    if (isNull(node)) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }
}

export default AVLTree;
