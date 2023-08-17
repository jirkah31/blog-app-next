import { PathsT } from '@/paths'
import { RequestConfigT, apiConfig } from '@/api_configs'
import axios, { AxiosResponse } from 'axios';
import { get } from 'http';

const getImage = async (imageId: string) => {
  const config = {
    ...apiConfig,
    url: `${PathsT.ImagesPathT}/${imageId}`,
    headers: {
      ...apiConfig.headers,
    },
    responseType: "arraybuffer",
  };

  const imageData = await axios(config)
    .then((res) => {
      const base64ImageString = Buffer.from(res.data, "binary").toString(
        "base64"
      );
      return base64ImageString;
    })
    .catch((err) => {
      console.error("IMAGE_ERROR: ", err);
    });

  return imageData
}

export default getImage
