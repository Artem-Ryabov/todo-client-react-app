export default function acceptResponse(r: Response): Promise<any> {
  if (r.ok) {
    return r.json();
  }
  throw new Error(r.statusText);
}