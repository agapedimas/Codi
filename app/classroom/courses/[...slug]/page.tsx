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

type slugParam = Promise<{ slug: string[] }>;

export default async function CoursePage(props: { params: slugParam }) 
{
	const { slug } = await props.params;
	const markdownData = await getMarkdownContent(slug);

	if (!markdownData)
		return <div></div>;

	return (
		<article dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
	);
}
