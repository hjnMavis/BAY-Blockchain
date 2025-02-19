// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Variables {
    // State variable들은 블록체인에 저장됩니다.
    string public text = "Hello";
    uint256 public num = 123;

    function doSomething() public view returns (uint256, address) {
        // Local variable들은 블록체인에 저장되지 않습니다.
        uint256 i = 456;
        // 변수를 사용하지 않을 경우 단순히 선언하지 않거나, 반환값으로 활용 가능
        
        // Global variable들
        uint256 timestamp = block.timestamp; // 현재 블록의 타임스탬프
        address sender = msg.sender; // 컨트랙트 호출자의 주소
        
        return (timestamp, sender);
    }
}

