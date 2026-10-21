import { Jost, Overpass_Mono } from "next/font/google";
import "./globals.css";

// Both are variable fonts: leaving out `weight` loads one file per font
// instead of one file per weight.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const overpassMono = Overpass_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ahmed Ehab Seyam | Front-End Developer",
  description: "Portfolio of Ahmed Ehab Seyam, a passionate Front-End Developer building modern web experiences.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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

