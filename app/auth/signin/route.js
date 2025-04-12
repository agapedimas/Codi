import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) 
            return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });

        // cari user dari db
        const [userResult] = await db.query("SELECT * FROM accounts WHERE email = ?", [email]);

        if (userResult.length === 0)
            return NextResponse.json({ error: "Email tidak terdaftar" }, { status: 404 });

        const user = userResult[0];

        // cek password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return NextResponse.json({ error: "Password salah" }, { status: 401 });

        // TODO: generate token atau session (bisa next-auth, jwt, dll)
        return NextResponse.json(
        {
            message: "Login berhasil",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    }
    catch (err) 
    {
        console.error(err);
        return NextResponse.json({ error: "Gagal login" }, { status: 500 });
    }
}
