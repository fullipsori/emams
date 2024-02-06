import { Inter, Poppins, Ubuntu } from "next/font/google";

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const ubuntuFont = Ubuntu({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})