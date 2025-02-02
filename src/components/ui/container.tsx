import { cn } from "@/lib/utils";

export function Container({ children, className }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 2xl:px-8 max-w-7xl", className)}>
      {children}
    </div>
  );
}
