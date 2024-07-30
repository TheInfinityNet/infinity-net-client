import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { useParams } from "react-router-dom";
// import authService from "@/lib/api/services/auth.service";

const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation(
    async (values: z.infer<typeof resetPasswordSchema>) => {
      // await authService.resetPassword(token!, values.password);
      console.log(token, values.password);
    },
    {
      onSuccess() {
        toast({
          title: "Password Reset Successful",
          description: "You can now log in with your new password.",
        });
      },
      onError() {
        toast({
          title: "Password Reset Failed",
          description:
            "There was an issue resetting your password. Please try again.",
        });
      },
    },
  );

  const onSubmit = form.handleSubmit((values) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }
    resetPasswordMutation.mutate(values);
  });

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your password must be at least 8 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Re-enter your new password for confirmation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4 mt-4">
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
