import Image from "next/image";

function accessibility(type = "readAloud")
{
    if (type == "codeWith")
        return (
            <button className="accent" id="Button_CodeWithCodi" suppressHydrationWarning>
                <span className="icon">&#xf59c;</span>
                <span>Kode dengan Codi</span>
            </button>
        )
    else
        return (
            <button className="accent" id="Button_ReadAloud" suppressHydrationWarning>
                <span className="icon">&#xfb58;</span>
                <span>Bacakan</span>
            </button>
    )
}

const element = function(type: string)
{
    return (
        <header className="titlebar" suppressHydrationWarning>
            <Image className="icon" src="/favicon.ico" alt="Logo Codi" width={16} height={16}/>
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
                    <div className="accessibility" suppressHydrationWarning> 
                        { accessibility(type) }
                    </div>
                    <div className="profile" id="Image_Profile">
                        <Image src="/avatar.webp" alt="Avatar pengguna" width={30} height={30}/>
                    </div>
                </div>
            </div>
        </header>  
    );
}

export default function Titlebar({ type }: { type: string }) { return element(type) }