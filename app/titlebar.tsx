const element = (
    <header className="titlebar">
        <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/768px-Microsoft_icon.svg.png"/>
        <span className="name">Codi</span>
        <div className="controls">
            <div className="content">
                <div className="navigation"> 
                    <button className="plain icon">&#xef52;</button>
                    <button className="plain icon">&#xef59;</button>
                </div>
                <label className="InputContainer_Textbox" >
                    <input id="Input_GlobalSearch" placeholder="Search" autoComplete="off" type="search" ad-abortstyle="true"/>
                </label>
                <div className="accessibility"> 
                    <button className="accent">
                        <span className="icon">&#xfb58;</span>
                        <span>Read aloud</span>
                    </button>
                </div>
                <div className="profile" id="Image_Profile">
                    <img src="https://your-thoughts.agapedimas.com/avatar"/>
                </div>
            </div>
        </div>
    </header>  
);

export default function Titlebar() { return element }