import 'dotenv/config'

export const ENV_CONFIG = {
    PORT : Number(process.env.PORT) || 3999,
    GITHUB_TOKEN : process.env.GITHUB_TOKEN,
    GITHUB_OWNER : process.env.GITHUB_OWNER,
    GITHUB_REPO : process.env.GITHUB_REPO,
    GITHUB_PROJECT_TOKEN : process.env.GITHUB_PROJECT_TOKEN,
    GITHUB_PROJECT_NUMBER : process.env.GITHUB_PROJECT_NUMBER,
    NODE_ENV : process.env.NODE_ENV,
    HOST : process.env.HOST
}