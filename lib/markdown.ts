import fs from "fs";
import path from "path";
import type { Element } from "hast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";


export function getAllMarkdownSlugs(): string[] {
	const contentDir = path.join(process.cwd(), "app/classroom/courses/content");

	function getSlugs(dir: string, parentPath = ""): string[] {
	  return fs.readdirSync(dir).flatMap((file) => {
		const fullPath = path.join(dir, file);
		const relativePath = parentPath ? `${parentPath}/${file}` : file;
  
		if (fs.statSync(fullPath).isDirectory()) {
		  return getSlugs(fullPath, relativePath);
		} else if (file.endsWith(".md")) {
		  return [relativePath.replace(/\.md$/, "")];
		} else {
		  return [];
		}
	  });
	}
  
	return getSlugs(contentDir);
}

export async function getMarkdownContent(slugArr: string[]) {
	const fullPath = path.join(process.cwd(), "app/classroom/courses/content", ...slugArr) + ".md";
  
	try {
	  if (fs.existsSync(fullPath) == false)
		return null;
		
	  const fileContents = fs.readFileSync(fullPath, "utf8");
  
	  const file = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeHighlight)
		.use(() => (tree) => {
			visit(tree, "element", (node: Element) => {
				if (
				  node.tagName === "pre" &&
				  Array.isArray(node.children)
				) {
					const codeEl = node.children.find(
						(child): child is Element =>
						  child.type === "element" &&
						  child.tagName === "code" &&
						  typeof child.data?.meta === "string" &&
						  child.data.meta.includes("filename=")
					  );
			
				  if (codeEl?.data?.meta) {
					const match = codeEl.data.meta.match(/filename=([\w.\-_]+)/);
					if (match) {
					  const filename = match[1];
					  node.properties = {
						...node.properties,
						"data-filename": filename,
					  };
					}
				  }
				}
			  });
		})
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(fileContents);
  
	  return {
		contentHtml: String(file),
	  };
	} catch (err) {
	  console.error("Gagal parse markdown:\n", err);
	  return null;
	}
  }

export function getQuizContent(topic: string)
{
	const fullPath = path.join(process.cwd(), "app/classroom/courses/content", topic, "quiz.json");
	
	try
	{
		if (fs.existsSync(fullPath) == false)
			return null;
	
		const fileContents = fs.readFileSync(fullPath, "utf8");
		
		return JSON.parse(fileContents);
	}
	catch (err)
	{
		console.error("Gagal parse quiz:\n", err);
		return null;
	}	
}

export function checkFileExists(slug: string) 
{
	const filePath = path.join(process.cwd(), "app/classroom/courses/content", slug + ".md");
	return fs.existsSync(filePath);
}