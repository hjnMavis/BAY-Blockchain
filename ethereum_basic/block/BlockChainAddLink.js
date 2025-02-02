import BlockHash from "./BlockHash";

export default class BlockChainAddLink {
  constructor() {
    const genesisBlock = new BlockHash(5);
    this.chain = [genesisBlock];
  }

  addBlock(block) {
    const previousBlock = this.chain[this.chain.length - 1]; // 체인의 마지막 블록 가져오기
    block.previousHash = previousBlock.toHash(); // 이전 블록의 해시값을 현재 블록에 저장
    this.chain.push(block); // 블록체인에 추가
  }
}




