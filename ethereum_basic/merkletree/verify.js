export default function verify(proof, node, root, concat) {
    let currentNode = node;
  
    // proof 객체 배열을 순회하면서 각 스텝의 데이터와 결합
    proof.forEach(step => {
      // step의 left 속성이 true면 현재 노드는 오른쪽에 위치합니다.
      if (step.left) {
        currentNode = concat(step.data, currentNode);
      } else {
        // step의 left 속성이 false면 현재 노드는 왼쪽에 위치합니다.
        currentNode = concat(currentNode, step.data);
      }
    });
  
    // 최종적으로 계산된 노드가 주어진 루트와 동일한지 검증
    return currentNode === root;
  }
  
