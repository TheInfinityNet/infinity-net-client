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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const verificationCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export function EmailVerificationPage() {
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendCooldown > 0) {
        setResendCooldown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);

  const emailVerificationMutation = useMutation(
    async (values: z.infer<typeof verificationCodeSchema>) => {
      console.log(values);
    },
  );

  const onSubmit = form.handleSubmit(async (values) => {
    emailVerificationMutation.mutate(values);
  });

  const resendCodeMutation = useMutation(
    async (values: Pick<z.infer<typeof verificationCodeSchema>, "email">) => {
      console.log(values);

      // const rateLimitReset = headers.get("X-RateLimit-Reset");
      const rateLimitReset = String(Date.now() / 1000 + 60);

      if (rateLimitReset) {
        const resetTime = parseInt(rateLimitReset, 10);
        const currentTime = Math.floor(Date.now() / 1000);
        setResendCooldown(resetTime - currentTime);
      }
    },
  );

  const onResendCode = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    const email = form.getValues("email");

    resendCodeMutation.mutate(
      { email },
      {
        onSuccess() {
          toast({
            title: "Verification Code Sent",
            description: "Please check your email for the verification code.",
          });
        },
        onError() {
          toast({
            title: "Failed to Resend Code",
            description: "Please try again later.",
          });
        },
      },
    );
  };

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
