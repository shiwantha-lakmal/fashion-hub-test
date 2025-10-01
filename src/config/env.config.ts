export const ENV_CONFIG = {
  local: {
    baseURL: 'https://pocketaces2.github.io/fashionhub/login.html',
    homeURL: 'https://pocketaces2.github.io/fashionhub/',
    credentials: {
      username: 'demouser',
      password: 'fashion123',
      account: 'testUser!',
    },
  },
  stage: {
    baseURL: 'https://pocketaces2.github.io/fashionhub/login.html',
    homeURL: 'https://pocketaces2.github.io/fashionhub/',
    credentials: {
      username: 'demouser',
      password: 'fashion123',
      account: 'testUser!',
    },
  },
  production: {
    baseURL: 'https://pocketaces2.github.io/fashionhub/login.html',
    homeURL: 'https://pocketaces2.github.io/fashionhub/',
    credentials: {
      username: 'demouser',
      password: 'fashion123',
      account: 'testUser!',
    },
  },
};

export function getBaseURL() {
  const env = process.env.TEST_ENV || 'production';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG].baseURL;
}

export function getHomeURL() {
  const env = process.env.TEST_ENV || 'production';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG].homeURL;
}

export function getCredentials() {
  const env = process.env.TEST_ENV || 'production';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG].credentials;
}
