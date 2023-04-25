import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: `${req.body.email}`, // Your email where you'll receive emails
      from: "noreply@teamc.blui.co", // your website email address here
      subject: `${req.body.subject}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${req.body.subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 20px;">
              <h1 style="margin: 0; padding: 0;">Hello, ${req.body.fullname}!</h1>
              <p style="margin-top: 20px;">${req.body.message}</p>
            </td>
          </tr>
        </table>
      </body>
      </html>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;