import "./globals.css";
import StoreProvider from "../src/services/store-provider";
import Main from "../src/components/Layouts/Main";
import { ToastProvider } from "src/components/ui/ToastProvider";

export const metadata = {
  title: "Tarmal Creation – Handcrafted Jewelry",
  description:
    "An elegant jewelry boutique showcasing timeless handcrafted designs.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-bg text-text min-h-screen relative overflow-x-hidden">
        {/* Animated Background Glass Blobs */}
        <div className="absolute top-0 left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/8 blur-[100px] sm:blur-[120px] pointer-events-none z-0 animate-blob-slow" />
        <div className="absolute top-[35%] right-[-15%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-primary/5 blur-[120px] sm:blur-[140px] pointer-events-none z-0 animate-blob-reverse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-primary/7 blur-[90px] sm:blur-[100px] pointer-events-none z-0 animate-blob-slow" />

        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          <StoreProvider>
            <ToastProvider>
              <Main>{children}</Main>
            </ToastProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
