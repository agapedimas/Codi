'use client'
import { usePathname } from "next/navigation";
import Menu_Courses from "./courses/navigation";
import Menu_Certificates from "./certificates/navigation";
import Menu_CodeEditor from "./code-editor/navigation";

/*
    Ada 2 versi navigasi 
    Desktop : Navigasi berada di sebelah kiri layar
    Mobile  : Navigasi berada di bawah layar

    Karena ada sedikit bentrok antara Next.js dengan assets.agapedimas.com,
    maka ada beberapa yang perlu diberi attribute ad-abortstyle=true dan suppressHydrationWarning
*/

export default function Navigation() 
{ 
    let path = usePathname();
    let menus;
    
    if (path.startsWith("/courses"))
        menus = <Menu_Courses/>;
    if (path.startsWith("/certificates"))
        menus = <Menu_Certificates/>;
    if (path.startsWith("/code-editor"))
        menus = <Menu_CodeEditor/>;

    return (
        <nav>
            <section className="desktop">
                <div className="navigation">
                    <a ad-goto="/courses" suppressHydrationWarning>
                        <span className="icon">&#xed7e;</span>
                        <span>Courses</span>
                    </a>
                    <a ad-goto="/certificates" suppressHydrationWarning>
                        <span className="icon">&#xf684;</span>
                        <span>Certificates</span>
                    </a>
                    <a ad-goto="/code-editor" suppressHydrationWarning>
                        <span className="icon">&#xef4f;</span>
                        <span>Code Editor</span>
                    </a>
                    { menus }
                </div>
            </section>
            <section className="mobile">
                <div className="navigation">
                    <a ad-goto="/courses" suppressHydrationWarning>
                        <span className="icon">&#xed7b;</span>
                        <span>Courses</span>
                    </a>
                    <a ad-goto="/certificates" suppressHydrationWarning>
                        <span className="icon">&#xf683;</span>
                        <span>Certificates</span>
                    </a>
                    <a ad-goto="/code-editor" suppressHydrationWarning>
                        <span className="icon">&#xef4f;</span>
                        <span>Code Editor</span>
                    </a>
                </div>
            </section>
        </nav>   
    ); 
}