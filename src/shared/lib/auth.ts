export async function validateBearerToken(token: string): Promise<boolean> {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey || !token) {
    return false;
  }

  const encoder = new TextEncoder();
  const tokenBytes = encoder.encode(token);
  const secretBytes = encoder.encode(secretKey);

  if (tokenBytes.length !== secretBytes.length) {
    return false;
  }

  const tokenKey = await crypto.subtle.importKey("raw", tokenBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);

  const secretKey_key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);

  const tokenSignature = await crypto.subtle.sign("HMAC", tokenKey, new Uint8Array(0));
  const secretSignature = await crypto.subtle.sign("HMAC", secretKey_key, new Uint8Array(0));

  const tokenSigArray = new Uint8Array(tokenSignature);
  const secretSigArray = new Uint8Array(secretSignature);

  if (tokenSigArray.length !== secretSigArray.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < tokenSigArray.length; i++) {
    result |= tokenSigArray[i] ^ secretSigArray[i];
  }

  return result === 0;
}
