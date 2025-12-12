import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const pdf = formData.get("pdf") as File | null;

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Convert file to buffer if PDF exists
    const attachment = [];
    if (pdf) {
      const arrayBuffer = await pdf.arrayBuffer();
      attachment.push({
        filename: pdf.name,
        content: Buffer.from(arrayBuffer),
        contentType: pdf.type,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact From ${name}`,
      replyTo: email, 
      html: `
    <h2>New Message Received</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b><br/>${message}</p>
  `,
      attachments: attachment,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
