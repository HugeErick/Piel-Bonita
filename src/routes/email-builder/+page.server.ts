// src/routes/email-builder/+page.server.ts
import { fail } from "@sveltejs/kit";
import mjml2html from "mjml";
import nodemailer from "nodemailer";
import type { Actions } from "./$types";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "$env/static/private";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export const actions: Actions = {
  send: async ({ request }) => {
    const form = await request.formData();
    const mjml = form.get("mjml") as string;
    const to = form.get("to") as string;
    if (!mjml || !to) return fail(400, { message: "Missing mjml or recipient" });

    const { html, errors } = await mjml2html(mjml); // <-- await added

    if (errors?.length) return fail(422, { message: "MJML compile error", errors });

    try {
      const info = await transporter.sendMail({
        from: `"Piel Bonita" <${SMTP_USER}>`,
        to,
        subject: "Piel Bonita — new arrivals",
        html,
      });
      console.log("sent: ", info.messageId, info.response);
      return { success: true };
    } catch (err) {
      console.error("nodemailer send failed:", err);
      return fail(502, { message: "Send failed" });
    }
  },
};
