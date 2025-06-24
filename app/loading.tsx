"use client";
import React from "react";

export default function loading() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center">
      {/* Pulsing Dots */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <div className="size-6 animate-pulse rounded-full bg-purple-500"></div>
          <div
            className="size-6 animate-pulse rounded-full bg-purple-500"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="size-6 animate-pulse rounded-full bg-purple-500"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        {/* <span className="text-sm text-slate-400">Pulse Dots</span> */}
      </div>
    </section>
  );
}
