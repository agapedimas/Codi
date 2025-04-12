import { Fragment } from "react";

const element = (
    <Fragment>
    <div className="separator">Editor</div>
        
        <a className="dropdown expanded">
            <span>Aplikasi Saya</span>
        </a>
        <a className="dropdown innerdropdown">
            <span>.settings</span>
        </a>
        <a className="dropdown innerdropdown">
            <span>assets</span>
        </a>
        <a className="dropdown innerdropdown">
            <span>src</span>
        </a>
        <a className="file" data-ext="java" ad-goto="#Main.java">
            <span>Main.java</span>
        </a>
        <a className="file" data-ext="java" ad-goto="#Variables.java">
            <span>Variables.java</span>
        </a>
        <a className="file" data-ext="java" ad-goto="#Controls.java">
            <span>Controls.java</span>
        </a>
        <a className="file" data-ext="java" ad-goto="#Activities.java">
            <span>Activities.java</span>
        </a>
        <a className="file" data-ext="xml" ad-goto="#Layout.xml">
            <span>Layout.xml</span>
        </a>
    </Fragment>
);

export default function Menu_CodeEditor() {
	return element;
}