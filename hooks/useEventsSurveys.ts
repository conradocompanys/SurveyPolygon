import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useSurveysContract, { EventType } from "./useSurveysContract";

interface UseEventsQuery {
  topic: string;
}

// Listen to events and refresh data
const useEventsSurveys = ({ topic }: UseEventsQuery) => {
  const queryClient = useQueryClient();
  const commentsContract = useSurveysContract();

  useEffect(() => {
    const handler = (comment) => {
      if (comment.topic !== topic) {
        return;
      }
      // Invalidates the query whose query key matches the passed array.
      // This will cause the useComments hook to re-render the Comments
      // component with fresh data.
      queryClient.invalidateQueries([
        "comments",
        { topic: comment.topic, chainId: commentsContract.chainId },
      ]);
    };

    commentsContract.contract.on(EventType.CommentAdded, handler);

    return () => {
      commentsContract.contract.off(EventType.CommentAdded, handler);
    };
  }, [queryClient, commentsContract.chainId, topic]);
};

export default useEventsSurveys;
