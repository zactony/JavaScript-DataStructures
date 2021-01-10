import {
  CompareEnum, defaultCompare, isNull, isNumber,
} from '../utils.js';

/**
 * 数据结构 - 最小堆
 * @public
 */
class MinHeap {
  /**
   * 堆
   * @protected
   */
  heap = []

  /**
   * 插入节点
   * @public
   * @param value {number} 值
   * @throws {TypeError} 参数必须是number
   * @returns {boolean} 插入是否成功
   */
  insert(value) {
    if (isNull(value)) return false;
    if (!isNumber(value)) throw new TypeError(`${value} isn't number`);
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
    return true;
  }

  /**
   * 弹出最小值
   * @public
   * @returns {number} 最小值
   */
  extract() {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heap.shift();
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return value;
  }

  /**
   * 获取最小节点值
   * @public
   * @returns {any} 节点值
   */
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  /**
   * 节点上移
   * @protected
   * @param index {number} 索引
   */
  siftUp(index) {
    let parent = MinHeap.getParentIndex(index);

    while (index > 0 && defaultCompare(this.heap[parent], this.heap[index]) === CompareEnum.AEC) {
      this.swap(parent, index);
      index = parent;
      parent = MinHeap.getParentIndex(index);
    }
  }

  /**
   * 节点下移
   * @protected
   * @param index {number} 索引
   */
  siftDown(index) {
    let element = index;
    const left = MinHeap.getLeftIndex(index);
    const right = MinHeap.getRightIndex(index);
    const size = this.size();

    if (left < size && defaultCompare(this.heap[element], this.heap[left]) === CompareEnum.AEC) {
      element = left;
    }

    if (right < size && defaultCompare(this.heap[element], this.heap[right]) === CompareEnum.AEC) {
      element = right;
    }

    if (index !== element) {
      this.swap(index, element);
      this.siftDown(element);
    }
  }

  /**
   * 节点值交换
   * @protected
   * @param a {number} 索引
   * @param b {number} 索引
   */
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  /**
   * 堆长度
   * @public
   * @returns {number} 长度
   */
  size() {
    return this.heap.length;
  }

  /**
   * 堆是否为空
   * @public
   * @returns {boolean} 是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 获取左节点索引
   * @static
   * @param index {number} 当前索引
   * @returns {number} 左节点索引
   */
  static getLeftIndex(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    return 2 * index + 1;
  }

  /**
   * 获取右节点索引
   * @static
   * @param index {number} 当前索引
   * @returns {number} 右节点索引
   */
  static getRightIndex(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    return 2 * index + 2;
  }

  /**
   * 获取父节点索引
   * @static
   * @param index {number} 当前索引
   * @returns {number} 父节点索引
   */
  static getParentIndex(index) {
    if (!isNumber(index)) throw new TypeError(`${index} isn't number`);
    if (index === 0) return undefined;
    return Math.floor((index - 1) / 2);
  }
}

export default MinHeap;
