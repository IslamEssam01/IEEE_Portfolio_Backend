import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ERROR_MESSAGES } from 'src/constants/swagger-messages';

type VerifyCallback = (
  error: Error | null,
  user?: GithubUser,
  info?: unknown,
) => void;

interface GithubProfile {
  id: string;
  displayName?: string;
  username?: string;
  emails?: Array<{ value: string }>;
  photos?: Array<{ value: string }>;
}

interface GithubUser {
  github_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = configService.get<string>('GITHUB_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GITHUB_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error(
        'Missing GitHub OAuth credentials. Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL.',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['user:email'],
    });
  }

  private async fetchPrimaryEmail(accessToken: string): Promise<string | null> {
    try {
      const response = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`,
          'User-Agent': 'ieee-backend',
          Accept: 'application/vnd.github+json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const emails = (await response.json()) as Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>;

      const primaryVerified = emails.find(
        (item) => item.primary && item.verified,
      );
      if (primaryVerified?.email) {
        return primaryVerified.email;
      }

      const verified = emails.find((item) => item.verified);
      if (verified?.email) {
        return verified.email;
      }

      return emails[0]?.email ?? null;
    } catch {
      return null;
    }
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: VerifyCallback,
  ): Promise<void> {
    let email: string | undefined = profile.emails?.[0]?.value;
    if (!email) {
      email = (await this.fetchPrimaryEmail(accessToken)) ?? undefined;
    }
    if (!email) {
      done(new Error(ERROR_MESSAGES.EMAIL_NOT_PROVIDED_BY_OAUTH_GITHUB));
      return;
    }

    const name: string =
      profile.displayName || profile.username || email.split('@')[0];

    const user: GithubUser = {
      github_id: profile.id,
      email,
      name,
      avatar_url: profile.photos?.[0]?.value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
