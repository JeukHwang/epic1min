import {
  Clock10Icon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
  EyeIcon,
  LucideIcon,
  SortAscIcon,
  SortDescIcon,
  StarIcon,
} from "lucide-react";

export const videoTypes = ["min", "hour"] as const;
export type VideoTypes = (typeof videoTypes)[number];
export const sortByTypes = ["views", "duration", "impact"] as const;
export type SortByTypes = (typeof sortByTypes)[number];
export const directionTypes = ["asc", "desc"] as const;
export type DirectionTypes = (typeof directionTypes)[number];

export type TypeInfo<T extends string> = {
  [key in T]: { label: string; Icon: LucideIcon };
};
export const videoTypeInfo: TypeInfo<VideoTypes> = {
  min: { label: "Min", Icon: ClockArrowDownIcon },
  hour: { label: "Hour", Icon: ClockArrowUpIcon },
};
export const sorteByTypeInfo: TypeInfo<SortByTypes> = {
  impact: { label: "View per time", Icon: StarIcon },
  views: { label: "View", Icon: EyeIcon },
  duration: { label: "Time", Icon: Clock10Icon },
  //   heart: { label: "Favorite", Icon: HeartIcon }, // TODO: make favorite
};
export const directionTypeInfo: TypeInfo<DirectionTypes> = {
  desc: { label: "Largest to smallest", Icon: SortDescIcon },
  asc: { label: "Smallest to largest", Icon: SortAscIcon },
};

export type Video = {
  id: string;
  type: VideoTypes;
  title: string;
  views: number;
  duration: number;
  impact: number;
  channelId: string;
  channelTitle: string;
};
