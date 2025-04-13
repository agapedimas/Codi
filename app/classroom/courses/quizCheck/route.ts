import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { topic, number, answer } = body;

    const quizPath = path.join(process.cwd(), "app/classroom/courses/content", topic, "quiz.json");
    if (!fs.existsSync(quizPath)) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const file = fs.readFileSync(quizPath, "utf-8");
    const quizzes = JSON.parse(file);

    const quiz = quizzes[number];
    if (!quiz) {
        return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const isCorrect = quiz.correct == answer;
    const reason = isCorrect ? quiz.reason : "";

    return NextResponse.json({
        correct: isCorrect,
        reason: reason
    });
}
