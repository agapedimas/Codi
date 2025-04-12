import { getMarkdownContent, getAllMarkdownSlugs, checkFileExists } from "@/lib/markdown";
import { Metadata } from "next";

export async function generateStaticParams() {
    const slugs = getAllMarkdownSlugs();
  
    return slugs
      .filter((slug) => checkFileExists(slug))
      .map((slug) => ({ slug: slug.split("/") }));
  }

export const metadata: Metadata = 
{
    title: 'Kursus',
};

export default async function CoursePage({ params }: { params: { slug: string[] } }) {
    const markdownData = await getMarkdownContent(await params.slug);

    if (!markdownData) {
        return <h1>Content Not Found</h1>;
    }

    return (
        <article dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
    );
}
