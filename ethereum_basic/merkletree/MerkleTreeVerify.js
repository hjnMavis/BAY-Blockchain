export default class MerkleTreeVerify {
  /*
  TODO: 이전 단계에서 만든 코드 전체를 복사해서 아래에 붙여넣기 한뒤, src/verify.js를 작성해주세요.
  */

  constructor(leaves, concat) {
    this.leaves = leaves;
    this.hash = concat;
    this.tree = [];
    this.root = this.buildTree(leaves);
  }

  buildTree(nodes) {
    if (nodes.length === 1) {
      return nodes[0]; // 하나의 노드만 남으면 그것이 루트 노드입니다.
    }

    const parentNodes = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = i + 1 < nodes.length ? nodes[i + 1] : null; // 홀수 노드가 있을 경우 null 처리
      if (right) {
        parentNodes.push(this.hash(left, right)); // 인접한 노드를 결합하고 해시 처리
      } else {
        parentNodes.push(left); // 홀수 노드를 그대로 상위 레벨로 올림
      }
    }

    return this.buildTree(parentNodes); // 재귀적으로 부모 노드들을 다시 트리 구성에 사용
  }

  getRoot() {
    return this.root;
  }

  getProof(leafIndex) {
    let index = leafIndex;
    const proof = [];
    let nodes = this.leaves;

    while (nodes.length > 1) {
      const parentNodes = [];
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = i + 1 < nodes.length ? nodes[i + 1] : null;

        if (i === index) {
          if (right) {
            proof.push({ data: right, left: false });
          }
        } else if (i + 1 === index && right) {
          proof.push({ data: left, left: true });
        }

        if (right) {
          parentNodes.push(this.hash(left, right));
        } else {
          parentNodes.push(left);
        }

        if (index === i || (index === i + 1 && right)) {
          index = Math.floor(i / 2);
        }
      }
      nodes = parentNodes;
    }

    return proof;
  }
}
