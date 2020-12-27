import HashTable from './hash-table.js';
import { isSymbol } from '../utils.js';
import LinkedList from '../LinkedList/linked-list.js';
import ValuePair from '../Dictionary/value-pair.js';

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
   * @param key {any} 键
   * @param value {any} 值
   * @throws {TypeError} 参数key必须是除Symbol外基本数据类型
   * @return {boolean} 新增是否成功
   */
  put(key, value) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    const index = HashTable.generateHashCode(key);
    if (!this.#items[index]) {
      this.#items[index] = new LinkedList();
    }
    this.#items[index].push(new ValuePair(key, value));
    this.#count += 1;
    return true;
  }

  /**
   * 移除散列值
   * @public
   * @param key {any} 键
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
   * 获取散列值
   * @public
   * @param key {any} 键
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
   * @public
   */
  clear() {
    this.#items = {};
    this.#count = 0;
  }

  /**
   * 散列表是否为空
   * @public
   * @return {boolean} 是否为空
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * 散列表长度
   * @public
   * @return {number} 长度
   */
  size() {
    return this.#count;
  }

  /**
   * 字符串化散列表
   * @public
   * @override
   * @return {string}
   */
  toString() {
    if (this.isEmpty()) return '';
    return Object
      .entries(this.#items)
      .reduce((acc, [hashCode, linkedList]) => {
        let current = linkedList.getLinkedList();
        while (current && current.value) {
          acc.push(`{${hashCode} => [${current.value.toString()}]}`);
          current = current.next;
        }
        return acc;
      }, [])
      .join(',');
  }
}

export default HashTableSeparateChaining;
