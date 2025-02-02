// src/mission2/Transaction.js
class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transactions = { inputUTXOs, outputUTXOs };
  }

  execute() {
    const isDoubleSpend = this.transactions.inputUTXOs.findIndex(
      (utxo) => utxo.spent === true
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    /**
     * 📚 Mission 2.
     * 트랜잭션이 성공한다면, 이중 지출되지 않게 입력 UTXO가 사용되었다고 처리해준다.
     */

    // 입력 UTXO 총합 계산
    const totalInputAmount = this.transactions.inputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    // 출력 UTXO 총합 계산
    const totalOutputAmount = this.transactions.outputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    // 입력 값이 출력 값을 충족하는지 확인
    if (totalInputAmount < totalOutputAmount) {
      throw new Error(
        "insufficient amount: total value of the inputs is less than the total value of the outputs!"
      );
    }

    // ✅ 입력 UTXO를 사용된 것으로 처리하여 이중 지출 방지
    this.transactions.inputUTXOs.forEach((utxo) => {
      utxo.spent = true;
    });

    console.log("✅ 트랜잭션 성공! 입력 UTXO가 사용 처리됨.");
  }
}

module.exports = Transaction;
