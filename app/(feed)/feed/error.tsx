"use client";
import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-2 text-gray-600">
        {error.message || "An unexpected error has occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
