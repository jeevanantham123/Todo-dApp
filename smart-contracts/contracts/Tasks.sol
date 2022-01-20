//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Tasks {
    uint public taskCount;

    struct TaskStruct {
    address sender;
    string content;
    bool completed;
    }

    TaskStruct[] tasks;
    function createTask(address payable sender,string memory _content) public {
       taskCount ++;
       tasks.push(TaskStruct(sender, _content,false));
    }
    function getTransactionCount() public view returns (uint256) {
        return taskCount;
    }
    function getTasks() public view returns (TaskStruct[] memory) {
        return tasks;
    }
}
