import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SignupProviderProps {
  className?: string;
  label: string;
  icon: ReactNode;
  provider: string;
}

const SignupProvider: FC<SignupProviderProps> = ({
  className,
  label,
  icon,
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex justify-center items-center h-14 rounded-xl",
        className
      )}
    >
      <div className="flex justify-center items-center gap-x-2 py-3">
        {icon}
        <span className="font-semibold text-md">{label}</span>
      </div>
    </Button>
  );
};

export default SignupProvider;
