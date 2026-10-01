import Image from "next/image";
import type { SiteInfo } from "@/lib/albums";

export interface BioProps {
  site: SiteInfo;
}

export function Bio({ site }: BioProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden border border-line">
          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="self-center">
          <h2 className="font-display text-[25px] font-medium tracking-tight text-ink md:text-[32px]">
            {site.name}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">{site.bio}</p>
          <p className="mt-8 font-display text-xl leading-relaxed text-ink md:text-[25px]">
            {site.dedication}
          </p>
        </div>
      </div>
    </section>
  );
}
