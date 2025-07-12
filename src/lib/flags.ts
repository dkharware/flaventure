import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { createFlags, dedupe } from "flags/next";
import type { Identify } from "flags";

// In a real app, you would replace this with your own user identification logic
export const identify: Identify<StatsigUser> = dedupe(async () => {
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
    sdkKey: process.env.STATSIG_SERVER_API_KEY!,
  }),
});

// A helper to create a feature flag.
// You can use this in your components to check if a feature is enabled.
export function createFeatureFlag(name: string, defaultValue = false) {
  return () => flag(name, defaultValue);
}
