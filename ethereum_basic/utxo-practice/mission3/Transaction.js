// src/mission3/Transaction.js
class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transactions = { inputUTXOs, outputUTXOs };
    this.fee = 0; // 트랜잭션 수수료를 저장할 속성 추가
  }

  execute() {
    const isDoubleSpend = this.transactions.inputUTXOs.findIndex(
      (utxo) => utxo.spent === true
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    const prevInputUTXOs = [...this.transactions.inputUTXOs];
    const prevOutputUTXOs = [...this.transactions.outputUTXOs];

    const totalInputAmount = prevInputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    const totalOutputAmount = prevOutputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    if (totalInputAmount < totalOutputAmount) {
      throw new Error(
        "insufficient amount: total value of the inputs is less than the total value of the outputs!"
      );
    }

    // ✅ 입력 UTXO를 사용된 것으로 처리 (이중 지출 방지)
    this.transactions.inputUTXOs.forEach((utxo) => {
      utxo.spent = true;
    });

    // ✅ 트랜잭션 수수료 계산 (입력 총합 - 출력 총합)
    this.fee = totalInputAmount - totalOutputAmount;

    console.log(`✅ 트랜잭션 성공! 수수료: ${this.fee} (입력: ${totalInputAmount}, 출력: ${totalOutputAmount})`);
  }
}

module.exports = Transaction;

