// Single source of truth for business details used in metadata, structured data and contact links.

export const SITE_URL = "https://www.lomediastudio.com";
export const SITE_NAME = "LoMediaStudio";
export const SITE_TAGLINE = "Video Production, Photography & Digital Marketing in Ottawa";
export const SITE_DESCRIPTION =
  "LoMediaStudio is a media production agency in Ottawa, Canada. We create video production, photography, digital marketing, branding and content that turns your vision into growth.";

export const CONTACT = {
  email: "layoobidikepublications@gmail.com",
  // Call line
  phoneDisplay: "+1 (905) 922-4471",
  phoneE164: "+19059224471",
  // WhatsApp line
  whatsappDisplay: "+1 (514) 219-2987",
  whatsapp: "15142192987",
  street: "1551 Lycee Place",
  city: "Ottawa",
  region: "ON",
  postalCode: "K1G 4B5",
  country: "CA",
  countryName: "Canada",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const DEFAULT_OG_IMAGE = "/bw.jpg";
