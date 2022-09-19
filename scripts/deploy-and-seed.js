// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');


   // We get the survey contract to deploy
   const SurveyContract = await hre.ethers.getContractFactory("Surveys");
   const surveycontract = await SurveyContract.deploy();
 
   await surveycontract.deployed();
 

   console.log("Contract Survey deployed to:----->", surveycontract.address);


    // We get the survey contract to deploy

    const SurveyToken = await hre.ethers.getContractFactory("SurveyToken");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const surveytoken = await SurveyToken.deploy();
  
    await surveytoken.deployed();

    const txt1 = await surveycontract.addSurvey("my-blog-post", "My first 1 survey");
    await txt1.wait();
  
    
    console.log("Contract TOKEN Survey deployed to:", surveytoken.address);



    const ownerBalance = await surveytoken.balanceOf(owner.address);
 
    
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
