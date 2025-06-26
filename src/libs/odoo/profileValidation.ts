// Utilitas validasi kelengkapan profile user/partner
export interface ProfileData {
  name?: string
  email?: string
  phone?: string
  country?: string
  image?: string // tambahkan field image/foto

  // tambahkan field lain sesuai kebutuhan
}

export function isProfileComplete(profile: ProfileData): boolean {
  // Validasi field wajib, bisa disesuaikan
  return Boolean(
    profile.name &&
    profile.email &&
    profile.phone &&
    profile.country &&
    profile.image // validasi image wajib ada
  )
}
