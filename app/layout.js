import "./globals.css";
import StoreProvider from "@/src/lib/store-provider";

export const metadata = {
  title: "AL-Nada HRMS",
  description: "AL-Nada HR management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
