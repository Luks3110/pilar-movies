import { cn } from "@/lib/utils";

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};
