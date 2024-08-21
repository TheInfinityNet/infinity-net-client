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
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { setFormError } from "@/lib/utils";
import { useApiClient } from "@/contexts/api-client.context";
import { AuthErrorCodes, ResetPasswordErrorResponse } from "@/types/auth.type";

const resetPasswordSchema = z.object({
  token: z.string().uuid(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
});

export function ResetPasswordPage() {
  const { authService } = useApiClient();
  const [urlSearchParams] = useSearchParams();
  const token = urlSearchParams.get("token") || "";
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      passwordConfirmation: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService().resetPassword,
    onSuccess(data) {
      const { message } = data.data;
      toast({
        title: "Password Reset Successful",
        description: message,
      });
      navigate("/sign-in");
    },
    onError(error) {
      if (axios.isAxiosError<ResetPasswordErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
            setFormError(form, error.response.data.errors);
            toast({
              title: "Reset Password Error",
              description: "Please check the form for errors.",
            });
            break;
          default:
            toast({
              title: "Reset Password Error",
              description: error.response?.data.message || "An error occurred.",
            });
            break;
        }
      } else {
        toast({
          title: "Reset Password Error",
          description: "An error occurred.",
        });
      }
    },
  });

  const onSubmit = form.handleSubmit((values) => {
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
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000000-0000-0000-0000-000000000000"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the token you received in your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="passwordConfirmation"
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
