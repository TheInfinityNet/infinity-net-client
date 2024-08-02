import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/components/link";
import { AppleIcon, ChromeIcon, InfinityIcon } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-r from-[#f0f0f0] to-[#f5f5f5]">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <InfinityIcon className="h-20 w-20 text-primary" />
            <h1 className="text-5xl font-bold tracking-tight mt-4">
              Infinity Net
            </h1>
            <p className="max-w-xl text-muted-foreground text-xl mt-4">
              Connect, share, and discover with the world's most advanced social
              network.
            </p>
            <div className="mt-8 flex gap-4">
              <Button>Download App</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="grid gap-4">
              <InfinityIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Seamless Connectivity</h3>
              <p className="text-muted-foreground">
                Stay connected with your friends and family across all your
                devices.
              </p>
            </div>
            <div className="grid gap-4">
              <InfinityIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Discover content and connections tailored to your interests and
                preferences.
              </p>
            </div>
            <div className="grid gap-4">
              <InfinityIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Secure and Private</h3>
              <p className="text-muted-foreground">
                Protect your data and privacy with industry-leading security
                features.
              </p>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-r from-[#f0f0f0] to-[#f5f5f5]"
        >
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              What Our Users Say
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background p-6 text-left">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">John Doe</div>
                    <div className="text-muted-foreground text-sm">
                      Software Engineer
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Infinity Net has completely transformed the way I connect
                  with my friends and family. The seamless experience and
                  personalized features make it a must-have for anyone looking
                  to stay connected in the digital age."
                </p>
              </Card>
              <Card className="bg-background p-6 text-left">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">Sarah Anderson</div>
                    <div className="text-muted-foreground text-sm">
                      Marketing Manager
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "I've tried countless social media platforms, but Infinity Net
                  stands out with its focus on privacy and security. I can
                  confidently share my life with my loved ones without worrying
                  about my data being misused."
                </p>
              </Card>
              <Card className="bg-background p-6 text-left">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MI</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">Michael Ivanov</div>
                    <div className="text-muted-foreground text-sm">
                      Entrepreneur
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Infinity Net has been a game-changer for my business. The
                  ability to connect with like-minded individuals and share
                  content has helped me grow my network and expand my reach.
                  Highly recommended!"
                </p>
              </Card>
            </div>
          </div>
        </section>
        <section id="download" className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Download Infinity Net
            </h2>
            <p className="max-w-xl text-muted-foreground text-xl mt-4">
              Experience the future of social networking. Download Infinity Net
              today and connect with the world.
            </p>
            <div className="mt-8 flex gap-4">
              <Button>
                <AppleIcon className="h-6 w-6 mr-2" />
                App Store
              </Button>
              <Button>
                <ChromeIcon className="h-6 w-6 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Press</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Status</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#">Blog</Link>
            <Link href="#">Help Center</Link>
            <Link href="#">Developer API</Link>
            <Link href="#">Community</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Acceptable Use</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Follow Us</h3>
            <Link href="#">Twitter</Link>
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
