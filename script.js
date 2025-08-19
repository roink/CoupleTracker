// Alle Konstanten hier anpassen, falls nötig.
const PARTNER_NAME = "NAME";
// Zivile Daten: Jahr, Monat (1-12), Tag (1-31)
const BIRTH_YMD = [1990, 1, 1];      // 1. Januar 1990
const COUPLE_YMD = [2010, 1, 1];    // 1. Januar 2010

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
  const cdYears = document.getElementById("cd-years");
  const cdMonths = document.getElementById("cd-months");
  const cdDays = document.getElementById("cd-days");

  function diffYMD(from, to) {
    let years = to.getUTCFullYear() - from.getUTCFullYear();
    let months = to.getUTCMonth() - from.getUTCMonth();
    let days = to.getUTCDate() - from.getUTCDate();

    if (days < 0) {
      const prevMonth = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));
      days += prevMonth.getUTCDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }
    return { years, months, days };
  }

  function tick() {
    const today = todayUTCDateOnly();
    if (today >= targetDateUTC) {
      cdYears.textContent = "0";
      cdMonths.textContent = "0";
      cdDays.textContent = "0";
      return;
    }
    const { years, months, days } = diffYMD(today, targetDateUTC);
    cdYears.textContent = formatIntDE(years);
    cdMonths.textContent = formatIntDE(months);
    cdDays.textContent = formatIntDE(days);
  }

  tick();
  setInterval(tick, 60 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", compute);
