import type { NextPage } from "next";
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
//import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
//import theme from "../theme";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "../components/Comments";
import Surveys from "../components/Surveys";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Business from "../components/Business"
import dynamic from "next/dynamic"

import { StylesManager, Model } from "survey-core";
import styles from "../style";


const SurveyComponent = dynamic(() => import("../components/survey"), {
  ssr: false,
  
})



// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider("http://localhost:8545");

// Provider that will be used when no wallet is connected (aka no signer)
//const provider = providers.getDefaultProvider(
//  "https://rpc-mumbai.maticvigil.com"
//);

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure Metamask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const App: NextPage = () => {
  
  return (
    <WagmiProvider autoConnect provider={provider}>
      
        <QueryClientProvider client={queryClient}>
        
        <div className="bg-primary w-full overflow-hidden">
              <div className="sm:px-16 px-6 flex justify-center items-center">
                      <div className={`${styles.boxWidth}`}>
                        <Navbar />
                      </div>
              </div>

            <div className="bg-primary ${styles.flexStart}">
                      <div className={`${styles.boxWidth}`}>
                        <Hero /> 
                        <Surveys topic="my-blog-post" />
                              <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                        <div className={`${styles.boxWidth}`}>
                        <Business /> 
                        </div>
                        </div>
                                  {/* <Comments topic="my-blog-post"></Comments> */}
                                  <Toaster position="bottom-right" />
                                
                                  
                                <div className="App">
                                <SurveyComponent></SurveyComponent> 
                                  
                                 </div>
                             </div>
             </div>

    </div>
            
          
        </QueryClientProvider>
  
       
    </WagmiProvider>
  );
};

export default App;
