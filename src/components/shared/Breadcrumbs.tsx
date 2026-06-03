import { Link, useLocation } from "react-router";

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface Props {
  className?: string;
}

export const Breadcrumbs = ({ className }: Props) => {

  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

    
  return (
    <nav className={`text-md text-gray-500 ${className}`}>
      <ul className="flex items-center space-x-2">
        <li>
          <Link to="/">Home</Link>
        </li>

        {pathnames.map((segment, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center space-x-2">
              <span>/</span>

              {isLast ? (
                <span className="text-black font-medium">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link to={to}>{formatSegment(segment)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
