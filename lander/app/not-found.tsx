import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-dim mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Page Not Found
          </p>
          <p className="text-secondary mb-4 text-lg font-medium">
            Sorry, there is no page at the URL requested.{" "}
          </p>
          <Link href="/" className="text-secondary">
            <span className="material-symbols-outlined relative bottom-[2px] align-bottom">
              turn_left
            </span>
            <span className="secondary-link font-medium">Return Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
