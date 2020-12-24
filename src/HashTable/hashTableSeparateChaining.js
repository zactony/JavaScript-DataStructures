import HashTable from './hashTable.js';
import { defaultEquals, isSymbol } from '../utils.js';
import LinkedList from '../LinkedList/linkedList.js';
import ValuePair from '../Dictionary/valuePair.js';

/**
 * 数据结构 - 散列表（分离链接）
 */
class HashTableSeparateChaining {
  /**
   * 散列表
   * @private
   * @type {Object}
   */
  #items = {}

  /**
   * 散列表长度
   * @private
   * @type {number}
   */
  #count = 0

  /**
   * 新增散列值
   * @public
   * @param key {string} 键
   * @param value {any} 值
   * @throws {TypeError} 参数key必须是除Symbol外基本数据类型
   * @return {boolean} 新增是否成功
   */
  put(key, value) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    const index = HashTable.generateHashCode(key);
    if (!this.#items[index]) {
      this.#items[index] = new LinkedList(defaultEquals);
    }
    this.#items[index].push(new ValuePair(key, value));
    this.#count += 1;
    return true;
  }

  /**
   * 移除散列值
   * @public
   * @param key {string} 键
   * @throws {TypeError} 参数key必须是除Symbol外基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  remove(key) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    if (this.isEmpty()) return undefined;
    const index = HashTable.generateHashCode(key);
    const value = this.#items[index];
    if (!value) return undefined;
    let current = value.getLinkedList();
    while (current.next) {
      if (current.value.key === key) {
        value.remove(current.value);
        this.#count -= 1;
        break;
      }
      current = current.next;
    }
    return current.value;
  }

  /**
   * 移除散列值
   * @public
   * @param key {string} 键
   * @throws {TypeError} 参数key必须是除Symbol外基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  get(key) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    if (this.isEmpty()) return undefined;
    const index = HashTable.generateHashCode(key);
    const value = this.#items[index];
    if (!value) return undefined;
    let current = value.getLinkedList();
    while (current.next) {
      if (current.value.key === key) {
        break;
      }
      current = current.next;
    }
    return current.value;
  }

  /**
   * 清空散列表
   */
  clear() {
    this.#items = {};
    this.#count = 0;
  }

  /**
   * 散列表是否为空
   * @return {boolean} 是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 散列表长度
   * @return {number} 长度
   */
  size() {
    return this.#count;
  }
}

export default HashTableSeparateChaining;
