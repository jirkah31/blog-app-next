import getImage from "@/api/images/[imageId]/route";
import Image from "next/image";
import { getArticle } from "@/api/articles/[articleId]/route";

interface ParamsT {
  articleId: string;
}

const RecentArticlePage = async ({ params }: { params: ParamsT }) => {
  const articleData = await getArticle(params.articleId);
  const { title, perex, createdAt, comments, imageId } = articleData;
  const base64ImageString = await getImage(imageId);
  const [year, month, day, hour, minute] = createdAt.match(/\d+/g)!.map(Number);
  const date = `${day}.${month}.${year} ${hour}:${minute}`;

  return (
    <div className="mt-14">
      <article className="relative">
        <div className="absolute w-20 h-20 -right-10 -top-10 bg-transparent border border-dashed border-l-transparent border-r-gray-800 border-t-gray-800 border-b-gray-800 rounded-full -rotate-45"></div>
        <div
          style={{ width: `calc(100% + 150px)` }}
          className="absolute -left-10 h-px border-b border-dashed border-gray-800"
        ></div>
        <div
          style={{ height: `calc(100% + 100px)` }}
          className="absolute -bottom-7 right-0 w-px border-r border-dashed border-gray-800"
        ></div>

        <div className="p-4">
          <h2 className="text-4xl font-bold">{title}</h2>
          <div className="mb-3">
            <h3 className="inline-block text-m text-gray-500">author</h3>
            <time className="text-m text-gray-500 ml-4">{date}</time>
          </div>
          <div className="mb-4">
            <Image
              className=""
              src={`data:image/*;base64,${base64ImageString}`}
              width={300}
              height={300}
              style={{ objectFit: "cover", height: "100%", width: "auto" }}
              alt="Bulldog picture"
            />
          </div>
          <p className="text-m">{perex}</p>
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
      <div className="p-4">
        <span>Comments ({comments.length})</span>
        {/* {isLoddegIn && <NewComment articleId={articleId} />}
          <div className="comments">
        {comments.map((comment: any) => {
          //dotypovat jak semi povede implementovat comment functionality
          const oneComment = { ...comment };
          return <Comment comment={oneComment} />;
        })} */}
      </div>
    </div>
  );
};

export default RecentArticlePage;
