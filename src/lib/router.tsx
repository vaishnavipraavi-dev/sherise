import { createContext, type MouseEvent, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

type NavigateInput = string | { to: string; params?: Record<string, string>; search?: Record<string, string> };
type RouterValue = { pathname: string; navigate(input: NavigateInput): void };

const RouterContext = createContext<RouterValue | null>(null);

function resolveTo(to: string, params?: Record<string, string>, search?: Record<string, string>) {
  let href = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      href = href.replace(`$${key}`, encodeURIComponent(value));
    }
  }
  if (search && Object.keys(search).length > 0) {
    const query = new URLSearchParams(search).toString();
    href += query ? `?${query}` : "";
  }
  return href;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const navigate = (input: NavigateInput) => {
    const href = typeof input === "string" ? input : resolveTo(input.to, input.params, input.search);
    window.history.pushState({}, "", href);
    setPathname(window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const value = useMemo(() => ({ pathname, navigate }), [pathname]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function usePathname() {
  return useRouter().pathname;
}

export function useNavigate() {
  return useRouter().navigate;
}

function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("Router unavailable");
  return value;
}

export function Link({
  to,
  params,
  search,
  activeProps,
  activeOptions,
  className,
  onClick,
  children,
  ...rest
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  activeProps?: { className?: string };
  activeOptions?: { exact?: boolean };
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { pathname, navigate } = useRouter();
  const href = resolveTo(to, params, search);
  const cleanHref = href.split("?")[0] || "/";
  const exact = activeOptions?.exact ?? false;
  const active = exact ? pathname === cleanHref : pathname === cleanHref || (cleanHref !== "/" && pathname.startsWith(`${cleanHref}/`));
  const classes = [className, active ? activeProps?.className : null].filter(Boolean).join(" ") || undefined;

  return (
    <a
      {...rest}
      href={href}
      className={classes}
      aria-current={active ? "page" : rest["aria-current"]}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
