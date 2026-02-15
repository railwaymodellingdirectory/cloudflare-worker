import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const email = await PostalMime.parse(message.raw, {
        attachmentEncoding: 'base64'
    });

    console.log('Subject', email.subject);
    console.log('HTML', email.html);

	attachments = []

    email.attachments.forEach((attachment) => {
      const attachment = {
		filename: attachment.filename,
		attachment: attachment.content
	  }
	  attachments.push(attachment)
    });

	const emailContent = {
        subject: email.subject,
        from: email.html,
        body: rawEmail,
		attachments: attachments
      };

      // Post the email to the webhook
      await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent),
      });


  },
};