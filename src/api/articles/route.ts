import { PathsT } from '@/paths'
import { RequestConfigT, apiConfig } from '@/api_configs'
import axios, { AxiosResponse } from 'axios';

const getArticles = async () => {
  const config: RequestConfigT = {
    ...apiConfig,
    url: `${PathsT.ArticlesPathT}`,
    headers: {
      ...apiConfig.headers,
    },
  };

  const articlesData = await axios(config)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error("Loading articles error: ", err);
    });

  return articlesData
}

export default getArticles
