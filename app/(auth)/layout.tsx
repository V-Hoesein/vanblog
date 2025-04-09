import AuthFooter from "@/components/auth-footer";
import { FC, ReactNode } from "react";
import Wave from "react-wavify";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto px-10 bg-white gap-y-4 relative">
      <Wave
        className="absolute top-0 left-0 right-0 rotate-180"
        fill="#000000"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
      {children}
      <AuthFooter />
    </div>
  );
};

export default Layout;
