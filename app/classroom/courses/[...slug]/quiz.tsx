import { getQuizContent } from "@/lib/markdown";
import "./quiz.css";
import { redirect } from "next/navigation";

export default async function Quiz({ topic, number }: { topic: string, number: number }) 
{    
    const content = await getQuizContent(topic) || [];
    const data = content[number];
    let answerIndex = 0;
    const lastQuestion = number == content.length - 1;
    
    if (data == null)
    {
        if (number == 0)
            return "Belum ada quiz untuk kursus ini.";
        else
            redirect("/classroom/courses/" + topic + "/quiz?q=0");
    }

    return (
        <article className="quiz">
            <h1>Kuis</h1>

            <div id="Sheet_Quiz" className="sheet" ad-abortstyle="true">
                <div className="dim"></div>
                <div className="control">
                    <div className="bar"></div>
                    <div className="close"></div>
                </div>
                <div className="content">
                    <div className="banner">
                        <div className="title">Jawaban kamu <span id="Text_IsAnswerCorrect"></span></div>
                    </div>
                    
                    <div className="reason" id="Text_AnswerReason"></div>

                    {
                        lastQuestion &&
                        <button className="accent next" id="Button_QuizDone">
                            <span>Selesai</span>
                        </button>
                    }
                    {
                        lastQuestion == false &&
                        <button className="accent next" id="Button_QuizNext">
                            <span>Lanjut</span>
                            <span className="icon">&#xef4a;</span>
                        </button>
                    }
                    <button className="tryagain" id="Button_QuizTryagain">
                        <span>Coba lagi</span>
                    </button>
                </div>
            </div>

            <div className="content">
                <div className="question">{ data.question }</div>
                <div className="desc">Sebut salah satu huruf dari opsi, misal: "Codi A"</div>

                <div className="options">
                    { 
                        data.answer.map((answer: string) => {
                            const huruf = String.fromCharCode(65 + answerIndex);
                            answerIndex++;
                            return (
                                <div className="answer" key={answerIndex} ad-option={huruf} ad-index={answerIndex - 1} suppressHydrationWarning>{ answer }</div>
                            );
                        } )
                    }
                </div>
            </div>

            <div className="footer">
                <div className="assistant">
                    <button id="Button_MicQuiz" className="accent" suppressHydrationWarning>
                        <span className="icon">&#xf6ac;</span>
                    </button>
                    <div className="phrase"></div>
                </div>
                <div className="submit" suppressHydrationWarning>
                    <div className="desc">Katakan "Codi submit" untuk mengumpulkan jawaban</div>
                    <button className="accent" id="Button_SubmitQuiz" disabled suppressHydrationWarning>
                        <div className="progressring" ad-abortstyle="true">
                            <div className="container"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                        </div>
                        <span>Submit</span>
                    </button>
                </div>
            </div>
            <script src="/quiz.js"/>
        </article>
    );
}
