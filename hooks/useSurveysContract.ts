import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import SurveysContract from "../artifacts/contracts/Surveys.sol/Surveys.json";
import SurveysToken from "../artifacts/contracts/SurveyToken.sol/SurveyToken.json";

export interface Survey {
  id: string;
  topic: string;
  survey_data: string;
  creator_address: string;
  created_at: BigNumber;
}

export enum EventType {
  CommentAdded = "CommentAdded",
}

const useSurveysContract = () => {
  // An ethers.Signer instance associated with the signed-in wallet.
  // https://docs.ethers.io/v5/api/signer/
  const [signer] = useSigner();

  console.log("signer:",signer);
  // An ethers.Provider instance. This will be the same provider that is
  // passed as a prop to the WagmiProvider.
  const provider = useProvider();

  console.log("provider:",provider);

  // This returns a new ethers. Contract ready to interact with our comments API.
  // We need to pass in the address of our deployed contract as well as its abi.
  // We also pass in the signer if there is a signed in wallet, or if there's
  // no signed in wallet then we'll pass in the connected provider.
  const contract = wagmi.useContract({
    //addressOrName: "0xEEcb302Ae18972F346f6096B527f186543DF693e", //matic
    addressOrName: "0x9D2E99e92700f6113e6Bdd4694d38C9aCeee0FDB", //Survey contract
    contractInterface: SurveysContract.abi,
    signerOrProvider: signer.data || provider,
  });

  const contracttoken = wagmi.useContract({
  //  //addressOrName: "0xEEcb302Ae18972F346f6096B527f186543DF693e", //matic
    addressOrName: "0xf88eEEe1302300b9a87b5626027CdF0B99c87aaA", //Survey contract
    contractInterface: SurveysToken.abi,
    signerOrProvider: signer.data || provider,
  });

  // Wrapper to add types to our getSurveys function.
  const getSurveys = async (topic: string): Promise<Survey[]> => {
    return contract.getSurveys(topic).then((surveys) => {
      console.log("surveys:",surveys);
      // Each comment is represented as array by default so we convert to object
      return surveys.map((c) => ({ ...c }));
    });
  };

  // Wrapper to add types to our addComment function.
  const addSurvey = async (topic: string, surveymessage: string): Promise<void> => {
    // Create a new transaction
    console.log("comments",surveymessage);
    const tx = await contract.addSurvey(topic, surveymessage );
    // Wait for transaction to be mined
    await tx.wait();
    
   // const tx2 = await contracttoken.mint("0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f", "2");
   // await tx2.wait();


  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getSurveys,
    addSurvey,
  };
};

export default useSurveysContract;
