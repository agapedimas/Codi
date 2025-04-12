import { Fragment } from "react";

const element = (
    <Fragment>
        <div className="separator">Kursus Saya</div>
        <a className="dropdown expanded">
            <span>Java</span>
        </a>
            <a className="innerdropdown" ad-goto="/courses/java/introduction" suppressHydrationWarning>
                <span>Pengantar Java</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/syntax" suppressHydrationWarning>
                <span>Sintaks</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/methods" suppressHydrationWarning>
                <span>Metode</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/classes" suppressHydrationWarning>
                <span>Kelas</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/data-structures" suppressHydrationWarning>
                <span>Struktur Data</span>
            </a>
            <a className="innerdropdown" ad-goto="/courses/java/quiz" suppressHydrationWarning>
                <span>Kuis</span>
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