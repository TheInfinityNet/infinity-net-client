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

export function SignInPage() {
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="example@acme.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <Button className="w-full">Sign In</Button>
          </div>
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
