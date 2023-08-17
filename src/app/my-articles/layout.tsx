import Button from "@/components/Button";
import { PathsT } from "@/paths";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  return (
    <div className="">
      <h1 className="text-3xl py-4 inline-block">My articles</h1>
      <div className="mb-4 inline-block ml-4">
        <Button path={PathsT.CreateNewArticlePathT} type="button">
          Create new article
        </Button>
      </div>
      {children}
    </div>
  );
}
