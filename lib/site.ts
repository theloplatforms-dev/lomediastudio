// Single source of truth for business details used in metadata, structured data and contact links.

export const SITE_URL = "https://www.lomediastudio.com";
export const SITE_NAME = "LO Media Studio";
export const SITE_TAGLINE = "Creative Media Studio in Ottawa";
export const SITE_DESCRIPTION =
  "LO Media Studio is an Ottawa creative media studio offering video production, photography, brand storytelling, visual brand development and digital marketing that help brands grow.";

export const CONTACT = {
  email: "layoobidikepublications@gmail.com",
  phoneDisplay: "+1 (514) 219-2987",
  phoneE164: "+15142192987",
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
