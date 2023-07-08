function Version({ children }: { children: React.ReactNode }) {
  return (
    <code className="nx-ml-1 nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10">
      {children}
    </code>
  );
}

export default function Versions({ values }: { values: string[] }) {
  return (
    <span>
      {values.map((v, i) => (
        <Version key={i}>{v}</Version>
      ))}
    </span>
  );
}
