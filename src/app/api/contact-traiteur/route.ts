import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { name, email, phone, eventType, guests, date, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Fattoush Traiteur" <${process.env.SMTP_USER}>`,
        to: "contact@fattoushgeneve.ch",
        replyTo: email,
        subject: `Demande traiteur – ${eventType || "Événement"} – ${name}`,
        html: `
            <h2>Nouvelle demande traiteur</h2>
            <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
                <tr><td style="padding:6px 12px;font-weight:bold">Nom</td><td style="padding:6px 12px">${name}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold">Téléphone</td><td style="padding:6px 12px">${phone || "—"}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold">Type d'événement</td><td style="padding:6px 12px">${eventType || "—"}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold">Nombre de personnes</td><td style="padding:6px 12px">${guests || "—"}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold">Date souhaitée</td><td style="padding:6px 12px">${date || "—"}</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top">Message</td><td style="padding:6px 12px">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
        `,
    });

    return NextResponse.json({ success: true });
}
