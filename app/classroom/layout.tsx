import type { Metadata } from "next";
import Navigation from "./navigation";
import Titlebar from "./titlebar";
import "./styles.css";
import Controls from "./controls";
import Script from "next/script";
import { Fragment } from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) 
{
	return (
        <Fragment>
            <Titlebar/>
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
