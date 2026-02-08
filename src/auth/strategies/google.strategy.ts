import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

interface GoogleProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string; verified: boolean }>;
  photos: Array<{ value: string }>;
}

interface GoogleUser {
  google_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_OAUTH_CLIENT_ID');
    const clientSecret = configService.get<string>(
      'GOOGLE_OAUTH_CLIENT_SECRET',
    );
    const callbackURL = configService.get<string>('GOOGLE_OAUTH_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error(
        'Missing Google OAuth credentials. Set GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, and GOOGLE_OAUTH_CALLBACK_URL.',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): void {
    const { id, displayName, emails, photos } = profile;

    const user: GoogleUser = {
      google_id: id,
      email: emails[0].value,
      name: displayName,
      avatar_url: photos[0]?.value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
