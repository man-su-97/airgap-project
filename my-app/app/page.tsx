"use client";

import { useState } from "react";
import Image from "next/image";

type Metric = {
  name: string;
  value: number;
};

type AnalyticsResponse = {
  source: string;
  generatedAt: string;
  metrics: Metric[];
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/analytics");
      if (!res.ok) throw new Error("Request failed");

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Unable to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl rounded-xl bg-white p-10 shadow-sm dark:bg-zinc-900">
        <div className="flex flex-col gap-8">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            className="dark:invert"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              Analytics Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Data served from a local NestJS backend (air-gapped).
            </p>
          </div>

          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="w-fit rounded-lg bg-black px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {loading ? "Loading..." : "Fetch Analytics"}
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {data && (
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
              <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                Source: {data.source} <br />
                Generated at: {new Date(data.generatedAt).toLocaleString()}
              </div>

              <ul className="space-y-3">
                {data.metrics.map((metric) => (
                  <li
                    key={metric.name}
                    className="flex items-center justify-between rounded-md bg-zinc-50 px-4 py-3 dark:bg-zinc-800"
                  >
                    <span className="font-medium text-zinc-700 dark:text-zinc-200">
                      {metric.name}
                    </span>
                    <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {metric.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
