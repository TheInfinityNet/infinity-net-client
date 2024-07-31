import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "react-query";
import authService, {
  AuthErrorCodes,
  SignInErrorResponse,
} from "@/lib/api/services/auth.service";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";
import { Link } from "@/components/link";
import { setFormError } from "@/lib/utils";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignInPage() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthStore.getState();

  const signIn = useMutation({
    mutationFn: authService.signIn,
    mutationKey: "signIn",
    onSuccess(data) {
      const { tokens, user } = data.data;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);

      console.log(user);

      toast({
        title: "Sign In Successful",
        description: "You have successfully signed in.",
      });

      navigate("/");
    },
    onError(error) {
      if (axios.isAxiosError<SignInErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
          case AuthErrorCodes.WrongPassword:
          case AuthErrorCodes.InvalidEmail:
          case AuthErrorCodes.ExpiredPassword:
            setFormError(form, error.response.data.errors);

            toast({
              title: "Sign In Failed",
              description: "Please check the errors and try again.",
            });

            break;
          default:
            toast({
              title: "Sign In Failed",
              description:
                error.response?.data.message ||
                "Something went wrong. Please try again.",
            });
        }
      } else if (error instanceof Error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Sign In Failed",
          description: "An unknown error occurred.",
        });
      }
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    signIn.mutate(values);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md space-y-6">
        <CardHeader className="pb-0">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in or use one of the options
            below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 py-0">
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
                      Enter the email address associated with your account.
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
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

              <div className="flex flex-col space-y-4 mt-4">
                <Button className="w-full">Sign In</Button>
              </div>
            </form>
          </Form>

          <span className="inline-block text-sm text-center w-full text-muted-foreground">
            Or sign in with social media
          </span>

          <Button variant="outline" className="w-full">
            Sign In with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign In with Facebook
          </Button>
          <Button variant="outline" className="w-full">
            Sign In with Twitter
          </Button>
        </CardContent>

        <CardFooter className="flex-col mt-0 gap-2">
          <div className="flex items-center justify-between w-full mt-4">
            <Link
              href="/forgot-password"
              className="text-sm hover:text-primary"
            >
              Forgot Password?
            </Link>
            <span className="text-sm">
              Don't have an account?{" "}
              <Link href="/sign-up" className="hover:text-primary">
                Sign Up
              </Link>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
