import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { createFlags, dedupe } from "flags/next";
import type { Identify } from "flags";

// In a real app, you would replace this with your own user identification logic
export const identify: Identify<StatsigUser> = dedupe(async () => {
  // This must be simple and NOT use any Node.js specific APIs like fs or path
  return {
    userID: "a-user-id-from-session",
    // add any other user properties you want to use for targeting
    // custom: {
    //   plan: "premium",
    // },
  };
});

export const { flag, get, getAll, set, remove } = createFlags({
  identify,
  adapter: statsigAdapter({
    // This key is intended for client-side usage.
    // Ensure it's a client-sdk-key from your Statsig project settings.
    sdkKey: process.env.NEXT_PUBLIC_STATSIG_CLIENT_API_KEY!,
  }),
});

// A helper to create a feature flag.
// You can use this in your components to check if a feature is enabled.
export function createFeatureFlag(name: string, defaultValue = false) {
  return () => flag(name, defaultValue);
}
