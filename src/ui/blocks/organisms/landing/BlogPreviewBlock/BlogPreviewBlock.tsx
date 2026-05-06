// BlogPreviewBlock.tsx — 3-column preview of recent blog posts.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  readTime?: string;
  coverSrc?: string;
  authorName?: string;
}

export interface BlogPreviewBlockProps {
  heading?: string;
  subheading?: string;
  posts: BlogPost[];
  allPostsHref?: string;
  allPostsLabel?: string;
  className?: string;
}

export function BlogPreviewBlock({
  heading = "From the blog",
  subheading,
  posts,
  allPostsHref = "/blog",
  allPostsLabel = "View all posts",
  className,
}: BlogPreviewBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        <div className="flex items-end justify-between flex-wrap gap-[var(--space-4x)]">
          <div className="flex flex-col gap-[var(--space-2x)]">
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
          {allPostsHref && (
            <a
              href={allPostsHref}
              className="inline-flex items-center gap-[var(--space-1x)] text-[var(--text-sm)] text-[var(--color-primary)] font-[var(--font-semibold)] hover:underline"
            >
              {allPostsLabel}
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="grid gap-[var(--space-6x)] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex flex-col hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              <div className="aspect-video bg-[var(--color-surface-overlay)]">
                {post.coverSrc && (
                  <img
                    src={post.coverSrc}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-[var(--space-5x)] flex flex-col gap-[var(--space-3x)] flex-1">
                <div className="flex items-center gap-[var(--space-2x)] text-[var(--text-xs)] text-[var(--color-text-muted)]">
                  {post.tag && (
                    <span className="px-[var(--space-2x)] py-[var(--space-halfx)] rounded-full bg-[var(--color-surface-overlay)] font-[var(--font-semibold)]">
                      {post.tag}
                    </span>
                  )}
                  <span>{post.date}</span>
                  {post.readTime && <span>· {post.readTime} read</span>}
                </div>
                <h3 className="text-[var(--text-base)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)] group-hover:text-[var(--color-primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] flex-1">
                  {post.excerpt}
                </p>
                {post.authorName && (
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">By {post.authorName}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
