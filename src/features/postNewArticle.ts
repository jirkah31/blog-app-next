import axios, { AxiosError, AxiosResponse } from "axios";
import { apiConfig } from "../api_configs";
import { successToast, errorToast } from "@/features/toasts";
import { RequestConfigT } from "../api_configs";
import { PathsT } from "../paths";

interface PropsT {
  accessToken: string;
  imageId: string;
  newArticle: {
    title: string;
    perex: string;
  };
}

const postNewArticle = async ({
  accessToken,
  newArticle,
  imageId,
}: PropsT): Promise<void> => {
  const { title, perex } = newArticle;
  const config: RequestConfigT = {
    ...apiConfig,
    method: "post",
    url: PathsT.ArticlesPathT,
    data: {
      title,
      perex,
      imageId,
    },
    headers: {
      ...apiConfig.headers,
      Authorization: accessToken,
    },
  };

  await axios(config)
    .then((response: AxiosResponse) => {
      response.status === 200 && successToast("Article posted!");
    })
    .catch((error) => {
      errorToast("Error durring posting article!");
      console.error("ERROR_post_articles", error instanceof AxiosError);
    });
};

export default postNewArticle;
