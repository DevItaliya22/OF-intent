import { MailerOptions, configNamespace } from '@intentjs/core';

export default configNamespace(
  'mailers',
  (): MailerOptions => ({
    default: process.env.DEFAULT_MAILER || 'logger',
    channels: {
      logger: {
        provider: 'logger',
      },
      smtp: {
        provider: 'smtp',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        ignoreTLS: false,
        requireTLS: false,
        from: process.env.FROM_ADDRESS,
      },
      marketing: {
        provider: 'smtp',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        ignoreTLS: false,
        requireTLS: false,
        from: process.env.FROM_ADDRESS,
      },
    },

    template: {
      appName: process.env.APP_NAME,
      footer: {
        title: process.env.APP_NAME,
      },
    },
  }),
);
