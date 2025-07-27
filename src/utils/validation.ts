import { z } from "zod"

export const propertyFiltersSchema = z.object({
  listingType: z.enum(["rent", "buy", "all"]).optional(),
  propertyType: z.number().optional(),
  regionId: z.number().optional(),
  cityId: z.number().optional(),
  neighborhoodId: z.number().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minArea: z.number().min(0).optional(),
  maxArea: z.number().min(0).optional(),
  roomsCount: z.number().min(0).optional(),
  bathroomsCount: z.number().min(0).optional(),
  search: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  message: z.string().min(10, "الرسالة قصيرة جداً"),
})

export type PropertyFiltersInput = z.infer<typeof propertyFiltersSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
