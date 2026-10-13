import type { ReactNode } from "react";
import { RootDocument } from "@/components/RootDocument";
import { fr } from "@/content/fr";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata(fr);

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="fr">{children}</RootDocument>;
}
