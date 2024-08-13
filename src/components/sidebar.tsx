import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PlusCircleIcon,
  HomeIcon,
  TrendingUpIcon,
  CompassIcon,
  LayoutGridIcon,
  StarIcon,
  BookmarkIcon,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

const NAV_ITEMS = [
  { icon: HomeIcon, label: "Home" },
  { icon: TrendingUpIcon, label: "Popular" },
  { icon: CompassIcon, label: "Explore" },
  { icon: LayoutGridIcon, label: "All" },
];

const RECENT_ITEMS = ["r/AskReddit", "r/funny"];
const COMMUNITY_ITEMS = ["r/gaming", "r/pics", "r/news", "r/worldnews"];
const RESOURCE_ITEMS = [
  { icon: BookmarkIcon, label: "About Reddit" },
  { icon: SettingsIcon, label: "Help Center" },
];

export function Sidebar() {
  const [actives, setActives] = useState([
    "custom-feeds",
    "recent",
    "communities",
    "resources",
  ]);

  return (
    <Card className="w-full h-full">
      <CardContent className="pl-4 pr-0">
        <ScrollArea className="h-[87vh] pr-4">
          <div className="space-y-4 py-4">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              Main Navigation
            </h2>
            <div className="space-y-1">
              {NAV_ITEMS.map((item, index) => (
                <Button
                  key={index}
                  variant={"ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <Accordion
            type="multiple"
            className="w-full"
            value={actives}
            onValueChange={setActives}
          >
            <AccordionItem value="custom-feeds">
              <AccordionTrigger>Custom Feeds</AccordionTrigger>
              <AccordionContent>
                <Button variant="ghost" className="w-full justify-start">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Create Custom Feed
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="recent">
              <AccordionTrigger>Recent</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {RECENT_ITEMS.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <StarIcon className="mr-2 h-4 w-4" />
                      {item}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="communities">
              <AccordionTrigger>Communities</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[300px] w-full pr-4">
                  <div className="space-y-1">
                    {COMMUNITY_ITEMS.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <StarIcon className="mr-2 h-4 w-4" />
                        {item}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resources">
              <AccordionTrigger>Resources</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {RESOURCE_ITEMS.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
