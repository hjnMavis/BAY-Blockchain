import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./App.css";

// Alchemy 설정
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [blockInfo, setBlockInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    async function fetchBlockData() {
      // 최신 블록 번호 가져오기
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(latestBlockNumber);

      // 최신 블록의 트랜잭션 포함 정보 가져오기
      const blockDetails = await alchemy.core.getBlockWithTransactions(latestBlockNumber);
      setBlockInfo(blockDetails);
      setTransactions(blockDetails.transactions);
    }

    fetchBlockData();
  }, []);

  // 트랜잭션 클릭 시 개별 트랜잭션 세부 정보 가져오기
  async function fetchTransactionDetails(txHash) {
    const receipt = await alchemy.core.getTransactionReceipt(txHash);
    setSelectedTransaction(receipt);
  }

  return (
    <div className="App">
      <h1>블록 익스플로러 만들기</h1>
      <div>
        <strong>Latest Block Number:</strong> {blockNumber}
      </div>

      {blockInfo && (
        <div>
          <h2>🔍 블록 상세 정보</h2>
          <p><strong>Block Hash:</strong> {blockInfo.hash}</p>
          <p><strong>Timestamp:</strong> {new Date(blockInfo.timestamp * 1000).toLocaleString()}</p>
          <p><strong>Transactions Count:</strong> {blockInfo.transactions.length}</p>
          <p><strong>Gas Used:</strong> {blockInfo.gasUsed.toString()}</p>
          <p><strong>Miner:</strong> {blockInfo.miner}</p>
        </div>
      )}

      {transactions.length > 0 && (
        <div>
          <h2>📄 트랜잭션 목록 (최대 10개)</h2>
          <ul>
            {transactions.slice(0, 10).map((tx) => (
              <li key={tx.hash} onClick={() => fetchTransactionDetails(tx.hash)} style={{ cursor: "pointer", marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
                <strong>Tx Hash:</strong> {tx.hash} <br />
                <strong>From:</strong> {tx.from} <br />
                <strong>To:</strong> {tx.to || "Contract Creation"} <br />
                <strong>Value:</strong> {parseInt(tx.value) / 10 ** 18} ETH
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTransaction && (
        <div>
          <h2>📌 선택된 트랜잭션 상세 정보</h2>
          <p><strong>Transaction Hash:</strong> {selectedTransaction.transactionHash}</p>
          <p><strong>Block Number:</strong> {selectedTransaction.blockNumber}</p>
          <p><strong>Gas Used:</strong> {selectedTransaction.gasUsed.toString()}</p>
          <p><strong>Status:</strong> {selectedTransaction.status === 1 ? "✅ Success" : "❌ Failed"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
