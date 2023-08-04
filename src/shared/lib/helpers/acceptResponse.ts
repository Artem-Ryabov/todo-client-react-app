export default function acceptResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
}