import { Inter, Roboto_Mono } from "@next/font/google";
import "../styles/css/globals.css";
import { getUserInfo } from "../services/supabase/data/get_data";
import NavbarComponent from "../components/client/NavbarComponent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "The Phantom Menace",
  description: "Welcome to Our Demo Website!",
};

export default async function RootLayout({ children }) {
  const user = await getUserInfo();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased  bg-teal-500 min-h-screen flex flex-col items-center`}
      >
        {user ? (
          <NavbarComponent user={user} />
        ): (
          <></>
        )}
        {children}
      </body>
    </html>
  );
}
