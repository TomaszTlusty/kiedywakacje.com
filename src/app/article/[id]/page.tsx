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
                        <h1 className="text-4xl font-semibold">{article.title}</h1>
                        <h2 className="text-2xl">{article.readTime} min | {article.date}</h2>
                    </header>
                    <div className="prose prose-lg dark:prose-invert dark:bg-black max-w-3xl w-full mt-8 z-10 dark:text-white text-black bg-white/2 backdrop-blur-xl p-6 rounded-3xl border border-yellow-200 dark:border-blue-600 ">
                        <ReactMarkdown>
                            {article.content}
                        </ReactMarkdown>
                    </div>
                </article>
                <ThemeToogle/>
                <HomeToggle/>
            </main>
            <AltFooter/>
        </>

    )

}