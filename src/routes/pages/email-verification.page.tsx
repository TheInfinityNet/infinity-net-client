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
import authService, {
  AuthErrorCodes,
  SendEmailVerificationErrorResponse,
  VerifyEmailByCodeErrorResponse,
} from "@/lib/api/services/auth.service";
import { setFormError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const verificationCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export function EmailVerificationPage() {
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendCooldown > 0) {
        setResendCooldown((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      email: location.state?.email || "",
      code: "",
    },
  });

  const sendEmailVerificationMutation = useMutation({
    mutationFn: authService.sendEmailVerification,
    onSuccess(data) {
      const { retryAfter, message } = data.data;
      const cooldown = new Date(retryAfter).getTime() - Date.now();
      setResendCooldown(Math.ceil(cooldown / 1000));
      toast({
        title: "Verification Code Sent",
        description: message,
      });
    },
    onError(error) {
      if (axios.isAxiosError<SendEmailVerificationErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
          case AuthErrorCodes.InvalidEmail:
            setFormError(form, error.response.data.errors);
            toast({
              title: "Send Verification Code Failed",
              description: "Please check the errors and try again.",
            });
            break;
          default:
            toast({
              title: "Send Verification Code Failed",
              description:
                error.response?.data.message || "An unknown error occurred.",
            });
        }
      } else if (error instanceof Error) {
        toast({
          title: "Send Verification Code Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Send Verification Code Failed",
          description: "An unknown error occurred.",
        });
      }
    },
  });

  const verifyEmailByCodeMutation = useMutation({
    mutationFn: authService.verifyEmailByCode,
    onSuccess(data) {
      const { message } = data.data;
      toast({
        title: "Email Verified",
        description: message,
      });
      navigation("/sign-in");
    },
    onError(error) {
      if (axios.isAxiosError<VerifyEmailByCodeErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
          case AuthErrorCodes.CodeInvalid:
          case AuthErrorCodes.InvalidEmail:
            setFormError(form, error.response.data.errors);
            toast({
              title: "Email Verification Failed",
              description: "Please check the errors and try again.",
            });
            break;
          default:
            toast({
              title: "Email Verification Failed",
              description:
                error.response?.data.message || "An unknown error occurred.",
            });
        }
      } else if (error instanceof Error) {
        toast({
          title: "Email Verification Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Email Verification Failed",
          description: "An unknown error occurred.",
        });
      }
    },
  });

  const onResendCode = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    const email = form.getValues("email");
    sendEmailVerificationMutation.mutate({ email });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    verifyEmailByCodeMutation.mutate(values);
  });

  return (
    <Card className="mx-auto w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Please verify your email address to activate your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@infinity.net" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the email address you used to sign up.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <div className="flex justify-between gap-1.5">
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <Button
                      variant="outline"
                      onClick={onResendCode}
                      disabled={resendCooldown > 0}
                    >
                      {resendCooldown > 0
                        ? `Resend Code in ${resendCooldown}s`
                        : `Resend Code`}
                    </Button>
                  </div>
                  <FormDescription>
                    Please check your email for the verification code.
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
