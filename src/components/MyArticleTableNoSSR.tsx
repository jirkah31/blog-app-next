"use client";

import { PathsT } from "@/paths";
import getArticles from "@/api/articles/route";
import { TableLine } from "@/components/TableLine";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { errorToast } from "@/features/toasts";

type ArticleType = {
  articleId: string;
  title: string;
  perex: string;
  createdAt: string;
  imageId: string;
  lastUpdatedAt: string;
};

const MyArticleTableNoSSR = () => {
  const [articles, setArticles] = useState<ArticleType[]>();
  const { isLoggedIn } = useAppSelector((state) => state.isLoggedIn.value);
  const router = useRouter();

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data.items);
      })
      .catch((err) => console.error("ERROR", err));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(PathsT.HomePathT);
      errorToast("You arent logged in. Please logged in!");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <table className="w-full">
          <tbody>
            <tr className="border-b-2 border-dashed border-gray-600 leading-8">
              <th className="text-left">
                <input type="checkbox" />
              </th>
              <th className="text-left">Article title</th>
              <th className="text-left">Perex</th>
              <th className="text-left">Author</th>
              <th className="text-left"># of comments</th>
              <th className="text-left">Action</th>
            </tr>
            {articles &&
              articles.map((article: ArticleType) => {
                return <TableLine key={article.articleId} article={article} />;
              })}
          </tbody>
        </table>
      ) : (
        <tr>
          <td>You are not logged in. Please log in first.</td>
        </tr>
      )}
    </>
  );
};

export default MyArticleTableNoSSR;
