"use client";

import { RequestConfigT, apiConfig } from "@/api_configs";
import Button from "@/components/Button";
import postNewArticle from "@/features/postNewArticle";
import { PathsT } from "@/paths";
import { useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewArticlePage = () => {
  const { accessToken } = useAppSelector((state) => state.accessToken.value);
  const { isLoggedIn } = useAppSelector((state) => state.isLoggedIn.value);
  const [title, setTitle] = useState<string>("");
  const [perex, setPerex] = useState<string>("");
  const [image, setImage] = useState<any>({});
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (config: RequestConfigT) => await axios(config),
    onError: (error, variables, context) => {
      console.error("error, variables, context: ", error, variables, context);
    },
    onSuccess: (data) => {
      return { data };
    },
  });

  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle((event.target as HTMLInputElement).value);
  };

  const handlePerex = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setPerex((event.target as HTMLInputElement).value);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage({
        rawImage: event.target.files[0],
        previewImage: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image.rawImage);
    const configImage: RequestConfigT = {
      ...apiConfig,
      url: PathsT.ImagesPathT,
      method: "post",
      headers: {
        ...apiConfig.headers,
        Authorization: accessToken,
        "Content-Type": "multipart/form-data",
      },
      data,
    };
    const newArticle = {
      title,
      perex,
    };

    const dataImage = await mutation.mutateAsync(configImage);
    const imageId = dataImage.data[0].imageId;
    await postNewArticle({ accessToken, newArticle, imageId });
    router.push(PathsT.MyArticlesPathT);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="">
              <h1 className="inline-block text-3xl my-6 mr-4">
                Create new article
              </h1>
              <Button className="" type="submit">
                Publish article
              </Button>
            </div>

            <label htmlFor="title" className="text-xl">
              Article title
            </label>
            <br />
            <input
              className="border border-dashed border-gray-700 p-2 w-full mt-4 outline-none focus:border-2"
              type="text"
              id="title-input"
              name="title-input"
              placeholder="My First Article"
              value={title}
              onChange={handleTitle}
            />
            <br />

            <div className="mt-4">
              <span className="block mt-9 mb-4 text-xl">Featured image</span>
              <label
                className="inline-block py-2 px-4 rounded-2xl border border-gray-600 border-solid bg-gray-900 hover:bg-gray-800 cursor-pointer "
                htmlFor="filePicker"
              >
                Upload an Image
              </label>
              {image.previewImage && (
                <Image
                  className="ml-4 mt-4 -mb-4"
                  src={image.previewImage}
                  width={150}
                  height={150}
                  alt="Bulldog picture"
                />
              )}
              <input
                id="filePicker"
                style={{ visibility: "hidden" }}
                type={"file"}
                onChange={handleImage}
              />
            </div>
            <br />

            <label htmlFor="content" className="text-xl">
              Content
            </label>
            <br />
            <textarea
              className="p-2 mt-2 border border-dashed border-gray-700 w-full outline-none focus:border-2"
              id="content-input"
              name="content-input"
              placeholder="Supports markdown. Yay!"
              value={perex}
              onChange={handlePerex}
            />
          </form>
        </div>
      ) : (
        <div>You arent logged in.</div>
      )}
    </>
  );
};

export default NewArticlePage;
