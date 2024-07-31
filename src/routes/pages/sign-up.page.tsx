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
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/components/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, setFormError } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "react-query";
import authService, {
  AuthErrorCodes,
  SignUpErrorResponse,
} from "@/lib/api/services/auth.service";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}

const signUpSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  middleName: z.string().max(50).optional(),
  username: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  passwordConfirmation: z.string().min(8).max(50),
  mobileNumber: z.string().min(10).max(15),
  birthdate: z.string().date(),
  gender: z.nativeEnum(Genders),
  acceptTerms: z.boolean().refine((value) => value === true),
});

export function SignUpPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      username: "",
      email: "",
      password: "",
      birthdate: format(new Date(), "yyyy-MM-dd"),
      acceptTerms: false,
      gender: Genders.Other,
      mobileNumber: "",
      passwordConfirmation: "",
    },
  });
  console.log(form.formState.errors);

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess(data) {
      const { message } = data.data;

      toast({
        title: "Sign Up successful",
        description: message,
      });

      navigate(
        {
          pathname: "/email-verification",
        },
        { state: { email: form.getValues("email") } },
      );
    },
    onError(error) {
      if (axios.isAxiosError<SignUpErrorResponse>(error)) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodes.ValidationError:
          case AuthErrorCodes.InvalidEmail:
          case AuthErrorCodes.EmailAlreadyInUse:
          case AuthErrorCodes.WeakPassword:
          case AuthErrorCodes.PasswordMismatch:
          case AuthErrorCodes.TermsNotAccepted:
            setFormError(form, error.response.data.errors);
            toast({
              title: "Sign Up Failed",
              description: "Please check the errors and try again.",
            });
            break;
          default:
            toast({
              title: "Sign Up Failed",
              description:
                error.response?.data.message ||
                "Something went wrong. Please try again.",
            });
        }
      } else {
        toast({
          title: "Sign Up Failed",
          description: "An unknown error occurred.",
        });
      }
    },
  });

  const onSubmit = form.handleSubmit((values) => signUpMutation.mutate(values));

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md space-y-6">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your first name is visible to other users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your last name is visible to other users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your middle name is optional.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="@infinity" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your username is unique and cannot be changed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                      Your password must be at least 8 characters long.
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
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your password must match the one above.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Mobile Number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your mobile number is used for account recovery.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(value) =>
                            field.onChange(value && format(value, "yyyy-MM-dd"))
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Genders).map(([key, value]) => (
                          <SelectItem key={value} value={value}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex gap-1.5 ">
                    <FormControl className="mt-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel> Accept terms and conditions</FormLabel>
                      <FormDescription>
                        By checking this box, you agree to our{" "}
                        <Link href="/terms" className="text-primary">
                          terms and conditions
                        </Link>
                        .
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4 mt-4">
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col !mt-0 gap-2">
          <div className="flex items-center justify-between w-full mt-4">
            <Link
              href="/forgot-password"
              className="text-sm hover:text-primary"
            >
              Forgot Password?
            </Link>
            <span className="text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="hover:text-primary">
                Sign In
              </Link>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
