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
  SignInErrorResponse,
} from "@/lib/api/services/auth.service";
import axios, { HttpStatusCode } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

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

  const signIn = useMutation(async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await authService.signIn(values);
      console.log(response.data.data.tokens.accessToken);

      setAccessToken(response.data.data.tokens.accessToken);
      setRefreshToken(response.data.data.tokens.refreshToken);

      toast({
        title: "Sign In Successful",
        description: "You have successfully signed in.",
      });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError<SignInErrorResponse>(error)) {
        switch (error.response?.data.statusCode) {
          case HttpStatusCode.UnprocessableEntity:
            Object.entries(error.response.data.data.errors).forEach(
              ([key, value]) => {
                form.setError(key as keyof typeof values, {
                  type: "server",
                  message: value[0],
                });
              },
            );
            break;
          default:
            toast({
              title: "Sign In Failed",
              description: error.response?.data.data.message,
            });
        }
      }
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    signIn.mutate(values);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md space-y-6">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in or use one of the options
            below.
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
                      This is the email you used to sign up.
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
        </CardContent>

        <CardFooter className="flex-col px-4 gap-2">
          <Button variant="outline" className="w-full">
            Sign In with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign In with Facebook
          </Button>
          <Button variant="outline" className="w-full">
            Sign In with Twitter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
