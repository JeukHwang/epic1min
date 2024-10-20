import { VideoIcon } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col min-h-screen gap-4 py-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 h-10" href="/">
            <VideoIcon className="h-6 w-6" />
            <span className="font-semibold text-lg">Epic1min</span>
          </Link>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-medium">About</h2>

          <h2 className="text-base font-medium">Criteria of videos</h2>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            <b>Each criteria</b> is as follows:
            <br />• <b>Video:</b> Exclude short-form content.
            <br />• <b>10M+ views:</b> Create a barrier to keep the collection
            concise.
            <br />• <b>≤1 minute:</b> Focus on viral videos that capture
            attention; exclude songs.
            <br />• <b>≥60 minutes:</b> Provide in-depth knowledge and value.
          </p>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            Obviously, it's not an easy condition to get views, whether it's
            under 1m or over 1h.
          </p>
          <h2 className="text-base font-medium">Why do I make Epic1min</h2>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Epic1min was launched to gather global viral memes while aiming to{" "}
            <b>collect and share videos worth spreading</b> beyond our personal
            filter bubbles.
          </p>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            My hope is that the 1-minute collection will be full of{" "}
            <b>entertainment</b>,<br /> while the 1-hour collection will be
            filled with <b>discussions and documentaries</b>.
          </p>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            Videos worth spreading, a parody of{" "}
            <Link
              href="https://blog.ted.com/ideas-change-everything/"
              target={"_blank"}
              className="underline"
            >
              TED's old tagline
            </Link>
            .
            <br />
            <b>
              Grab people with entertaining 1-minute videos and share insightful
              1-hour videos.
            </b>
          </p>
          <h2 className="text-base font-medium">Future plan</h2>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            Once enough people have contributed, I’ll introduce channel rankings
            based on the number of videos per channel.
            <br />
            Since it is difficult to make many successful memes or successful
            long videos, it will be interesting to see what happens.
          </p>
        </div>
        <div className="grid gap-3">
          <h2 className="text-lg font-medium">Version</h2>
          <h2 className="text-base font-medium">v1.0 - 2024.10.20</h2>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Basic feature
          </p>
        </div>
      </div>
    </div>
  );
}
