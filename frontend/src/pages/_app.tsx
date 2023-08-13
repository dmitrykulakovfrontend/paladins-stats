import { type AppType } from "next/dist/shared/lib/utils";
import Header from "~/common/components/Header";
import { Montserrat, Inter } from "next/font/google";
import localFont from "next/font/local";

import "~/styles/globals.css";
const titleFont = localFont({
  src: "../fonts/big_noodle_titling.ttf",
  variable: "--font-title",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`${montserrat.variable} ${inter.variable} ${titleFont.variable} font-montserrat `}
    >
      <Header />
      <main className={`mx-auto min-h-screen  max-w-[1100px] p-4 pt-20`}>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default MyApp;
