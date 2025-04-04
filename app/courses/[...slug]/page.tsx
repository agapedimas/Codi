import { getMarkdownContent, getAllMarkdownSlugs, checkFileExists } from "@/lib/markdown";

export async function generateStaticParams() {
    const slugs = getAllMarkdownSlugs();
    console.log("Static Params Generated:", slugs);
  
    return slugs
      .filter((slug) => checkFileExists(slug))
      .map((slug) => ({ slug: slug.split("/") }));
  }
  

export default async function CoursePage({ params }: { params: { slug: string[] } }) {
    const markdownData = await getMarkdownContent(params.slug);

    if (!markdownData) {
        return <h1>Content Not Found</h1>;
    }

    return (
        <article dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
    );
}
