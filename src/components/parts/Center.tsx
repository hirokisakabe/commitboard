import { ReactNode } from "react";

export function Center({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      {children}
    </div>
  );
}
