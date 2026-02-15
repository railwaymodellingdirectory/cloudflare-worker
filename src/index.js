import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const email = await PostalMime.parse(message.raw, {
        attachmentEncoding: 'base64'
    });

    console.log('Subject', email.subject);
    console.log('HTML', email.html);

    email.attachments.forEach((attachment) => {
      console.log('Attachment', attachment.filename, attachment.content);
    });
  },
};