import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.min.css";                                       
import "primereact/resources/themes/lara-light-indigo/theme.css";     

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkfold",
  description: "One place for all links!",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
