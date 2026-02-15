import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const email = await PostalMime.parse(message.raw, {
        attachmentEncoding: 'base64'
    });

    console.log('Subject', email.subject);
    console.log('HTML', email.html);

	const attachments = []

    email.attachments.forEach((attachment) => {
      const thisAttachment = {
		filename: attachment.filename,
		attachment: attachment.content
	  }
	  attachments.push(thisAttachment)
    });

	const emailContent = {
        subject: email.subject,
        from: email.html,
        body: email.text,
		attachments: attachments
      };

	  const webhookURL = 'https://n8n.johnb.dev/webhook/ae066b81-849c-4172-b560-1cc18684ec31';

      // Post the email to the webhook
      await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent),
      });


  },
};