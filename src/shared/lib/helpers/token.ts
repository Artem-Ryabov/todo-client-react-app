export function getToken(): string {
  return document.cookie?.split(';')?.[0].split('=')?.[1]?.trim();
}

export function setToken(token: string): void {
  document.cookie = `token=${token};max-age=10800`;
}