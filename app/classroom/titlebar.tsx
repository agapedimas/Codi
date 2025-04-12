const element = (
    <header className="titlebar" suppressHydrationWarning>
        <img className="icon" src="/favicon.ico"/>
        <span className="name">Codi</span>
        <div className="controls">
            <div className="content">
                <div className="navigation"> 
                    <button className="plain icon">&#xef52;</button>
                    <button className="plain icon">&#xef59;</button>
                </div>
                <label className="InputContainer_Textbox" >
                    <input id="Input_GlobalSearch" placeholder="Cari" autoComplete="off" type="search" ad-abortstyle="true"/>
                </label>
                <div className="accessibility"> 
                    <button className="accent">
                        <span className="icon">&#xfb58;</span>
                        <span>Bacakan</span>
                    </button>
                </div>
                <div className="profile" id="Image_Profile">
                    <img src="/avatar.webp"/>
                </div>
            </div>
        </div>
    </header>  
);

export default function Titlebar() { return element }