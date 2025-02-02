import BlockData from "./BlockData";

export default class BlockChain {
  constructor() {
    this.chain = [];
    // 제네시스 블록을 BlockData 인스턴스로 체인에 직접 추가
    const genesisBlock = new BlockData("Genesis Block");
    this.chain.push(genesisBlock); // BlockData 인스턴스를 체인에 추가
  }
}
