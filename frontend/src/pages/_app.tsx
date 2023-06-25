import { type AppType } from "next/dist/shared/lib/utils";
import Header from "~/common/components/Header";
import { Montserrat, Inter } from "next/font/google";

import "~/styles/globals.css";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${montserrat.variable} ${inter.variable} font-montserrat `}>
      <Header />
        <main
        className={`max-w-[1100px]  mx-auto min-h-screen pt-20`}
      >
        
        <Component {...pageProps} />
      
      </main>
    </div>
  );
};

export default MyApp;
