import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        Error 404
      </p>
      <h1 className="font-display text-[32px] font-medium tracking-tight text-ink md:text-[48px]">
        Página no encontrada
      </h1>
      <p className="max-w-md text-base leading-relaxed text-muted">
        La foto o la página que buscas no está en esta galería.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex h-11 items-center justify-center border border-line px-6 text-base text-accent transition-colors hover:border-accent hover:text-accent-strong"
      >
        Volver a la portada
      </Link>
    </main>
  );
}
