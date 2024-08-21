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
import { useApiClient } from "@/contexts/api-client.context";
import { setFormError } from "@/lib/utils";
import {
  AuthErrorCodes,
  VerifyEmailByTokenErrorResponse,
} from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const verificationTokenSchema = z.object({
  token: z.string().uuid(),
});

export function EmailVerificationTokenPage() {
  const { authService } = useApiClient();
  const [urlSearchParams] = useSearchParams({});
  const token = urlSearchParams.get("token");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof verificationTokenSchema>>({
    resolver: zodResolver(verificationTokenSchema),
    defaultValues: {
      token: token || "",
    },
  });

  const verifyEmailByTokenMutation = useMutation({
    mutationFn: authService().verifyEmailByToken,
    onSuccess(data) {
      const { message } = data.data;
      toast({
        title: "Email Verified",
        description: message,
      });
      navigate("/sign-in");
    },
    onError(error) {
      if (axios.isAxiosError<VerifyEmailByTokenErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
            setFormError(form, error.response.data.errors);
            break;
          default:
            toast({
              title: "Verification Error",
              description: error.response?.data.message || "An error occurred.",
            });
            break;
        }
      } else {
        toast({
          title: "Verification Error",
          description: "An error occurred.",
        });
      }
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    verifyEmailByTokenMutation.mutate(values);
  });

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          <span>
            Please verify your email address to activate your account.
          </span>
          <br />
          <span>
            If you do not perform this action, please do not click the{" "}
            <strong>Verify Email</strong> button.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 !mt-0">
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
            <div className="flex flex-col space-y-4 mt-4">
              <Button className="w-full" type="submit">
                Verify Email
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
