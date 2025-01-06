import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Moodly",
    description: "Track your daily mood every day of the year!"
}

export default function RootLayout({ children }) {

    const header = (
        <header>
            header
        </header>
    )

    const footer = (
        <footer>
            footer
        </footer>
    )
    return (
        <html lang="en">
            <body className={ 'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ' + inter.className}>
                {header}
                {children}
                {footer}
            </body>
        </html>
    )
}