import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

const convertBreadcrumb = (string) => {
  return string.replace(/-/g, " ");
};

export function Breadcrumbs() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, i) => (
        <BreadcrumbItem key={i}>
          <NextLink href={breadcrumb.href}>
            <BreadcrumbLink fontSize="sm">{convertBreadcrumb(breadcrumb.breadcrumb)}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
