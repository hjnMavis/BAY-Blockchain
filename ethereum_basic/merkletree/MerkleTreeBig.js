export default class MerkleTreeBig {
  /*
  TODO: 다음의 조건을 만족하는 생성자를 만들어주세요.
  - 생성자의 첫번째 인자는 리프 노드들로 구성된 배열을 받습니다.
  - 생성자의 두번째 인자는 두 노드를 결합하고 해시하는 함수를 받습니다.
  - root 속성에 트리의 루트 노드를 할당해주세요.
  - leaves 속성에는 입력 받은 leaves 배열을 할당해주세요.
  - hash 속성에는 입력 받은 concat 함수를 할당해주세요.
  */
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.hash = concat;
    this.root = this.buildTree(leaves); // -> this.leaves로 입력을 넣어도 좋음
  }

  /*
  TODO: 다음의 조건을 만족하는 함수를 만들어주세요.
  - 트리의 루트 노드를 찾아주는 함수입니다.

  아래의 buildTree 함수
  */
  buildTree(nodes) {
    if (nodes.length === 1) return nodes[0];

    const parentNodes = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1] || nodes[i]; 
      parentNodes.push(this.hash(left, right));
    }

    return this.buildTree(parentNodes);
  }

  getRoot() {
    return this.root;
  }

} // 처음에 만든 MerkleTree 생성자와 메소드가 MerkleTreeBig까지 포함된 내용
