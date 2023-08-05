import React from "react";
import { navLinks } from "@/links";
import Link from "next/link";
import { PathsT } from "@/paths";

const Navigation = () => {
  return (
    <nav className="h-16 w-full border-gray-700 border-b border-b-solid flex items-center align-center">
      <div className="w-full flex">
        <ul className="block list-none mx-auto">
          {navLinks.map((link) => {
            const path = link.path;
            return (
              <li
                className="inline-block text-gray-500 hover:text-gray-100 mx-5"
                key={link.id}
              >
                <Link href={link.path}>{link.content}</Link>
              </li>
            );
          })}
          {/* {isLoddegIn && (
        <li>
          <ButtonNavigation
            bounce={bounce}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={className}
            path={PathsT.MyArticlesPathT}
          >
            My articles
          </ButtonNavigation>
        </li>
      )} */}
          <li className="inline-block text-gray-500 hover:text-gray-100">
            <Link href={PathsT.LoginPathT}>
              Log In
              {/* {isLoddegIn ? "Log Out" : "Log In"} */}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
