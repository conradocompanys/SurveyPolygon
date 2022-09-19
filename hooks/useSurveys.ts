import { useQuery } from "react-query";
import useSurveysContract from "./useSurveysContract";

interface UseSurveysQuery {
  topic: string;
}

const useSurveys = ({ topic }: UseSurveysQuery) => {
  const contract = useSurveysContract();
 
  return useQuery(["comments", { topic, chainId: contract.chainId }], () =>

    contract.getSurveys(topic)
  );
};

export default useSurveys;
