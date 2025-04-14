"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";

type Props = {
	defaultCode: string;
	lang?: "java";
	filename?: string;
};

declare global {
	interface Window {
		modifyCodeInEditor: (any)
	}
}

function CodeEditorBlock({ defaultCode }: Props) {
	const [code, setCode] = useState(defaultCode);
	/*
	"modifications": {
			"remove": [5, 6, 7],      // Phase 1: Lines to remove (0-indexed)
			"change": {               // Phase 2: Lines to modify
			"2": "const x = 10;",
			"8": "return result;"
			},
			"add": {                  // Phase 3: Lines to add
			"3": "const y = 20;",   // Add after line 3
			"9": "console.log(result);"
			}
		}
	*/
	const makeChanges = (modifications: any) =>{
		const tempCode = code
		const codeList = tempCode.split("\n")
		console.log("BEFORE")
		console.log(codeList.join("\n"))
		//Phase 1: Removal
		if(modifications.remove){
			console.log("REMOVING")
			for (const lineNum of modifications.remove.sort((a: number, b: number) => b - a)) {
				codeList.splice(lineNum, 1);
			}
		}
		
		//Phase 2: Changes
		if (modifications.change){
			console.log("CHANGING")
			for (const [key, value] of Object.entries(modifications.change)) {
				const lineIndex = Number(key)-1;// convert "2" -> 2
				const newCode = value;
				
				codeList[lineIndex] = String(newCode);
			}
		}
		
		//Phase 3: Add
		if (modifications.add){
			console.log("ADDING")
			const insertions = Object.entries(modifications.add)
				.map(([key, val]) => [Number(key), String(val)] as [number, string])
				.sort((a, b) => b[0] - a[0]); // sort descending

			for (const [index, line] of insertions) {
				codeList.splice(index, 0, line); // insert after the line
			}
		}

		console.log("AFTER MODIF")
		console.log(codeList.join("\n"))
		console.log(modifications)
		setCode(codeList.join("\n"));
	}

	useEffect(
		() => {
			window.modifyCodeInEditor = makeChanges
		return () => {
			delete window.modifyCodeInEditor;
			}
		});
	
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