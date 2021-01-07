import ValuePair from '../Dictionary/value-pair.js';
import { isSymbol } from '../utils.js';
import HashTable from './hash-table.js';

/**
 * 数据结构 - 散列表（线性探查）
 * @public
 * @extends HashTable
 */
class HashTableLinearProbing extends HashTable {
  /**
   * 新增散列值
   * @public
   * @override
   * @param key {any} 键
   * @param value {any} 值
   * @throws {TypeError} 参数key必须除Symbol是基本数据类型
   * @return {boolean} 新增是否成功
   */
  put(key, value) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    let index = HashTable.generateHashCode(key);
    while (this.items[index]) {
      index += 1;
    }
    this.items[index] = new ValuePair(key, value);
    return true;
  }

  /**
   * 移除散列值
   * @public
   * @override
   * @param key {any} 键
   * @throws {TypeError} 参数key必须除Symbol是基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  remove(key) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    if (this.isEmpty()) return undefined;
    let index = HashTable.generateHashCode(key);
    let value;
    while (this.items[index]) {
      if (this.items[index].key === key) {
        value = this.items[index].value;
        delete this.items[index];
        this.moveItemFillGap(key, index);
        break;
      } else {
        index += 1;
      }
    }
    return value;
  }

  /**
   * 根据key获取对应的值
   * @public
   * @override
   * @param key {any} 键
   * @throws {TypeError} 参数key必须除Symbol是基本数据类型
   * @return {Object | undefined} 存在则返回前者，不存在返回后者
   */
  get(key) {
    if (isSymbol(key)) throw new TypeError('don\'t support Symbol key');
    if (this.isEmpty()) return undefined;
    let index = HashTable.generateHashCode(key);
    let value;
    while (this.items[index]) {
      if (this.items[index].key === key) {
        value = this.items[index].value;
        break;
      } else {
        index += 1;
      }
    }
    return value;
  }

  /**
   * 移动其余项填充前面的空缺
   * @private
   * @param removedKey {any} 移除项的key
   * @param removedIndex {number} 移除项的hash指针
   */
  moveItemFillGap(removedKey, removedIndex) {
    const hashCode = HashTable.generateHashCode(removedKey);
    let index = removedIndex + 1;
    let position = removedIndex;
    while (this.items[index]) {
      const currentHashCode = HashTable.generateHashCode(this.items[index].key);
      if (currentHashCode <= hashCode || currentHashCode <= position) {
        this.items[position] = this.items[index];
        position = index;
        delete this.items[index];
      }
      index += 1;
    }
  }
}

export default HashTableLinearProbing;
