import Image from "next/image";
import { ThemeProvider } from "@/components/provider/theme-provider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image
                alt="logo"
                src={"/msys.png"}
                width={154}
                height={144}
                className="invert dark:invert-0"
              />
            </div>
            MaliSystem S.A.R.L
          </a>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
