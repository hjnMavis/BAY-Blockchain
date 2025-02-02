// src/mission1/Transaction.js
class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transaction = { inputUTXOs, outputUTXOs };
  }

  execute() {
    const isDoubleSpend = this.transaction.inputUTXOs.findIndex(
      (utxo) => utxo.spent === true
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    /**
     * 📚 Mission 1.
     * 입력 UTXO의 총값이 출력 UTXO의 총값을 커버할 만큼 충분한지 확인한다.
     * 입력의 총값이 출력의 총값보다 작으면 execute 함수에서 에러를 던진다.
     */

    // 입력 UTXO 총합 계산
    const totalInputValue = this.transaction.inputUTXOs.reduce(
      (sum, utxo) => sum + utxo.amount,
      0
    );

    // 출력 UTXO 총합 계산
    const totalOutputValue = this.transaction.outputUTXOs.reduce(
      (sum, utxo) => sum + utxo.amount,
      0
    );

    // 입력 총액이 출력 총액보다 적으면 오류 발생
    if (totalInputValue < totalOutputValue) {
      throw new Error("Insufficient input amount.");
    }

    // 정상 실행 시 input UTXO를 소비(사용) 처리
    this.transaction.inputUTXOs.forEach((utxo) => {
      utxo.spent = true;
    });
  }
}

module.exports = Transaction;

