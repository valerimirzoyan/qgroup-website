import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, message, planDetails } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@q-group.am";

    // 1. Build beautiful HTML email template
    const planHtml = planDetails
      ? `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px;">📊 Calculated Custom Plan:</h3>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Workstations:</strong> ${planDetails.workstations} Endpoints</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Servers:</strong> ${planDetails.servers} Server(s)</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Locations:</strong> ${planDetails.locations} Site(s)</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Security Tier:</strong> ${planDetails.security}</p>
        <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Support Schedule:</strong> ${planDetails.schedule === "247" ? "24/7 Priority" : "Business Hours"}</p>
        <p style="margin: 8px 0 0 0; color: #65a30d; font-size: 16px; font-weight: bold;">Estimated Budget: ~${planDetails.estimatedCost?.toLocaleString()} AMD/mo</p>
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
              <div class="value"><strong>${name}</strong></div>
            </div>
            <div class="field">
              <div class="label">Company Name</div>
              <div class="value">${company || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="label">Contact Phone</div>
              <div class="value"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Contact Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Requested Service</div>
              <div class="value"><span class="badge">${service || "General IT Inquiry"}</span></div>
            </div>
            
            ${planHtml}

            ${message ? `
            <div class="field" style="margin-top: 16px;">
              <div class="label">Client Notes / Infrastructure Details</div>
              <div class="value" style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</div>
            </div>` : ""}
          </div>
          <div class="footer">
            Received via Q Group Website at ${new Date().toLocaleString()} (Armenia Time)<br>
            Direct Inquiry to: ${receiverEmail}
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Backup lead locally into data/leads.json
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
      leads.unshift({ id: Date.now().toString(), timestamp, name, company, email, phone, service, message, planDetails });
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
    } catch (e) {
      console.error("Local lead backup error:", e);
    }

    // 3. Send Email via SMTP if configured
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
        from: `"${name} (Q Group Website)" <${smtpUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `🔔 New Consultation Request from ${name} - ${company || "Q Group Website"}`,
        html: htmlContent,
      });

      console.log(`[SMTP] Email successfully sent to ${receiverEmail}`);
    } else {
      console.log(`[Notification] New lead received for ${receiverEmail} (Configure SMTP in .env.local for live delivery):`, {
        name,
        company,
        email,
        phone,
        service,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request sent successfully to " + receiverEmail,
    });
  } catch (error: any) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { error: "Failed to process consultation request. " + error?.message },
      { status: 500 }
    );
  }
}
