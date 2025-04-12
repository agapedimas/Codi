'use client';
import { useEffect, useState } from "react";

const element = (
    <div className="popover" id="PopOver_Profile">
        <div className="content">
            <div className="profile">
                <img src="/avatar.webp"/>
                <div className="info">
                    <span className="name">User</span>
                    <span className="description">Platinum member</span>
                    <button className="plain critical" id="Button_SignOut">Keluar</button>
                </div>
            </div>

            <div className="list" ad-header="Setelan">
                <div className="stack">
                    <span>Penampilan</span>
                    <select className="plain" id="Select_Theme">
                        <option value="system">Default Sistem</option> 
                        <option value="light">Terang</option>
                        <option value="dark">Gelap</option>
                    </select>
                </div>
                <div className="stack">
                    <span>Bahasa</span>
                    <select className="plain">
                        <option>Indonesia</option>
                    </select>
                </div>
            </div>

            <div className="list" ad-header="Tentang">
                <div className="stack">
                    <span>Versi</span>
                    <span style={{opacity: 0.7}}>1.0</span>
                </div>
                <div className="stack vertical">
                    <span>Hak Cipta</span>
                    <span style={{opacity: 0.7}}>© 2025 Codi. Semua Hak Dilindungi.</span>
                </div>
            </div>
        </div>
    </div>
);

export default function Controls() 
{
    const [hasMounted, setHasMounted] = useState(false);
    
    useEffect(() => 
    {
        setHasMounted(true);
    }, []);

    if (!hasMounted) 
        return null;
 
    return element;
}