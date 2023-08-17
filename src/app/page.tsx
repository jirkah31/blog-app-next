import { ReactNode } from "react";
import getArticles from "@/api/articles/route";
import Article from "@/components/Article";

export interface ArticleType {
  articleId: string;
  title: string;
  perex: string;
  createdAt: string;
  imageId: string;
  lastUpdatedAt: string;
  comments?: any; //dotypovat jak se mi povede implementovat comment functionality
}

export default async function Home() {
  const data = await getArticles();

  return (
    <>
      <h1 className="text-3xl pl-4 mt-6">Recent articles</h1>

      {data.items.map((article: ArticleType) => {
        const { articleId, title, perex, imageId, createdAt } = article;
        return (
          <Article
            key={articleId}
            articleId={articleId}
            imageId={imageId}
            author="{author}"
            createdAt={createdAt}
            perex={perex}
            title={title}
          />
        );
      })}
    </>
  );
}
