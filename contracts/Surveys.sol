//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Surveys is Pausable, Ownable {

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    struct Survey {
        uint32 id;
        string topic;
        address creator_address;
        string survey_data;
        uint created_at;
    }

    uint32 private idCounter;
    mapping(string => Survey[]) private surveysByTopic;
        
    event CommentAdded(Survey survey);

    function getSurveys(string calldata topic) public view returns(Survey[] memory) {
       return surveysByTopic[topic];
    }

    function addSurvey(string calldata topic, string calldata survey_data ) public {
        Survey memory survey = Survey({
            id: idCounter,
            topic: topic,
            creator_address: msg.sender,
            survey_data: survey_data,
            created_at: block.timestamp
        });
        surveysByTopic[topic].push(survey);
        idCounter++;
        emit CommentAdded(survey);
    }

    
}