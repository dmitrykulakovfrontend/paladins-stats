import { type AppType } from "next/dist/shared/lib/utils";
import Header from "~/common/components/Header";
import { Montserrat } from "next/font/google";

import "~/styles/globals.css";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${montserrat.variable} font-montserrat`}>
      <Header />
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
