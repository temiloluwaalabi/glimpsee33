import { DM_Sans, Mitr } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const MlTR = Mitr({
  subsets: ["latin"],
  variable: "--font-mitr",
  weight: ["200", "300", "400", "500", "600", "700"],
});
