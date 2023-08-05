import { PathsT } from "./paths";

export type navLinksT = {
  id: number,
  path: string,
  content: string,
}

export const navLinks: navLinksT[] = [
  { id: 1, path: PathsT.HomePathT, content: "Bulldogs Articles" },
  { id: 2, path: PathsT.AboutPathT, content: "About Buldogs" },
];
