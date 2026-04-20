import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { password, date, name, description, price } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const content = JSON.stringify({ date, name, description, price }, null, 2) + "\n";
    const encoded = Buffer.from(content).toString("base64");

    const repo = "lopezdamien/fattoush";
    const filePath = "data/plat-du-jour.json";
    const token = process.env.GITHUB_TOKEN;

    // Get current SHA
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
        },
    });

    if (!getRes.ok) {
        return NextResponse.json({ error: "Erreur GitHub (lecture)" }, { status: 500 });
    }

    const { sha } = await getRes.json();

    // Update file
    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: `Update plat du jour: ${name} — ${date}`,
            content: encoded,
            sha,
        }),
    });

    if (!putRes.ok) {
        return NextResponse.json({ error: "Erreur GitHub (écriture)" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
