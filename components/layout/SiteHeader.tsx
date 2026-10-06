import { Menu } from "lucide-react";

export interface SiteHeaderProps {
  name: string;
  sections: { id: string; title: string }[];
}

const HEADER_CSS = `
html {
  scroll-padding-top: 4rem;
}

.site-header {
  background-color: transparent;
}

@keyframes site-header-solidify {
  from {
    background-color: transparent;
  }
  to {
    background-color: color-mix(in srgb, var(--color-canvas) 92%, transparent);
  }
}

@supports (animation-timeline: scroll()) {
  .site-header {
    animation: site-header-solidify linear both;
    animation-timeline: scroll(root block);
    animation-range: 0 120px;
  }
}

@supports not (animation-timeline: scroll()) {
  .site-header {
    background-color: var(--color-canvas);
    background-color: color-mix(in srgb, var(--color-canvas) 92%, transparent);
  }
}
`;

export function SiteHeader({ name, sections }: SiteHeaderProps) {
  const hasSections = sections.length > 0;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 h-16">
      <style href="site-header-scroll" precedence="high">
        {HEADER_CSS}
      </style>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
        <span className="font-display text-xl font-medium tracking-tight text-ink">
          {name}
        </span>

        {hasSections && (
          <nav aria-label="Secciones" className="hidden md:block">
            <ul className="flex items-center">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`/#${section.id}`}
                    className="flex h-11 items-center px-3 text-base text-ink transition-colors hover:text-accent"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {hasSections && (
          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-none text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Abrir menú de secciones</span>
            </summary>
            <nav
              aria-label="Secciones"
              className="absolute right-0 top-full mt-2 w-56 border border-line bg-elevated"
            >
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`/#${section.id}`}
                      className="flex h-11 items-center px-4 text-base text-ink transition-colors hover:text-accent"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        )}
      </div>
    </header>
  );
}
