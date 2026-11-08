import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StatusPill } from "@/components/marketing/primitives";
import type { Work } from "@/lib/work";

type Variant = "image" | "ink" | "paper";

/**
 * One project in the work grid. Image tiles crop a real screenshot; text tiles
 * carry projects that have no public screen yet (architecture, in build).
 */
export function WorkTile({
  work,
  variant = work.image ? "image" : "paper",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  imageClassName,
  className,
}: {
  work: Work;
  variant?: Variant;
  sizes?: string;
  imageClassName?: string;
  className?: string;
}) {
  const isImage = variant === "image" && work.image;

  return (
    <Link
      href={`/work#${work.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl outline-offset-4",
        variant === "ink" && "dark bg-background text-foreground",
        variant === "paper" && "bg-paper",
        variant === "image" && "border bg-paper",
        className,
      )}
    >
      {isImage && (
        <div className={cn("relative aspect-[16/10] overflow-hidden border-b", imageClassName)}>
          <Image
            src={work.image!.src}
            alt={work.image!.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.02]"
            style={{ objectPosition: work.image!.position }}
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col gap-3 p-5 sm:p-6", !isImage && "justify-between gap-10 lg:p-8")}>
        <div className="flex items-center justify-between gap-4">
          <StatusPill status={work.status} />
          <ArrowUpRight
            aria-hidden
            className="size-5 text-muted-foreground transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{work.kind}</p>
          <h3 className="text-title">{work.name}</h3>
          <p className="max-w-md text-[0.9375rem] text-muted-foreground">{work.summary}</p>
          {!isImage && (
            <p className="mt-3 text-sm text-muted-foreground">{work.stack.join(", ")}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
