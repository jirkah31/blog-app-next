import { PathsT } from '@/paths'
import { RequestConfigT, apiConfig } from '@/api_configs'
import axios, { AxiosResponse } from 'axios';

export const getArticle = async (articleId: string) => {
  const config: RequestConfigT = {
    ...apiConfig,
    url: `${PathsT.ArticlesPathT}/${articleId}`,
    headers: {
      ...apiConfig.headers,
    },
  };

  const articleData = await axios(config)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error("ARTICLE_ERROR: ", err);
    });
  return articleData
}
