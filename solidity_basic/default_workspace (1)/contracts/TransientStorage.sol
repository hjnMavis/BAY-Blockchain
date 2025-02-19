// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Make sure EVM version and VM set to Cancun

// Storage - data is stored on the blockchain
// Memory - data is cleared out after a function call
// Transient storage - data is cleared out after a transaction


interface ITest {
    function val() external view returns (uint256);
    function test() external;
}

contract Callback {
    uint256 public val;

    // fallback 함수는 호출된 함수가 존재하지 않을 때 호출된다.
    fallback() external {
        val = ITest(msg.sender).val();
    }

    // target 주소의 ITest 인터페이스의 test 함수를 호출한다.
    function test(address target) external {
        ITest(target).test();
    }
}

contract TestStorage {
    uint256 public val;

    // val 변수를 123으로 설정하고, 호출자의 주소로 빈 데이터를 보낸다.
    function test() public {
        val = 123;
        bytes memory b = "";
        msg.sender.call(b);
    }
}

contract TestTransientStorage {
    bytes32 constant SLOT = 0;

    // _transientVal 변수를 321로 설정하고, 호출자의 주소로 빈 데이터를 보낸다.
    // 이후 임시 값을 0으로 재설정하여 삭제한다.
    function test() public {
        assembly {
            tstore(SLOT, 321)
        }
        bytes memory b = "";
        msg.sender.call(b);
    }

    function val() public view returns (uint256 v) {
        assembly {
            v := tload(SLOT)
        }
    }
}

contract ReentrancyGuard {
    bool private locked;

    modifier lock() {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    // 35313 gas
    // 잠금 상태를 체크하고 호출자의 주소로 빈 데이터를 보낸다.
    function test() public lock {
        // Ignore call error
        bytes memory b = "";
        msg.sender.call(b);
    }
}

contract ReentrancyGuardTransient {
    bytes32 constant SLOT = 0;

    modifier lock() {
        assembly {
            if tload(SLOT) { revert(0, 0) }
            tstore(SLOT, 1)
        }
        _;
        assembly {
            tstore(SLOT, 0)
        }
    }

    // 21887 가스 사용
    // 잠금 상태를 체크하고 호출자의 주소로 빈 데이터를 보낸다.
    function test() external lock {
        // Ignore call error
        bytes memory b = "";
        msg.sender.call(b);
    }
}
