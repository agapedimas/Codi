Image_Profile.onclick = function()
{
    Components.PopOver.Open(PopOver_Profile, this);
}

Select_Theme.value = localStorage.getItem("theme") || "system";
Select_Theme.onchange = function()
{
    localStorage.setItem("theme", this.value);
    CheckTheme();
}

Button_SignOut.onclick = function()
{
    Components.ActionSheet.Open(
    {
        Title: "Apakah Anda yakin ingin keluar?",
        Description: "Anda bisa kembali masuk ke akun Anda kapan saja.",
        Actions: [
            { 
                Title: "Keluar", Type: "Options.Critical", 
                Action: o => window.location.href = "/auth/signout"
            },
            { 
                Title: "Batal", Type: "Footer", 
                Action: Components.ActionSheet.Close
            }
        ]
    });
}

// init global var
var isRecording = false;
var recognition = null;
var transcript = "";
var fullTranscript = "";
var pauseTimeout = null;
var isPaused = false;
var tempGeminiResult = {};

if (window["Button_ReadAloud"])
    Button_ReadAloud.onclick = function()
    {
        // sudah diimplement pake react di titlebar.tsx
    }
else
    Button_CodeWithCodi.onclick = function()
    {
        if (Grid_Assistant.classList.contains("opened"))
            CodiAssistant_Close();
        else
            CodiAssistant_Open();

        Button_Mic.onclick = function()
        {
            if (Grid_Assistant.classList.contains("listening") == false)
                CodiAssistant_Update("listening");
            else
                StopRecognition();
        }

        Button_ExitAssistant.onclick = CodiAssistant_Close;
    }


/*
    Daftar value pada parameter type:

    - start: Menampilkan "Tekan mulai untuk bicara"
    - listening: Menampilkan "Mulai bicara..."
    - choose: Biasa digunakan setelah user berbicara. Phrase: "<input suara user>". Options: [ { text: "{ psvm sysout }", action: function(), done: "Function bernama halo telah dibuat di line 9" } ]
    - done: Menampilkan setelah user milih opsi. Action: "Anda memilih opsi A". Phrase: "Function bernama halo telah dibuat di line 9" 
*/
function CodiAssistant_Update(type = "initial", action = "", phrase = "", options = [], callback = new Function())
{
    let elem_action = $("#Grid_Assistant .content .inputs .action")[0];
    let elem_phrase = $("#Grid_Assistant .content .inputs .phrase")[0];
    let elem_options = $("#Grid_Assistant .content .options .lists")[0];
    let elem_button = Button_Assistant;
    let elem_orsay = Text_OrSayAssistant;

    Grid_Assistant.classList.remove("listening");
    Grid_Assistant.classList.remove("choose");
    Grid_Assistant.classList.remove("done");     
    elem_action.innerText = action;   
    elem_phrase.innerText = phrase;
    elem_options.innerHTML = "";

    if(type !== "listening"){FlushRecognition()}

    if (type == "start")
    {
        FlushRecognition()
        elem_action.innerText = "Klik tombol mikrofon atau tombol mulai";
        elem_button.innerText = "Mulai";
        elem_orsay.innerText = "\"Codi mulai\" untuk mulai";
        elem_button.onclick = function()
        {
            CodiAssistant_Update("listening");
        }
    }
    else if (type == "listening")
    {
        if(!isRecording){StartRecognition("id-ID")}
        Grid_Assistant.classList.add("listening");
        elem_action.innerText = "Mulai bicara...";
        elem_button.innerText = "Batal";
        elem_orsay.innerText = "\"Codi batal\" untuk membatalkan";
        elem_button.onclick = function()
        {
            CodiAssistant_Update("start");
        }
    }
    else if (type == "choose")
    {
        Grid_Assistant.classList.add("choose");
        elem_action.innerText = "Anda mengatakan:";
        elem_button.innerText = "Batal";
        elem_orsay.innerText = "\"Codi batal\" untuk membatalkan";
        elem_button.onclick = function()
        {
            CodiAssistant_Update("start");
        }

        let index = 0;
        let fragment = new DocumentFragment();

        for (let option of options)
        {
            console.log(option)
            let huruf = String.fromCharCode(65 + index);
            let element = document.createElement("div");
            element.classList.add("option");
            element.innerText = option.text;
            element.setAttribute("option", huruf)
            element.onclick = function()
            {
                if (typeof option.action === "function")
                    option.action();

                CodiAssistant_Update("done", "Anda memilih opsi " + huruf, option.done);
            }

            index++;
            fragment.appendChild(element);
        }

        elem_options.append(fragment);
    }
    else if (type == "done")
    {
        callback();
        Grid_Assistant.classList.add("done");
        elem_button.innerText = "Mulai";
        elem_orsay.innerText = "\"Codi mulai\" untuk memulai lagi";
        elem_button.onclick = function()
        {
            CodiAssistant_Update("listening");
        }
    }
}

function CodiAssistant_Open()
{
    Grid_Assistant.style.top = "";
    Grid_Assistant.style.left = "";
    CodiAssistant_Update("start");
    Grid_Assistant.classList.add("opened");
}

function CodiAssistant_Close()
{
    Grid_Assistant.classList.remove("opened");
    FlushRecognition()
}

function StartRecognition(language){
    if (recognition) {
        try {
            recognition.stop();
        } catch(e) {
            console.log("Error stopping existing recognition:", e);
        }
        setTimeout(() => {
            initializeRecognition(language);
        }, 100);
    } else {
        initializeRecognition(language);
    }
}

