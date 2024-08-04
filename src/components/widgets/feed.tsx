import { PostCard } from "../post-card";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useGetNewsFeed } from "@/hooks/useGetNewsFeed";

export function NewsFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNewsFeed();

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.data.posts) ?? [],
    [data],
  );

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const fetchElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        handleLoadMore();
      }
    });

    const currentRef = fetchElementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchElementRef, hasNextPage, isFetchingNextPage, handleLoadMore]);

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      <div ref={fetchElementRef}>Loading more...</div>
    </>
  );
}
