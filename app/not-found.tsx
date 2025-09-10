import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
     
      <Link href="/" className="text-blue-500">Go back to the home page</Link>

    </section>
  )
}