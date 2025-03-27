const element = (
    <nav>
        <section className="desktop">
            <div className="navigation">
                <label className="InputContainer_Textbox" >
                    <input id="Input_GlobalSearch" placeholder="Search" autoComplete="off" type="search" ad-abortstyle="true"/>
                </label>
                <a ad-goto="/" suppressHydrationWarning>
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
            </div>
        </section>
        <section className="mobile">

        </section>
    </nav>    
);

export default function Navigation() { return element }