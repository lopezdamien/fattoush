import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data/plat-du-jour.json");
        const fileContent = await fs.readFile(filePath, "utf8");
        return NextResponse.json(JSON.parse(fileContent));
    } catch (e) {
        return NextResponse.json({ error: "Impossible de lire le plat du jour" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { password, weekStarting, menu } = await req.json();

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Format all plate names to uppercase
    const formattedMenu = { ...menu };
    for (const day in formattedMenu) {
        const key = day as keyof typeof formattedMenu;
        if (formattedMenu[key]) {
            formattedMenu[key].name = formattedMenu[key].name.toUpperCase();
        }
    }

    const content = JSON.stringify({ weekStarting, menu: formattedMenu }, null, 2) + "\n";
    const encoded = Buffer.from(content).toString("base64");

    const repo = "lopezdamien/fattoush";
    const filePath = "data/plat-du-jour.json";
    const token = process.env.GITHUB_TOKEN;

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

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: `Update plat du jour — Week of ${weekStarting}`,
            content: encoded,
            sha,
        }),
    });

    if (!putRes.ok) {
        return NextResponse.json({ error: "Erreur GitHub (écriture)" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
