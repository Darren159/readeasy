import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#051D40] text-white">
      <Image src={logo} alt="ReadEasy AI" width={60} height={60} />

      <div className="flex items-center gap-2">
        <Link href="/">
          <button className="bg-white text-black rounded-md p-2 mr-4">Home</button>
        </Link>

        <Link href="/dashboard">
          <button className="bg-white text-black rounded-md p-2 mr-4">Dashboard</button>
        </Link>
      </div>
    </header>
  );
}
