import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/main-layout-logo.png"
        alt="Dussur Logo"
        width={98}
        height={98}
        className="h-full w-full"
        priority
      />
    </Link>
  );
}
