"use client";

import React from "react";
import Feed from "./Feed";

export type FeedData = {
  id: number;
  user: string;
  timestamp: string;
  content: string;
};

const CollapsibleFeed = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const mockFeedData: Array<FeedData> = [
    {
      id: 2,
      user: "User2",
      timestamp: "10 mins ago",
      content: "#User1 Me too!!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    {
      id: 1,
      user: "User1",
      timestamp: "12 mins ago",
      content: "Just watched the new blockbuster @dune2 mind-blowing!",
    },
    // ... more mock feed items
  ];

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div>
      <button onClick={toggleCollapse} className="text-sm text-white ">
        {isCollapsed ? "Show Feed" : "Hide Feed"}
      </button>
      <Feed isCollapsed={isCollapsed} mockFeedData={mockFeedData} />
    </div>
  );
};

export default CollapsibleFeed;
