import { cn } from "@/lib/utils";

function EmptyList({
  heading = "Nesne bulunamadı",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return <h2 className={cn("text-xl ", className)}>{heading}</h2>;
}

export default EmptyList;
