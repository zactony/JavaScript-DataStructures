import Dictionary from '../Dictionary/dictionary.js';
import { GRAPH_VISITED } from '../utils.js';
import Queue from '../Queue/queue.js';

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
   * BFS 遍历
   * @private
   * @param startVertex {any} 起始顶点
   */
  breathFirstSearch(startVertex) {
    if (!this.vertices.includes(startVertex)) return;

    const visitedObj = this.vertices
      .reduce((acc, curr) => ({ ...acc, [curr]: GRAPH_VISITED.NO_VISITED }), {});

    const queue = new Queue();
    queue.push(startVertex);

    while (!queue.isEmpty()) {
      const u = queue.shift();

      const temp = this.adjList.get(u).value;

      for (let index = 0; index < temp.length; index += 1) {
        if (visitedObj[temp[index]] === GRAPH_VISITED.NO_VISITED) {
          visitedObj[temp[index]] = GRAPH_VISITED.NO_FULL_VISITED;
          queue.push(temp[index]);
        }
      }

      visitedObj[u] = GRAPH_VISITED.FULL_VISITED;
    }
  }

  /**
   * 寻找最短路径
   * @private
   * @param startVertex {any} 起始顶点
   */
  findShortPathByBFS(startVertex) {
    if (!this.vertices.includes(startVertex)) return;

    const obj = this.vertices
      .reduce(({
        visitedVertices,
        distances,
        predecessors,
      }, curr) => ({
        visitedVertices: { ...visitedVertices, [curr]: GRAPH_VISITED.NO_VISITED },
        distances: { ...distances, [curr]: 0 },
        predecessors: { ...predecessors, [curr]: null },
      }), {
        visitedVertices: {},
        distances: {},
        predecessors: {},
      });

    const {
      visitedVertices,
      distances,
      predecessors,
    } = obj;

    const queue = new Queue();
    queue.push(startVertex);

    while (!queue.isEmpty()) {
      const u = queue.shift();

      const temp = this.adjList.get(u).value;

      for (let index = 0; index < temp.length; index += 1) {
        const w = temp[index];
        if (visitedVertices[w] === GRAPH_VISITED.NO_VISITED) {
          visitedVertices[w] = GRAPH_VISITED.NO_FULL_VISITED;
          distances[w] = distances[u] + 1;
          predecessors[w] = u;
          queue.push(w);
        }
      }

      visitedVertices[u] = GRAPH_VISITED.FULL_VISITED;
    }

    return {
      distances,
      predecessors,
    };
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
