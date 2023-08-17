"use client";

import { getArticle } from "@/api/articles/[articleId]/route";
import getImage from "@/api/images/[imageId]/route";
import { RequestConfigT, apiConfig } from "@/api_configs";
import Button from "@/components/Button";
import useUpdateArticle from "@/features/useUpdateArticle";
import { PathsT } from "@/paths";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const EditArticlePage = ({ params }: { params: any }) => {
  const [title, setTitle] = useState<string>("");
  const [perex, setPerex] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const { accessToken } = useAppSelector((state) => state.accessToken.value);
  const router = useRouter();
  const { mutate: updateArticle } = useUpdateArticle();
  const { isLoggedIn } = useAppSelector((state) => state.isLoggedIn.value);

  useEffect(() => {
    getArticle(params.articleId)
      .then((data) => {
        setPerex(data.perex);
        setTitle(data.title);
        const fetchImage = async (data: any) => {
          const base64ImageString = await getImage(data.imageId);
          setImage(`data:image/*;base64,${base64ImageString}`);
        };
        fetchImage(data);
      })
      .catch((err) => console.error("ERROR", err));
  }, []);

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
      const convertToBase64 = (event: any) => {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]);

        reader.onload = () => {
          setImage(reader.result);
        };
      };
      convertToBase64(event);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editConfig: RequestConfigT = {
      ...apiConfig,
      method: "patch",
      url: `${PathsT.ArticlesPathT}/${params.articleId}`,
      data: {
        title,
        perex,
      },
      headers: {
        ...apiConfig.headers,
        Authorization: accessToken,
      },
    };
    updateArticle(editConfig);
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
              <Button type="submit">Publish article</Button>
            </div>

            <label htmlFor="title" className="text-xl">
              Article title
            </label>
            <br />
            <input
              value={title}
              onChange={handleTitle}
              className="border border-dashed border-gray-700 p-2 w-full mt-4 outline-none focus:border-2"
              type="text"
              id="title-input"
              name="title-input"
              placeholder="Article title"
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
              {image && (
                <Image
                  className="ml-4 mt-4 -mb-4"
                  src={image}
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
              value={perex}
              onChange={handlePerex}
              className="p-2 border border-dashed border-gray-700 w-full outline-none focus:border-2"
              id="content-input"
              name="content-input"
              placeholder="Supports markdown. Yay!"
            />
          </form>
        </div>
      ) : (
        <div>You arent logged in.</div>
      )}
    </>
  );
};

export default EditArticlePage;
