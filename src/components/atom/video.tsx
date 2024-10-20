import { Video } from "@/lib/type";
import { getDurationString, getViewsString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function VideoCard(video: Video) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/0.jpg`;
  const channelUrl = `https://youtube.com/channel/${video.channelId}`;
  const videoUrl = `https://youtube.com/watch?v=${video.id}`;

  const [imgSrc, setImgSrc] = useState<string>(thumbnailUrl);
  return (
    <div className="flex items-start gap-4 relative">
      <Link href={videoUrl} target="_blank">
        <span className="sr-only">View</span>
        <div className="w-[168px]">
          <Image
            src={imgSrc}
            alt="Thumbnail"
            className="aspect-video rounded-lg object-cover"
            width={168}
            height={94}
            priority
            onError={() => {
              setImgSrc(
                "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
              );
            }}
            style={{ backgroundColor: "#000000" }}
          />
        </div>
      </Link>
      <div className="text-sm">
        <Link href={videoUrl} target="_blank">
          <div className="font-medium line-clamp-2">{video.title}</div>
        </Link>
        <Link href={channelUrl} target="_blank">
          <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            <span className="sr-only">View</span>
            {video.channelTitle}
          </div>
        </Link>
        <Link href={videoUrl} target="_blank">
          <div className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            {getViewsString(video.views)} views ·{" "}
            {getDurationString(video.duration)}
          </div>
        </Link>
      </div>
    </div>
  );
}
