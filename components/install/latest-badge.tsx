import clsx from "clsx";

import styles from "./install.module.css";

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
  return (
    <a className={clsx(styles.badge)} href={href} {...newPageProps}>
      <img src={`/img/${type}-latest-badge.svg`} alt={alt} />
    </a>
  );
}

export const releaseUrl = "https://github.com/aidenlx/obsidian-zotero/releases";
