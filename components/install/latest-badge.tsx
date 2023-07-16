import clsx from "clsx";

import styles from "./install.module.css";
import Link from "next/link";

export default function LatestBadge({
  href,
  type,
  alt = "Latest Release",
  newPage = false,
}: {
  href: string;
  type: "obsidian" | "zotero";
  alt?: string;
  newPage?: boolean;
}) {
  const newPageProps = newPage
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const img = <img src={`/img/${type}-latest-badge.svg`} alt={alt} />;

  if (href.startsWith("/")) {
    return (
      <Link className={clsx(styles.badge)} href={href} {...newPageProps}>
        {img}
      </Link>
    );
  }
  return (
    <a className={clsx(styles.badge)} href={href} {...newPageProps}>
      {img}
    </a>
  );
}

export const releaseUrl = "https://github.com/aidenlx/obsidian-zotero/releases";
