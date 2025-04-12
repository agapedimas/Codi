import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) 
{
    try 
    {
        const body = await req.json();
        const { email, fullname, password } = body;

        if (!email || !fullname || !password)
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });

        const [existing] = await db.query("SELECT * FROM accounts WHERE email = ?", [email]);
        if (existing.length > 0)
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query("INSERT INTO accounts (id, email, fullname, password) VALUES (?, ?, ?, ?)", [
            (Date.now() * 10).toString(36),
            email,
            fullname,
            hashedPassword,
        ]);

        return NextResponse.json({ message: "User berhasil didaftarkan" });
    } 
    catch (err) 
    {
        console.error(err);
        return NextResponse.json({ error: "Gagal mendaftarkan user" }, { status: 500 });
    }
}