function initializeRecognition(language) {
    fullTranscript = "";
    transcript = "";

    isRecording = true;
    recordingComplete = false;
    isPaused = false;
    
    if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
    }
    
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    
    recognition.onresult = (event) => {
        const currentTranscript = event.results[event.results.length - 1][0].transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            fullTranscript += currentTranscript + " ";
            transcript = fullTranscript.trim();
            CodiAssistant_Update("listening", "", transcript);

            if (pauseTimeout) {
                clearTimeout(pauseTimeout);
            }
            
            pauseTimeout = setTimeout(() => {
                if (isRecording && !isPaused) {
                    isPaused = true;
                    try {
                        StopRecognition()
                    } catch(e) {
                        console.error("Error stopping recognition for pause:", e);
                    }
            
                } 
            }, 5000); // stop jika 5 detik ybs. tidak ngomong
        } else {
            transcript = fullTranscript + currentTranscript;
            CodiAssistant_Update("listening", "", transcript);
        }
    };

    recognition.onend = () => {        
        if (isRecording && !recordingComplete && !isPaused) {            
            setTimeout(() => {
                if (isRecording && !isPaused && !recordingComplete) {
                    try {
                        recognition.stop();
                        recognition.start();
                    } catch(e) {
                        console.error("Error restarting recognition after end:", e);
                        setTimeout(() => {
                            if (isRecording) initializeRecognition(language);
                        }, 100);
                    }
                }
            }, 500);
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'network' || event.error === 'service-not-allowed' || event.error === 'no-speech') {
            if (isRecording && !recordingComplete) {
                setTimeout(() => {
                    if (isRecording) initializeRecognition(language);
                }, 500);
            }
        }
    };

    setTimeout(() => {
        try {
            // console.log("Starting recognition");
            recognition.stop();
            recognition.start();
        } catch(e) {
            console.error("Error in initial recognition start:", e);
            // If start fails, wait and try completely reinitializing
            setTimeout(() => {
                if (isRecording) initializeRecognition(language);
            }, 100);
        }
    }, 50);
}

function FlushRecognition(){
    isRecording = false
    recordingComplete = false
    if (recognition) {
        recognition.stop();
    }
    
    if (pauseTimeout) {
        clearTimeout(pauseTimeout);
    }
}

async function StopRecognition(){
    isRecording = false
    recordingComplete = true
    if (recognition) {
        recognition.stop();
    }
    
    if (pauseTimeout) {
        clearTimeout(pauseTimeout);
    }
    
    console.log(transcript) // Check transcription result
    if (transcript){
        sendToGemini()
        .then(result => {
            console.log(result);
            tempGeminiResult = result
            
            const snippet = result.snippet
            const description = result.desc

            let resultList = []
            let code = document.querySelector('.root .main')?.textContent || ''

            if (snippet){
                for (let i = 0; i < snippet.length; i++) {
                    let text = snippet[i]
                    let changes = result[i]
                    let done = description[i]
    
                    function modifyCode(code, changes){
                        // yet to implement (next commit)
                        return ""
                    }
                    let newJson = {
                        text: text,
                        action: modifyCode,
                        done: done
                    }
                    console.log(newJson)
                    resultList.push(newJson)
                }
                CodiAssistant_Update("choose", "", transcript, resultList)
            } else{
                CodiAssistant_Update("done", "Permintaan tidak dapat diproses", "Perintah tidak dapat dimengerti.")
            }
        })

    } else{
        CodiAssistant_Update("start")
    }
}

const sendToGemini = async () => {
    const data = new FormData();
    data.append('audioTranscript', transcript);
    data.append('codeToModify', document.querySelector('.root .main')?.textContent || '');

    try {
        const response = await fetch('/api/gemineh', {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData?.error || `HTTP Error: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData?.data || null;

    } catch (error) {
        console.error('Error saat mengirim ke Gemini:', error.message);
        return null;
    }
};



window.addEventListener("keydown", function(event)
{
    if (event.keyCode == 27)
        CodiAssistant_Close();
})


let dragging = false;
let xInit = 0;
let yInit = 0;
let topInit = 0;
let leftInit = 0;

Grid_AssistantBar.addEventListener("mousedown", function(event)
{
    const pointer = Components.Pointer.Position(event);

    xInit = pointer.X;
    yInit = pointer.Y;
    topInit = parseInt(Grid_Assistant.offsetTop);
    leftInit = parseInt(Grid_Assistant.offsetLeft);
    dragging = true;
})

window.addEventListener("mousemove", function(event)
{
    if (dragging == false)
        return;

    const pointer = Components.Pointer.Position(event);
    let x = pointer.X - xInit + leftInit;
    let y = pointer.Y - yInit + topInit;

    if (x < 0)
        x = 0;
    else if (x > this.window.innerWidth - Grid_Assistant.offsetWidth)
        x = this.window.innerWidth - Grid_Assistant.offsetWidth;

    if (y < 0)
        y = 0
    else if (y > this.window.innerHeight - Grid_Assistant.offsetHeight)
        y = this.window.innerHeight - Grid_Assistant.offsetHeight;

    Grid_Assistant.style.top = y + "px";
    Grid_Assistant.style.left = x + "px";
})

window.addEventListener("mouseup", function(event)
{
    dragging = false;
    const pointer = Components.Pointer.Position(event);
})