/**
 * Application configuration
 * Non-secret values are hardcoded here.
 */

// API URL
export const API_URL = "https://api.booktax.com";

// External Apps
export const STUDIO_URL = "https://studio.Booktax.com";
export const UNIVERSITY_APP_URL = "https://university.Booktax.com/";
export const AI_APP_URL = "https://ai.Booktax.com";

// Assets / CDN
export const LOGO_URL =
  "https://cdn-zygotrix.s3.us-east-1.amazonaws.com/zygotrix-ai.png";

// Brand Info
export const BOT_NAME = "Booktax AI";
export const CONTACT_EMAIL = "Booktax.work@gmail.com";

// Services
export const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmfz8yj9502n307um4gr9cu4w/master";

// Export all config
export const config = {
  apiUrl: API_URL,
  studioUrl: STUDIO_URL,
  universityAppUrl: UNIVERSITY_APP_URL,
  aiAppUrl: AI_APP_URL,
  logoUrl: LOGO_URL,
  botName: BOT_NAME,
  contactEmail: CONTACT_EMAIL,
  hygraphEndpoint: HYGRAPH_ENDPOINT,
};

export default config;
