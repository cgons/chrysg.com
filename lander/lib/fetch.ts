export default class Fetch {
  public static async POST(url: string, payload: object): Promise<Response> {
    // Note: Impl. defaults to JSON
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}
