import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, eventType, guests, date, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    await resend.emails.send({
        from: "Fattoush Traiteur <traiteur@fattoushgeneve.ch>",
        to: "contact@fattoushgeneve.ch",
        replyTo: email,
        subject: `Demande traiteur – ${eventType || "Événement"} – ${name}`,
        html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                <h2 style="color:#7D1A2B">Nouvelle demande traiteur</h2>
                <table style="font-size:14px;border-collapse:collapse;width:100%">
                    <tr style="background:#f9f5f0"><td style="padding:8px 12px;font-weight:bold;width:180px">Nom</td><td style="padding:8px 12px">${name}</td></tr>
                    <tr><td style="padding:8px 12px;font-weight:bold">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
                    <tr style="background:#f9f5f0"><td style="padding:8px 12px;font-weight:bold">Téléphone</td><td style="padding:8px 12px">${phone || "—"}</td></tr>
                    <tr><td style="padding:8px 12px;font-weight:bold">Type d'événement</td><td style="padding:8px 12px">${eventType || "—"}</td></tr>
                    <tr style="background:#f9f5f0"><td style="padding:8px 12px;font-weight:bold">Nombre de personnes</td><td style="padding:8px 12px">${guests || "—"}</td></tr>
                    <tr><td style="padding:8px 12px;font-weight:bold">Date souhaitée</td><td style="padding:8px 12px">${date || "—"}</td></tr>
                    <tr style="background:#f9f5f0"><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px 12px">${message.replace(/\n/g, "<br>")}</td></tr>
                </table>
            </div>
        `,
    });

    return NextResponse.json({ success: true });
}
