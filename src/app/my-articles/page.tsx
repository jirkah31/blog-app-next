import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/MyArticleTableNoSSR"), {
  ssr: false,
});

const MyArticlesPage = () => {
  return <NoSSR />;
};

export default MyArticlesPage;
