import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  directionTypeInfo,
  DirectionTypes,
  SortByTypes,
  sorteByTypeInfo,
  TypeInfo,
  videoTypeInfo,
  VideoTypes,
} from "@/lib/type";
import {
  BugIcon,
  InfoIcon,
  ListPlusIcon,
  LucideIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  type: VideoTypes;
  setType: (type: VideoTypes) => void;
  sortBy: SortByTypes;
  setSortBy: (sortBy: SortByTypes) => void;
  direction: DirectionTypes;
  setDirection: (direction: DirectionTypes) => void;
}

interface SubProps<T extends string> {
  label: string;
  value: T;
  setValue: (value: T) => void;
  info: TypeInfo<T>;
}

function VideoDropdownMenuRadioGroup<T extends string>({
  label,
  value,
  setValue,
  info,
}: SubProps<T>) {
  return (
    <DropdownMenuRadioGroup
      value={value}
      onValueChange={(v) => setValue(v as T)}
    >
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      {(
        Object.entries(info) as [string, { label: string; Icon: LucideIcon }][]
      ).map(([value, { label, Icon }], i) => (
        <DropdownMenuRadioItem key={i} value={value}>
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}

export default function VideoDropdownMenu({
  type,
  setType,
  sortBy,
  setSortBy,
  direction,
  setDirection,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-10 w-10 shrink-0 flex items-center gap-2"
          size="sm"
          variant="outline"
        >
          <SettingsIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <VideoDropdownMenuRadioGroup
          label="Type"
          value={type}
          setValue={setType}
          info={videoTypeInfo}
        />
        <DropdownMenuSeparator />
        <VideoDropdownMenuRadioGroup
          label="Sort by"
          value={sortBy}
          setValue={setSortBy}
          info={sorteByTypeInfo}
        />
        <DropdownMenuSeparator />
        <VideoDropdownMenuRadioGroup
          label="Sort direction"
          value={direction}
          setValue={setDirection}
          info={directionTypeInfo}
        />
        <DropdownMenuSeparator />
        {/* Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem>
            <InfoIcon className="mr-2 h-4 w-4" />
            <Link href="/about" target="_blank">
              About
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ListPlusIcon className="mr-2 h-4 w-4" />
            <Link href="/register" target="_blank">
              Register new video
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BugIcon className="mr-2 h-4 w-4" />
            <Link href="/report" target="_blank">
              Report bug/feature
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
