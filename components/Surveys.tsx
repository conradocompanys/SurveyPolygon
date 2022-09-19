import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import Comment from "./Comment";
import CommentEditorSurvey from "./CommentEditorSurvey";
import useSurveys from "../hooks/useSurveys";
import useEventsSurveys from "../hooks/useEventsSurveys";
import { BigNumber, utils } from "ethers";

import styles, { layout } from "../style";

import { polygon } from "../assets";

interface CommentsProps {
  topic: string;
}

const Surveys: React.FunctionComponent<CommentsProps> = ({ topic }) => {
  const query = useSurveys({ topic });

//  console.log("query.data",query.data);
  useEventsSurveys({ topic });

  return (
    <Box>
      {query.isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )}
      <Stack spacing={4}>
        
      

        
        <div className="flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6">
        <section id="features2" className={layout.section}>
          <div className={layout.sectionInfo}>
            <br></br>
            <img src={polygon.src} alt="polygon" className="object-contain h-8 sm:h-7 "></img>
            <br></br>
            <h2 className="font-poppins font-semibold xs:text-[28px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
              Latest surveys: <br className="sm:block hidden" />
            </h2>
        {
        
        
        query.data?.map((comment) => {
          
          
          const x =  (BigNumber.from(comment.created_at)).toNumber();
          console.log ("no entiendo", comment);

          var d = new Date(x * 1000);
            //x1000 to convert from seconds to milliseconds
             var s = d.toUTCString();
              s = s.substring(0,s.indexOf("GMT")) + "UTC";
          return <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
        
          <p key={comment.id} className="font-poppins font-normal text-dimWhite text-[18px] w-[250px]">
            
            <span className="text-white">Date:</span> {s}
            
          </p>
          <p key={comment.survey_data} className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] ml-2">
            <span className="text-white w-[90px]">Survey Hash:</span> {comment.survey_data}{" "} 
            <br></br><span className="text-white">Address:</span> {comment.creator_address}
            
          </p>
        </div>
          
          
          
        }
        ).reverse()
        
        }</div>
</section>
        </div>
        {/* {query.isFetched && <CommentEditorSurvey topic={topic} />} */}
      </Stack>
    </Box>
  );
};

export default Surveys;
