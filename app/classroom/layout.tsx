'use client'

import type { Metadata } from "next";
import Navigation from "./navigation";
import Titlebar from "./titlebar";
import "./styles.css";
import Controls from "./controls";
import Script from "next/script";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
    const path = usePathname();
    let titleBar = <Titlebar type="readAloud"/>;
    
    if (path.startsWith("/classroom/code-editor"))
        titleBar = <Titlebar type="codeWith"/>;

	return (
        <Fragment>
            { titleBar }
            <div className="root">
                <Controls/>
                <Navigation/>
                <div className="main">
                    {children}
                </div>
                <Script src="/scripts.js"></Script>
            </div>
        </Fragment>
	);
}
