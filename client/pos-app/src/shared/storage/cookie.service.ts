import Cookies from 'js-cookie';

export const cookieService = {
  set<T>(key: string, value: T, days = 7): void {
    Cookies.set(key, JSON.stringify(value), {
      expires: days,
      sameSite: 'lax'
    });
  },

  get<T>(key: string): T | null {
    const rawValue = Cookies.get(key);

    if (!rawValue) {
      return null;
    }

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    Cookies.remove(key);
  }
};