export const updateInfoUrl =
  "https://raw.githubusercontent.com/aidenlx/obsidian-zotero/master/app/zotero/update.json";

export type ZoteroInfo = [
  version: string,
  updateLink: string,
  zoteroSupports: (6 | 7)[]
];

export async function getUpdateJson() {
  const versions = await fetch(updateInfoUrl)
    .then((res) => res.json())
    .then(
      (data) =>
        data?.addons?.["zotero-obsidian-note@aidenlx.top"] ??
        (null as
          | {
              version: string;
              update_link: string;
              update_info_url: string;
              applications: {
                gecko: {
                  strict_min_version: string;
                  strict_max_version: string;
                };
                zotero: {
                  strict_min_version: string;
                  strict_max_version: string;
                };
              };
            }[]
          | null)
    )
    .catch((e) => {
      console.error(`Failed to fetch ${updateInfoUrl}:`, e);
      return null;
    });

  if (!versions || !Array.isArray(versions) || versions.length === 0)
    return null;

  const v = versions.at(-1);
  const zoteroSupports: (6 | 7)[] = [];

  if (
    v.applications.gecko &&
    v.applications.gecko.strict_min_version === "60.9"
  ) {
    zoteroSupports.push(6);
  }
  if (v.applications.zotero) {
    zoteroSupports.push(7);
  }
  return [v.version, v.update_link, zoteroSupports] as ZoteroInfo;
}

export async function getZoteroRelease() {
  const data = await fetch(
    "https://api.github.com/repos/aidenlx/obsidian-zotero/releases"
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(`Failed to fetch ${updateInfoUrl}:`, e);
      return null;
    });
  if (!data) return null;
  const release = data.find((release: any) =>
    release.tag_name.startsWith("zt")
  );
  if (!release) return null;

  const binary = data
    .find((release: any) => release.tag_name.startsWith("zt"))
    .assets.find((asset: any) => asset.name.endsWith(".xpi"));
  if (!binary) return null;

  return `https://github.com/aidenlx/obsidian-zotero/releases/download/${release.tag_name}/${binary.name}`;
}

export async function getSSGProps(): Promise<ZoteroInfoProps> {
  const [updateJson, githubRelease] = await Promise.all([
    getUpdateJson(),
    getZoteroRelease(),
  ]);
  return {
    version: updateJson?.[0] ?? null,
    updateLink: updateJson?.[1] ?? null,
    zoteroSupports: updateJson?.[2] ?? null,
    githubRelease: githubRelease ?? null,
  };
}

export interface ZoteroInfoProps {
  version: string | null;
  updateLink: string | null;
  zoteroSupports: (6 | 7)[] | null;
  githubRelease: string | null;
}
