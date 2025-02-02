import sha256 from "crypto-js/sha256";

export default class BlockData {
  // TODO 1
  // BlockData 클래스에 data를 인자로 받는 생성자(constructor)를 추가한다.
  // 입력 받은 data는 this.data에 할당해보자.
  constructor(data) {
    this.data = data;  // 입력 받은 data를 this.data에 할당
  }

  // TODO 2
  // 입력 받은 data를 해시값으로 변환한 뒤 반환해보자.
  toHash() {
    return sha256(this.data).toString(); // this.data의 해시값을 계산하고 문자열로 변환하여 반환
  }
}