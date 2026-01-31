import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const clientID = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      // Create a dummy strategy to prevent instantiation errors
      // The strategy won't be used if credentials are missing
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL: 'http://localhost:3001/auth/google/callback',
        scope: ['email', 'profile'],
      });
      return;
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;

    const user = {
      google_id: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0]?.value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
