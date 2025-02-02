export default class MerkleTree {

  constructor(leaves, concat) {
    this.concat = concat;
    this.root = this.buildTree(leaves);
  }
  /*
  TODO: 다음의 조건을 만족하는 생성자를 만들자.
    - 생성자의 첫번째 인자는 리프 노드들로 구성된 배열을 받는다. -> leaves(리프 노드들로 구성된 배열)
  - 생성자의 두번째 인자는 두 노드를 결합하고 해시하는 함수를 받는다. -> concat
  - root 속성에 트리의 루트 노드를 할당한다. -> getRoot()

  TODO: 다음의 조건을 만족하는 함수를 만들자. ->buildTree
  - 트리의 루트 노드를 찾아주는 함수다.

  그럼 이제 트리를 만들어주고 최종 루트 노드를 리턴하는 함수인 buildTree를 짜보자.
  */
  buildTree(nodes) {
    if (nodes.length === 1) return nodes[0];

    const parentNodes = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1] || nodes[i]; // 홀수 개일 경우 마지막 노드를 복사
      parentNodes.push(this.concat(left, right));
    }

    return this.buildTree(parentNodes);
  }
  /*
  작동 원리:
  리프 노드들을 왼쪽과 오른쪽으로 나눈 다음 각 세트의 왼쪽 오른쪽을 더해 첫 번째 부모노드 배열에 저장한 후
  최종 노드가 1개가 남을 때까지 위의 과정을 반복한다.
  */
  getRoot() {
    return this.root;
  }
}

