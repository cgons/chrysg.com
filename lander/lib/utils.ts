export function delay(time: number): Promise<NodeJS.Timeout> {
  return new Promise((r) => setTimeout(r, time));
}

export function isEmptyObject(obj: unknown): obj is object {
  if (obj === undefined || obj === null) return true;

  // An object is empty if it has no keys/properties (ie. {})
  return typeof obj === "object" && Object.keys(obj).length === 0;
}

export function getCurrentDateTimeAsLocaleString(
  timezone: string = "America/New_York",
): string {
  return new Date().toLocaleString("en-US", { timeZone: timezone });
}
