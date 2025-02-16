"use client"
import "./globals.css";
import Providers from "./component/Providers";
import { usePathname } from "next/navigation";

import { Header } from "./component/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
   
 {

  const pathname = usePathname()

  // Define routes where the header should be hidden
  const hideHeaderRoutes = ["/login", "/register"]
  return (
    <html lang="en">
      <body
        
      >
        <Providers>
        {!hideHeaderRoutes.includes(pathname) && <Header />}
       <main className=""> {children}</main>
       </Providers>
      </body>
    </html>
  );
}
