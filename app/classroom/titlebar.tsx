"use client"
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Titlebar({ type }: { type: string }) { 
    const synthesisRef = useRef<any>(null);

    useEffect(() => {
        synthesisRef.current = window.speechSynthesis;
    }, []);

    const parseMeaning = async () =>{
        try{
            const codeToRead = document.querySelector('.root .main');
            if (!codeToRead) {
                console.error("Element '.root .main' not found");
                return null;
            }
            
            const pageContent = codeToRead.textContent;
            const data = new FormData()

            data.append("pageContent", pageContent!)

            // Make the API call using axios
            const response = await axios.post('/api/bacakan', data);
            
            // Axios automatically throws errors for non-2xx responses
            // and parses JSON, so we can directly access the data property
            
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.error || "Unknown error occurred");
            }
        } catch (error: any) {
            console.error("Error parsing page content:", error);
            
            // Handle axios specific error objects
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server response:", error.response.data);
                return `Failed to generate narration: Server error (${error.response.status})`;
            } else if (error.request) {
                // The request was made but no response was received
                return "Failed to generate narration: No response from server";
            } else {
                // Something happened in setting up the request
                return `Failed to generate narration: ${error.message}`;
            }
        }
    }
    

    const readPage = async () =>{
        const summary = await parseMeaning()
        const utterance = new SpeechSynthesisUtterance(summary); // Create the speech object

        utterance.pitch = 1.1;   // Adds a more lively tone
        utterance.rate = 0.95;   // Slightly slower for clarity
        utterance.volume = 0.75;   
        utterance.lang = 'id-ID'; 

        synthesisRef.current.speak(utterance);
    }

    const accessibility = (type = "readAloud") => {
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

    return (
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
                        <button className="accent" onClick={readPage}>
                            <span className="icon">&#xfb58;</span>
                            <span>Bacakan</span>
                        </button>
                    <div className="accessibility" suppressHydrationWarning> 
                        { accessibility(type) }
                    </div>
                    <div className="profile" id="Image_Profile">
                        <img src="/avatar.webp"/>
                    </div>
                </div>
            </div>
        </header>  
    )
}
