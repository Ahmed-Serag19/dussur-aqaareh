import Image from "next/image"

export function HeroBackground() {
  return (
    <>
      <Image src="/images/hero-bg.png" alt="Hero Background" fill className="object-cover" priority quality={90} />
      <div className="absolute inset-0 bg-black/40" />
    </>
  )
}
