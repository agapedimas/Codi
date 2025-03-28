'use client';
import { useEffect, useState } from "react";

const element = (
    <div className="popover" id="PopOver_Profile">
        <div className="content">Hai</div>
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