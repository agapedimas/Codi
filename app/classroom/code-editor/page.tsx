"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";

type Props = {
	defaultCode: string;
	lang?: "java";
	filename?: string;
};

function CodeEditorBlock({ defaultCode }: Props) {
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
			defaultCode={
`public class Main {
	public static void main(String[] args) {
		System.out.println("Hello world!");
	}
}`}
			filename="Main.java"
			lang="java"
		/>
	);
}