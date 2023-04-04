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
    <main
      className={`${montserrat.variable} ${inter.variable} font-montserrat`}
    >
      <Header />
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
