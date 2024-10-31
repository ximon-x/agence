"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAVIGATION_DATA } from "@/data/navigation";
import { toast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  signout: () => void;
};

export default function Footer(props: Props) {
  const { signout } = props;

  const handleSignout = () => {
    try {
      signout();
    } catch (err) {
      console.error(err);

      toast({
        title: "Error",
        description: "Failed to signout",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="my-8">
      <TooltipProvider>
        <Dock direction="middle">
          {NAVIGATION_DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          {Object.entries(NAVIGATION_DATA.external).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSignout}
                  aria-label={"Logout"}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <LogOutIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </footer>
  );
}
