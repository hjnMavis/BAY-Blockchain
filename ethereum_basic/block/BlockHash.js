import sha256 from "crypto-js/sha256";

export default class BlockHash {
  constructor(data) {
    this.data = data;
    this.previousHash = null; // 이전 블록의 해시값을 저장할 변수
  }

  toHash() {
    return sha256(this.data.toString() + (this.previousHash || "")).toString();
  }
}
