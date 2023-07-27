async function getHash(data: string) {
  const msgUint8 = new TextEncoder().encode(data);
  const hash = await window.crypto.subtle.digest('SHA-256', msgUint8);
  const arr = Array.from(new Uint8Array(hash));
  const hashHex = arr
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export default getHash;