import { Fugaz_One, Open_Sans } from "next/font/google"
import "./globals.css"

const opensans = Open_Sans({ subsets: ["latin"] })
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})


export const metadata = {
    title: "Moodly",
    description: "Track your daily mood every day of the year!"
}

export default function RootLayout({ children }) {

    const header = (
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
            <h1 className={'text-xl sm:text-3xl textGradient ' + fugaz.className}>Moodly</h1>
            <div className="flex items-center justify-between">
                PLACEHOLDER CTA || STATS
            </div>
        </header>
    )

    const footer = (
        <footer className="p-4 sm:p-8 place-items-center">
            <p className={'text-green-500 ' + fugaz.className}>Created with 💚</p>
        </footer>
    )
    return (
        <html lang="en">
            <body className={ 'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}>
                {header}
                {children}
                {footer}
            </body>
        </html>
    )
}