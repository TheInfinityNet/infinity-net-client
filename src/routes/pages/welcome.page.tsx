import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomePage() {
  return (
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
  );
}
