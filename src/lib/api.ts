export class APIError<T = {}> extends Error {
  readonly data: T | undefined;

  constructor(message: string, data?: T) {
    super(message);
    this.data = data;
  }
}

export type APISuccess<T> = {
  ok: true;
  data: T;
};

export type APIFailure<E> = {
  ok: false;
  error: APIError<E>;
};

export type APIResult<T, E = unknown> = APISuccess<T> | APIFailure<E>;

const API = {
  async fetch<T, E = unknown>(
    url: string,
    init?: RequestInit
  ): Promise<APIResult<T, E>> {
    try {
      const res = await fetch(url, init);
      const isJSON = res.headers.get("content-type")?.includes("application/json");
      const data = isJSON ? await res.json() : await res.text();

      if (!res.ok) {
        return {
          ok: false,
          error: new APIError<E>(
            (data as any)?.error || res.statusText,
            data as E
          ),
        };
      }

      return {
        ok: true,
        data: data as T,
      };
    } catch (err: any) {
      return {
        ok: false,
        error: new APIError("Network error", err),
      };
    }
  },
};

export default API;