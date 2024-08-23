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
import { useAuth } from "@/contexts/auth.context";
import { useForm } from "react-hook-form";
import { CreatePostSchema, PostPrivacy } from "@/contracts/post.contract";
import { CreatePostInput } from "@/types/post.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useCreatePostMutation } from "@/hooks/useCreatePostMutation";

type PostComposerProps = {
  groupId?: string;
};

export function PostComposer(
  {
    groupId
  }: PostComposerProps
) {
  const { user } = useAuth();

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      content: "",
      privacy: PostPrivacy.Public,
      groupId,
    },
  });

  const createPostMutation = useCreatePostMutation();

  const onSubmit = form.handleSubmit((data) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.log(error);
      }
    });
  })

  useEffect(() => {
    console.log(form.watch("content"));
  }, [form.watch("content")])


  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.cover} alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-5 px-2" >
                            <SelectValue placeholder="Privacy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="text-sm">
                          {
                            Object.entries(PostPrivacy).map(([key, value]) => {
                              return (
                                <SelectItem key={key} value={value}>
                                  {key}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MDXEditor
              markdown={form.watch("content")}
              onChange={(value) => form.setValue("content", value)}
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
      </form>
    </Form>
  );
}
