import Link from "next/link";

export default function Header() {
  return (
    <div className="h-10v flex items-center max-w-7xl mx-auto">
      <Link
        href="/"
        className="text-4xl text-[#0aff60] ml-5  font-logo font-bold "
      >
        ADARI
      </Link>
    </div>
  );
}
