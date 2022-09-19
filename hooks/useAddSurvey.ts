import { useMutation } from "react-query";
import useSurveysContract from "./useSurveysContract";

interface UseAddSurveyPayload {
  topic: string;
  surveymessage: string;
}

const useAddSurvey = () => {
  const contract = useSurveysContract();

  return useMutation(async ({ topic, surveymessage }: UseAddSurveyPayload) => {
    await contract.addSurvey(topic, surveymessage);
  });
};

export default useAddSurvey;
