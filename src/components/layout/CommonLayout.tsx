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
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      <Footer/>
    </div>
  );
}