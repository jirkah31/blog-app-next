import { PathsT } from "@/paths";
import Link from "next/link";
import Image from "next/image";
import getImage from "@/api/images/[imageId]/route";

export interface ArticleAPIT {
  articleId: string;
  imageId: string;
  title: string;
  perex: string;
  author: string;
  createdAt: string;
}

const Article = async ({
  articleId,
  title,
  perex,
  imageId,
  author,
  createdAt,
}: ArticleAPIT) => {
  const [year, month, day, hour, minute] = createdAt.match(/\d+/g)!.map(Number);
  const date = `${day}.${month}.${year} ${hour}:${minute}`;
  const base64ImageString = await getImage(imageId);

  return (
    <article className="relative h-72 mt-10 mb-28">
      <div className="absolute w-20 h-20 -right-10 -top-10 bg-transparent border border-dashed border-l-transparent border-r-gray-800 border-t-gray-800 border-b-gray-800 rounded-full -rotate-45"></div>
      <div
        style={{ width: `calc(100% + 150px)` }}
        className="absolute -left-10 h-px border-b border-dashed border-gray-800"
      ></div>
      <div
        style={{ height: `calc(100% + 100px)` }}
        className="absolute -bottom-7 right-0 w-px border-r border-dashed border-gray-800"
      ></div>

      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 h-full w-80">
          <Image
            className="p-4"
            src={`data:image/*;base64,${base64ImageString}`}
            width={300}
            height={300}
            style={{ objectFit: "cover", height: "100%", width: "auto" }}
            alt="Bulldog picture"
          />
        </div>

        <div className="col-span-2 p-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div>
            <h3 className="inline-block text-xs text-gray-500">{author}</h3>
            <time className="text-xs text-gray-500 ml-4">{date}</time>
          </div>
          <p className="text-s">{perex}</p>
          <div>
            <Link
              className="inline-block text-blue-700 text-xs hover:text-blue-500"
              href={`${PathsT.RecentArticlePathT}/${articleId}`}
            >
              Read whole article
            </Link>
            <div className="text-xs">4 comments</div>
          </div>
        </div>
      </div>

      <div className="absolute w-20 h-20 -left-10 -bottom-10 bg-transparent border border-dashed border-t-transparent border-r-gray-800 border-b-gray-800 border-l-gray-800 rounded-full rotate-45"></div>
      <div
        style={{ height: `calc(100% + 100px)` }}
        className="absolute -top-6 w-px border-l border-dashed border-gray-800"
      ></div>
      <div
        style={{ width: `calc(100% + 150px)` }}
        className="absolute -right-6 h-px border-b border-dashed border-gray-800"
      ></div>
    </article>
  );
};

export default Article;
