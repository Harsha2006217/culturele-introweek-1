import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/auth/update-password?token=${token}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset uw wachtwoord - Culturele INTROWEEK MBO 2026',
    text: `
      Iemand heeft een verzoek gedaan om uw wachtwoord te resetten.
      
      Om uw wachtwoord te resetten, klik op deze link: ${resetLink}
      
      Als u geen wachtwoord reset heeft aangevraagd, kunt u deze email negeren.
      
      De link is 1 uur geldig.
    `,
    html: `
      <h2>Reset uw wachtwoord</h2>
      <p>Iemand heeft een verzoek gedaan om uw wachtwoord te resetten.</p>
      <p>
        <a href="${resetLink}">Klik hier om uw wachtwoord te resetten</a>
      </p>
      <p>Als u geen wachtwoord reset heeft aangevraagd, kunt u deze email negeren.</p>
      <p><small>De link is 1 uur geldig.</small></p>
    `
  })
}

export async function sendInstitutionConfirmationEmail(
  email: string, 
  institutionName: string,
  editToken: string
) {
  const editLink = `${process.env.NEXT_PUBLIC_SITE_URL}/instellingen/bewerken?token=${editToken}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Aanmelding bevestigd - Culturele INTROWEEK MBO 2026',
    text: `
      Hartelijk dank voor uw aanmelding!
      
      ${institutionName} is succesvol aangemeld voor de Culturele INTROWEEK MBO 2026.
      
      U kunt uw gegevens bewerken via deze link: ${editLink}
      
      Bewaar deze link goed, u heeft deze nodig om uw aanmelding te bewerken.
      
      Met vriendelijke groet,
      Team Culturele INTROWEEK MBO
    `,
    html: `
      <h2>Aanmelding Bevestigd</h2>
      <p>Hartelijk dank voor uw aanmelding!</p>
      <p><strong>${institutionName}</strong> is succesvol aangemeld voor de Culturele INTROWEEK MBO 2026.</p>
      <p>
        <a href="${editLink}">Klik hier om uw gegevens te bewerken</a>
      </p>
      <p>Bewaar deze link goed, u heeft deze nodig om uw aanmelding te bewerken.</p>
      <p>
        Met vriendelijke groet,<br>
        Team Culturele INTROWEEK MBO
      </p>
    `
  })
}

export async function sendTeacherConfirmationEmail(
  email: string,
  teacherName: string,
  editToken: string
) {
  const editLink = `${process.env.NEXT_PUBLIC_SITE_URL}/docenten/bewerken?token=${editToken}`

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Aanmelding bevestigd - Culturele INTROWEEK MBO 2026',
    text: `
      Hartelijk dank voor uw aanmelding!
      
      Beste ${teacherName},
      
      U bent succesvol aangemeld voor de Culturele INTROWEEK MBO 2026.
      
      U kunt uw gegevens bewerken via deze link: ${editLink}
      
      Bewaar deze link goed, u heeft deze nodig om uw aanmelding te bewerken.
      
      Met vriendelijke groet,
      Team Culturele INTROWEEK MBO
    `,
    html: `
      <h2>Aanmelding Bevestigd</h2>
      <p>Hartelijk dank voor uw aanmelding!</p>
      <p>Beste <strong>${teacherName}</strong>,</p>
      <p>U bent succesvol aangemeld voor de Culturele INTROWEEK MBO 2026.</p>
      <p>
        <a href="${editLink}">Klik hier om uw gegevens te bewerken</a>
      </p>
      <p>Bewaar deze link goed, u heeft deze nodig om uw aanmelding te bewerken.</p>
      <p>
        Met vriendelijke groet,<br>
        Team Culturele INTROWEEK MBO
      </p>
    `
  })
}