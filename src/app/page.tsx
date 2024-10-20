"use client";

import VideoList from "@/components/video-list";
import { DirectionTypes, SortByTypes, VideoTypes } from "@/lib/type";
import { useSearchParams } from "next/navigation";

export default function About() {
  const params = useSearchParams();
  const type = (params.get("type") || "min") as VideoTypes;
  const sortBy = (params.get("sortBy") || "impact") as SortByTypes;
  const direction = (params.get("sortDirection") || "desc") as DirectionTypes;
  const query = params.get("query") || "";
  return (
    <VideoList
      type={type}
      sortBy={sortBy}
      direction={direction}
      query={query}
    />
  );
}
