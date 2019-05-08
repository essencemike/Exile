import DisjointSetItem from './DisjointSetItem';

// 数据结构 ---> 并查集
export default class DisjointSet {
  constructor(keyCallback) {
    this.keyCallback = keyCallback;
    this.items = {};
  }

  makeSet(itemValue) {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);

    if (!this.items[disjointSetItem.getKey()]) {
      this.items[disjointSetItem.getKey()] = disjointSetItem;
    }

    return this;
  }

  find(itemValue) {
    const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

    // 尝试查找自己
    const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

    if (!requiredDisjointItem) {
      return null;
    }

    return requiredDisjointItem.getRoot().getKey();
  }

  union(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or Two values are not in sets');
    }

    if (rootKeyA === rootKeyB) {
      return this;
    }

    const rootA = this.items[rootKeyA];
    const rootB = this.items[rootKeyB];

    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA);

      return this;
    }

    rootA.addChild(rootB);

    return this;
  }

  inSameSet(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or Two values are not in sets');
    }

    return rootKeyA === rootKeyB;
  }
}
