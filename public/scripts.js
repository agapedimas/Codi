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

if (window["Button_ReadAloud"])
    Button_ReadAloud.onclick = function()
    {
        // ...
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
                CodiAssistant_Update("start");
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

    if (type == "start")
    {
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
    CodiAssistant_Update("listening");
    Grid_Assistant.classList.add("opened");
}

function CodiAssistant_Close()
{
    Grid_Assistant.classList.remove("opened");
}

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