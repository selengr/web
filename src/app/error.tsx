'use client';


import Link from 'next/link';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="grid min-h-full place-items-center px-6 my-16 py-32 1g:px-8 bg-gray-400">
      <div className="text-center">
        <p className="text-base font-semibold text-emerald-700 text-emerald-500">
          There was a problem{' '}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 sm:text">
          {error.message || 'Something went wrong'}{' '}
        </h1>
        `
        <p className="mt-6 text-base leading-7 text-zinc-600 text-emerald-500">
          Please try again later or contact support if the problem persists `
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={reset}
          >
            Try again
          </button>

          <Link
            href="/"
            className="text-gray-50"
          // className=
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
