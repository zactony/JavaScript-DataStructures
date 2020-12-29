import { BALANCE_FACTOR, CompareEnum, isNull } from '../utils.js';
import BinarySearchTree from './binary-search-tree.js';

/**
 * 数据结构 - 二叉平衡树
 * @public
 * @extends BinarySearchTree
 */
class AdelsonVelskiiLandiTree extends BinarySearchTree {
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

    const balanceFactor = this.#getBalanceFactor(temp);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT) {
      if (this.compareFn(temp.left.key, key) === CompareEnum.AEC) {
        temp = this.#rotationLL(temp);
      } else {
        return this.#rotationLR(temp);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT) {
      if (this.compareFn(temp.right.key, key) === CompareEnum.DESC) {
        temp = this.#rotationRR(temp);
      } else {
        return this.#rotationRL(temp);
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
    const balanceFactor = this.#getBalanceFactor(temp);
    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.#getBalanceFactor(temp.left);

      if (
        balanceFactorLeft === CompareEnum.BALANCED
        || balanceFactorLeft === CompareEnum.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.#rotationLL(temp);
      }

      if (balanceFactorLeft === CompareEnum.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.#rotationLR(temp.left);
      }
    }

    if (balanceFactor === BALANCE_FACTOR.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.#getBalanceFactor(temp.right);

      if (
        balanceFactorRight === CompareEnum.BALANCED
        || balanceFactorRight === CompareEnum.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.#rotationRR(temp);
      }

      if (balanceFactorRight === CompareEnum.SLIGHTLY_UNBALANCED_LEFT) {
        return this.#rotationRL(temp.right);
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
  #rotationLL(node) {
    const temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }

  /**
   * 向左单旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  #rotationRR(node) {
    const temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }

  /**
   * 向左双旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  #rotationLR(node) {
    node.left = this.#rotationRR(node.left)
    return this.#rotationLL(node)
  }

  /**
   * 向右双旋转
   * @private
   * @param node {Node} 节点
   * @returns {Node}
   */
  #rotationRL(node) {
    node.right = this.#rotationLL(node.right)
    return this.#rotationRR(node)
  }

  /**
   * 获取节点的平衡因子
   * @private
   * @param node {Node} 节点
   * @returns {number}
   */
  #getBalanceFactor(node) {
    const heightDifference = this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BALANCE_FACTOR.UNBALANCED_RIGHT
      case -1:
        return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BALANCE_FACTOR.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BALANCE_FACTOR.UNBALANCED_LEFT
      default:
        return BALANCE_FACTOR.BALANCED
    }
  }

  /**
   * 获取节点高度
   * @private
   * @param node {Node} 节点
   * @returns {number}
   */
  #getNodeHeight(node) {
    if (isNull(node)) {
      return -1
    }
    return Math.max(this.#getNodeHeight(node.left), this.#getNodeHeight(node.right)) + 1
  }
}

export default AdelsonVelskiiLandiTree;
