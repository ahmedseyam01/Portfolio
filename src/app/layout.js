import { Jost, Overpass_Mono } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Ahmed Ehab Seyam | Front-End Developer",
  description: "Portfolio of Ahmed Ehab Seyam, a passionate Front-End Developer building modern web experiences.",
};

export default function RootLayout({ children }) {
  return <>
    <html lang="en" className={`${jost.variable} ${overpassMono.variable} dark antialiased h-full`} style={{ colorScheme: 'dark' }}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f3f4f6] selection:bg-[#C800DF]/30">
        {children}
      </body>
    </html>
  </>;
}

