// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Gas {
    uint256 public i = 0;

    // 보낸 모든 가스를 소모하면 Transaction이 실패한다. 
    // State 변화는 다시 원상태로 돌아온다. 
    // 사용된 Gas는 돌려받지 않다.
    function forever() public {
        // 모든 가스를 소모할 때까지 반복문을 실행하여 Transaction이 실패하도록 한다.
        while (true) {
            i += 1;
        }
    }
}
