import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ImageIcon, VideoIcon, SmileIcon, SendIcon } from "lucide-react";

export function PostComposer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Public</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <MDXEditor
          markdown={"# Hello World"}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
          ]}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-4 w-4" />
            <span className="sr-only">Add image</span>
          </Button>
          <Button variant="ghost" size="icon">
            <VideoIcon className="h-4 w-4" />
            <span className="sr-only">Add video</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SmileIcon className="h-4 w-4" />
            <span className="sr-only">Add emoji</span>
          </Button>
        </div>
        <Button>
          <SendIcon className="h-4 w-4 mr-2" />
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
