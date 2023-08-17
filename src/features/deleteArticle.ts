import axios, { AxiosError } from "axios";
import { apiConfig } from "../api_configs";
import { successToast } from "@/features/toasts";
import { errorToast } from "@/features/toasts";
import { RequestConfigT } from "../api_configs";
import { PathsT } from "../paths";

export interface DeletePropsT {
  articleId: string;
  accessToken: string | null;
}

const deleteArticle = async ({
  articleId,
  accessToken,
}: DeletePropsT): Promise<void> => {
  const config: RequestConfigT = {
    ...apiConfig,
    method: "delete",
    url: `${PathsT.ArticlesPathT}/${articleId}`,
    headers: {
      ...apiConfig.headers,
      Authorization: accessToken,
    },
  };

  await axios(config)
    .then(() => {
      successToast("Delete success!");
    })
    .catch((error) => {
      errorToast("Delete fail!");
      console.error("ERROR_Deleting", error as AxiosError);
    });
};

export default deleteArticle;
