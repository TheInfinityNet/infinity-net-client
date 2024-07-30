import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, CircleCheckIcon, MountainIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  birthday: z.date(),
  gender: z.nativeEnum(Genders),
  terms: z.boolean(),
});

const verificationCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export function SignUpPage() {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      username: "",
      email: "",
      password: "",
      birthday: new Date(),
    },
  });

  const formVerification = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
    setStep(3);
  });

  const onSubmitVerification = formVerification.handleSubmit(async (values) => {
    console.log(values);
    setStep(4);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      {step === 1 && (
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <MountainIcon className="h-12 w-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Join Infinity Net</h1>
            <p className="text-muted-foreground">
              Create an account to connect with friends, share updates, and
              discover new communities.
            </p>
          </div>
          <Button onClick={() => setStep(2)}>Get Started</Button>
        </div>
      )}
      {step === 2 && (
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
                  name="birthday"
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
                            selected={field.value}
                            onSelect={field.onChange}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                  name="terms"
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
        </Card>
      )}
      {step === 3 && (
        <Card className="mx-auto w-full max-w-md space-y-6">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
            <CardDescription>
              We have sent a verification code to your email. Please enter the
              code below to verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...formVerification}>
              <form onSubmit={onSubmitVerification}>
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
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      {step === 4 && (
        <Card className="mx-auto w-full max-w-md space-y-6">
          <CardHeader>
            <CardTitle>Welcome to Infinity Net!</CardTitle>
            <CardDescription>
              Your account has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <p>
              You are now signed up and ready to start connecting with friends,
              sharing updates, and discovering new communities.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Explore Infinity Net</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
