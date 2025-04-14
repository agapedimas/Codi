import { destroySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() 
{
	await destroySession();
    return NextResponse.redirect(process.env.HOST + "/");
}
