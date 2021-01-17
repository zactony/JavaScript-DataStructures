import Dictionary from '../Dictionary/dictionary.js';

/**
 * 数据结构 - 图
 * @public
 */
class Graph {
  /**
   * 是否方向性
   * @protected
   */
  isDirected = false

  /**
   * 顶点数组
   * @protected
   */
  vertices = []

  /**
   * 边集合
   * @protected
   */
  adjList = new Dictionary()

  constructor(isDirected = false) {
    this.isDirected = isDirected;
  }

  /**
   * 新增顶点
   * @public
   * @param v {any} 顶点
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * 新增边
   * @public
   * @param v {any}
   * @param w {any}
   */
  addEdge(v, w) {
    if (!this.adjList.has(v)) {
      this.addVertex(v);
    }

    if (!this.adjList.has(w)) {
      this.addVertex(w);
    }

    this.adjList.get(v).value.push(w);

    if (!this.isDirected) {
      this.adjList.get(w).value.push(v);
    }
  }

  /**
   * 获取顶点集合
   * @public
   * @returns {Array} 顶点集合
   */
  getVertices() {
    return this.vertices;
  }

  /**
   * 获取边集合
   * @public
   * @returns {Dictionary} 边集合
   */
  getAdjList() {
    return this.adjList;
  }

  /**
   * 字符串化图
   * @public
   * @returns {string} 字符串图
   */
  toString() {
    const strList = this.vertices.map((v) => `${v} -> ${this.adjList.get(v).value.join(' ')}`);
    return strList.join('\n');
  }
}

export default Graph;
