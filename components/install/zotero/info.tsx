import { useData } from "nextra/data";
import type { ZoteroInfoProps } from "./data";
import LatestBadge, { releaseUrl } from "../latest-badge";
import clsx from "clsx";
import styles from "../install.module.css";
import { Callout } from "nextra/components";
import Versions from "../version";

export const ReleaseLink = () => {
  const { updateLink, githubRelease } = useData() as ZoteroInfoProps;
  return (
    <LatestBadge
      href={updateLink ?? githubRelease ?? releaseUrl}
      type="zotero"
      newPage
    />
  );
};

export const ReleaseTag = () => {
  return (
    <img
      className={clsx(styles.badge)}
      src="https://custom-icon-badges.demolab.com/badge/dynamic/json?color=bc3a3c&label=&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Faidenlx%2Fobsidian-zotero%2Fmaster%2Fapp%2Fzotero%2Fpackage.json&logo=zotero-32&prefix=zt"
      alt="latest zotero plugin version"
    />
  );
};

export const ZoteroInfo = () => {
  const { version, zoteroSupports } = useData() as ZoteroInfoProps;

  return (
    <Callout type="info">
      {version && (
        <div>
          Latest Version:
          <Versions values={[version]} />
        </div>
      )}
      {zoteroSupports && (
        <div>
          Support:
          <Versions values={zoteroSupports.map((v) => `Zotero ${v}`)} />
        </div>
      )}
    </Callout>
  );
};
