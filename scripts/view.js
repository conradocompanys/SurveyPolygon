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

  
// Get commentos

// We get the contract to deploy
const Survey = await hre.ethers.getContractFactory("Surveys");
const survey = await Survey.attach(
 "0xA56F946D6398Dd7d9D4D9B337Cf9E0F68982ca5B" // The deployed contract address
);



   // We get the contract to deploy
   const SurveyToken = await hre.ethers.getContractFactory("SurveyToken");
   const surveytoken = await SurveyToken.attach(
    "0x045857BDEAE7C1c7252d611eB24eB55564198b4C" // The deployed contract address
  );
   
   [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

   //const txt0 = await survey.addSurvey("my-blog-post", "My first 1 survey", "0xB2b580ce436E6F77A5713D80887e14788Ef49c9A", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", 30);
   //await txt0.wait();


   const ownerBalance_2 = await surveytoken.balanceOf(addr2.address);
   console.log("ownerBalance_2:",ownerBalance_2);

   //const txt1 = await survey.setVars(surveytoken.address, addr2.address, 30);

   //await txt1.wait();

   const ownerBalance_2after = await surveytoken.balanceOf(addr2.address);
   console.log("ownerBalance_2after:",ownerBalance_2after);

   const txt3 =await surveytoken.transfer(addr2.address, 150);
   await txt3.wait();

   const ownerBalance_3after = await surveytoken.balanceOf(addr2.address);
   console.log("ownerBalance_3after:",ownerBalance_3after);

   console.log("Contract Survey deployed to:", surveytoken.address);

   //const addr22 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";

   const ownerBalance = await surveytoken.balanceOf(owner.address);
   console.log("owner.address:",owner.address);
   console.log("ownerBalance:",ownerBalance);
   // Transfer 50 tokens from owner to addr1

 const addr2Balance = await surveytoken.balanceOf(addr2.address);
 //expect(addr2Balance).to.equal(50);
 console.log("addr2Balance:",addr2Balance);

 const ownerBalance2 = await surveytoken.balanceOf(owner.address);
  console.log("After: ownerBalance:",ownerBalance2);
  console.log("addr2.address:",addr2.address);
 console.log("FIn Contract Survey deployed to:", surveytoken.address);

 const SurveyToken2 = await hre.ethers.getContractFactory("SurveyToken");
 const balContract = await surveytoken.balanceOf(surveytoken.address);
 console.log("After: ContractBalance:",balContract);

 const balContract_ = await surveytoken.balanceOf(surveytoken.address);
 console.log("After MINT: ContractBalance:",balContract_);
 const ownerBalance_ = await surveytoken.balanceOf(owner.address);
   console.log("BALANCE AFTER MINT owner.address:",ownerBalance_);
   
   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
