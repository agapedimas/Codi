import { Fragment } from "react";

const element = (
    <Fragment>
        <div className="separator">Your Courses</div>
        <a className="dropdown expanded">
            <span>Java</span>
        </a>
            <a className="innerdropdown" ad-goto="/courses/java/introduction" suppressHydrationWarning>
                <span>Introduction to Java</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/syntax" suppressHydrationWarning>
                <span>Syntax</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/methods" suppressHydrationWarning>
                <span>Methods</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/classes" suppressHydrationWarning>
                <span>Classes</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/data-structures" suppressHydrationWarning>
                <span>Data Structures</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/quiz" suppressHydrationWarning>
                <span>Quiz</span>
            </a>
        <a className="dropdown">
            <span>C++</span>
        </a>
        <a className="dropdown">
            <span>Python</span>
        </a>
        <a className="dropdown">
            <span>JavaScript</span>
        </a>
        <a className="dropdown">
            <span>C#</span>
        </a>
    </Fragment>
);

export default function Menu_Courses() {
	return element;
}