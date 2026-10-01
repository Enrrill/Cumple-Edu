export interface SiteFooterProps {
  credit: string;
}

export function SiteFooter({ credit }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 py-6">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {credit}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          © {year}
        </p>
      </div>
    </footer>
  );
}
