import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Defensive HTML escaping helper to prevent HTML & Email injection
function escapeHtml(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip newlines to prevent SMTP header / CRLF injection
function sanitizeHeader(str: string = ""): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, message, planDetails } = body;

    // 1. Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    // Input length limits to prevent payload bloat
    const safeName = sanitizeHeader(name.slice(0, 100));
    const safeCompany = sanitizeHeader((company || "").slice(0, 120));
    const safeEmail = sanitizeHeader(email.slice(0, 150));
    const safePhone = sanitizeHeader(phone.slice(0, 50));
    const safeService = sanitizeHeader((service || "General Inquiry").slice(0, 100));
    const safeMessage = (message || "").slice(0, 3000);

    const timestamp = new Date().toISOString();
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "q-group-armeina@proton.me";

    // 2. Build sanitized HTML email template
    const planHtml = planDetails
      ? `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">📊 Calculated Custom Plan:</h3>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Workstations:</strong> ${escapeHtml(String(planDetails.workstations || 0))} Endpoints</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Servers:</strong> ${escapeHtml(String(planDetails.servers || 0))} Server(s)</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Locations:</strong> ${escapeHtml(String(planDetails.locations || 1))} Site(s)</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Security Tier:</strong> ${escapeHtml(String(planDetails.security || "Standard"))}</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Support Schedule:</strong> ${planDetails.schedule === "247" ? "24/7 Priority" : "Business Hours"}</p>
        <p style="margin: 8px 0 0 0; color: #65a30d; font-size: 16px; font-weight: bold;">Estimated Budget: ~${Number(planDetails.estimatedCost || 0).toLocaleString()} AMD/mo</p>
      </div>`
      : "";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background-color: #f1f5f9; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #090e17; padding: 24px; text-align: center; border-bottom: 3px solid #84cc16; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
          .header p { color: #84cc16; margin: 4px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 24px; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #475569; font-size: 13px; text-transform: uppercase; }
          .value { color: #0f172a; font-size: 15px; margin-top: 2px; }
          .badge { display: inline-block; background: #ecfccb; color: #4d7c0f; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 13px; }
          .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Q GROUP</h1>
            <p>New IT Consultation & Audit Request</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Client Name</div>
              <div class="value"><strong>${escapeHtml(safeName)}</strong></div>
            </div>
            <div class="field">
              <div class="label">Company Name</div>
              <div class="value">${escapeHtml(safeCompany) || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="label">Contact Phone</div>
              <div class="value"><a href="tel:${escapeHtml(safePhone)}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${escapeHtml(safePhone)}</a></div>
            </div>
            <div class="field">
              <div class="label">Contact Email</div>
              <div class="value"><a href="mailto:${escapeHtml(safeEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(safeEmail)}</a></div>
            </div>
            <div class="field">
              <div class="label">Requested Service</div>
              <div class="value"><span class="badge">${escapeHtml(safeService)}</span></div>
            </div>
            
            ${planHtml}

            ${safeMessage ? `
            <div class="field" style="margin-top: 16px;">
              <div class="label">Client Notes / Infrastructure Details</div>
              <div class="value" style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(safeMessage)}</div>
            </div>` : ""}
          </div>
          <div class="footer">
            Received via Q Group Website at ${new Date().toLocaleString()} (Armenia Time)<br>
            Direct Inquiry to: ${escapeHtml(receiverEmail)}
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Backup lead locally into data/leads.json
    try {
      const dirPath = path.join(process.cwd(), "data");
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const filePath = path.join(dirPath, "leads.json");
      let leads = [];
      if (fs.existsSync(filePath)) {
        leads = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      }
      leads.unshift({ 
        id: Date.now().toString(), 
        timestamp, 
        name: safeName, 
        company: safeCompany, 
        email: safeEmail, 
        phone: safePhone, 
        service: safeService, 
        message: safeMessage, 
        planDetails 
      });
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
    } catch (e) {
      console.error("Local lead backup error:", e);
    }

    // 4. Send Email via SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${safeName} (Q Group Website)" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: safeEmail,
        subject: `🔔 New Consultation Request from ${safeName} - ${safeCompany || "Q Group Website"}`,
        html: htmlContent,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully.",
    });
  } catch (error) {
    console.error("Error processing contact request:", error);
    // Generic safe error message to prevent stack trace leaks
    return NextResponse.json(
      { error: "Failed to process consultation request. Please try again or call us at 8123." },
      { status: 500 }
    );
  }
}
