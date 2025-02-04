"use client"
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import GlobalProvider from "@/context/GlobalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for Toastify



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
       <head>
       <meta name="google-site-verification" content="m0Rm6r3e-svB8kWxBUKjb_uvXSOQUwJgKLn9u7Rozsg" />
        {/* Google Tag Manager script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KL01DQ6W4J"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KL01DQ6W4J');
            `,
          }}
        />

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black bg-white dark:text-white text-black`}
      >
        <Provider store={store}>
          <GlobalProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <NavBar />

              {children}
            <Footer />
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
}
