import articles from "@/data/articles";

export function Articles() {


    return (
        <>
            <section className="flex flex-col sm:flex-row justify-center max-w-4xl mx-auto gap-6 mb-16 px-4">
                {articles.map((article) => (
                    <article
                        key={article.id}
                        className="flex flex-col gap-3 px-6 py-5 font-lato cursor-pointer rounded-3xl border-2 transition-all duration-200
                min-w-0 flex-1
                bg-white border-yellow-300 text-black hover:bg-yellow-300 hover:shadow-lg hover:-translate-y-1
                dark:bg-zinc-900 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600"
                    >
                        <span className="text-3xl"><article.emoji size={24}/> </span>
                        <h3 className="font-bold text-lg leading-tight">
                            {article.title}
                        </h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            {article.description}
                        </p>
                        <span className="text-xs opacity-50 mt-auto">{article.readTime} czytania</span>
                    </article>
                ))}
            </section>
        </>
    )
}