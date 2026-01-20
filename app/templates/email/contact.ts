export interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

export function generateContactEmailHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact - Zenith</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fafaf9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafaf9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #b6771d 0%, #ff9d00 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                ZENITH
              </h1>
              <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                Nouveau message de contact
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e5e5e5;">
                <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  Expéditeur
                </p>
                <p style="margin: 0 0 4px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                  ${data.name}
                </p>
                <p style="margin: 0; color: #737373; font-size: 14px;">
                  <a href="mailto:${data.email}" style="color: #ff9d00; text-decoration: none;">
                    ${data.email}
                  </a>
                </p>
              </div>

              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  Sujet
                </p>
                <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">
                  ${data.subject}
                </p>
              </div>

              <div>
                <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  Message
                </p>
                <div style="background-color: #f5f5f4; border-left: 3px solid #ff9d00; padding: 20px; border-radius: 4px;">
                  <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                  </p>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fafaf9; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #737373; font-size: 12px;">
                © ${new Date().getFullYear()} Zenith - Développeur Web Freelance
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateContactEmailText(data: ContactEmailData): string {
  return `
Nouveau message de contact - Zenith

EXPÉDITEUR
----------
Nom: ${data.name}
Email: ${data.email}

SUJET
-----
${data.subject}

MESSAGE
-------
${data.message}

---
Pour répondre, envoyez un email à: ${data.email}

© ${new Date().getFullYear()} Zenith - Développeur Web Freelance
  `.trim()
}
