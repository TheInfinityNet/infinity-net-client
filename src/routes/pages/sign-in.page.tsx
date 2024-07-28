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
  SignInResponse,
} from "@/lib/api/services/auth.service";
import axios, { HttpStatusCode } from "axios";

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

  const signIn = useMutation(async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await authService.signIn(values);

      console.log(response);
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
            console.log("Unknown error");
            break;
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
