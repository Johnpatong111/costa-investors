import { Container } from "@/components/ui/primitives";
import type { ContentBlock } from "@/lib/content/content-utils";

/**
 * Renderuje bloki treści z content matrix.
 * Semantyka: sekcja + H2 + akapity + lista. To czytelny szkielet dla Google
 * i dla czytnika ekranu – bez „divów-udawaczy” nagłówków.
 */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="bg-white">
      <Container className="space-y-10 py-12 sm:py-16">
        {blocks.map((block) => (
          <section key={block.id} id={block.id} aria-labelledby={`${block.id}-heading`}>
            <h2
              id={`${block.id}-heading`}
              className="mb-3 text-2xl font-bold text-brand-950 sm:text-[1.7rem]"
            >
              {block.heading}
            </h2>
            <div className="max-w-3xl space-y-3 text-[15px] leading-relaxed text-brand-800">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {block.bullets && block.bullets.length > 0 ? (
              <ul className="mt-4 grid max-w-3xl gap-2 text-sm text-brand-700 sm:grid-cols-2">
                {block.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 rounded-lg bg-brand-50/70 px-3 py-2"
                  >
                    <span aria-hidden className="mt-0.5 text-accent-600">
                      ▸
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </Container>
    </div>
  );
}
