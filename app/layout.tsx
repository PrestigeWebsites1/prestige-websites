import "./globals.css"

import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import siteMetadata from './metadata.json'
import ClientLayout from './client-layout'

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata: Metadata = siteMetadata['/']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
        <body
          className={`${poppins.variable} ${playfair.variable} antialiased`}
        >
          <ClientLayout>{children}</ClientLayout>
        </body>
    </html>
  )
}