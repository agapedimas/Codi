"use client";

import { Fragment, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { Metadata } from "next";

type Props = {
	defaultCode: string;
	lang?: "java";
	filename?: string;
};

export function CodeEditorBlock({ defaultCode, lang = "java", filename }: Props) {
	const [code, setCode] = useState(defaultCode);

	return (
		<section className="editor">
			<CodeMirror className="code" value={code} extensions={[java()]} onChange={(val) => setCode(val)} theme="dark"
				basicSetup={{
					lineNumbers: true,
					highlightActiveLine: true,
				}}
			/>
		</section>
	);
}

export default function Home() {
	return (
		<CodeEditorBlock
			defaultCode={`public class Main {
			public static void main(String[] args) {
				System.out.println("halo dim");
			}
			}`}
		filename="Main.java"
		lang="java"
		/>
	);
}