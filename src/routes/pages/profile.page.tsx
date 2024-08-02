import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/components/link";
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import profileService from "@/lib/api/services/profile.service";

export function ProfilePage() {
  const { id } = useParams();

  const { data } = useQuery(["user", id], {
    queryFn: profileService.getProfile,
  });

  console.log(data);

  return (
    <div className="container w-full mx-auto">
      <div className="h-48 md:h-64 bg-[url('/placeholder.svg')] bg-cover bg-center " />
      <div className="relative -mt-16 md:-mt-20 bg-background">
        <div className="flex items-end p-4 md:p-6">
          <div className="relative -mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 bg-background rounded-full border-4 border-background">
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <div className="ml-4 md:ml-6 flex-1">
            <h2 className="text-xl md:text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Software Engineer</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
        <div className="px-4 md:px-6 py-2 md:py-3 border-t border-muted">
          <p className="text-muted-foreground">
            I'm a software engineer with a passion for building innovative
            products. In my free time, I enjoy hiking and photography.
          </p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="abouts">Abouts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-muted-foreground text-sm">
                      Posted 2 hours ago
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Had a great time hiking in the mountains this weekend! The
                    views were breathtaking.
                  </p>
                  <img
                    src="/placeholder.svg"
                    alt="Hiking Photo"
                    width={800}
                    height={450}
                    className="mt-4 rounded-lg"
                  />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="w-5 h-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="w-5 h-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    10 likes • 5 comments
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-muted-foreground text-sm">
                      Posted 1 day ago
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Excited to announce that I've started a new job as a
                    software engineer at Acme Inc! Can't wait to get started.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircleIcon className="w-5 h-5" />
                      <span className="sr-only">Comment</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="w-5 h-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    25 likes • 10 comments
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">About</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Born</h4>
                      <p className="text-muted-foreground text-sm">
                        January 1, 1990
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lives in</h4>
                      <p className="text-muted-foreground text-sm">
                        San Francisco, CA
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Relationship</h4>
                      <p className="text-muted-foreground text-sm">Single</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Joined</h4>
                      <p className="text-muted-foreground text-sm">
                        February 15, 2015
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Photos</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    <img
                      src="/placeholder.svg"
                      alt="Photo 1"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Photo 2"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Photo 3"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Photo 4"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Photo 5"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Photo 6"
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Friends</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        Jane Doe
                      </p>
                    </Link>
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        John Smith
                      </p>
                    </Link>
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        Sarah Lee
                      </p>
                    </Link>
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        David Kim
                      </p>
                    </Link>
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        Emily Chen
                      </p>
                    </Link>
                    <Link href="#" className="group">
                      <Avatar className="w-12 h-12 group-hover:ring-2 group-hover:ring-primary">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <p className="mt-2 text-sm font-medium group-hover:underline">
                        Michael Lee
                      </p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="friends"></TabsContent>
        <TabsContent value="photos"></TabsContent>
        <TabsContent value="abouts"></TabsContent>
      </Tabs>
    </div>
  );
}
