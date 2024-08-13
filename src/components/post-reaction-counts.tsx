import { Post } from "@/lib/api/types/post.type";
import { HoverCard } from "./ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import _ from "lodash";
import {
  ReactionType,
  ReactionTypeToUnifiedMap,
} from "@/lib/api/types/reaction.type";
import { Emoji } from "emoji-picker-react";
import { faker } from "@faker-js/faker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

type PostReactionCountPreviewProps = {
  post: Post;
};

export function PostReactionCountsPreview({
  post,
}: PostReactionCountPreviewProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-1">
              {_.chain(post.reactionCounts)
                .toPairs()
                .sortBy(([, count]) => -count)
                .take(3)
                .map(([reaction]) => (
                  <div
                    key={reaction}
                    className="flex items-center gap-1 text-sm text-muted-foreground"
                  >
                    <Emoji
                      unified={
                        ReactionTypeToUnifiedMap[reaction as ReactionType]
                      }
                      size={16}
                    />
                  </div>
                ))
                .value()}

              <span className="text-sm">
                {_.chain(post.reactionCounts).values().sum().value()}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="z-20">
            <Card>
              <CardContent className="p-4">
                <ul className="">
                  {_.times(6, (index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-sm">{faker.person.fullName()}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <span className="text-sm">
                      And {faker.number.int({ min: 1, max: 100 })} more...
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reactions</DialogTitle>
          <DialogDescription>Number of reactions</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <PostReactionCountsDetails post={post} />
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}

type PostReactionCountDetailsProps = {
  post: Post;
};

export function PostReactionCountsDetails({
  post,
}: PostReactionCountDetailsProps) {
  const postId = post.id;
  return (
    <Tabs defaultValue="all" className="w-full ">
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="all">All</TabsTrigger>
        {Object.keys(post.reactionCounts as Object).map((reaction) => (
          <TabsTrigger key={reaction} value={reaction}>
            <Emoji
              unified={ReactionTypeToUnifiedMap[reaction as ReactionType]}
              size={16}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all">All</TabsContent>
      {Object.entries(ReactionType).map(([_, reaction]) => (
        <TabsContent key={reaction} value={reaction}>
          Mock
        </TabsContent>
      ))}
    </Tabs>
  );
}
