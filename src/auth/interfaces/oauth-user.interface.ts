export interface GoogleOAuthUser {
  google_id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface GithubOAuthUser {
  github_id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface RequestWithCookies {
  cookies?: {
    refresh_token?: string;
  };
}
