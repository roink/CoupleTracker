// Alle Konstanten hier anpassen, falls nötig.
const PARTNER_NAME = "Philipp";
// Zivile Daten: Jahr, Monat (1-12), Tag (1-31)
const BIRTH_YMD = [1991, 7, 3];      // 3. Juli 1991
const COUPLE_YMD = [2009, 8, 28];    // 28. August 2009

// Hilfsfunktionen: Kalendertage-Differenz robust gegen Zeitzonen
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dateFromYMD([y, m, d]) {
  // UTC-Midnight, damit keine Off-by-One durch DST/Zone
  return new Date(Date.UTC(y, m - 1, d));
}
function epochDays(dateObj) {
  // Tage seit Unix-Epoch (UTC-Midnight)
  return Math.floor(dateObj.getTime() / MS_PER_DAY);
}
function todayUTCDateOnly() {
  const now = new Date();
  // Heute als Y-M-D (lokal), dann als UTC-Midnight interpretieren
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}
function formatIntDE(n) {
  return n.toLocaleString('de-DE');
}
function formatPercentDE(x) {
  return x.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";
}
function formatDateDE(d) {
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

function compute() {
  const birth = dateFromYMD(BIRTH_YMD);
  const couple = dateFromYMD(COUPLE_YMD);
  const today = todayUTCDateOnly();

  // Tage als reine Kalendertage (UTC-Mitternacht)
  const daysLived = epochDays(today) - epochDays(birth);
  const daysTogether = epochDays(today) - epochDays(couple);

  const percent = (daysTogether / daysLived) * 100;

  // 50%-Datum: Lösung der Gleichung (T - C) = 0.5 * (T - B) => T = 2C - B
  const t50_days = 2 * epochDays(couple) - epochDays(birth);
  const d50 = new Date(t50_days * MS_PER_DAY); // UTC-Midnight

  // DOM-Ausgabe
  document.getElementById("partnerName").textContent = PARTNER_NAME;
  document.getElementById("daysTogether").textContent = formatIntDE(daysTogether);
  document.getElementById("percentLife").textContent = formatPercentDE(percent);
  document.getElementById("fiftyDate").textContent = formatDateDE(d50);
  document.getElementById("birthText").textContent = formatDateDE(birth);
  document.getElementById("coupleText").textContent = formatDateDE(couple);

  // Seitentitel mit großer Zahl
  document.title = `Seit ${formatIntDE(daysTogether)} Tagen — Für dich`;

  // Countdown initialisieren
  startCountdown(d50);
}

function startCountdown(targetDateUTC) {
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");

  function tick() {
    const now = new Date();
    // Zielzeit als UTC-Mitternacht dieses Tages
    const targetMs = Date.UTC(targetDateUTC.getUTCFullYear(), targetDateUTC.getUTCMonth(), targetDateUTC.getUTCDate(), 0, 0, 0);
    const nowMs = now.getTime();
    let diff = Math.floor((targetMs - nowMs) / 1000); // Sekunden

    if (diff <= 0) {
      cdDays.textContent = "0";
      cdHours.textContent = "0";
      cdMins.textContent = "0";
      cdSecs.textContent = "0";
      return;
    }

    const days = Math.floor(diff / (24 * 3600)); diff -= days * 24 * 3600;
    const hours = Math.floor(diff / 3600); diff -= hours * 3600;
    const mins = Math.floor(diff / 60); diff -= mins * 60;
    const secs = diff;

    cdDays.textContent = formatIntDE(days);
    cdHours.textContent = hours.toString().padStart(2, "0");
    cdMins.textContent = mins.toString().padStart(2, "0");
    cdSecs.textContent = secs.toString().padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", compute);
