export const formatters = {
  number: (num: number, locale = "ar-SA"): string => {
    return new Intl.NumberFormat(locale).format(num)
  },

  currency: (amount: number, currency = "SAR", locale = "ar-SA"): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount)
  },

  area: (area: number, unit = "م²"): string => {
    return `${formatters.number(area)} ${unit}`
  },

  phone: (phone: string): string => {
    // Format Saudi phone numbers
    return phone.replace(/(\+966|0)?(\d{2})(\d{3})(\d{4})/, "+966 $2 $3 $4")
  },
}
