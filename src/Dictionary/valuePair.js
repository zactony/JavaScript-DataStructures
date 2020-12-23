/**
 * 数据结构 - 键值对
 * @private
 */
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${this.key}:${this.value}`;
  }
}

export default ValuePair;
