export const APP_CONFIG = {
  NAME: "دُسر العقارية",
  NAME_EN: "DUSSER Real Estate",
  DESCRIPTION: "منصة عقارية متطورة تربط بين الملاك والمستأجرين",
  DESCRIPTION_EN: "Advanced real estate platform connecting owners and tenants",
  CONTACT: {
    PHONE: "+966 11 123 4567",
    EMAIL: "abdulwahab@dussur.sa",
    ADDRESS: "الرياض، المملكة العربية السعودية",
    ADDRESS_EN: "Riyadh, Saudi Arabia",
  },
} as const;

export const ROUTES = {
  HOME: "/",
  PROPERTIES: "/properties",
  PROPERTY_DETAIL: (id: string | number) => `/properties/${id}`,
  ABOUT: "/about",
  CONTACT: "/contact",
  SERVICES: "/services",
} as const;
