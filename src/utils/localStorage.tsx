export enum LocalStorageKeys {
    user = "user",
    auth = "auth"
};

export class LocalStorageService {
    static upsert<T>(key: LocalStorageKeys, value: T, expireInMinutes?: number): void {
        const item = {
          value,
          expiry: expireInMinutes ? Date.now() + expireInMinutes * 60 * 1000 : null,
        };
        localStorage.setItem(key, JSON.stringify(item));
      }
    
    static get<T>(key: LocalStorageKeys): T | null {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            if (item.expiry && Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
            }
            return item.value as T;
        } catch (error) {
            console.error("Error parsing localStorage item:", error);
            return null;
        }
    }

    static remove(key: LocalStorageKeys): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}