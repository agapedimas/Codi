import { getMarkdownContent, getAllMarkdownSlugs, checkFileExists } from "@/lib/markdown";
import { Metadata } from "next";
import Quiz from "./quiz";

export async function generateStaticParams() {
    const slugs = getAllMarkdownSlugs();
  
    return slugs
      .filter((slug) => checkFileExists(slug) || slug.endsWith("/quiz.md") == false)
      .map((slug) => ({ slug: slug.split("/") }));
  }

export const metadata: Metadata = 
{
    title: 'Kursus',
};

type slugParam = Promise<{ slug: string[] }>;
type searchParam = Promise<{ q: string }>; 

export default async function CoursePage(props: { params: slugParam, searchParams: searchParam }) 
{
	const { slug } = await props.params;
	const { q } = await props.searchParams;
	const isQuiz = slug[slug.length - 1] == "quiz";
	const markdownData = await getMarkdownContent(slug);

	if (!markdownData)
	{
		if (isQuiz)
		{
			return <Quiz topic={ slug[0] } number={ parseInt(q) }/>;
		}
		else
		{
			return <div></div>;
		}
	}

	return (
		<article dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
	);
}
