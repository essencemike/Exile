// 数据结构 ---> 图（有向图，无向图）
export default class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }

  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  getAllVerttices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge) {
    // 查找开始结束节点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // 如果没有开始节点则插入开始节点
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // 查看边是否已经添加过
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    if (this.isDirected) {
      // 有向图
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }

    // 找到边的开始和结束节点，并删除他们所保存的edge的信息
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  findVertexByKey(vertexKey) {
    if (this.vertices[vertexKey]) {
      return this.vertices[vertexKey];
    }

    return null;
  }

  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  reverse() {
    this.getAllEdges().forEach((edge) => {
      this.deleteEdge(edge);

      edge.reverse();

      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVerttices().forEach((vertx, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVerttices();
    const verticesIndices = this.getVerticesIndices();

    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}
