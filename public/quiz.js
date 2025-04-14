$(".answer").on("click", function()
{
    Quiz_ChooseOption(this.getAttribute("ad-option"));
})

function Quiz_ChooseOption(option)
{
    $(".answer").removeClass("active");
    $(".answer[ad-option=" + option + "]").addClass("active");
    Button_SubmitQuiz.disabled = false;
}

// init global

var recognitionQuiz = null;
StartRecogQuiz()

function StartRecogQuiz(language='id-ID'){
    if (recognitionQuiz) {
        try {
            recognitionQuiz.stop();
        } catch(e) {
            console.log("Error stopping existing recognition:", e);
        }
        setTimeout(() => {
            initRecognitionQuiz(language);
        }, 100);
    } else {
        initRecognitionQuiz(language);
    }
}

function initRecognitionQuiz(language){
    pauseTimeout = null
    fullTranscript = ""
    recognitionQuiz = new window.webkitSpeechRecognition();
    console.log(recognitionQuiz)
    recognitionQuiz.continuous = true;
    recognitionQuiz.interimResults = true;
    recognitionQuiz.lang = language;

    recognitionQuiz.onresult = (event) => {
        // console.log(event.results)
        const currentTranscript = event.results[event.results.length - 1][0].transcript;
        
        if (event.results[event.results.length - 1].isFinal) {
            fullTranscript += currentTranscript;
            transcript = fullTranscript.trim();
            CodiAssistant_QuizUpdate("listening", transcript);

            if (pauseTimeout) {
                clearTimeout(pauseTimeout);
            }

            pauseTimeout = setTimeout(() => {
                console.log("parsing actions...")
                const action = targetAction(fullTranscript)
                if(action){
                    Quiz_ChooseOption(action)
                }
                fullTranscript = ""
                CodiAssistant_QuizUpdate("idle", transcript);
            }, 300);
        } else {
            transcript = currentTranscript;
            CodiAssistant_QuizUpdate("listening", transcript);
        }
    };

    recognitionQuiz.onend = () => {     
        if(recognitionQuiz){
            recognitionQuiz.stop()
        }
        initRecognitionQuiz()
    }

    recognitionQuiz.onerror = (event) =>{
        if (event.error === 'network' || event.error === 'service-not-allowed' || event.error === 'no-speech') {
            console.error("error")
            if(recognitionQuiz){
                recognitionQuiz.stop()
            }
            initRecognitionQuiz()
        }
    }

    recognitionQuiz.start()
}

function targetAction(text) {
    const words = text.toLowerCase().split(/\s+/);
    console.log(words)

    if (words.includes('submit') && !Button_SubmitQuiz.disabled){
        submitQuiz()
        return ""
    }
    else if(text.includes('coba lagi') ){
        cobaLagi()
        return ""
    }else if((words.includes("lanjut") || words.includes("berikutnya")) && ("Button_QuizNext" in window && Sheet_Quiz.classList.contains("opened"))){
        nextQuestion()
    } 
    else if(words.includes("done") || words.includes("selesai") && ("Button_QuizDone" in window) ){
        doneQuiz()
    }
    else{
        const choices = ['a', 'b', 'c', 'd'];
        const found = choices.find(choice => words.includes(choice));
        if(found){
            return found.toUpperCase()
        }
    }
}

CodiAssistant_Status = "idle";
function CodiAssistant_QuizUpdate(type = "idle", phrase = "", action = new Function())
{
    let elem_phrase = $(".assistant > .phrase")[0];

    Button_MicQuiz.classList.remove("listening");
    elem_phrase.innerText = "";

    if (type == "idle")
    {
        CodiAssistant_Status = "idle";
    }
    else if (type == "listening")
    {
        Button_MicQuiz.classList.add("listening");
        CodiAssistant_Status = "listening";
        elem_phrase.innerText = phrase;
    }
    else if (type == "done")
    {
        elem_phrase.innerText = phrase;
        CodiAssistant_Status = "idle";
        action();
    }
}

Button_SubmitQuiz.onclick = submitQuiz

async function submitQuiz()
{
    const url = new URL(window.location.href);
    const paths = url.pathname.split("/");

    const topic = paths[paths.length - 2];
    const selectedAnswer = $(".quiz .options .answer.active").attr("ad-index");
    const number = parseInt(url.searchParams.get("q"));

    $(".quiz .submit").addClass("loading");
    Button_SubmitQuiz.disabled = true;

    try
    {
        const res = await fetch("/classroom/courses/quizCheck", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                topic: topic,
                number: number,
                answer: selectedAnswer
            }),
        });

        if (res.ok == false)
            throw res;

        const data = await res.json();
        Text_IsAnswerCorrect.innerText = data.correct ? "benar" : "salah";
        Text_AnswerReason.innerText = data.reason;
        
        if (data.correct)
            Sheet_Quiz.classList.remove("false");
        else
            Sheet_Quiz.classList.add("false");

        $(".quiz .submit").removeClass("loading");
        Button_SubmitQuiz.disabled = false;
        Components.Sheet.Open(Sheet_Quiz);
    }
    catch (err)
    {
    }
}

// Button_MicQuiz.onclick = function()
// {
//     if (CodiAssistant_Status == "idle")
//         CodiAssistant_QuizUpdate("listening");
//     else
//         CodiAssistant_QuizUpdate("idle");
// }

$("#Sheet_Quiz > .dim").on("mousedown", function()
{
    Components.Sheet.Close(Sheet_Quiz);
})
$("#Sheet_Quiz > .control > .close").on("click", function()
{
    Components.Sheet.Close(Sheet_Quiz);
})

if ("Button_QuizDone" in window)
Button_QuizDone.onclick = doneQuiz

function doneQuiz()
{
    window.location.href = "/classroom/courses/";
}

if ("Button_QuizNext" in window)
Button_QuizNext.onclick = nextQuestion
function nextQuestion()
{
    const url = new URL(window.location.href);
    const paths = url.pathname.split("/");
    const number = parseInt(url.searchParams.get("q"));

    url.searchParams.set("q", number + 1);

    window.location.href = url.href;
}

Button_QuizTryagain.onclick = cobaLagi()

function cobaLagi()
{
    Components.Sheet.Close(Sheet_Quiz);
}