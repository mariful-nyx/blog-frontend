"use client"
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import GlobalProvider from "@/context/GlobalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black bg-white dark:text-white text-black`}
      >
        <Provider store={store}>
          <GlobalProvider>
            <NavBar />
              {children}
            <Footer />
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
}
