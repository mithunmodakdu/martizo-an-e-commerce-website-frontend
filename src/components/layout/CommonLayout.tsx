import type { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode
}

export default function CommonLayout({children} : IProps) {
  return (
    <div>
      <Navbar/>
      <div className="w-9/10 mx-auto max-w-7xl">
        {children}
      </div>
      <Footer/>
    </div>
  );
}