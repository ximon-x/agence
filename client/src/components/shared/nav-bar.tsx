import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn, env } from "@/lib/utils";
import * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: `${env.NEXT_PUBLIC_DOC_URL}`,
    description: "Agence",
  },
  {
    title: "Tech Stack",
    href: `${env.NEXT_PUBLIC_DOC_URL}/setup`,
    description:
      "Learn about the technologies used in the project and how they all come together.",
  },
  {
    title: "System Architecture",
    href: `${env.NEXT_PUBLIC_DOC_URL}/architecture`,
    description:
      "Take a deep dive into the system architecture and how the application works.",
  },
  {
    title: "About Me",
    href: `${env.NEXT_PUBLIC_DOC_URL}/about`,
    description: "Learn more about me and my background.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          target="_blank"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
