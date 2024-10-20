"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/NEcsYa0qE7X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const youtubeRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function RegisterVideo() {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const [url, setUrl] = useState<string>("");
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const match = url.match(youtubeRegex);
    setId(match ? match[1] : null);
  }, [url, setId]);

  useEffect(() => {
    thumbnailRef.current!.src = id
      ? `https://img.youtube.com/vi/${id}/0.jpg`
      : "/placeholder.svg";
  }, [id, thumbnailRef]);

  const onClick = useCallback(async () => {
    if (!id) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    fetch(`https://api.jeuk.io/epic1min/register?id=${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        console.log(await res.text());
        alert("Thank you for your contribution!");
        router.push("/");
      })
      .catch(console.error);
  }, [id, router]);
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col min-h-screen gap-4 py-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 h-10" href="/">
            <VideoIcon className="h-6 w-6" />
            <span className="font-semibold text-lg">Epic1min</span>
          </Link>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg font-medium">Register new video</h2>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            The video must meet these criteria:
          </p>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            1. 10M+ views
          </p>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            2. ≤1 minute or ≥60 minutes
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-1.5 items-center">
            <Label htmlFor="url">
              <span>Video URL</span>
            </Label>
            <Input
              ref={titleRef}
              placeholder="https://www.youtube.com/watch?v=example"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5 items-center">
            <Label htmlFor="url">
              <span>Thumbnail Preview</span>
            </Label>
            <Image
              ref={thumbnailRef}
              src="/placeholder.svg"
              alt="Thumbnail"
              className="aspect-video rounded-lg object-cover"
              width={168 * 3}
              height={94 * 3}
              priority
              style={{ backgroundColor: "#000000", maxWidth: "100%" }}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Cancel
            </Button>
            {id && <Button onClick={onClick}>Submit</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
