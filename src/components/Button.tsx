import Link from "next/link";
import classNames from "classnames";

export interface ButtonPropsT {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  path?: string;
  small?: boolean;
}

const Button = ({
  small,
  className,
  onClick,
  path,
  type,
  children,
}: ButtonPropsT): React.ReactElement<ButtonPropsT> => {
  const isSmallButton = small ? "h-8 px-2 rounded-xl" : "py-2 px-4 rounded-2xl";

  const button: JSX.Element = (
    <button
      type={type}
      className={classNames(
        "border border-gray-600 border-solid bg-gray-900 hover:bg-gray-800",
        isSmallButton,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (path) {
    return (
      <Link
        className={classNames("button-small-link", className, isSmallButton)}
        href={path}
      >
        {button}
      </Link>
    );
  }

  return button;
};

export default Button;
