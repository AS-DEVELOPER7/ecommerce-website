import "./globals.css";
import StoreProvider from "../src/services/store-provider";
import Main from "../src/components/Layouts/Main";
import { ToastProvider } from "src/components/ui/ToastProvider";

export const metadata = {
  title: "Tarmal Creation – Handcrafted Jewelry",
  description:
    "An elegant jewelry boutique showcasing timeless handcrafted designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-bg text-text min-h-screen">
        <StoreProvider>
          <ToastProvider>
            <Main>{children}</Main>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
