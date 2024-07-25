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
import { CircleCheckIcon, MountainIcon } from "lucide-react";

export function SignUpPage() {
  const [step, setStep] = useState(1);

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
            <div className="space-y-2">
              <Label htmlFor="email-username">Email or Username</Label>
              <Input id="email-username" placeholder="example@acme.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStep(3)}>Next</Button>
          </CardFooter>
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
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter verification code"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={() => setStep(4)}>Verify</Button>
          </CardFooter>
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
