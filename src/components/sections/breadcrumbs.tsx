import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Widoczny breadcrumb (niezbędny dla zgodności z JSON-LD BreadcrumbList).
 * Ostatni element nie jest linkiem. To bieżąca strona.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-100 bg-brand-50/60">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-xs text-brand-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-brand-900">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="hover:text-brand-900 hover:underline">
                      {item.name}
                    </Link>
                    <span aria-hidden className="text-brand-300">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
