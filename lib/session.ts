import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function createSession(userId: number) 
{
    const sessionId = crypto.randomUUID();
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 hari ke depan

    const sessionData = JSON.stringify({ userId });

    await db.execute(
        "INSERT INTO sessions (session_id, expires, data) VALUES (?, ?, ?)",
        [sessionId, expires, sessionData]
    );

    (await cookies()).set("session_id", sessionId, 
    {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 hari
    });

    return sessionId;
}

export async function getSession() 
{
    const sessionId = (await cookies()).get("session_id")?.value;
    if (!sessionId) return null;

    const [rows]: any = await db.query(
        "SELECT data, expires FROM sessions WHERE session_id = ?",
        [sessionId]
    );

    const session = rows[0];
    if (!session) 
        return null;

    const now = Math.floor(Date.now() / 1000);
    if (session.expires < now) 
    {
        // expired, hapus dari db
        await db.execute("DELETE FROM sessions WHERE session_id = ?", [sessionId]);
        (await cookies()).delete("session_id");
        return null;
    }

    return JSON.parse(session.data);
}
  
export async function destroySession() 
{
    const sessionId = (await cookies()).get("session_id")?.value;
    if (sessionId) 
    {
        await db.execute("DELETE FROM sessions WHERE session_id = ?", [sessionId]);
        (await cookies()).delete("session_id");
    }
}


export async function accountInformation()
{
    const session = await getSession();

    if (session == null)
        return;

    const [rows]: any = await db.query(
        "SELECT id, fullname, email FROM sessions WHERE id = ?",
        [session.id]
    );

    const account = rows[0];

    return account;
}