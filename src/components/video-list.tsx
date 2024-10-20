"use client";

import { Input } from "@/components/ui/input";
import { DirectionTypes, SortByTypes, Video, VideoTypes } from "@/lib/type";
import { SearchIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoDropdownMenu from "./atom/dropdown";
import VideoCard from "./atom/video";

interface Props {
  type: VideoTypes;
  sortBy: SortByTypes;
  direction: DirectionTypes;
  query: string;
}

const VideoList = (props: Props) => {
  const [type, setType] = useState<VideoTypes>(props.type);
  const [sortBy, setSortBy] = useState<SortByTypes>(props.sortBy);
  const [direction, setDirection] = useState<DirectionTypes>(props.direction);
  const [text, setText] = useState<string>(props.query);
  const [query, setQuery] = useState<string>(props.query);

  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<Video[]>([]);

  // Update into URL query parameters
  const updateURL = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortDirection", direction);
    if (query) {
      url.searchParams.set("query", query);
    } else {
      url.searchParams.delete("query");
    }
    window.history.pushState({}, "", url.toString());
  }, [type, sortBy, direction, query]);

  // Fetch items
  const fetchItems = useCallback(
    async (page: number) => {
      try {
        const url = new URL("https://api.jeuk.io/epic1min/list");
        url.searchParams.set("type", type);
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortDirection", direction);
        url.searchParams.set("query", query);
        url.searchParams.set("page", page.toString());

        const response = await fetch(url, { method: "GET" });
        const newItems = await response.json();
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...newItems]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setHasMore(false);
      }
    },
    [type, sortBy, direction, query]
  );
  const updateItems = useCallback(() => {
    fetchItems(page).then(() => setPage((prevPage) => prevPage + 1));
  }, [fetchItems, page]);

  useEffect(() => {
    //     // Sync text with query
    setText(query);

    updateURL();
    setPage(0);
    setHasMore(true);
    setItems([]);
  }, [type, sortBy, direction, query, updateURL]);

  useEffect(() => {
    if (page === 0) updateItems();
  }, [type, sortBy, direction, query, page, updateItems]);

  // Set the height of the scrollable div
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    // CSS-IN-JS configuration
    document.body.style.overflowY = "hidden";

    // Set the height of the scrollable div
    const updateHeight = () => setHeight(window.innerHeight - 80);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col min-h-screen gap-4 py-6">
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center gap-2"
            href=""
            onClick={() => {
              setType("min");
              setSortBy("impact");
              setDirection("desc");
              setQuery("");
            }}
          >
            <VideoIcon className="h-6 w-6" />
            <span className="font-semibold text-lg">Epic1min</span>
          </Link>
          <form
            className="flex-1 relative"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(text);
            }}
          >
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-300 dark:text-gray-700" />
            <Input
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              className="pl-8 w-full"
              placeholder="Search by id/name of video/channel"
              type="search"
            />
          </form>
          <VideoDropdownMenu
            {...{ type, setType, sortBy, setSortBy, direction, setDirection }}
          />
        </div>
        <div id="scrollableDiv" style={{ ...scrollableDivStyle, height }}>
          <InfiniteScroll
            dataLength={items.length}
            next={updateItems}
            hasMore={hasMore}
            loader={
              <p className="text-sm font-medium text-center line-clamp-2 m-8">
                Loading...
              </p>
            }
            endMessage={
              <p className="text-sm font-medium text-center line-clamp-2 m-8">
                Want more? Find them on YouTube and{" "}
                <Link href="/register">register new videos!</Link>
              </p>
            }
            scrollableTarget="scrollableDiv"
            style={{ paddingBottom: "150px" }}
          >
            <ul>
              {items.map((item, i) => (
                <li key={i} style={{ marginBottom: "16px" }}>
                  <VideoCard {...item} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

const scrollableDivStyle = {
  overflowY: "auto", // Enable vertical scrolling
  display: "grid",
} as const;

export default VideoList;
