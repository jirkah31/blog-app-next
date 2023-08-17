"use client";

import { PathsT } from "@/paths";
import Button from "./Button";
import { RequestConfigT, apiConfig } from "@/api_configs";
import { useAppSelector } from "@/redux/store";
import deleteArticle from "@/features/deleteArticle";

interface TableLinePropsT {
  article: {
    articleId: string;
    title: string;
    perex: string;
  };
}

interface DeletePropsT {
  articleId: string;
  accessToken: string | null;
}

export function TableLine({ article }: TableLinePropsT) {
  const { articleId, title, perex } = article;
  const { accessToken } = useAppSelector((state) => state.accessToken.value);

  const handleDeleteArticle = async ({
    articleId,
    accessToken,
  }: DeletePropsT) => {
    if (accessToken && articleId) {
      await deleteArticle({ articleId, accessToken });
      // await refetch();
      // await setNewArticles(articles);
    }
  };
  return (
    <tr
      className="border-b border-dashed border-gray-600 leading-8"
      key={articleId}
    >
      <td className="py-1">
        <input type="checkbox" />
      </td>
      <td>{title}</td>
      <td>{perex}</td>
      <td>Elisabeth Straingth</td>
      <td>4</td>
      <td>
        <Button small path={`${PathsT.EditArticlePathT}/${articleId}`}>
          edit
        </Button>
        <Button
          small
          onClick={() => handleDeleteArticle({ articleId, accessToken })}
        >
          delete
        </Button>
      </td>
    </tr>
  );
}
