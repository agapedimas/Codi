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
                    <button className="plain critical">Sign out</button>
                </div>
            </div>

            <div className="list" ad-header="Settings">
                <div className="stack">
                    <span>Appearance</span>
                    <select className="plain">
                        <option>System Default</option> 
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </div>
                <div className="stack">
                    <span>Language</span>
                    <select className="plain">
                        <option>English</option>
                    </select>
                </div>
            </div>

            <div className="list" ad-header="About">
                <div className="stack">
                    <span>Version</span>
                    <span style={{opacity: 0.7}}>1.0</span>
                </div>
                <div className="stack vertical">
                    <span>Copyright</span>
                    <span style={{opacity: 0.7}}>© 2025 Unparians. All Rights Reserved.</span>
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