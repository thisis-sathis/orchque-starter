"use client";
import dynamic from "next/dynamic";
import type { CountdownBlockProps } from "./CountdownBlock";

// ssr: false must live in a Client Component — this thin wrapper provides that.
const CountdownBlockDynamic = dynamic(
  () => import("./CountdownBlock").then((m) => ({ default: m.CountdownBlock })),
  { ssr: false }
);

export function CountdownBlockClient(props: CountdownBlockProps) {
  return <CountdownBlockDynamic {...props} />;
}
