import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useState } from "react";
import { SendHorizonalIcon, SmileIcon } from "lucide-react";

type ReplyCommentProps = {
  commentId?: string;
  postId?: string;
  active?: boolean;
};

const replySchema = z.object({
  content: z.string().min(1),
  commentId: z.string(),
  postId: z.string(),
});

export function ReplyComment({ commentId, postId, active }: ReplyCommentProps) {
  const [isActive, setIsActive] = useState(active ?? false);
  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      commentId,
      postId,
      content: "",
    },
  });

  const replyCommentMutation = useMutation({
    mutationFn: (values: { content: string }) => {
      console.log(values);
      return Promise.resolve();
    },
  });

  const onSubmit = form.handleSubmit((values) =>
    replyCommentMutation.mutate(values),
  );

  return (
    <div
      className="flex"
      onFocus={() => {
        setIsActive(true);
      }}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>

      <Form {...form}>
        <form className="grid border flex-1 rounded-lg" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea className="w-full outline-none p-2 " {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {isActive && (
            <div className="flex justify-between">
              <div>
                <Button variant={"ghost"}>
                  <SmileIcon className="size-5 text-muted-foreground" />
                </Button>
              </div>
              <div>
                <Button variant={"ghost"} type="submit">
                  <SendHorizonalIcon className="size-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
