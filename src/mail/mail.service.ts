import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailjet, {
  Client,
  SendEmailV3_1,
  type LibraryResponse,
} from 'node-mailjet';
import { buildOtpEmailHtml } from './templates/otp-email.template';

@Injectable()
export class MailService {
  private readonly mailjet: Client;

  constructor(private readonly configService: ConfigService) {
    this.mailjet = Mailjet.apiConnect(
      this.configService.getOrThrow<string>('MAILJET_API_KEY'),
      this.configService.getOrThrow<string>('MAILJET_API_SECRET'),
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<SendEmailV3_1.Response> {
    try {
      const from = this.configService.get<string>('MAIL_FROM_ADDRESS');
      const payload: SendEmailV3_1.Body = {
        Messages: [
          {
            From: {
              Email: from || 'onboarding@resend.dev',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            HTMLPart: content,
          },
        ],
      };

      const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(payload);

      return result.body;
    } catch (error) {
      console.error('Email Service Error:', error);
      throw new InternalServerErrorException('Could not send email');
    }
  }

  async sendOTPEmail(to: string, otp: string): Promise<void> {
    const subject = 'Your One-Time Password (OTP)';
    const logoUrl = this.configService.get<string>('MAIL_LOGO_URL');
    const content = buildOtpEmailHtml({ otp, logoUrl: logoUrl || undefined });
    await this.sendEmail(to, subject, content);
  }
}
