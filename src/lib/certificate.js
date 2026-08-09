const KEY = "abtalks_certificate_claimed";

export function isCertificateClaimed() {
  try {
    return localStorage.getItem(KEY) === "true";
  } catch {
    return false;
  }
}

export function claimCertificate() {
  try {
    localStorage.setItem(KEY, "true");
  } catch {}
}