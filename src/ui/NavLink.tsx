import { Link } from "preact-router";
import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";

type NavLinkProps = {
  href: string;
  children: ComponentChildren;
  activeClassName?: string;
  className?: string;
};

export function NavLink({
  href,
  children,
  activeClassName = "",
  className = "",
}: NavLinkProps) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const updatePath = () => setPath(window.location.pathname);

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      updatePath();
    };
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      updatePath();
    };

    window.addEventListener("popstate", updatePath);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  const isActive = path === href;
  const combinedClass = `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <Link {...({ href, className: combinedClass } as any)}>
      {children}
    </Link>
  );
}
