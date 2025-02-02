import sha256 from "crypto-js/sha256";

export default class Block {
  constructor(data) {
    this.data = data; // 데이터를 객체의 속성으로 저장
  }

  toHash() {
    return sha256(this.data); // 입력받은 데이터의 해시값 계산 및 반환
  }
}