import LinkedList from '../LinkedList/LinkedList';

// 数据结构 ---> 哈希表
// 哈希表大小直接影响冲突次数。哈希表大小越大，冲突越少。为了演示目的，哈希表大小很小，
// 以显示冲突是如何处理的
const defaultHashTableSize = 32;

export default class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    // 创建一定大小的哈希表，并用空链表填充每个桶
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

    // 只是为了快速跟踪所有实际的密钥
    this.keys = {};
  }

  /**
   * 将键字符串转换为哈希值
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    /**
     * 为了简单起见， 我们将使用密钥的所有字符的字符代码和来计算哈希值
     * 但是你也可以使用更复杂的方法， 如多项式字符串哈希来减少碰撞次数：
     *
     * hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + .. + charCodeAt(n-1)
     *
     * 其中 charCodeAt(i) 是键的第i葛字符代码，n是键的长度和，PRIME 只是像 31 这样的素数
     */
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // 减少哈希值，使其适合哈希表大小
    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if (!node) {
      // 添加新的节点
      bucketLinkedList.append({ key, value });
    } else {
      // 更新节点的值
      node.value.value = value;
    }
  }

  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}
