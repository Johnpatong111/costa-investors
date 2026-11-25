import { redirect } from "next/navigation";

/** /nl heeft één duidelijke bestemming; houd de URL-set klein en canonical. */
export default function DutchIndexPage() {
  redirect("/nl/appartement-kopen-costa-blanca");
}
