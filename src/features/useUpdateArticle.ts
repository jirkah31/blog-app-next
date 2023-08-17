import axios, { AxiosError, AxiosResponse } from "axios";
import { RequestConfigT } from "../api_configs";
import { successToast, errorToast } from "@/features/toasts";
import {
  MutateFunction,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

const useUpdateArticle = (): UseMutationResult<
  AxiosResponse<MutateFunction, RequestConfigT>,
  unknown,
  RequestConfigT,
  unknown
> => {
  return useMutation({
    mutationFn: async (config: RequestConfigT) => await axios(config),
    onSuccess: async () => await successToast("Article was updated!"),
    onError: (error) => {
      console.error("ERROR_post_articles", error instanceof AxiosError);
      return errorToast("ERROR happend!");
    },
  });
};

export default useUpdateArticle;
