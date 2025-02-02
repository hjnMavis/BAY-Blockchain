import BlockData from "./BlockData";

export default class BlockChainAdd {
  constructor() {
    // 초기 제네시스 블록 생성
    const genesisBlock = new BlockData("hello");
    this.chain = [genesisBlock];
  }

  addBlock(data) {
    // data가 BlockData 인스턴스가 아니면 새로운 BlockData 인스턴스 생성
    if (!(data instanceof BlockData)) {
      data = new BlockData(data);
    }
    // 체인에 블록 추가
    this.chain.push(data);
  }
}
