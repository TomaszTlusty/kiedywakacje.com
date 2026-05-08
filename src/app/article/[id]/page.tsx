import articles from "@/data/articles"
import {ThemeToogle} from "@/components/theme-toogle";
import {HomeToggle} from "@/components/home-toggle";
import AltFooter from "@/components/base/Footer";
import AnimatedBackground from "@/components/HeroPage/AnimatedBackground";
import ReactMarkdown from "react-markdown";

type Props = {
    params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: Props) {
    const { id } = await params

    const article = articles.find(article => article.id === id)

    if (!article) return <p className={"text-4xl mx-auto my-auto"}>Nie znaleziono artykułu aby wrócić kliknij <a href={"/"} className={"underline"}>tutaj</a></p>

    return (
        <>
            <AnimatedBackground/>
            <main className="flex flex-col items-center justify-center px-4 pt-32 text-black dark:text-white min-h-screen scroll-auto z-10">
                <article className="flex flex-col items-center justify-center px-4 dark:bg-black bg-white text-black dark:text-white ">
                    <header className="text-2xl w-full max-w-2xl z-10 text-outline text-outline text-center font-lato select-none pt-6">
                        <h4 className="text-2xl font-mono">{article.readTime} | {article.date}</h4>
                        <h3 className="text-5xl font-lato font-semibold mb-8">{article.title}</h3>

                    </header>
                    <div className="flex justify-center px-4 pb-24">
                        <article
                            className="
                            relative w-full max-w-2xl
                            bg-gray-100 dark:bg-gray-800
                            backdrop-blur-2xl
                            rounded-2xl
                            border border-yellow-200/70 dark:border-blue-900/60
                            px-8 sm:px-14 py-12
                        "
                        >
                            <span className="
                            pointer-events-none absolute top-0 left-0 w-10 h-10
                            border-t-2 border-l-2 border-yellow-400 dark:border-blue-500
                            rounded-tl-2xl
                        " />
                            <span className="
                            pointer-events-none absolute bottom-0 right-0 w-10 h-10
                            border-b-2 border-r-2 border-yellow-400 dark:border-blue-500
                            rounded-br-2xl
                        " />

                            <div
                                className="
                                prose prose-zinc dark:prose-invert
                                prose-headings:font-lato prose-headings:font-bold
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3
                                prose-h3:text-xl prose-h3:mt-8
                                prose-p:leading-[1.85] prose-p:text-[1.05rem]
                                prose-a:text-yellow-600 dark:prose-a:text-blue-400
                                prose-a:underline-offset-4
                                prose-strong:text-black dark:prose-strong:text-white
                                prose-blockquote:border-l-yellow-400 dark:prose-blockquote:border-l-blue-500
                                prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400
                                prose-blockquote:not-italic prose-blockquote:font-normal
                                prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800
                                max-w-none
                            "
                            >
                                <ReactMarkdown>{article.content}</ReactMarkdown>
                            </div>
                        </article>
                    </div>
                </article>
                <ThemeToogle/>
                <HomeToggle/>
            </main>
            <AltFooter/>
        </>

    )

}