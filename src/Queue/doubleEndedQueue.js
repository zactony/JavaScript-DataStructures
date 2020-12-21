import Queue from './queue.js';

/**
 * 数据格式 - 双端队列
 * @extends Queue
 */
class DoubleEndedQueue extends Queue {
  /**
   * 队列前端新增一个数据
   * @public
   * @param element {any} 待新增的值
   * @returns {Object} 新增后的队列
   */
  unshift(element) {
    /**
     * 第一种情况：队列为空，则直接添加
     * 第二种情况：队列不为空且经历过前端删除操作，此时前端索引值大于0，
     *            则需要前端索引值递减，然后在此处插入值
     * 第三种情况：队列不为空且没经历过前端删除操作，则将队列所有键递增，
     *            然后在前端插入值
     */
    if (this.isEmpty()) {
      this.enqueue(element);
    } else if (this.lowestIndex > 0) {
      this.lowestIndex -= 1;
      this.items[this.lowestIndex] = element;
    } else {
      for (let i = this.count; i > 0; i -= 1) {
        this.items[i] = this.items[i - 1];
      }
      this.count += 1;
      this.items[this.lowestIndex] = element;
    }

    return this.items;
  }

  /**
   * 队列后端弹出一个数据
   * @public
   * @returns {undefined | *} 队列为空弹出值为前者，不为空弹出对应的值
   */
  pop() {
    if (this.isEmpty()) return undefined;
    const value = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count -= 1;

    return value;
  }
}

export default DoubleEndedQueue;
