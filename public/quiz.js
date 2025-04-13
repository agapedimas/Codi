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
    }
    else if (type == "done")
    {
        elem_phrase.innerText = phrase;
        CodiAssistant_Status = "idle";
        action();
    }
}

Button_SubmitQuiz.onclick = async function()
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

Button_MicQuiz.onclick = function()
{
    if (CodiAssistant_Status == "idle")
        CodiAssistant_QuizUpdate("listening");
    else
        CodiAssistant_QuizUpdate("idle");
}

$("#Sheet_Quiz > .dim").on("mousedown", function()
{
    Components.Sheet.Close(Sheet_Quiz);
})
$("#Sheet_Quiz > .control > .close").on("click", function()
{
    Components.Sheet.Close(Sheet_Quiz);
})

if ("Button_QuizDone" in window)
Button_QuizDone.onclick = function()
{
    window.location.href = "/classroom/courses/";
}

if ("Button_QuizNext" in window)
Button_QuizNext.onclick = function()
{
    const url = new URL(window.location.href);
    const paths = url.pathname.split("/");
    const number = parseInt(url.searchParams.get("q"));

    url.searchParams.set("q", number + 1);

    window.location.href = url.href;
}

Button_QuizTryagain.onclick = function()
{
    Components.Sheet.Close(Sheet_Quiz);
}