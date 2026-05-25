var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const { useState, useRef, useEffect, createContext, useContext, Fragment } = React;
const FONT_URL = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
const FONT = "'Plus Jakarta Sans', sans-serif";
const APP_VERSION = 8;
const APP_BUILD = "2026-05-25";
const DARK = { bg: "#07070C", surface: "#0D0D16", card: "#13131F", border: "#252540", text: "#F0F0FF", sub: "#A0A0CD", muted: "#7575A0", header: "#0D0D14" };
const LIGHT = { bg: "#ECEEF3", surface: "#F4F6FA", card: "#FFFFFF", border: "#D8DCE8", text: "#0F1022", sub: "#4A5072", muted: "#737896", header: "#FFFFFF" };
const ACCENT = "#0E7490";
const KONTAKTE_FARBE = "#8B5CF6";
const FIRMEN_FARBE = KONTAKTE_FARBE;
const FC = KONTAKTE_FARBE;
function getContrastColor(hex) {
  if (!hex || hex[0] !== "#" || hex.length < 7) return "#FFFFFF";
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const lin = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    return lum > 0.55 ? "#1A1A1A" : "#FFFFFF";
  } catch (e) {
    return "#FFFFFF";
  }
}
const DEFAULT_ROLLEN = [
  // Person VE
  { name: "Eigentümer", kuerzel: "E", color: "#F472B6", slot: "ve", aktiv: true },
  // Pink
  { name: "Miteigentümer", kuerzel: "ME", color: "#F472B6", slot: "ve", aktiv: true },
  { name: "Mieter", kuerzel: "M", color: "#22C55E", slot: "ve", aktiv: true },
  // Grün
  { name: "Nießbraucher", kuerzel: "N", color: "#0EA5E9", slot: "ve", aktiv: true },
  // Himmel
  { name: "Wohnberechtigter", kuerzel: "W", color: "#A855F7", slot: "ve", aktiv: true },
  // Lila
  // SEV
  { name: "Bevollmächtigter", kuerzel: "S", color: "#0891B2", slot: "sev", aktiv: true },
  // Cyan
  // Zusatzfunktionen (Gremium)
  { name: "Verwaltungsbeirat", kuerzel: "VB", color: "#15803D", slot: "gremium", aktiv: true },
  // Grün; mit vorsitz:true wird das VBV
  { name: "Rechnungsprüfer", kuerzel: "RP", color: "#047857", slot: "gremium", aktiv: true },
  // Smaragd
  // Person Firma
  { name: "Geschäftsführer", kuerzel: "GF", color: "#4338CA", slot: "firma", aktiv: true },
  // Indigo
  { name: "Mitarbeiter", kuerzel: "MA", color: "#7C3AED", slot: "firma", aktiv: true },
  // Violett
  { name: "Sachbearbeiter", kuerzel: "SB", color: "#9333EA", slot: "firma", aktiv: true },
  // Lila
  { name: "Ansprechpartner", kuerzel: "AP", color: "#C026D3", slot: "firma", aktiv: true }
  // Magenta
];
const ROLLEN_DEF = Object.fromEntries(
  DEFAULT_ROLLEN.map((r) => [r.name, { k: r.kuerzel, color: r.color }])
);
const DEFAULT_FIRMEN_ROLLEN = [
  { name: "Hausverwaltung", kuerzel: "HV", color: "#2563EB", aktiv: true },
  // Blau
  { name: "Hausmeister", kuerzel: "HM", color: "#65A30D", aktiv: true },
  // Limette
  { name: "Versorger", kuerzel: "VS", color: "#EA580C", aktiv: true },
  // Orange
  { name: "Messdienst", kuerzel: "MD", color: "#0E7490", aktiv: true },
  // Cyan dunkel
  { name: "Brandschutz", kuerzel: "BS", color: "#DC2626", aktiv: true },
  // Rot
  { name: "Wartung", kuerzel: "WT", color: "#475569", aktiv: true },
  // Schiefer
  { name: "Winterdienst", kuerzel: "WD", color: "#0891B2", aktiv: true },
  // Cyan
  { name: "Grünpflege", kuerzel: "GP", color: "#16A34A", aktiv: true },
  // Grün
  { name: "Müllabfuhr", kuerzel: "MÜ", color: "#92400E", aktiv: true },
  // Braun
  { name: "Reinigung", kuerzel: "RG", color: "#0F766E", aktiv: true },
  // Petrol
  { name: "Versicherung", kuerzel: "VR", color: "#7C3AED", aktiv: true },
  // Violett
  { name: "Dienstleister", kuerzel: "DL", color: "#71717A", aktiv: true }
  // Zink (Sammelrolle)
];
const PALETTE_FARBEN = [
  // ── Grautöne ──────────────────────────────────────────────────────────────
  { familie: "Schiefer", gruppe: "Grautöne", stufen: [
    { stufe: 50, hex: "#F8FAFC" },
    { stufe: 100, hex: "#F1F5F9" },
    { stufe: 200, hex: "#E2E8F0" },
    { stufe: 300, hex: "#CBD5E1" },
    { stufe: 400, hex: "#94A3B8" },
    { stufe: 500, hex: "#64748B" },
    { stufe: 600, hex: "#475569" },
    { stufe: 700, hex: "#334155" },
    { stufe: 800, hex: "#1E293B" },
    { stufe: 900, hex: "#0F172A" }
  ] },
  { familie: "Grau", gruppe: "Grautöne", stufen: [
    { stufe: 50, hex: "#F9FAFB" },
    { stufe: 100, hex: "#F3F4F6" },
    { stufe: 200, hex: "#E5E7EB" },
    { stufe: 300, hex: "#D1D5DB" },
    { stufe: 400, hex: "#9CA3AF" },
    { stufe: 500, hex: "#6B7280" },
    { stufe: 600, hex: "#4B5563" },
    { stufe: 700, hex: "#374151" },
    { stufe: 800, hex: "#1F2937" },
    { stufe: 900, hex: "#111827" }
  ] },
  { familie: "Zink", gruppe: "Grautöne", stufen: [
    { stufe: 50, hex: "#FAFAFA" },
    { stufe: 100, hex: "#F4F4F5" },
    { stufe: 200, hex: "#E4E4E7" },
    { stufe: 300, hex: "#D4D4D8" },
    { stufe: 400, hex: "#A1A1AA" },
    { stufe: 500, hex: "#71717A" },
    { stufe: 600, hex: "#52525B" },
    { stufe: 700, hex: "#3F3F46" },
    { stufe: 800, hex: "#27272A" },
    { stufe: 900, hex: "#18181B" }
  ] },
  { familie: "Stein", gruppe: "Grautöne", stufen: [
    { stufe: 50, hex: "#FAFAF9" },
    { stufe: 100, hex: "#F5F5F4" },
    { stufe: 200, hex: "#E7E5E4" },
    { stufe: 300, hex: "#D6D3D1" },
    { stufe: 400, hex: "#A8A29E" },
    { stufe: 500, hex: "#78716C" },
    { stufe: 600, hex: "#57534E" },
    { stufe: 700, hex: "#44403C" },
    { stufe: 800, hex: "#292524" },
    { stufe: 900, hex: "#1C1917" }
  ] },
  // ── Rot & Pink ────────────────────────────────────────────────────────────
  { familie: "Rot", gruppe: "Rot & Pink", stufen: [
    { stufe: 50, hex: "#FEF2F2" },
    { stufe: 100, hex: "#FEE2E2" },
    { stufe: 200, hex: "#FECACA" },
    { stufe: 300, hex: "#FCA5A5" },
    { stufe: 400, hex: "#F87171" },
    { stufe: 500, hex: "#EF4444" },
    { stufe: 600, hex: "#DC2626" },
    { stufe: 700, hex: "#B91C1C" },
    { stufe: 800, hex: "#991B1B" },
    { stufe: 900, hex: "#7F1D1D" }
  ] },
  { familie: "Weinrot", gruppe: "Rot & Pink", stufen: [
    { stufe: 50, hex: "#FDF2F4" },
    { stufe: 100, hex: "#FADEE3" },
    { stufe: 200, hex: "#F5BECA" },
    { stufe: 300, hex: "#ED93A6" },
    { stufe: 400, hex: "#E26079" },
    { stufe: 500, hex: "#C8304E" },
    { stufe: 600, hex: "#A81E3A" },
    { stufe: 700, hex: "#87182D" },
    { stufe: 800, hex: "#6A1424" },
    { stufe: 900, hex: "#52111C" }
  ] },
  { familie: "Koralle", gruppe: "Rot & Pink", stufen: [
    { stufe: 50, hex: "#FFF4F0" },
    { stufe: 100, hex: "#FFE6DE" },
    { stufe: 200, hex: "#FFCABC" },
    { stufe: 300, hex: "#FFA492" },
    { stufe: 400, hex: "#FF7462" },
    { stufe: 500, hex: "#FF4D35" },
    { stufe: 600, hex: "#E8321A" },
    { stufe: 700, hex: "#C32411" },
    { stufe: 800, hex: "#9E1E0F" },
    { stufe: 900, hex: "#7A1B10" }
  ] },
  { familie: "Rose", gruppe: "Rot & Pink", stufen: [
    { stufe: 50, hex: "#FFF1F2" },
    { stufe: 100, hex: "#FFE4E6" },
    { stufe: 200, hex: "#FECDD3" },
    { stufe: 300, hex: "#FDA4AF" },
    { stufe: 400, hex: "#FB7185" },
    { stufe: 500, hex: "#F43F5E" },
    { stufe: 600, hex: "#E11D48" },
    { stufe: 700, hex: "#BE123C" },
    { stufe: 800, hex: "#9F1239" },
    { stufe: 900, hex: "#881337" }
  ] },
  { familie: "Pink", gruppe: "Rot & Pink", stufen: [
    { stufe: 50, hex: "#FDF2F8" },
    { stufe: 100, hex: "#FCE7F3" },
    { stufe: 200, hex: "#FBCFE8" },
    { stufe: 300, hex: "#F9A8D4" },
    { stufe: 400, hex: "#F472B6" },
    { stufe: 500, hex: "#EC4899" },
    { stufe: 600, hex: "#DB2777" },
    { stufe: 700, hex: "#BE185D" },
    { stufe: 800, hex: "#9D174D" },
    { stufe: 900, hex: "#831843" }
  ] },
  // ── Orange & Gelb ─────────────────────────────────────────────────────────
  { familie: "Orange", gruppe: "Orange & Gelb", stufen: [
    { stufe: 50, hex: "#FFF7ED" },
    { stufe: 100, hex: "#FFEDD5" },
    { stufe: 200, hex: "#FED7AA" },
    { stufe: 300, hex: "#FDBA74" },
    { stufe: 400, hex: "#FB923C" },
    { stufe: 500, hex: "#F97316" },
    { stufe: 600, hex: "#EA580C" },
    { stufe: 700, hex: "#C2410C" },
    { stufe: 800, hex: "#9A3412" },
    { stufe: 900, hex: "#7C2D12" }
  ] },
  { familie: "Amber", gruppe: "Orange & Gelb", stufen: [
    { stufe: 50, hex: "#FFFBEB" },
    { stufe: 100, hex: "#FEF3C7" },
    { stufe: 200, hex: "#FDE68A" },
    { stufe: 300, hex: "#FCD34D" },
    { stufe: 400, hex: "#FBBF24" },
    { stufe: 500, hex: "#F59E0B" },
    { stufe: 600, hex: "#D97706" },
    { stufe: 700, hex: "#B45309" },
    { stufe: 800, hex: "#92400E" },
    { stufe: 900, hex: "#78350F" }
  ] },
  { familie: "Gold", gruppe: "Orange & Gelb", stufen: [
    { stufe: 50, hex: "#FFFEF0" },
    { stufe: 100, hex: "#FEFBD3" },
    { stufe: 200, hex: "#FCF49E" },
    { stufe: 300, hex: "#FAE55C" },
    { stufe: 400, hex: "#F5CE1E" },
    { stufe: 500, hex: "#E0B008" },
    { stufe: 600, hex: "#BC8E05" },
    { stufe: 700, hex: "#946F05" },
    { stufe: 800, hex: "#715408" },
    { stufe: 900, hex: "#57400A" }
  ] },
  { familie: "Gelb", gruppe: "Orange & Gelb", stufen: [
    { stufe: 50, hex: "#FEFCE8" },
    { stufe: 100, hex: "#FEF9C3" },
    { stufe: 200, hex: "#FEF08A" },
    { stufe: 300, hex: "#FDE047" },
    { stufe: 400, hex: "#FACC15" },
    { stufe: 500, hex: "#EAB308" },
    { stufe: 600, hex: "#CA8A04" },
    { stufe: 700, hex: "#A16207" },
    { stufe: 800, hex: "#854D0E" },
    { stufe: 900, hex: "#713F12" }
  ] },
  // ── Braun & Erdtöne ───────────────────────────────────────────────────────
  { familie: "Braun", gruppe: "Braun & Erdtöne", stufen: [
    { stufe: 50, hex: "#FDF7F2" },
    { stufe: 100, hex: "#F8EDE1" },
    { stufe: 200, hex: "#EECFB6" },
    { stufe: 300, hex: "#E3AB82" },
    { stufe: 400, hex: "#D38049" },
    { stufe: 500, hex: "#B8621E" },
    { stufe: 600, hex: "#964E16" },
    { stufe: 700, hex: "#753D11" },
    { stufe: 800, hex: "#562C0D" },
    { stufe: 900, hex: "#3C1E09" }
  ] },
  { familie: "Terrakotta", gruppe: "Braun & Erdtöne", stufen: [
    { stufe: 50, hex: "#FEF4EF" },
    { stufe: 100, hex: "#FDE4D5" },
    { stufe: 200, hex: "#FAC5A8" },
    { stufe: 300, hex: "#F69E74" },
    { stufe: 400, hex: "#F07444" },
    { stufe: 500, hex: "#E5511E" },
    { stufe: 600, hex: "#CB3D0E" },
    { stufe: 700, hex: "#A43008" },
    { stufe: 800, hex: "#7E260A" },
    { stufe: 900, hex: "#5F1E0B" }
  ] },
  { familie: "Ocker", gruppe: "Braun & Erdtöne", stufen: [
    { stufe: 50, hex: "#FDFAEE" },
    { stufe: 100, hex: "#FAF2CC" },
    { stufe: 200, hex: "#F4E299" },
    { stufe: 300, hex: "#EACC5E" },
    { stufe: 400, hex: "#DCB42B" },
    { stufe: 500, hex: "#C49A12" },
    { stufe: 600, hex: "#9E7C0C" },
    { stufe: 700, hex: "#7B5F0B" },
    { stufe: 800, hex: "#5F490C" },
    { stufe: 900, hex: "#483810" }
  ] },
  // ── Grün ──────────────────────────────────────────────────────────────────
  { familie: "Salbei", gruppe: "Grün", stufen: [
    { stufe: 50, hex: "#F4F7F1" },
    { stufe: 100, hex: "#E5EDDE" },
    { stufe: 200, hex: "#C9D9BC" },
    { stufe: 300, hex: "#A6BF93" },
    { stufe: 400, hex: "#7E9F68" },
    { stufe: 500, hex: "#5E824A" },
    { stufe: 600, hex: "#476836" },
    { stufe: 700, hex: "#38522B" },
    { stufe: 800, hex: "#2C4022" },
    { stufe: 900, hex: "#21301A" }
  ] },
  { familie: "Limette", gruppe: "Grün", stufen: [
    { stufe: 50, hex: "#F7FEE7" },
    { stufe: 100, hex: "#ECFCCB" },
    { stufe: 200, hex: "#D9F99D" },
    { stufe: 300, hex: "#BEF264" },
    { stufe: 400, hex: "#A3E635" },
    { stufe: 500, hex: "#84CC16" },
    { stufe: 600, hex: "#65A30D" },
    { stufe: 700, hex: "#4D7C0F" },
    { stufe: 800, hex: "#3F6212" },
    { stufe: 900, hex: "#365314" }
  ] },
  { familie: "Grün", gruppe: "Grün", stufen: [
    { stufe: 50, hex: "#F0FDF4" },
    { stufe: 100, hex: "#DCFCE7" },
    { stufe: 200, hex: "#BBF7D0" },
    { stufe: 300, hex: "#86EFAC" },
    { stufe: 400, hex: "#4ADE80" },
    { stufe: 500, hex: "#22C55E" },
    { stufe: 600, hex: "#16A34A" },
    { stufe: 700, hex: "#15803D" },
    { stufe: 800, hex: "#166534" },
    { stufe: 900, hex: "#14532D" }
  ] },
  { familie: "Smaragd", gruppe: "Grün", stufen: [
    { stufe: 50, hex: "#ECFDF5" },
    { stufe: 100, hex: "#D1FAE5" },
    { stufe: 200, hex: "#A7F3D0" },
    { stufe: 300, hex: "#6EE7B7" },
    { stufe: 400, hex: "#34D399" },
    { stufe: 500, hex: "#10B981" },
    { stufe: 600, hex: "#059669" },
    { stufe: 700, hex: "#047857" },
    { stufe: 800, hex: "#065F46" },
    { stufe: 900, hex: "#064E3B" }
  ] },
  { familie: "Petrol", gruppe: "Grün", stufen: [
    { stufe: 50, hex: "#F0FDFA" },
    { stufe: 100, hex: "#CCFBF1" },
    { stufe: 200, hex: "#99F6E4" },
    { stufe: 300, hex: "#5EEAD4" },
    { stufe: 400, hex: "#2DD4BF" },
    { stufe: 500, hex: "#14B8A6" },
    { stufe: 600, hex: "#0D9488" },
    { stufe: 700, hex: "#0F766E" },
    { stufe: 800, hex: "#115E59" },
    { stufe: 900, hex: "#134E4A" }
  ] },
  // ── Blau ──────────────────────────────────────────────────────────────────
  { familie: "Cyan", gruppe: "Blau", stufen: [
    { stufe: 50, hex: "#ECFEFF" },
    { stufe: 100, hex: "#CFFAFE" },
    { stufe: 200, hex: "#A5F3FC" },
    { stufe: 300, hex: "#67E8F9" },
    { stufe: 400, hex: "#22D3EE" },
    { stufe: 500, hex: "#06B6D4" },
    { stufe: 600, hex: "#0891B2" },
    { stufe: 700, hex: "#0E7490" },
    { stufe: 800, hex: "#155E75" },
    { stufe: 900, hex: "#164E63" }
  ] },
  { familie: "Himmel", gruppe: "Blau", stufen: [
    { stufe: 50, hex: "#F0F9FF" },
    { stufe: 100, hex: "#E0F2FE" },
    { stufe: 200, hex: "#BAE6FD" },
    { stufe: 300, hex: "#7DD3FC" },
    { stufe: 400, hex: "#38BDF8" },
    { stufe: 500, hex: "#0EA5E9" },
    { stufe: 600, hex: "#0284C7" },
    { stufe: 700, hex: "#0369A1" },
    { stufe: 800, hex: "#075985" },
    { stufe: 900, hex: "#0C4A6E" }
  ] },
  { familie: "Blau", gruppe: "Blau", stufen: [
    { stufe: 50, hex: "#EFF6FF" },
    { stufe: 100, hex: "#DBEAFE" },
    { stufe: 200, hex: "#BFDBFE" },
    { stufe: 300, hex: "#93C5FD" },
    { stufe: 400, hex: "#60A5FA" },
    { stufe: 500, hex: "#3B82F6" },
    { stufe: 600, hex: "#2563EB" },
    { stufe: 700, hex: "#1D4ED8" },
    { stufe: 800, hex: "#1E40AF" },
    { stufe: 900, hex: "#1E3A8A" }
  ] },
  { familie: "Kobalt", gruppe: "Blau", stufen: [
    { stufe: 50, hex: "#EEF0FF" },
    { stufe: 100, hex: "#DBE1FF" },
    { stufe: 200, hex: "#B9C4FF" },
    { stufe: 300, hex: "#8A9CFF" },
    { stufe: 400, hex: "#5A71FF" },
    { stufe: 500, hex: "#3349FF" },
    { stufe: 600, hex: "#1E30F2" },
    { stufe: 700, hex: "#1725CC" },
    { stufe: 800, hex: "#161EA3" },
    { stufe: 900, hex: "#151C7E" }
  ] },
  { familie: "Indigo", gruppe: "Blau", stufen: [
    { stufe: 50, hex: "#EEF2FF" },
    { stufe: 100, hex: "#E0E7FF" },
    { stufe: 200, hex: "#C7D2FE" },
    { stufe: 300, hex: "#A5B4FC" },
    { stufe: 400, hex: "#818CF8" },
    { stufe: 500, hex: "#6366F1" },
    { stufe: 600, hex: "#4F46E5" },
    { stufe: 700, hex: "#4338CA" },
    { stufe: 800, hex: "#3730A3" },
    { stufe: 900, hex: "#312E81" }
  ] },
  // ── Lila & Magenta ────────────────────────────────────────────────────────
  { familie: "Violett", gruppe: "Lila & Magenta", stufen: [
    { stufe: 50, hex: "#F5F3FF" },
    { stufe: 100, hex: "#EDE9FE" },
    { stufe: 200, hex: "#DDD6FE" },
    { stufe: 300, hex: "#C4B5FD" },
    { stufe: 400, hex: "#A78BFA" },
    { stufe: 500, hex: "#8B5CF6" },
    { stufe: 600, hex: "#7C3AED" },
    { stufe: 700, hex: "#6D28D9" },
    { stufe: 800, hex: "#5B21B6" },
    { stufe: 900, hex: "#4C1D95" }
  ] },
  { familie: "Lila", gruppe: "Lila & Magenta", stufen: [
    { stufe: 50, hex: "#FAF5FF" },
    { stufe: 100, hex: "#F3E8FF" },
    { stufe: 200, hex: "#E9D5FF" },
    { stufe: 300, hex: "#D8B4FE" },
    { stufe: 400, hex: "#C084FC" },
    { stufe: 500, hex: "#A855F7" },
    { stufe: 600, hex: "#9333EA" },
    { stufe: 700, hex: "#7E22CE" },
    { stufe: 800, hex: "#6B21A8" },
    { stufe: 900, hex: "#581C87" }
  ] },
  { familie: "Fuchsia", gruppe: "Lila & Magenta", stufen: [
    { stufe: 50, hex: "#FDF4FF" },
    { stufe: 100, hex: "#FAE8FF" },
    { stufe: 200, hex: "#F5D0FE" },
    { stufe: 300, hex: "#F0ABFC" },
    { stufe: 400, hex: "#E879F9" },
    { stufe: 500, hex: "#D946EF" },
    { stufe: 600, hex: "#C026D3" },
    { stufe: 700, hex: "#A21CAF" },
    { stufe: 800, hex: "#86198F" },
    { stufe: 900, hex: "#701A75" }
  ] },
  { familie: "Magenta", gruppe: "Lila & Magenta", stufen: [
    { stufe: 50, hex: "#FFF0FB" },
    { stufe: 100, hex: "#FFE1F8" },
    { stufe: 200, hex: "#FFC2F2" },
    { stufe: 300, hex: "#FF97E9" },
    { stufe: 400, hex: "#FF5FDB" },
    { stufe: 500, hex: "#FF1FCA" },
    { stufe: 600, hex: "#E500B2" },
    { stufe: 700, hex: "#BF0093" },
    { stufe: 800, hex: "#9C0078" },
    { stufe: 900, hex: "#780060" }
  ] }
];
function buildMockData() {
  let seed = 12345;
  const rand = () => {
    seed = seed * 1664525 + 1013904223 & 2147483647;
    return seed / 2147483647;
  };
  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const chance = (pct) => rand() * 100 < pct;
  const VORNAMEN_M = ["Maximilian", "Felix", "Lukas", "Paul", "Jonas", "Tim", "Leon", "David", "Daniel", "Tobias", "Stefan", "Andreas", "Christian", "Markus", "Klaus", "Wolfgang", "Thomas", "Michael", "Frank", "Peter", "Hans", "Bernd", "Heinz", "Werner", "Joachim", "Helmut", "Walter", "Wilhelm", "Manfred", "Horst", "Erich", "Hermann", "Karl", "Friedrich", "Otto", "Albert", "Ernst", "Heinrich", "Erwin", "Günter", "Rudolf", "Dieter", "Norbert", "Reinhard", "Detlef", "Volker", "Ralf", "Uwe", "Olaf", "Julian"];
  const VORNAMEN_F = ["Anna", "Sophia", "Marie", "Lena", "Lea", "Mia", "Hannah", "Emma", "Lina", "Laura", "Sara", "Lisa", "Maria", "Julia", "Katrin", "Petra", "Susanne", "Brigitte", "Monika", "Birgit", "Heike", "Andrea", "Karin", "Sabine", "Christine", "Ingrid", "Ursula", "Renate", "Elke", "Christa", "Helga", "Marion", "Doris", "Annette", "Silvia", "Beate", "Cornelia", "Martina", "Gisela", "Iris", "Bettina", "Tanja", "Claudia", "Steffi", "Carolin", "Astrid", "Vanessa", "Nicole", "Sandra", "Stefanie"];
  const NACHNAMEN = ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann", "Braun", "Krüger", "Hofmann", "Hartmann", "Lange", "Schmitt", "Werner", "Schmitz", "Krause", "Meier", "Lehmann", "Schmid", "Schulze", "Maier", "Köhler", "Herrmann", "König", "Walter", "Mayer", "Huber", "Kaiser", "Fuchs", "Peters", "Lang", "Scholz", "Möller", "Weiß", "Jung", "Hahn", "Schubert", "Vogel", "Friedrich", "Keller", "Günther", "Frank", "Berger", "Winkler", "Roth", "Beck", "Lorenz", "Baumann", "Franke", "Albrecht", "Schuster", "Simon", "Ludwig", "Böhm", "Winter", "Kraus", "Martin", "Schumacher", "Krämer", "Vogt", "Stein", "Jäger", "Otto", "Sommer", "Groß", "Seidel", "Brandt", "Haas", "Schreiber", "Graf", "Schulte", "Dietrich", "Ziegler", "Kuhn", "Pohl", "Engel", "Horn", "Busch", "Bergmann", "Voigt", "Sauer", "Arnold", "Wolff", "Pfeiffer", "Holz", "Krieger"];
  const STRASSEN = ["Hauptstraße", "Bahnhofstraße", "Schulstraße", "Gartenstraße", "Bergstraße", "Lindenstraße", "Schillerstraße", "Goethestraße", "Mozartstraße", "Beethovenstraße", "Kirchstraße", "Mühlenweg", "Parkstraße", "Waldstraße", "Münchner Straße", "Berliner Straße", "Hamburger Straße", "Frankfurter Straße", "Nürnberger Straße", "Sebastian-Bach-Straße", "Theodor-Heuss-Straße", "Karl-Marx-Straße", "Adenauerstraße", "Schwabinger Straße", "Sendlinger Straße", "Maximilianstraße", "Rosenheimer Straße", "Tegernseer Landstraße", "Implerstraße", "Lindwurmstraße"];
  const PLZ_ORTE = ["80331 München", "80333 München", "80335 München", "80336 München", "80337 München", "80339 München", "80469 München", "80539 München", "80636 München", "80637 München", "80686 München", "80796 München", "80797 München", "80801 München", "80803 München", "80807 München", "80809 München"];
  const FIRMA_RECHTSFORMEN = ["GmbH", "OHG", "KG", "GmbH & Co. KG", "e.K.", "AG"];
  const HV_NAMEN = ["Muster Hausverwaltung", "Bayern Immobilien", "Stadt-Verwaltung", "Wohnbau München", "Süd-Verwaltung"];
  const HM_NAMEN = ["Hausmeister-Service Bayern", "Allround Service", "Gebäudemanagement Süd"];
  const FIRMENNAMEN_ELEKTRO = ["Elektro Fischer", "Elektrotechnik Bayern", "E-Service München"];
  const FIRMENNAMEN_SANITAER = ["Sanitär Maier", "Heizungstechnik Schmid", "Wasser & Wärme GmbH"];
  const FIRMENNAMEN_REINIGUNG = ["Glanz & Sauber", "Bayrische Gebäudereinigung", "CleanTec"];
  const FIRMENNAMEN_GRUEN = ["Grünpflege München", "Gartenservice Bayern"];
  const FIRMENNAMEN_VERSORGER = ["Stadtwerke München", "E.ON Energie"];
  const FIRMENNAMEN_VERSICHERUNG = ["Allianz Versicherung", "Bayerische Hausratsversicherung"];
  const ddmmyyyy = (off) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + off);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
  };
  const yyyy = (off) => {
    const d = /* @__PURE__ */ new Date();
    d.setFullYear(d.getFullYear() + off);
    return ddmmyyyy(0).slice(0, 6) + d.getFullYear();
  };
  const firmenLayouts = [
    { typ: "hv", gewerke: ["Hausverwaltung"], rolle: "Hausverwaltung", anzahl: 4 },
    { typ: "hm", gewerke: ["Hausmeister"], rolle: "Hausmeister", anzahl: 2 },
    { typ: "sanitaer", gewerke: ["Sanitär", "Heizung"], rolle: "Wartung", anzahl: 3 },
    { typ: "elektro", gewerke: ["Elektro"], rolle: "Wartung", anzahl: 3 },
    { typ: "reinigung", gewerke: ["Reinigung"], rolle: "Reinigung", anzahl: 2 },
    { typ: "gruen", gewerke: ["Grünpflege", "Winterdienst"], rolle: "Grünpflege", anzahl: 2 },
    { typ: "versorger", gewerke: ["Strom", "Wasser", "Gas"], rolle: "Versorger", anzahl: 2 },
    { typ: "versicher", gewerke: ["Versicherung"], rolle: "Versicherung", anzahl: 2 }
  ];
  const firmen = [];
  let fid = 101;
  firmenLayouts.forEach((lay) => {
    for (let i = 0; i < lay.anzahl; i++) {
      const namePool = lay.typ === "hv" ? HV_NAMEN : lay.typ === "hm" ? HM_NAMEN : lay.typ === "elektro" ? FIRMENNAMEN_ELEKTRO : lay.typ === "sanitaer" ? FIRMENNAMEN_SANITAER : lay.typ === "reinigung" ? FIRMENNAMEN_REINIGUNG : lay.typ === "gruen" ? FIRMENNAMEN_GRUEN : lay.typ === "versorger" ? FIRMENNAMEN_VERSORGER : FIRMENNAMEN_VERSICHERUNG;
      const baseName = namePool[i % namePool.length];
      const rechtsform = pick(FIRMA_RECHTSFORMEN);
      const fullName = `${baseName} ${rechtsform}`;
      const plzOrt = pick(PLZ_ORTE);
      const strasse = `${pick(STRASSEN)} ${randInt(1, 199)}`;
      firmen.push({
        id: fid,
        typ: "firma",
        name: fullName,
        rechtsform,
        sub: lay.gewerke.join(" · "),
        tel: `089 ${randInt(1e5, 999999)}`,
        email: `info@${baseName.toLowerCase().replace(/[^a-z]+/g, "")}.de`,
        homepage: `www.${baseName.toLowerCase().replace(/[^a-z]+/g, "")}.de`,
        strasse,
        plzOrt,
        gewerke: lay.gewerke,
        ansprechpartner: [],
        _typ: lay.typ,
        _defaultRolle: lay.rolle,
        objektZuweisungen: []
        // wird später befüllt
      });
      fid++;
    }
  });
  const personen = [];
  for (let id = 1; id <= 100; id++) {
    const istM = chance(55);
    const vorname = pick(istM ? VORNAMEN_M : VORNAMEN_F);
    const nachname = pick(NACHNAMEN);
    const anrede = istM ? "Herr" : "Frau";
    const strasse = `${pick(STRASSEN)} ${randInt(1, 199)}`;
    const plzOrt = pick(PLZ_ORTE);
    const tels = [];
    tels.push({ type: "Mobil", nr: `01${randInt(50, 79)} ${randInt(1e6, 9999999)}` });
    if (chance(35)) tels.push({ type: "Festnetz", nr: `089 ${randInt(1e5, 999999)}` });
    const emails = [];
    if (chance(85)) emails.push({ type: "Privat", email: `${vorname.toLowerCase()}.${nachname.toLowerCase().replace(/[äöüß]/g, (ch) => ({ "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss" })[ch])}@${pick(["gmx.de", "web.de", "gmail.com", "t-online.de"])}` });
    if (chance(20)) emails.push({ type: "Geschäftlich", email: `${vorname.charAt(0).toLowerCase()}.${nachname.toLowerCase().replace(/[äöüß]/g, (ch) => ({ "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss" })[ch])}@firma.de` });
    personen.push({
      id,
      typ: "person",
      anrede,
      vorname,
      nachname,
      name: `${vorname} ${nachname}`,
      sub: "",
      badges: [],
      tels,
      emails,
      strasse,
      plzOrt,
      rollen: [],
      objektZuweisungen: []
    });
  }
  const ves = [];
  let eIdCounter = 1;
  for (let i = 1; i <= 15; i++) {
    const veId = `ve${i}`;
    const nr = `WEG-2024-${String(i).padStart(3, "0")}`;
    const adresse = `${pick(STRASSEN)} ${randInt(1, 199)}, ${pick(PLZ_ORTE)}`;
    const anzahlWE = randInt(2, 12);
    const anzahlSP = chance(70) ? randInt(1, 6) : 0;
    const einheiten = [];
    for (let w = 1; w <= anzahlWE; w++) {
      const flaeche = randInt(45, 145);
      const zimmer = `${randInt(1, 5)}${chance(40) ? ",5" : ""}`;
      const lagen = ["EG links", "EG rechts", "1. OG links", "1. OG rechts", "2. OG links", "2. OG rechts", "3. OG", "DG"];
      einheiten.push({
        id: `e${eIdCounter++}`,
        nr: `WE ${String(w).padStart(2, "0")}`,
        verwNr: `V-${String(w).padStart(3, "0")}`,
        typ: "Wohneigentum",
        flaeche: `${flaeche} m²`,
        mea: `${Math.round(1e3 / anzahlWE)}`,
        lage: lagen[(w - 1) % lagen.length],
        zimmer,
        eigentuemer: [],
        mieter: []
      });
    }
    for (let s = 1; s <= anzahlSP; s++) {
      einheiten.push({
        id: `e${eIdCounter++}`,
        nr: `SP-${String(s).padStart(2, "0")}`,
        verwNr: `V-S${String(s).padStart(2, "0")}`,
        typ: "Stellplatz",
        flaeche: "",
        mea: "",
        lage: chance(50) ? "TG UG" : "Außen",
        eigentuemer: [],
        mieter: [],
        rechtsstatus: chance(50) ? "SE" : "GE"
      });
    }
    const status = rand();
    let beginn, bestelltBis, naechsteWahl;
    if (status < 0.6) {
      beginn = ddmmyyyy(-randInt(200, 1500));
      bestelltBis = ddmmyyyy(randInt(180, 800));
      naechsteWahl = "";
    } else if (status < 0.8) {
      beginn = ddmmyyyy(-randInt(800, 1500));
      bestelltBis = ddmmyyyy(randInt(1, 89));
      naechsteWahl = ddmmyyyy(randInt(1, 60));
    } else {
      beginn = ddmmyyyy(-randInt(1200, 2e3));
      bestelltBis = ddmmyyyy(-randInt(1, 365));
      naechsteWahl = "";
    }
    const artVal = rand();
    const verwaltungsart = artVal < 0.7 ? "weg" : artVal < 0.8 ? "miet" : artVal < 0.9 ? "gewerbe" : "sev";
    ves.push({
      id: veId,
      nr,
      adresse,
      einheiten,
      verwaltungsart,
      verwaltung: {
        beginn,
        bestelltBis,
        verwalter: null,
        buchhalter: null,
        uebernommenVon: null,
        verwZustimmung: chance(60),
        naechsteETV: chance(70) ? ddmmyyyy(randInt(30, 300)) : "",
        naechsteWahl
      },
      vertraege: [],
      etvHistorie: []
    });
  }
  const eigentuemerKandidaten = personen.slice(0, 70);
  let kandIdx = 0;
  ves.forEach((ve) => {
    ve.einheiten.forEach((einheit) => {
      const e1 = eigentuemerKandidaten[kandIdx % eigentuemerKandidaten.length];
      kandIdx++;
      einheit.eigentuemer.push({
        name: e1.name,
        von: ddmmyyyy(-randInt(100, 2500)),
        kontaktId: e1.id,
        grundbuch: true,
        selbstnutzer: chance(40)
      });
      e1.objektZuweisungen.push({ objektId: ve.id, einheitId: einheit.id, rolle: "Eigentümer", status: "aktiv" });
      if (!e1.rollen.includes("Eigentümer")) e1.rollen.push("Eigentümer");
      if (einheit.typ === "Wohneigentum" && chance(8)) {
        const ek = eigentuemerKandidaten[kandIdx % eigentuemerKandidaten.length];
        kandIdx++;
        if (ek.id !== e1.id) {
          einheit.eigentuemer.push({
            name: ek.name,
            von: ddmmyyyy(randInt(15, 120)),
            kontaktId: ek.id,
            grundbuch: false,
            selbstnutzer: chance(50)
          });
          ek.objektZuweisungen.push({ objektId: ve.id, einheitId: einheit.id, rolle: "Eigentümer", status: "werdend" });
          if (!ek.rollen.includes("Eigentümer")) ek.rollen.push("Eigentümer");
        }
      }
      if (einheit.typ === "Wohneigentum" && !einheit.eigentuemer[0].selbstnutzer && chance(70)) {
        const m1 = eigentuemerKandidaten[kandIdx % eigentuemerKandidaten.length];
        kandIdx++;
        if (m1.id !== e1.id) {
          einheit.mieter.push({
            name: m1.name,
            von: ddmmyyyy(-randInt(30, 1200)),
            kontaktId: m1.id
          });
          m1.objektZuweisungen.push({ objektId: ve.id, einheitId: einheit.id, rolle: "Mieter", status: "aktiv" });
          if (!m1.rollen.includes("Mieter")) m1.rollen.push("Mieter");
        }
        if (chance(25)) {
          const mEhem = eigentuemerKandidaten[kandIdx % eigentuemerKandidaten.length];
          kandIdx++;
          if (mEhem.id !== e1.id && mEhem.id !== (m1 ? m1.id : -1)) {
            mEhem.objektZuweisungen.push({ objektId: ve.id, einheitId: einheit.id, rolle: "Mieter", status: "ehemalig" });
            if (!mEhem.rollen.includes("Mieter")) mEhem.rollen.push("Mieter");
          }
        }
      }
    });
    const eigPersonenIds = [...new Set(ve.einheiten.flatMap((e) => e.eigentuemer.map((et) => et.kontaktId)))];
    const anzahlBeirate = Math.min(eigPersonenIds.length, randInt(1, 3));
    for (let b = 0; b < anzahlBeirate; b++) {
      const pid = eigPersonenIds[b];
      const p = personen.find((x) => x.id === pid);
      if (!p) continue;
      const istVorsitz = b === 0;
      p.objektZuweisungen.push({
        objektId: ve.id,
        einheitId: null,
        rolle: "Verwaltungsbeirat",
        status: "aktiv",
        ...istVorsitz ? { vorsitz: true } : {}
      });
      if (!p.rollen.includes("Verwaltungsbeirat")) p.rollen.push("Verwaltungsbeirat");
    }
    if (chance(60) && eigPersonenIds.length > anzahlBeirate) {
      const pid = eigPersonenIds[anzahlBeirate];
      const p = personen.find((x) => x.id === pid);
      if (p) {
        p.objektZuweisungen.push({ objektId: ve.id, einheitId: null, rolle: "Rechnungsprüfer", status: "aktiv" });
        if (!p.rollen.includes("Rechnungsprüfer")) p.rollen.push("Rechnungsprüfer");
      }
    }
    if (chance(10)) {
      const einheit = pick(ve.einheiten.filter((e) => e.typ === "Wohneigentum"));
      if (einheit) {
        const niesId = eigentuemerKandidaten[kandIdx % eigentuemerKandidaten.length].id;
        kandIdx++;
        const p = personen.find((x) => x.id === niesId);
        if (p) {
          p.objektZuweisungen.push({ objektId: ve.id, einheitId: einheit.id, rolle: "Nießbraucher", status: "aktiv" });
          if (!p.rollen.includes("Nießbraucher")) p.rollen.push("Nießbraucher");
        }
      }
    }
  });
  const hvFirmen = firmen.filter((f) => f._typ === "hv");
  const hmFirmen = firmen.filter((f) => f._typ === "hm");
  const sanitaerFirmen = firmen.filter((f) => f._typ === "sanitaer");
  const elektroFirmen = firmen.filter((f) => f._typ === "elektro");
  const reinigungFirmen = firmen.filter((f) => f._typ === "reinigung");
  const gruenFirmen = firmen.filter((f) => f._typ === "gruen");
  const versorgerFirmen = firmen.filter((f) => f._typ === "versorger");
  const versicherFirmen = firmen.filter((f) => f._typ === "versicher");
  ves.forEach((ve, idx) => {
    const hv = hvFirmen[idx % hvFirmen.length];
    hv.objektZuweisungen.push({ objektId: ve.id, rolle: "Hausverwaltung", status: "aktiv" });
    if (chance(80)) {
      const hm = hmFirmen[idx % hmFirmen.length];
      hm.objektZuweisungen.push({ objektId: ve.id, rolle: "Hausmeister", status: "aktiv" });
    }
    if (chance(90)) {
      const f = sanitaerFirmen[idx % sanitaerFirmen.length];
      f.objektZuweisungen.push({ objektId: ve.id, rolle: "Wartung", status: "aktiv" });
      ve.vertraege.push({
        id: `v${ve.id}-s`,
        typ: "Wartungsvertrag",
        leistung: "Heizungswartung jährlich",
        firmaId: f.id,
        ab: ddmmyyyy(-randInt(100, 1500)),
        bis: "",
        vertragsnr: `VTR-${ve.id}-S`
      });
    }
    if (chance(60)) {
      const f = elektroFirmen[idx % elektroFirmen.length];
      f.objektZuweisungen.push({ objektId: ve.id, rolle: "Wartung", status: "aktiv" });
    }
    if (chance(70)) {
      const f = reinigungFirmen[idx % reinigungFirmen.length];
      f.objektZuweisungen.push({ objektId: ve.id, rolle: "Reinigung", status: "aktiv" });
      ve.vertraege.push({
        id: `v${ve.id}-r`,
        typ: "Reinigungsvertrag",
        leistung: "Treppenhaus-Reinigung",
        firmaId: f.id,
        ab: ddmmyyyy(-randInt(100, 1200)),
        bis: "",
        vertragsnr: `VTR-${ve.id}-R`
      });
    }
    if (chance(50)) {
      const f = gruenFirmen[idx % gruenFirmen.length];
      f.objektZuweisungen.push({ objektId: ve.id, rolle: "Grünpflege", status: "aktiv" });
    }
    const vers = versorgerFirmen[idx % versorgerFirmen.length];
    vers.objektZuweisungen.push({ objektId: ve.id, rolle: "Versorger", status: "aktiv" });
    const vsi = versicherFirmen[idx % versicherFirmen.length];
    vsi.objektZuweisungen.push({ objektId: ve.id, rolle: "Versicherung", status: "aktiv" });
    if (chance(40)) {
      const altHv = hvFirmen[(idx + 1) % hvFirmen.length];
      if (altHv !== hv) {
        altHv.objektZuweisungen.push({ objektId: ve.id, rolle: "Hausverwaltung", status: "ehemalig" });
      }
    }
  });
  const firmaMitarbeiterKand = personen.slice(70, 100);
  let mIdx = 0;
  firmen.forEach((f) => {
    const gf = firmaMitarbeiterKand[mIdx % firmaMitarbeiterKand.length];
    mIdx++;
    gf.objektZuweisungen.push({ firmaId: f.id, rolle: "Geschäftsführer", status: "aktiv" });
    gf.firmaId = f.id;
    if (!gf.rollen.includes("Geschäftsführer")) gf.rollen.push("Geschäftsführer");
    f.ansprechpartner.push({ vorname: gf.vorname, nachname: gf.nachname, funktion: "Geschäftsführer" });
    const anzMA = randInt(0, 2);
    for (let m = 0; m < anzMA; m++) {
      const ma = firmaMitarbeiterKand[mIdx % firmaMitarbeiterKand.length];
      mIdx++;
      if (ma.id === gf.id) continue;
      const funktionsname = pick(["Mitarbeiter", "Sachbearbeiter", "Ansprechpartner"]);
      ma.objektZuweisungen.push({ firmaId: f.id, rolle: funktionsname, status: "aktiv" });
      if (!ma.rollen.includes(funktionsname)) ma.rollen.push(funktionsname);
      f.ansprechpartner.push({ vorname: ma.vorname, nachname: ma.nachname, funktion: funktionsname });
    }
  });
  const ehemPool = personen.slice(60, 65);
  ehemPool.forEach((p) => {
    if (p.objektZuweisungen.length === 0) {
      const beliebige = ves[0];
      const beliebigeEinheit = beliebige.einheiten[0];
      p.objektZuweisungen.push({
        objektId: beliebige.id,
        einheitId: beliebigeEinheit.id,
        rolle: "Mieter",
        status: "ehemalig"
      });
      if (!p.rollen.includes("Mieter")) p.rollen.push("Mieter");
    } else {
      p.objektZuweisungen = p.objektZuweisungen.map((z) => ({ ...z, status: "ehemalig" }));
    }
  });
  ves.forEach((ve) => {
    const hvZuw = firmen.find(
      (f) => f._typ === "hv" && (f.objektZuweisungen || []).some(
        (z) => z.objektId === ve.id && z.rolle === "Hausverwaltung" && z.status === "aktiv"
      )
    );
    if (hvZuw) {
      const gfPerson = personen.find((p) => p.firmaId === hvZuw.id);
      if (gfPerson) ve.verwaltung.verwalter = gfPerson.id;
    }
  });
  firmen.forEach((f) => {
    delete f._typ;
    delete f._defaultRolle;
  });
  return { kontakte: [...personen, ...firmen], ves };
}
const _MOCK = buildMockData();
const DEFAULT_KONTAKTE = _MOCK.kontakte;
const DEFAULT_VES = _MOCK.ves;
const objektLabel = (ve) => ve ? ve.nr + " · " + ve.adresse : "—";
const DEFAULT_SETTINGS = {
  hvName: "Muster Hausverwaltung GmbH",
  hvLogoUrl: "",
  headerZeigeAvatar: true,
  headerZeigeDunkelmodus: true,
  filterAktiv: true,
  filterTyp: "verwalter",
  // "verwalter" oder "buchhalter"
  filterAktive: {},
  // Map: { kontaktId: false } – sichtbar wenn nicht false
  suchKategorien: [
    { id: "objekte", label: "Objekte", aktiv: true },
    { id: "kontakte", label: "Kontakte", aktiv: true },
    { id: "adressen", label: "Adressen", aktiv: true },
    { id: "vertraege", label: "Verträge", aktiv: false }
  ],
  // Intelligente Suche — alle Stufen default an. Stufe 1 (exakt) ist immer aktiv.
  sucheDiakritika: true,
  // Umlaute & Akzente ignorieren (Müller=Mueller=Muller)
  sucheWoerter: true,
  // Mehrere Wortteile (alle müssen vorkommen)
  suchePhonetik: true,
  // Kölner Phonetik (Meier=Meyer=Mayer)
  sucheTippfehler: true,
  // Levenshtein-Distanz für Tippfehler
  sucheTippfehlerSchwelle: 2,
  // Max. Edit-Distanz (1=streng, 3=sehr tolerant)
  // Reihenfolge der Einstellungs-Sektionen (Array von IDs)
  sektionenReihenfolge: null,
  // null = Default-Reihenfolge wie in SEKTIONEN definiert
  dashboardModus: "immer",
  // "aus" | "immer" | "home" – nur Homescreen oder überall
  dashboardSticky: true,
  // bei Mobile (Hochkant): Kategorie-Leiste bleibt unter dem Header sticky
  sidebarBreite: 200,
  // Breite der Desktop-Sidebar (px) – wird vom Resize-Handle gesetzt
  rollen: DEFAULT_ROLLEN,
  // Editierbare Rollen (Name, Kürzel, Farbe, Aktiv) – Reihenfolge im Array zählt
  firmenRollen: DEFAULT_FIRMEN_ROLLEN,
  // Dienstleister-Rollen für Firmen (HV, HM, VS, …)
  avatarIconsPerson: true,
  // Eck-Badges an Personen-Avataren
  avatarIconsFirma: true,
  // Eck-Badges an Firmen-Avataren (aktuell ohne sichtbaren Effekt)
  kartenBadgesPerson: true,
  // Rollen-Badges auf der Kontaktkarte (Personen)
  kartenBadgesFirma: true,
  // Rollen-Badges auf der Kontaktkarte (Firmen)
  statusLeisteObjekt: true,
  // Statusleiste unter Objekt-Karten (z. B. "Bestellung abgelaufen")
  statusLeisteKontakt: true,
  // Statusleiste unter Kontakt-Karten (Demo-Inhalte)
  // Rechnungsadresse-Sektion in der Liegenschaft-Stammdaten-Karte. Default
  // aus, da viele Verwalter ihre eigene Adresse nicht direkt im Objekt sehen
  // wollen.
  rechnungsadresseAnzeigen: false,
  userKontaktId: 1,
  // Verknüpft mit DEFAULT_KONTAKTE – Profil im persönlichen Menü
  dichte: "normal",
  // "compact" | "normal" | "relaxed" – globale Schriftgröße/Dichte
  hoherKontrast: false,
  // sub-Texte mit deutlich höherem Kontrast
  reduceMotion: false,
  // Animationen/Übergänge abschalten
  // Filter-Buttons auf den Listenseiten — pro Art an/aus. Nur aktivierte Arten
  // erscheinen als Filter-Button neben der Sektions-Überschrift; "Alle" ist
  // immer sichtbar.
  filterVerwaltungsarten: { weg: true, miet: false, gewerbe: false, sev: false },
  filterKontaktarten: { person: true, firma: true },
  // Rollen-Filter (p_…, f_…) werden dynamisch aus settings.rollen/firmenRollen gefüllt
  kacheln: [
    { id: "objekte", label: "Objekte", icon: "building", farbe: ACCENT, aktiv: true, reihenfolge: 0 },
    { id: "kontakte", label: "Kontakte", icon: "users", farbe: FC, aktiv: true, reihenfolge: 1 },
    { id: "etv", label: "ETV", icon: "calendar", farbe: "#F59E0B", aktiv: true, reihenfolge: 2 },
    { id: "tickets", label: "Tickets", icon: "ticket", farbe: "#EF4444", aktiv: true, reihenfolge: 3 },
    { id: "kommunikation", label: "Kommunikation", icon: "mail", farbe: "#0EA5E9", aktiv: true, reihenfolge: 4 },
    { id: "finanzen", label: "Finanzen", icon: "chart", farbe: "#22C55E", aktiv: true, reihenfolge: 5 },
    { id: "technik", label: "Technik", icon: "wrench", farbe: "#10B981", aktiv: false, reihenfolge: 6 },
    { id: "dokumente", label: "Dokumente", icon: "document", farbe: "#64748B", aktiv: false, reihenfolge: 7 }
  ]
};
const VERWALTUNGSARTEN = [
  { id: "weg", label: "WEG", kurz: "WEG" },
  { id: "miet", label: "Mietverwaltung", kurz: "Miet" },
  { id: "gewerbe", label: "Gewerbeverwaltung", kurz: "Gewerbe" },
  { id: "sev", label: "SEV", kurz: "SEV" }
];
const KONTAKTARTEN_KATEGORIEN = [
  { id: "person", label: "Personen", kurz: "Personen", typ: "kategorie" },
  { id: "firma", label: "Firmen", kurz: "Firmen", typ: "kategorie" }
];
function buildKontaktarten(personenRollen, firmenRollen) {
  const out = [...KONTAKTARTEN_KATEGORIEN];
  (personenRollen || []).filter((r) => r.aktiv !== false).forEach((r) => {
    out.push({
      id: "p_" + r.name,
      label: r.name,
      kurz: r.name,
      typ: "rolle_person",
      rollenname: r.name
    });
  });
  (firmenRollen || []).filter((r) => r.aktiv !== false).forEach((r) => {
    out.push({
      id: "f_" + r.name,
      label: r.name,
      kurz: r.kuerzel || r.name,
      typ: "rolle_firma",
      rollenname: r.name
    });
  });
  return out;
}
function kontaktPasstZuArt(k, artId, arten) {
  if (artId === "alle" || !artId) return true;
  const def = (arten || []).find((a) => a.id === artId);
  if (!def) return true;
  if (def.typ === "kategorie") {
    if (def.id === "person") return k.typ !== "firma";
    if (def.id === "firma") return k.typ === "firma";
    return true;
  }
  if (def.typ === "rolle_person" && k.typ === "firma") return false;
  if (def.typ === "rolle_firma" && k.typ !== "firma") return false;
  return (k.objektZuweisungen || []).some((z) => z.rolle === def.rollenname && (z.status || "aktiv") === "aktiv");
}
const FIELD_TYPES = [
  { id: "text", label: "Text", icon: "T", color: "#6366F1" },
  { id: "number", label: "Zahl/m²", icon: "#", color: "#0EA5C9" },
  { id: "date", label: "Datum", icon: "📅", color: "#F59E0B" },
  { id: "bool", label: "Ja/Nein", icon: "✓", color: "#10B981" },
  { id: "file", label: "Datei", icon: "📎", color: "#8B5CF6" }
];
const SUGGESTIONS = {
  gebaeude: [
    { name: "Umbaujahr", type: "number" },
    { name: "Dachsanierung", type: "date" },
    { name: "Legionellenprüfung", type: "date" },
    { name: "Energieklasse", type: "text" },
    { name: "Aufzug vorhanden", type: "bool" },
    { name: "Photovoltaik", type: "bool" },
    { name: "Balkonkraftwerk", type: "bool" },
    { name: "Fassadenzustand", type: "text" }
  ],
  stammdaten: [
    { name: "Grundbuchblatt", type: "text" },
    { name: "Grundstücksfläche m²", type: "number" },
    { name: "Gemarkung", type: "text" },
    { name: "Energieausweis bis", type: "date" }
  ],
  zugang: [
    { name: "Anzahl Schlüssel", type: "number" },
    { name: "Nächster Schlüsseldienst", type: "date" },
    { name: "Codeschloss", type: "bool" },
    { name: "Video-Gegensprechanlage", type: "bool" }
  ],
  einheit: [
    { name: "Messdienst-Nr.", type: "text" },
    { name: "Zimmer", type: "number" },
    { name: "Sondernutzungsrecht", type: "text" },
    { name: "Keller", type: "bool" },
    { name: "Balkon", type: "bool" },
    { name: "Stellplatz-Nr.", type: "text" }
  ]
};
function detectType(v) {
  const s = (v || "").trim();
  if (!s) return "text";
  if (/^\d{1,2}\.\d{1,2}\.\d{2,4}$/.test(s)) return "date";
  if (/^[\d.,]+$/.test(s)) return "number";
  if (/^(ja|nein|yes|no|true|false)$/i.test(s)) return "bool";
  return "text";
}
const isStellplatzTyp = (typ) => ["Stellplatz", "Carport", "Doppelparker"].includes(typ);
const extractNachname = (n) => {
  if (!n) return "";
  const p = n.trim().split(" ");
  return p[p.length - 1];
};
const parseM2 = (s) => parseFloat(((s || "") + "").replace(/[^0-9.,]/g, "").replace(",", ".")) || 0;
function useCardWidth(minCard = 280, gap = 10) {
  const ref = useRef(null);
  const [w, setW] = useState(minCard);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const messen = () => {
      const cw = el.offsetWidth;
      if (cw <= 0) return;
      const cols = Math.max(1, Math.floor((cw + gap) / (minCard + gap)));
      const cardW = Math.floor((cw - (cols - 1) * gap) / cols);
      if (cardW > 0) setW(cardW);
    };
    messen();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(messen);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", messen);
    return () => window.removeEventListener("resize", messen);
  }, [minCard, gap]);
  return [ref, w];
}
function useMasterDetailLayout(cardWidth, minDetailFactor = 1.1, gap = 10) {
  const ref = useRef(null);
  const [layout, setLayout] = useState({ masterCols: 2, masterWidth: cardWidth * 2 + gap });
  useEffect(() => {
    if (!ref.current) return;
    const messen = () => {
      const cw = ref.current.offsetWidth;
      if (cw <= 0) return;
      const minDetail = cardWidth * minDetailFactor;
      const masterW2 = cardWidth * 2 + gap;
      if (cw - masterW2 - gap >= minDetail) {
        setLayout({ masterCols: 2, masterWidth: masterW2 });
        return;
      }
      const masterW1 = cardWidth;
      if (cw - masterW1 - gap >= minDetail) {
        setLayout({ masterCols: 1, masterWidth: masterW1 });
        return;
      }
      setLayout({ masterCols: 0, masterWidth: 0 });
    };
    messen();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(messen);
      ro.observe(ref.current);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", messen);
    return () => window.removeEventListener("resize", messen);
  }, [cardWidth, minDetailFactor, gap]);
  return [ref, layout];
}
function StickySectionHeader({ children, t, accent }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const check = () => {
      document.documentElement.style.setProperty(
        "--ad-section-h",
        el.offsetHeight + "px"
      );
    };
    check();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(check);
      ro.observe(el);
      return () => {
        ro.disconnect();
        document.documentElement.style.setProperty("--ad-section-h", "0px");
      };
    }
    return () => {
      document.documentElement.style.setProperty("--ad-section-h", "0px");
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { ref, style: {
    position: "sticky",
    // Der Content-Wrapper hat overflow:auto, daher klebt sticky am Content-Top
    // (= direkt unterhalb des App-Headers). Keine zusätzliche header-h nötig.
    top: 0,
    background: t.bg,
    zIndex: 5,
    paddingTop: 8,
    paddingBottom: 6,
    marginBottom: 2,
    // Inhalt in einer Zeile halten — kein Wrap, der die Höhe ändern würde
    whiteSpace: "nowrap"
  } }, children);
}
function scrollToCard(elementId) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const el = document.getElementById(elementId);
  if (!el) return;
  const headerEl = document.querySelector("[data-app-sticky-header]");
  const headerH = headerEl ? headerEl.offsetHeight + 16 : 200;
  const rect = el.getBoundingClientRect();
  if (Math.abs(rect.top - headerH) < 5) return;
  const targetY = window.scrollY + rect.top - headerH;
  window.scrollTo({ top: targetY, behavior: "smooth" });
}
const IC = {
  plus: "M12 4.5v15m7.5-7.5h-15",
  x: "M6 18L18 6M6 6l12 12",
  check: "M4.5 12.75l6 6 9-13.5",
  chevD: "M19.5 8.25l-7.5 7.5-7.5-7.5",
  chevR: "M8.25 4.5l7.5 7.5-7.5 7.5",
  chevL: "M15.75 19.5L8.25 12l7.5-7.5",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  building: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  calendar: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  document: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  wrench: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  pencil: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  drag: "M3.75 9h16.5m-16.5 6.75h16.5",
  copy: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184",
  home: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  arrow: "M19.5 12L4.5 12m0 0l5.625-5.625M4.5 12l5.625 5.625",
  bell: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
  calc: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z",
  sparkles: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.455z",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  lock: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  lockOpen: "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  settings: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.281zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  paint: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  eyeOff: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88",
  badge: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  mail: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  chart: "M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
  ticket: "M16.5 6v.75c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125.504-1.125 1.125v.75m4.5-3.75H6c-.621 0-1.125.504-1.125 1.125v10.5c0 .621.504 1.125 1.125 1.125h11.25c.621 0 1.125-.504 1.125-1.125V7.125c0-.621-.504-1.125-1.125-1.125zM9 12h7.5",
  sun: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  moon: "M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
};
function I({ name, size = 16, color = "currentColor", strokeWidth = 1.6 }) {
  const path = IC[name];
  if (!path) return null;
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { flexShrink: 0 }
    },
    /* @__PURE__ */ React.createElement("path", { d: path })
  );
}
const HV_ADRESSE = { name: "Muster Hausverwaltung GmbH", strasse: "Musterstr. 99", plzOrt: "80333 München" };
function genRechnungsadresse(fields) {
  const get = (n) => {
    const f = fields.find((x) => x.name === n);
    return f ? f.value : "";
  };
  const str = get("Straße");
  const plzOrt = get("PLZ / Ort");
  if (!str && !plzOrt) return "—";
  return `${HV_ADRESSE.name}
c/o ${str || "—"}
${plzOrt || "—"}`;
}
const STORAGE_KEYS = {
  settings: "allesda:settings",
  // Settings pro User
  daten: "allesda:daten",
  // Kontakte, VEs (Arbeitsdaten)
  schema: "allesda:schema",
  // Schema-Version für Migrationen
  fsModus: "allesda:fs:aktiv"
  // "1" wenn Datei-Modus zuletzt aktiv war
};
const STORAGE_SCHEMA_VERSION = 1;
const FSA_VERFUEGBAR = typeof window !== "undefined" && typeof window.showDirectoryPicker === "function";
const IDB_NAME = "allesda";
const IDB_STORE = "handles";
function idbOpen() {
  return new Promise(function(resolve, reject) {
    if (typeof indexedDB === "undefined") return reject(new Error("kein indexedDB"));
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = function(e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = function() {
      resolve(req.result);
    };
    req.onerror = function() {
      reject(req.error);
    };
  });
}
function idbGet(key) {
  return idbOpen().then(function(db) {
    return new Promise(function(resolve, reject) {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = function() {
        resolve(req.result);
      };
      req.onerror = function() {
        reject(req.error);
      };
    });
  });
}
function idbSet(key, value) {
  return idbOpen().then(function(db) {
    return new Promise(function(resolve, reject) {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = function() {
        resolve(true);
      };
      tx.onerror = function() {
        reject(tx.error);
      };
    });
  });
}
function idbDel(key) {
  return idbOpen().then(function(db) {
    return new Promise(function(resolve, reject) {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).delete(key);
      tx.oncomplete = function() {
        resolve(true);
      };
      tx.onerror = function() {
        reject(tx.error);
      };
    });
  });
}
const storageStatus = {
  modus: "lokal",
  ordnerName: null,
  // z. B. "AllesDa"
  letzteSpeicherung: null,
  // Date-Objekt der letzten erfolgreichen Datei-Speicherung
  fehler: null,
  // letzte Fehlermeldung (String) oder null
  fsaVerfuegbar: FSA_VERFUEGBAR
};
const STATUS_EVT = "allesda:storage-status";
function statusUpdate(patch) {
  for (const k in patch) storageStatus[k] = patch[k];
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent(STATUS_EVT, { detail: { ...storageStatus } }));
    } catch (e) {
    }
  }
}
let DIR_HANDLE = null;
let DATEN_FILE_HANDLE = null;
let SETTINGS_FILE_HANDLE = null;
let LETZTER_FLUSH = { daten: null, settings: null };
async function pruefePermission(handle, modus) {
  if (!handle || typeof handle.queryPermission !== "function") return true;
  const opts = { mode: modus || "readwrite" };
  let p = await handle.queryPermission(opts);
  if (p === "granted") return true;
  try {
    p = await handle.requestPermission(opts);
    return p === "granted";
  } catch (e) {
    return false;
  }
}
async function holeUnterordner(dirHandle, name) {
  return dirHandle.getDirectoryHandle(name, { create: true });
}
async function holeDateiHandle(dirHandle, dateiname) {
  return dirHandle.getFileHandle(dateiname, { create: true });
}
async function leseDateiAlsJson(fileHandle) {
  const file = await fileHandle.getFile();
  const text = await file.text();
  if (!text || !text.trim()) return null;
  return JSON.parse(text);
}
async function schreibeDateiAlsJson(fileHandle, obj) {
  const w = await fileHandle.createWritable();
  await w.write(JSON.stringify(obj, null, 2));
  await w.close();
}
const FLUSH_DELAY = 600;
let flushTimer = null;
const flushQueue = { daten: null, settings: null };
function planeFlush(was, daten) {
  flushQueue[was] = daten;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(fuehreFlushAus, FLUSH_DELAY);
}
async function fuehreFlushAus() {
  flushTimer = null;
  if (!DIR_HANDLE) return;
  const ok = await pruefePermission(DIR_HANDLE, "readwrite");
  if (!ok) {
    statusUpdate({
      modus: "datei-pause",
      fehler: "Berechtigung für Ordner ist nicht mehr aktiv. Bitte erneut wählen."
    });
    return;
  }
  try {
    const aktivDir = await holeUnterordner(DIR_HANDLE, "aktiv");
    if (flushQueue.daten) {
      if (!DATEN_FILE_HANDLE) DATEN_FILE_HANDLE = await holeDateiHandle(aktivDir, "daten.json");
      await schreibeDateiAlsJson(DATEN_FILE_HANDLE, {
        typ: "allesda-daten",
        schema: STORAGE_SCHEMA_VERSION,
        gespeichertAm: (/* @__PURE__ */ new Date()).toISOString(),
        ...flushQueue.daten
      });
      LETZTER_FLUSH.daten = flushQueue.daten;
      flushQueue.daten = null;
    }
    if (flushQueue.settings) {
      if (!SETTINGS_FILE_HANDLE) SETTINGS_FILE_HANDLE = await holeDateiHandle(aktivDir, "einstellungen.json");
      await schreibeDateiAlsJson(SETTINGS_FILE_HANDLE, {
        typ: "allesda-settings",
        schema: STORAGE_SCHEMA_VERSION,
        gespeichertAm: (/* @__PURE__ */ new Date()).toISOString(),
        ...flushQueue.settings
      });
      LETZTER_FLUSH.settings = flushQueue.settings;
      flushQueue.settings = null;
    }
    statusUpdate({ modus: "datei", fehler: null, letzteSpeicherung: /* @__PURE__ */ new Date() });
    try {
      window.dispatchEvent(new CustomEvent(
        "allesda:datei-saved",
        { detail: { quelle: "fsa-flush" } }
      ));
    } catch (e) {
    }
  } catch (e) {
    console.warn("Datei-Flush fehlgeschlagen:", e);
    statusUpdate({ modus: "datei-pause", fehler: e.message || String(e) });
  }
}
const storage = {
  // ── Settings ─────────────────────────────────────────────────────────────
  ladeSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.settings);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Settings konnten nicht geladen werden:", e);
      return null;
    }
  },
  speichereSettings(settings) {
    let ok = true;
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.schema, String(STORAGE_SCHEMA_VERSION));
    } catch (e) {
      console.warn("Settings konnten nicht in localStorage gespeichert werden:", e);
      ok = false;
    }
    if (DIR_HANDLE) planeFlush("settings", { settings });
    return ok;
  },
  // ── Arbeitsdaten ─────────────────────────────────────────────────────────
  ladeDaten() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.daten);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Daten konnten nicht geladen werden:", e);
      return null;
    }
  },
  speichereDaten(daten) {
    let ok = true;
    try {
      localStorage.setItem(STORAGE_KEYS.daten, JSON.stringify(daten));
      localStorage.setItem(STORAGE_KEYS.schema, String(STORAGE_SCHEMA_VERSION));
    } catch (e) {
      console.warn("Daten konnten nicht in localStorage gespeichert werden:", e);
      ok = false;
    }
    if (DIR_HANDLE) planeFlush("daten", daten);
    return ok;
  },
  // ── Reset ────────────────────────────────────────────────────────────────
  setzeZurueck(was) {
    try {
      if (was === "settings" || was === "alles") localStorage.removeItem(STORAGE_KEYS.settings);
      if (was === "daten" || was === "alles") localStorage.removeItem(STORAGE_KEYS.daten);
      return true;
    } catch (e) {
      return false;
    }
  },
  speicherGroesse() {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.settings) || "";
      const d = localStorage.getItem(STORAGE_KEYS.daten) || "";
      return { settings: s.length, daten: d.length, gesamt: s.length + d.length };
    } catch {
      return { settings: 0, daten: 0, gesamt: 0 };
    }
  },
  istVerfuegbar() {
    try {
      const k = "allesda:probe";
      localStorage.setItem(k, "1");
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  },
  // ── NEU: File System Access ──────────────────────────────────────────────
  fsaVerfuegbar() {
    return FSA_VERFUEGBAR;
  },
  status() {
    return { ...storageStatus };
  },
  // Ordner wählen (User-Geste!). Speichert Handle in IndexedDB für
  // spätere Sessions.
  async waehleOrdner() {
    if (!FSA_VERFUEGBAR) {
      statusUpdate({ fehler: "Dieser Browser unterstützt keinen direkten Ordnerzugriff. Bitte Chrome oder Edge nutzen." });
      return false;
    }
    try {
      const handle = await window.showDirectoryPicker({
        id: "allesda-root",
        mode: "readwrite",
        startIn: "documents"
      });
      DIR_HANDLE = handle;
      DATEN_FILE_HANDLE = null;
      SETTINGS_FILE_HANDLE = null;
      try {
        await idbSet("dirHandle", handle);
      } catch (e) {
      }
      try {
        localStorage.setItem(STORAGE_KEYS.fsModus, "1");
      } catch (e) {
      }
      statusUpdate({ modus: "datei", ordnerName: handle.name, fehler: null });
      return true;
    } catch (e) {
      if (e && e.name === "AbortError") return false;
      console.warn("Ordnerwahl fehlgeschlagen:", e);
      statusUpdate({ fehler: e.message || String(e) });
      return false;
    }
  },
  // Versucht, ein zuvor gespeichertes Handle aus IndexedDB wieder zu nutzen.
  // KEIN Re-Prompt — Permission wird nur abgefragt, nicht aktiv angefordert
  // (das geht erst nach einer User-Geste).
  async versucheOrdnerWiederherstellen() {
    if (!FSA_VERFUEGBAR) return false;
    try {
      const handle = await idbGet("dirHandle");
      if (!handle) return false;
      DIR_HANDLE = handle;
      let perm = "prompt";
      if (typeof handle.queryPermission === "function") {
        perm = await handle.queryPermission({ mode: "readwrite" });
      }
      if (perm === "granted") {
        statusUpdate({ modus: "datei", ordnerName: handle.name, fehler: null });
        return true;
      } else {
        statusUpdate({
          modus: "datei-pause",
          ordnerName: handle.name,
          fehler: "Berechtigung muss erneut erteilt werden (einmal klicken)."
        });
        return false;
      }
    } catch (e) {
      console.warn("Handle-Wiederherstellung fehlgeschlagen:", e);
      return false;
    }
  },
  // Permission nach „pause"-Zustand erneut anfordern (braucht User-Geste).
  async aktiviereOrdnerErneut() {
    if (!DIR_HANDLE) return false;
    const ok = await pruefePermission(DIR_HANDLE, "readwrite");
    if (ok) {
      statusUpdate({ modus: "datei", fehler: null });
      return true;
    }
    return false;
  },
  // Aktuellen Datenstand aus Datei laden (für initiale Hydration und für
  // Re-Sync nach Fokus-Wechsel, wenn der User die Datei extern getauscht hat).
  async ladeDatenAusDatei() {
    if (!DIR_HANDLE) return null;
    const ok = await pruefePermission(DIR_HANDLE, "read");
    if (!ok) return null;
    try {
      const aktivDir = await holeUnterordner(DIR_HANDLE, "aktiv");
      if (!DATEN_FILE_HANDLE) {
        try {
          DATEN_FILE_HANDLE = await aktivDir.getFileHandle("daten.json");
        } catch (e) {
          return null;
        }
      }
      return await leseDateiAlsJson(DATEN_FILE_HANDLE);
    } catch (e) {
      console.warn("Lesen aus Datei fehlgeschlagen:", e);
      return null;
    }
  },
  async ladeSettingsAusDatei() {
    if (!DIR_HANDLE) return null;
    const ok = await pruefePermission(DIR_HANDLE, "read");
    if (!ok) return null;
    try {
      const aktivDir = await holeUnterordner(DIR_HANDLE, "aktiv");
      if (!SETTINGS_FILE_HANDLE) {
        try {
          SETTINGS_FILE_HANDLE = await aktivDir.getFileHandle("einstellungen.json");
        } catch (e) {
          return null;
        }
      }
      return await leseDateiAlsJson(SETTINGS_FILE_HANDLE);
    } catch (e) {
      console.warn("Lesen Settings aus Datei fehlgeschlagen:", e);
      return null;
    }
  },
  // Trennt die Ordner-Anbindung. localStorage bleibt unberührt — App läuft
  // ab sofort wieder im lokalen Modus weiter.
  async trenneOrdner() {
    DIR_HANDLE = null;
    DATEN_FILE_HANDLE = null;
    SETTINGS_FILE_HANDLE = null;
    LETZTER_FLUSH = { daten: null, settings: null };
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    try {
      await idbDel("dirHandle");
    } catch (e) {
    }
    try {
      localStorage.removeItem(STORAGE_KEYS.fsModus);
    } catch (e) {
    }
    statusUpdate({ modus: "lokal", ordnerName: null, fehler: null, letzteSpeicherung: null });
    return true;
  },
  // Statusänderungen abonnieren (für React-Komponenten via useEffect)
  abonniereStatus(callback) {
    if (typeof window === "undefined") return function() {
    };
    const handler = function(e) {
      callback(e.detail);
    };
    window.addEventListener(STATUS_EVT, handler);
    setTimeout(function() {
      callback({ ...storageStatus });
    }, 0);
    return function() {
      window.removeEventListener(STATUS_EVT, handler);
    };
  }
};
function exportiereJSON(daten, dateiname) {
  try {
    const json = JSON.stringify(daten, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = dateiname;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    return true;
  } catch (e) {
    console.warn("Export fehlgeschlagen:", e);
    return false;
  }
}
function importiereJSON(callback) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.style.display = "none";
  input.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const obj = JSON.parse(ev.target.result);
        callback(obj, file.name);
      } catch (err) {
        alert("Datei konnte nicht gelesen werden:\n" + err.message);
      }
    };
    reader.onerror = () => alert("Datei konnte nicht gelesen werden.");
    reader.readAsText(file);
  };
  document.body.appendChild(input);
  input.click();
  setTimeout(() => {
    try {
      document.body.removeChild(input);
    } catch {
    }
  }, 1e3);
}
const SHEETJS_URL = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
function xlsxBereit() {
  return typeof window !== "undefined" && typeof window.XLSX !== "undefined";
}
function ladeXlsxLib() {
  if (xlsxBereit()) return Promise.resolve();
  return new Promise(function(resolve, reject) {
    const s = document.createElement("script");
    s.src = SHEETJS_URL;
    s.onload = function() {
      resolve();
    };
    s.onerror = function() {
      reject(new Error("SheetJS-Bibliothek konnte nicht geladen werden. Bitte Internetverbindung prüfen."));
    };
    document.head.appendChild(s);
  });
}
function mappeVerwaltungsart(str) {
  if (!str) return "weg";
  const s = String(str).toLowerCase();
  if (s.indexOf("weg") >= 0) return "weg";
  if (s.indexOf("miet") >= 0) return "miet";
  if (s.indexOf("sev") >= 0 || s.indexOf("se-") >= 0 || s.indexOf("sondereigentum") >= 0) return "sev";
  if (s.indexOf("gewerbe") >= 0) return "gewerbe";
  return "weg";
}
function parseDatumWert(v) {
  if (!v) return null;
  if (v instanceof Date) return v;
  const s = String(v).trim();
  const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d;
  return null;
}
function parseSheetAlsObjekte(sheet) {
  if (!sheet) return [];
  return window.XLSX.utils.sheet_to_json(sheet, { defval: null, raw: false });
}
function ableiteStatus(bisRoh) {
  const bis = parseDatumWert(bisRoh);
  if (bis && bis < /* @__PURE__ */ new Date()) return "ehemalig";
  return "aktiv";
}
function mappeObjekte(rows) {
  return rows.filter(function(r) {
    return r["Objekt-Nr."];
  }).map(function(r) {
    const strasse = r["Straße + Hausnr."] || "";
    const plzOrt = ((r["PLZ"] || "") + " " + (r["Ort"] || "")).trim();
    const adresse = [strasse, plzOrt].filter(Boolean).join(", ");
    return {
      id: String(r["Objekt-Nr."]),
      nr: String(r["Objekt-Nr."]),
      verwaltungsart: mappeVerwaltungsart(r["Verwaltungsart"]),
      adresse,
      baujahr: r["Baujahr"] || null,
      verwaltung: {
        verwalter: r["Verwalter (Person)"] || null,
        buchhalter: r["Buchhalter (Person)"] || null,
        bestelltAb: r["Verwaltung ab"] || null,
        bestelltBis: r["Bestellt bis"] || null
      },
      einheiten: [],
      haeuser: [],
      karten: [],
      notizen: r["Notiz"] || ""
    };
  });
}
function mappeEinheiten(rows, vesMap) {
  const einheitToVe = {};
  let verwaist = 0;
  rows.filter(function(r) {
    return r["Einheit-ID"] && r["Objekt-Nr."];
  }).forEach(function(r) {
    const veId = String(r["Objekt-Nr."]);
    const ve = vesMap[veId];
    if (!ve) {
      verwaist++;
      return;
    }
    const einheitId = String(r["Einheit-ID"]);
    ve.einheiten.push({
      id: einheitId,
      nr: r["Einheit-Bez."] || "",
      verwNr: r["Verwaltungsnr."] || "",
      typ: r["Typ"] || "Wohneigentum",
      flaeche: r["Fläche m²"] ? String(r["Fläche m²"]) + " m²" : "",
      mea: r["MEA"] || "",
      lage: r["Lage"] || "",
      zimmer: r["Zimmer"] || null,
      eigentuemer: [],
      mieter: [],
      notizen: r["Notiz"] || ""
    });
    einheitToVe[einheitId] = veId;
  });
  return { einheitToVe, verwaist };
}
function mappePersonen(rows) {
  return rows.filter(function(r) {
    return r["Person-ID"];
  }).map(function(r) {
    const tels = [];
    if (r["Telefon Mobil"]) tels.push({ nr: String(r["Telefon Mobil"]), typ: "mobil", favorit: true });
    if (r["Telefon Festnetz"]) tels.push({ nr: String(r["Telefon Festnetz"]), typ: "festnetz", favorit: tels.length === 0 });
    const emails = [];
    if (r["E-Mail"]) emails.push({ email: String(r["E-Mail"]), typ: "privat", favorit: true });
    const strasse = r["Straße + Hausnr."] || "";
    const plzOrt = ((r["PLZ"] || "") + " " + (r["Ort"] || "")).trim();
    const vorname = r["Vorname"] || "";
    const nachname = r["Nachname"] || "";
    return {
      id: String(r["Person-ID"]),
      typ: "person",
      anrede: r["Anrede"] || "",
      vorname,
      nachname,
      name: (vorname + " " + nachname).trim(),
      // App nutzt name als Anzeigeform
      tels,
      emails,
      strasse,
      plzOrt,
      adresseFavorit: true,
      objektZuweisungen: [],
      rollen: [],
      // wird in mappeZuordnungen gefüllt
      notizen: r["Notiz"] || "",
      customFelder: []
    };
  });
}
function mappeFirmen(rows) {
  return rows.filter(function(r) {
    return r["Firma-ID"];
  }).map(function(r) {
    const strasse = r["Straße + Hausnr."] || "";
    const plzOrt = ((r["PLZ"] || "") + " " + (r["Ort"] || "")).trim();
    return {
      id: String(r["Firma-ID"]),
      typ: "firma",
      name: r["Firmenname"] || "",
      rechtsform: r["Rechtsform"] || "",
      gewerk: r["Gewerk"] || "",
      tel: r["Telefon"] || "",
      email: r["E-Mail"] || "",
      web: r["Web"] || "",
      strasse,
      plzOrt,
      ansprechpartner: r["Ansprechpartner"] || "",
      objektZuweisungen: [],
      rollen: [],
      mitarbeiter: [],
      notizen: r["Notiz"] || "",
      customFelder: []
    };
  });
}
function mappeZuordnungen(rows, kontakteMap, einheitToVe, vesMap) {
  let zugewiesen = 0;
  let verwaist = 0;
  const einheitMap = {};
  Object.keys(vesMap).forEach(function(veId) {
    vesMap[veId].einheiten.forEach(function(e) {
      einheitMap[e.id] = e;
    });
  });
  rows.filter(function(r) {
    return r["Einheit-ID"] && r["Person-ID"] && r["Rolle"];
  }).forEach(function(r) {
    const kontakt = kontakteMap[String(r["Person-ID"])];
    const einheitId = String(r["Einheit-ID"]);
    const veId = einheitToVe[einheitId];
    const einheit = einheitMap[einheitId];
    if (!kontakt || !veId || !einheit) {
      verwaist++;
      return;
    }
    let rolle = String(r["Rolle"]);
    let vorsitz = false;
    if (rolle.toLowerCase().indexOf("vorsitz") >= 0) {
      rolle = "Verwaltungsbeirat";
      vorsitz = true;
    }
    const status = ableiteStatus(r["Bis (Datum)"]);
    const kontaktName = kontakt.name || ((kontakt.vorname || "") + " " + (kontakt.nachname || "")).trim();
    const zuweisung = {
      objektId: veId,
      einheitId,
      rolle,
      status,
      von: r["Von (Datum)"] || "",
      bis: r["Bis (Datum)"] || ""
    };
    if (vorsitz) zuweisung.vorsitz = true;
    kontakt.objektZuweisungen.push(zuweisung);
    const rolleLc = rolle.toLowerCase();
    if (rolleLc.indexOf("eigent") >= 0) {
      const eintrag = {
        name: kontaktName,
        von: r["Von (Datum)"] || "",
        kontaktId: kontakt.id,
        grundbuch: r["Grundbuch"] && String(r["Grundbuch"]).toLowerCase().indexOf("ja") >= 0 ? true : false,
        selbstnutzer: r["Selbstnutzer"] && String(r["Selbstnutzer"]).toLowerCase().indexOf("ja") >= 0 ? true : false
      };
      if (r["Bis (Datum)"]) eintrag.bis = r["Bis (Datum)"];
      einheit.eigentuemer.push(eintrag);
    } else if (rolleLc.indexOf("mieter") >= 0) {
      const eintrag = {
        name: kontaktName,
        von: r["Von (Datum)"] || "",
        kontaktId: kontakt.id
      };
      if (r["Bis (Datum)"]) eintrag.bis = r["Bis (Datum)"];
      einheit.mieter.push(eintrag);
    }
    if (!Array.isArray(kontakt.rollen)) kontakt.rollen = [];
    if (kontakt.rollen.indexOf(rolle) < 0) kontakt.rollen.push(rolle);
    zugewiesen++;
  });
  return { zugewiesen, verwaist };
}
async function importiereExcel(file) {
  await ladeXlsxLib();
  if (!xlsxBereit()) throw new Error("Excel-Bibliothek nicht verfügbar.");
  const buffer = await file.arrayBuffer();
  let wb;
  try {
    wb = window.XLSX.read(buffer, { type: "array" });
  } catch (e) {
    throw new Error("Datei konnte nicht gelesen werden: " + (e.message || e));
  }
  const sheets = {
    objekte: parseSheetAlsObjekte(wb.Sheets["Objekte"]),
    einheiten: parseSheetAlsObjekte(wb.Sheets["Einheiten"]),
    personen: parseSheetAlsObjekte(wb.Sheets["Personen"]),
    firmen: parseSheetAlsObjekte(wb.Sheets["Firmen"]),
    zuordnungen: parseSheetAlsObjekte(wb.Sheets["Zuordnungen"])
  };
  const fehler = [];
  const warnungen = [];
  if (!wb.Sheets["Objekte"]) {
    throw new Error("Das Tabellenblatt „Objekte“ fehlt. Stimmt das Format mit der AllesDa-Vorlage überein?");
  }
  if (sheets.objekte.length === 0) {
    fehler.push("Tabellenblatt „Objekte“ ist leer — ohne Objekte kann nichts importiert werden.");
  }
  const veIds = sheets.objekte.map(function(r) {
    return String(r["Objekt-Nr."]);
  });
  const veDoppelt = veIds.filter(function(id, i) {
    return veIds.indexOf(id) !== i;
  });
  if (veDoppelt.length > 0) {
    warnungen.push("Doppelte Objekt-Nr.: " + Array.from(new Set(veDoppelt)).join(", "));
  }
  const ves = mappeObjekte(sheets.objekte);
  const vesMap = {};
  ves.forEach(function(v) {
    vesMap[v.id] = v;
  });
  const einheitenInfo = mappeEinheiten(sheets.einheiten, vesMap);
  if (einheitenInfo.verwaist > 0) {
    warnungen.push(einheitenInfo.verwaist + " Einheit(en) verweisen auf ein unbekanntes Objekt");
  }
  const personen = mappePersonen(sheets.personen);
  const firmen = mappeFirmen(sheets.firmen);
  const kontakte = personen.concat(firmen);
  const kontakteMap = {};
  kontakte.forEach(function(k) {
    kontakteMap[k.id] = k;
  });
  const zuordnungenInfo = mappeZuordnungen(sheets.zuordnungen, kontakteMap, einheitenInfo.einheitToVe, vesMap);
  if (zuordnungenInfo.verwaist > 0) {
    warnungen.push(zuordnungenInfo.verwaist + " Zuordnung(en) verweisen auf unbekannte Einheit- oder Person-IDs");
  }
  const einheitenGesamt = ves.reduce(function(sum, v) {
    return sum + v.einheiten.length;
  }, 0);
  return {
    ves,
    kontakte,
    statistik: {
      objekte: ves.length,
      einheiten: einheitenGesamt,
      personen: personen.length,
      firmen: firmen.length,
      zuordnungen: zuordnungenInfo.zugewiesen
    },
    warnungen,
    fehler
  };
}
function strip(s) {
  return (s || "").toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function koelnerPhonetik(name) {
  if (!name) return "";
  const s = (name + "").toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  if (!s) return "";
  let code = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const prev = s[i - 1] || "";
    const next = s[i + 1] || "";
    if ("aeijouy".indexOf(c) >= 0) code += "0";
    else if (c === "h") {
    } else if (c === "b") code += "1";
    else if (c === "p") code += next === "h" ? "3" : "1";
    else if (c === "d" || c === "t") code += "csz".indexOf(next) >= 0 ? "8" : "2";
    else if ("fvw".indexOf(c) >= 0) code += "3";
    else if ("gkq".indexOf(c) >= 0) code += "4";
    else if (c === "c") {
      if (i === 0) code += "ahkloqrux".indexOf(next) >= 0 ? "4" : "8";
      else if ("sz".indexOf(prev) >= 0) code += "8";
      else if ("ahkoqux".indexOf(next) >= 0) code += "4";
      else code += "8";
    } else if (c === "x") code += "ckq".indexOf(prev) >= 0 ? "8" : "48";
    else if (c === "l") code += "5";
    else if (c === "m" || c === "n") code += "6";
    else if (c === "r") code += "7";
    else if (c === "s" || c === "z") code += "8";
  }
  let dedup = "";
  for (let i = 0; i < code.length; i++) {
    if (code[i] !== code[i - 1]) dedup += code[i];
  }
  let result = "";
  for (let i = 0; i < dedup.length; i++) {
    if (i === 0 || dedup[i] !== "0") result += dedup[i];
  }
  return result;
}
function levenshtein(a, b) {
  if (!a) return (b || "").length;
  if (!b) return a.length;
  const m = a.length, n = b.length;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}
function matchScore(query, text, opts) {
  const q = (query || "").trim();
  const t = (text || "").trim();
  if (!q || !t) return 0;
  const qLow = q.toLowerCase();
  const tLow = t.toLowerCase();
  if (tLow.indexOf(qLow) >= 0) return 100;
  let qS = null, tS = null;
  if (opts.diakritika !== false) {
    qS = strip(q);
    tS = strip(t);
    if (tS && qS && tS.indexOf(qS) >= 0) return 90;
  }
  if (opts.woerter !== false) {
    const qWords = qLow.split(/\s+/).filter(Boolean);
    if (qWords.length > 1) {
      const tWords = tLow.split(/\s+/);
      const allFound = qWords.every((qw) => tWords.some((tw) => tw.indexOf(qw) >= 0));
      if (allFound) return 80;
      if (opts.diakritika !== false) {
        const qWordsS = qWords.map((w) => strip(w));
        const tWordsS = tLow.split(/\s+/).map((w) => strip(w));
        if (qWordsS.every((qw) => tWordsS.some((tw) => tw.indexOf(qw) >= 0))) return 75;
      }
    }
  }
  if (opts.phonetik !== false && q.length >= 2) {
    const qP = koelnerPhonetik(q);
    const tP = koelnerPhonetik(t);
    if (qP && tP && tP.indexOf(qP) >= 0) return 70;
  }
  if (opts.tippfehler !== false && q.length >= 3) {
    const qStr = qS || strip(q);
    const tStr = tS || strip(t);
    const schwelle = opts.tippfehlerSchwelle || 2;
    const tWords = tStr.split(/\s+/).filter((w) => w.length >= 2);
    let minDist = Infinity;
    for (let i = 0; i < tWords.length; i++) {
      const d = levenshtein(qStr, tWords[i]);
      if (d < minDist) minDist = d;
    }
    if (minDist <= schwelle) {
      return 60 - (minDist - 1) * 5;
    }
  }
  return 0;
}
function sucheAlles(query, settings, kontakte, ves) {
  const q = (query || "").trim();
  if (!q) return { vorschlaege: [], ergebnisse: {} };
  const aktiveKats = settings.suchKategorien.filter((k) => k.aktiv).map((k) => k.id);
  const opts = {
    diakritika: settings.sucheDiakritika !== false,
    woerter: settings.sucheWoerter !== false,
    phonetik: settings.suchePhonetik !== false,
    tippfehler: settings.sucheTippfehler !== false,
    tippfehlerSchwelle: settings.sucheTippfehlerSchwelle || 2
  };
  const istNurExakt = !opts.diakritika && !opts.woerter && !opts.phonetik && !opts.tippfehler;
  const vorschlaege = [];
  const ergebnisse = {};
  const bestScore = (felder) => {
    let best = 0;
    for (let i = 0; i < felder.length; i++) {
      if (!felder[i]) continue;
      const s = istNurExakt ? felder[i].toLowerCase().indexOf(q.toLowerCase()) >= 0 ? 100 : 0 : matchScore(q, felder[i], opts);
      if (s > best) best = s;
    }
    return best;
  };
  if (aktiveKats.indexOf("objekte") >= 0) {
    const scored = ves.map((ve) => ({ ve, score: bestScore([ve.nr, ve.adresse]) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
    if (scored.length > 0) ergebnisse.objekte = scored.map((x) => x.ve);
    scored.forEach((x) => {
      vorschlaege.push({ text: x.ve.nr, sub: x.ve.adresse, typ: "ve", id: x.ve.id, score: x.score });
      if (x.ve.adresse && bestScore([x.ve.adresse]) > 0) {
        vorschlaege.push({
          text: x.ve.adresse.split(",")[0],
          sub: x.ve.nr,
          typ: "adresse",
          id: x.ve.id,
          score: x.score - 1
        });
      }
    });
  }
  if (aktiveKats.indexOf("kontakte") >= 0) {
    const scored = kontakte.map((k) => {
      const felder = k.typ === "firma" ? [k.name] : [k.name, k.vorname, k.nachname];
      return { k, score: bestScore(felder) };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
    if (scored.length > 0) {
      ergebnisse.kontakte = scored.map((x) => x.k);
      scored.forEach((x) => vorschlaege.push({
        text: x.k.name,
        sub: x.k.sub || x.k.typ,
        typ: "kontakt",
        id: x.k.id,
        score: x.score
      }));
    }
    const erstK = scored[0] && scored[0].k;
    if (erstK) {
      const vesMitK = ves.filter(
        (ve) => ve.einheiten.some(
          (e) => [...e.eigentuemer.map((et) => et.kontaktId), ...e.mieter.map((m) => m.kontaktId)].includes(erstK.id)
        ) || ve.verwaltung && ve.verwaltung.verwalter === erstK.id
      );
      if (vesMitK.length > 0) ergebnisse.objekte_von_kontakt = { kontakt: erstK, ves: vesMitK };
    }
  }
  vorschlaege.sort((a, b) => b.score - a.score);
  return {
    vorschlaege: [...new Map(vorschlaege.map((v) => [v.text, v])).values()].slice(0, 8),
    ergebnisse
  };
}
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}
const DESKTOP_MIN_WIDTH = 900;
const SIDEBAR_MIN_WIDTH = 56;
const SIDEBAR_MAX_WIDTH = 280;
const SIDEBAR_SCHWELLE_2BUCH = 75;
const SIDEBAR_SCHWELLE_VOLL = 145;
function sidebarModus(breite) {
  if (breite < SIDEBAR_SCHWELLE_2BUCH) return "icon";
  if (breite < SIDEBAR_SCHWELLE_VOLL) return "kurz";
  return "voll";
}
const RollenContext = createContext(DEFAULT_ROLLEN);
function useRollen() {
  return useContext(RollenContext);
}
const FirmenRollenContext = createContext(DEFAULT_FIRMEN_ROLLEN);
function useFirmenRollen() {
  return useContext(FirmenRollenContext);
}
const AvatarIconsContext = createContext({ person: true, firma: true });
function useAvatarIcons() {
  return useContext(AvatarIconsContext);
}
const KartenBadgesContext = createContext({ person: true, firma: true });
function useKartenBadges() {
  return useContext(KartenBadgesContext);
}
const StatusLeisteContext = createContext({ objekt: true, kontakt: true });
function useStatusLeiste() {
  return useContext(StatusLeisteContext);
}
const RechnungsadresseContext = createContext(false);
function useRechnungsadresseAn() {
  return useContext(RechnungsadresseContext);
}
const DEFAULT_EINHEIT_ANZEIGE = { flaeche: true, mea: true, eigentuemer: true, mieter: true };
const EinheitAnzeigeContext = createContext(DEFAULT_EINHEIT_ANZEIGE);
function useEinheitAnzeige() {
  return useContext(EinheitAnzeigeContext);
}
function Toggle({ value, onChange, color = ACCENT, disabled = false }) {
  return /* @__PURE__ */ React.createElement("div", { onClick: () => !disabled && onChange(!value), style: {
    width: 30,
    height: 17,
    borderRadius: 9,
    background: value ? color : "#3D3D5C",
    position: "relative",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s",
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: 2,
    left: value ? 15 : 2,
    transition: "left 0.2s"
  } }));
}
function Inp({ label, value, onChange, placeholder, t, accent = ACCENT, type = "text", required = false, readOnly = false }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, label && /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 600, color: t.sub, display: "block", marginBottom: 4 } }, label, required && /* @__PURE__ */ React.createElement("span", { style: { color: "#EF4444", marginLeft: 3 } }, "*")), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      type,
      readOnly,
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${value ? accent + "50" : t.border}`,
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 12,
        color: readOnly ? t.muted : t.text,
        outline: "none",
        transition: "border-color 0.15s",
        fontFamily: "inherit"
      }
    }
  ));
}
function CopyBtn({ text, label = "Kopieren", t, accent = ACCENT }) {
  const [ok, setOk] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        try {
          navigator.clipboard.writeText(text);
        } catch (e) {
        }
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: ok ? "#10B98120" : "none",
        border: `1px solid ${ok ? "#10B981" : t ? t.border : "#252540"}`,
        borderRadius: 7,
        padding: "3px 8px",
        cursor: "pointer",
        fontSize: 10,
        fontWeight: 600,
        color: ok ? "#10B981" : t ? t.muted : "#3D3D5C"
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: ok ? "check" : "copy", size: 11, color: ok ? "#10B981" : t ? t.muted : "#3D3D5C" }),
    ok ? "Kopiert" : label
  );
}
const TipContext = createContext({ show: () => {
}, hide: () => {
} });
function TipProvider({ children }) {
  const [state, setState] = useState(null);
  const show = (text, x, y) => setState({ text, x, y });
  const hide = () => setState(null);
  return /* @__PURE__ */ React.createElement(TipContext.Provider, { value: { show, hide } }, children, state && /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    left: state.x,
    top: state.y - 6,
    transform: "translate(-50%, -100%)",
    background: "#1F2937",
    color: "#FFFFFF",
    padding: "5px 9px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: 99999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
  } }, state.text));
}
function Tip({ text, children }) {
  const ctx = useContext(TipContext);
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  if (!text) return children;
  const show = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ctx.show(text, r.left + r.width / 2, r.top);
  };
  const showAndAutoHide = () => {
    show();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(ctx.hide, 2e3);
  };
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      ref,
      style: { display: "inline-flex", lineHeight: 0, verticalAlign: "top" },
      onPointerEnter: (e) => {
        if (e.pointerType === "mouse") show();
      },
      onPointerLeave: (e) => {
        if (e.pointerType === "mouse") ctx.hide();
      },
      onTouchStart: showAndAutoHide
    },
    children
  );
}
function Avatar({ name, firma = false, size = 32, accent = KONTAKTE_FARBE, zuweisungen = null }) {
  const parts = ((name || "") + "").trim().split(" ").filter(Boolean);
  const initials = firma ? ((name || "?")[0] || "?").toUpperCase() : parts.map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
  const color = firma ? FIRMEN_FARBE : accent;
  const rollen = useRollen();
  const { person: iconsPerson, firma: iconsFirma } = useAvatarIcons();
  const iconsZeigen = firma ? iconsFirma : iconsPerson;
  const PRIO = { aktiv: 3, werdend: 2, ehemalig: 1 };
  const slotBadges = { ve: null, gremium: null, sev: null, firma: null };
  if (iconsZeigen && !firma && zuweisungen && Array.isArray(zuweisungen)) {
    zuweisungen.forEach((z) => {
      const def = rollen.find((r) => r.name === z.rolle);
      if (!def || !def.slot || def.aktiv === false) return;
      if (!(def.slot in slotBadges)) return;
      const status = z.status || "aktiv";
      const cur = slotBadges[def.slot];
      if (!cur || PRIO[status] > PRIO[cur.status]) {
        slotBadges[def.slot] = { rolle: z.rolle, status, vorsitz: !!z.vorsitz };
      }
    });
  }
  const badgeSize = Math.min(22, Math.max(14, Math.round(size * 0.37)));
  const posNah = size * 0.05;
  const posFern = size * 0.95;
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    display: "inline-block",
    flexShrink: 0,
    width: size,
    height: size,
    verticalAlign: "middle"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: size,
    height: size,
    borderRadius: firma ? Math.round(size * 0.22) : "50%",
    background: `${color}22`,
    border: `1.5px solid ${color}40`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box"
  } }, firma ? /* @__PURE__ */ React.createElement(I, { name: "building", size: Math.round(size * 0.5), color }) : /* @__PURE__ */ React.createElement("span", { style: { fontSize: size * 0.36, fontWeight: 700, color, lineHeight: 1 } }, initials)), slotBadges.sev && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: posNah,
    top: posNah,
    width: badgeSize,
    height: badgeSize,
    transform: "translate(-50%, -50%)"
  } }, /* @__PURE__ */ React.createElement(
    RolleBadge,
    {
      rolle: slotBadges.sev.rolle,
      size: badgeSize,
      status: slotBadges.sev.status,
      vorsitz: slotBadges.sev.vorsitz
    }
  )), slotBadges.gremium && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: posFern,
    top: posNah,
    width: badgeSize,
    height: badgeSize,
    transform: "translate(-50%, -50%)"
  } }, /* @__PURE__ */ React.createElement(
    RolleBadge,
    {
      rolle: slotBadges.gremium.rolle,
      size: badgeSize,
      status: slotBadges.gremium.status,
      vorsitz: slotBadges.gremium.vorsitz
    }
  )), slotBadges.firma && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: posNah,
    top: posFern,
    width: badgeSize,
    height: badgeSize,
    transform: "translate(-50%, -50%)"
  } }, /* @__PURE__ */ React.createElement(
    RolleBadge,
    {
      rolle: slotBadges.firma.rolle,
      size: badgeSize,
      status: slotBadges.firma.status,
      vorsitz: slotBadges.firma.vorsitz
    }
  )), slotBadges.ve && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: posFern,
    top: posFern,
    width: badgeSize,
    height: badgeSize,
    transform: "translate(-50%, -50%)"
  } }, /* @__PURE__ */ React.createElement(
    RolleBadge,
    {
      rolle: slotBadges.ve.rolle,
      size: badgeSize,
      status: slotBadges.ve.status,
      vorsitz: slotBadges.ve.vorsitz
    }
  )));
}
function RolleBadge({ rolle, size = 20, status = "aktiv", vorsitz = false }) {
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const def = personenRollen.find((r) => r.name === rolle) || firmenRollen.find((r) => r.name === rolle) || null;
  if (!def) return null;
  const ehemalig = status === "ehemalig";
  const werdend = status === "werdend";
  const systemDeaktiviert = def.aktiv === false;
  let bg, border, textColor;
  if (ehemalig) {
    bg = "transparent";
    border = `1px solid ${def.color}`;
    textColor = def.color;
  } else if (werdend) {
    bg = "transparent";
    border = `1px solid transparent`;
    textColor = def.color;
  } else {
    bg = def.color;
    border = `1.5px solid ${def.color}`;
    textColor = getContrastColor(def.color);
  }
  const fs = size < 20 ? def.kuerzel.length > 1 ? Math.round(size * 0.42) : Math.round(size * 0.55) : def.kuerzel.length > 2 ? Math.round(size * 0.32) : def.kuerzel.length > 1 ? Math.round(size * 0.42) : Math.round(size * 0.5);
  const tip = def.name + (status !== "aktiv" ? ` (${status})` : "") + (vorsitz ? " · Vorsitz" : "") + (systemDeaktiviert ? " [Rolle deaktiviert]" : "");
  const VORSITZ_GOLD = "#EAB308";
  const vorsitzShadow = vorsitz && !ehemalig ? `0 0 0 1px ${VORSITZ_GOLD}, 0 0 ${size < 20 ? 5 : 7}px ${size < 20 ? 1 : 2}px ${VORSITZ_GOLD}99` : "none";
  return /* @__PURE__ */ React.createElement(Tip, { text: tip }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: size,
    height: size,
    boxSizing: "content-box",
    opacity: systemDeaktiviert ? 0.5 : 1
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    border,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: vorsitzShadow
  } }, werdend && /* @__PURE__ */ React.createElement("svg", { style: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none"
  }, viewBox: `0 0 ${size} ${size}` }, /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: size / 2,
      cy: size / 2,
      r: size / 2 - 0.75,
      fill: "none",
      stroke: def.color,
      strokeWidth: "1.5",
      strokeDasharray: size < 20 ? "2 4" : "2.5 5",
      strokeLinecap: "round"
    }
  )), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: fs,
    fontWeight: 800,
    letterSpacing: "-0.3px",
    lineHeight: 1,
    userSelect: "none",
    color: textColor,
    position: "relative"
  } }, def.kuerzel), ehemalig && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "140%",
    height: size < 20 ? 1.5 : 2,
    background: def.color,
    opacity: 0.8,
    transform: "translate(-50%, -50%) rotate(-45deg)",
    borderRadius: 1,
    pointerEvents: "none"
  } }))));
}
function RollenBadges({ zuweisungen = [], rollen = [], size = 20 }) {
  const objRollen = zuweisungen.map((z) => z.rolle).filter(Boolean);
  const alle = [.../* @__PURE__ */ new Set([...objRollen, ...rollen])];
  if (alle.length === 0) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, alle.slice(0, 4).map((r, i) => /* @__PURE__ */ React.createElement(RolleBadge, { key: i, rolle: r, size })), alle.length > 4 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "#64748B" } }, "+", alle.length - 4));
}
function KontaktPicker({ value, onChange, label, t, accent = ACCENT, editMode = true, nurFirmen = false, kontakte = [], setKontakte }) {
  const [offen, setOffen] = useState(false);
  const [suche, setSuche] = useState("");
  const [neuOffen, setNeuOffen] = useState(false);
  const [neuTyp, setNeuTyp] = useState(nurFirmen ? "firma" : "person");
  const [neuName, setNeuName] = useState("");
  const rollen = useRollen();
  const liste = kontakte.filter((k) => nurFirmen ? k.typ === "firma" : true);
  const gefunden = liste.find((k) => k.id === value);
  const treffer = suche.trim().length > 0 ? liste.filter((k) => k.name.toLowerCase().includes(suche.toLowerCase()) || (k.sub || "").toLowerCase().includes(suche.toLowerCase())) : liste;
  const personen = treffer.filter((k) => k.typ === "person");
  const firmen = treffer.filter((k) => k.typ === "firma");
  const waehle = (k) => {
    onChange(k.id);
    setOffen(false);
    setSuche("");
  };
  const loesche = (e) => {
    e.stopPropagation();
    onChange(null);
  };
  const neuAnlegen = () => {
    const name = neuName.trim();
    if (!name || !setKontakte) return;
    const neuerKontakt = {
      id: Date.now(),
      name,
      typ: neuTyp,
      sub: "",
      tels: [],
      emails: [],
      adresse: "",
      rollen: [],
      notizen: ""
    };
    setKontakte((arr) => [...arr, neuerKontakt]);
    onChange(neuerKontakt.id);
    setNeuOffen(false);
    setNeuName("");
    setOffen(false);
    setSuche("");
  };
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, label && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 5
  } }, label), !offen && /* @__PURE__ */ React.createElement("div", { onClick: () => editMode && setOffen(true), style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: editMode ? "pointer" : "default",
    padding: editMode ? "5px 9px" : "2px 0",
    borderRadius: 8,
    background: editMode ? gefunden ? accent + "0D" : t.surface : "transparent",
    border: editMode ? `1px solid ${gefunden ? accent + "40" : t.border}` : "none",
    minHeight: 32,
    transition: "all 0.15s"
  } }, gefunden ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Avatar,
    {
      name: gefunden.name,
      firma: gefunden.typ === "firma",
      size: 22,
      accent,
      zuweisungen: gefunden.typ === "firma" ? null : gefunden.objektZuweisungen
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, gefunden.name), gefunden.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, gefunden.sub)), editMode && /* @__PURE__ */ React.createElement("button", { onClick: loesche, style: { background: "none", border: "none", cursor: "pointer", padding: 2, opacity: 0.5 } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub }))) : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: t.muted } }, editMode ? "Suchen…" : "—")), offen && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: suche,
      onChange: (e) => setSuche(e.target.value),
      placeholder: "Name eingeben…",
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: "8px 8px 0 0",
        padding: "7px 10px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${accent}40`,
    borderTop: "none",
    borderRadius: "0 0 10px 10px",
    maxHeight: 260,
    overflowY: "auto",
    boxShadow: "0 10px 32px rgba(0,0,0,0.25)"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    borderBottom: `1px solid ${t.border}`,
    position: "sticky",
    top: 0,
    background: t.card,
    zIndex: 5
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setOffen(false);
    setSuche("");
    setNeuOffen(false);
  }, style: {
    flex: 1,
    padding: "7px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 11,
    color: t.muted,
    borderRight: `1px solid ${t.border}`,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (setKontakte) {
      setNeuOffen(true);
      if (suche.trim() && !neuName) setNeuName(suche.trim());
    }
  }, style: {
    flex: 1,
    padding: "7px 0",
    background: "none",
    border: "none",
    cursor: setKontakte ? "pointer" : "not-allowed",
    fontSize: 11,
    color: setKontakte ? accent : t.muted,
    fontWeight: 700,
    fontFamily: "inherit"
  } }, "+ Neu anlegen")), neuOffen && setKontakte && /* @__PURE__ */ React.createElement("div", { style: {
    padding: "10px 12px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`
  } }, !nurFirmen && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setNeuTyp("person"), style: {
    flex: 1,
    padding: "5px 0",
    fontSize: 10,
    fontWeight: 700,
    background: neuTyp === "person" ? accent : "transparent",
    color: neuTyp === "person" ? "#fff" : t.sub,
    border: `1px solid ${neuTyp === "person" ? accent : t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit"
  } }, "Person"), /* @__PURE__ */ React.createElement("button", { onClick: () => setNeuTyp("firma"), style: {
    flex: 1,
    padding: "5px 0",
    fontSize: 10,
    fontWeight: 700,
    background: neuTyp === "firma" ? accent : "transparent",
    color: neuTyp === "firma" ? "#fff" : t.sub,
    border: `1px solid ${neuTyp === "firma" ? accent : t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit"
  } }, "Firma")), /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: neuName,
      onChange: (e) => setNeuName(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter" && neuName.trim()) neuAnlegen();
      },
      placeholder: neuTyp === "firma" ? "Firmen-Name" : "Vor- und Nachname",
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "6px 10px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit",
        marginBottom: 6
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setNeuOffen(false);
    setNeuName("");
  }, style: {
    flex: 1,
    padding: "5px 0",
    fontSize: 11,
    background: "transparent",
    color: t.sub,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: neuAnlegen,
      disabled: !neuName.trim(),
      style: {
        flex: 1,
        padding: "5px 0",
        fontSize: 11,
        fontWeight: 700,
        background: neuName.trim() ? accent : t.muted,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: neuName.trim() ? "pointer" : "not-allowed",
        fontFamily: "inherit"
      }
    },
    "Anlegen"
  )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 9, color: t.muted, fontStyle: "italic" } }, "Mehr Daten kannst du später in der Kontakt-Karte ergänzen.")), treffer.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px", fontSize: 11, color: t.muted, fontStyle: "italic" } }, "„", suche, '" nicht gefunden'), !nurFirmen && personen.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "5px 12px 3px",
    fontSize: 9,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    background: t.surface
  } }, "Personen"), personen.map((k) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: k.id,
      onClick: () => waehle(k),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "none",
        border: "none",
        borderBottom: `1px solid ${t.border}20`,
        padding: "8px 12px",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = `${accent}0C`,
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement(
      Avatar,
      {
        name: k.name,
        size: 26,
        accent,
        zuweisungen: k.objektZuweisungen
      }
    ),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: t.text } }, k.name), k.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, k.sub))
  ))), firmen.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "5px 12px 3px",
    fontSize: 9,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    background: t.surface
  } }, "Firmen"), firmen.map((k) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: k.id,
      onClick: () => waehle(k),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "none",
        border: "none",
        borderBottom: `1px solid ${t.border}20`,
        padding: "8px 12px",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = `${FC}0C`,
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement(Avatar, { name: k.name, firma: true, size: 26, accent: FC }),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: t.text } }, k.name), k.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, k.sub))
  ))))));
}
function WechselModal({ typ, einheit, t, accent = ACCENT, onSave, onClose, kontakte, setKontakte }) {
  const [bisDatum, setBis] = useState("");
  const [neuerKontakt, setNeu] = useState(null);
  const istET = typ === "eigentuemer";
  const titel = istET ? "Eigentümerwechsel" : "Mieterwechsel";
  const farbe = istET ? accent : "#0080FF";
  const aktuelleListe = istET ? einheit && einheit.eigentuemer || [] : einheit && einheit.mieter || [];
  const bisheriger = aktuelleListe.find((x) => !x.bis);
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    width: "100%",
    maxWidth: 420,
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "12px 16px",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    background: t.card,
    zIndex: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(I, { name: "arrow", size: 14, color: farbe }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, titel)), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer" } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 15, color: t.sub }))), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, bisheriger && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6
  } }, "Bisherige", istET ? "r Eigentümer" : "r Mieter"), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9
  } }, /* @__PURE__ */ React.createElement(
    Avatar,
    {
      name: bisheriger.name,
      size: 28,
      accent: farbe,
      zuweisungen: bisheriger.objektZuweisungen
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, bisheriger.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, bisheriger.von ? `seit ${bisheriger.von}` : ""))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("label", { style: {
    fontSize: 11,
    fontWeight: 600,
    color: t.sub,
    display: "block",
    marginBottom: 5
  } }, istET ? "Eigentum" : "Mietverhältnis", " endet am"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: bisDatum,
      onChange: (e) => setBis(e.target.value),
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${bisDatum ? farbe + "60" : t.border}`,
        borderRadius: 7,
        padding: "6px 10px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6
  } }, "Neu", istET ? "er Eigentümer" : "er Mieter"), /* @__PURE__ */ React.createElement(
    KontaktPicker,
    {
      value: neuerKontakt,
      onChange: setNeu,
      label: "",
      t,
      accent: farbe,
      editMode: true,
      kontakte: kontakte || [],
      setKontakte
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    flex: 1,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "9px 0",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (!neuerKontakt) return;
        let bis = bisDatum;
        if (bis && /^\d{4}-\d{2}-\d{2}$/.test(bis)) {
          const [y, m, d] = bis.split("-");
          bis = `${d}.${m}.${y}`;
        }
        onSave(neuerKontakt, bis);
        onClose();
      },
      disabled: !neuerKontakt,
      style: {
        flex: 2,
        background: neuerKontakt ? farbe : t.muted,
        border: "none",
        borderRadius: 8,
        padding: "9px 0",
        cursor: neuerKontakt ? "pointer" : "not-allowed",
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "inherit"
      }
    },
    "Wechsel speichern"
  )))));
}
function PersonCard({ p, pIndex = 0, farbe = ACCENT, isAktuell = true, t, kontakte = [] }) {
  const [offen, setOffen] = useState(pIndex === 0);
  if (!p) return null;
  const kontakt = p.kontaktId ? kontakte.find((k) => k.id === p.kontaktId) : null;
  const zuweisungen = kontakt && kontakt.typ !== "firma" ? kontakt.objektZuweisungen : null;
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: isAktuell ? farbe + "08" : "transparent",
    border: `1px solid ${isAktuell ? farbe + "30" : t.border}`,
    borderRadius: 9,
    marginBottom: 6,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setOffen((v) => !v), style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    cursor: "pointer"
  } }, /* @__PURE__ */ React.createElement(Avatar, { name: p.name, size: 30, accent: farbe, zuweisungen }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: isAktuell ? t.text : t.sub } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, p.von && `seit ${p.von}`, p.bis && ` · bis ${p.bis}`)), isAktuell && /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    padding: "1px 6px",
    borderRadius: 8,
    background: farbe + "20",
    color: farbe,
    fontWeight: 600
  } }, "aktuell"), /* @__PURE__ */ React.createElement("div", { style: { transition: "transform 0.2s", transform: offen ? "rotate(0)" : "rotate(-90deg)" } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 12, color: t.muted }))), offen && (() => {
    const tel = kontakt && kontakt.tels && kontakt.tels[0] && kontakt.tels[0].nr || kontakt && kontakt.tel || p.tel || "";
    const email = kontakt && kontakt.emails && kontakt.emails[0] && kontakt.emails[0].email || kontakt && kontakt.email || p.email || "";
    const adresse = kontakt ? [kontakt.strasse, kontakt.plzOrt].filter(Boolean).join(", ") : "";
    const hatInhalt = !!(tel || email || adresse || p.grundbuch);
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "0 12px 10px", borderTop: `1px solid ${t.border}30` } }, tel && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 6 } }, "📞 ", tel), email && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 3 } }, "✉ ", email), adresse && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 3 } }, "🏠 ", adresse), p.grundbuch && /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 10,
      color: farbe,
      marginTop: 6,
      padding: "2px 7px",
      display: "inline-block",
      background: farbe + "15",
      borderRadius: 6,
      fontWeight: 600
    } }, "✓ Grundbuch · Stimmrecht ETV"), !hatInhalt && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", marginTop: 6 } }, "Keine zusätzlichen Daten hinterlegt. Mehr in der Kontakt-Karte."));
  })());
}
function FieldRow({ field, index, t, accent, editMode, dragFrom, fields, setFields }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(field.value || "");
  const [over, setOver] = useState(false);
  const ft = FIELD_TYPES.find((f) => f.id === (field.type || "text")) || FIELD_TYPES[0];
  const save = () => {
    setEditing(false);
    setFields((fs) => fs.map((f, i) => i === index ? { ...f, value: val } : f));
  };
  const handleDrop = () => {
    if (dragFrom.current === null || dragFrom.current === index) {
      setOver(false);
      return;
    }
    const arr = [...fields];
    const [item] = arr.splice(dragFrom.current, 1);
    arr.splice(index, 0, item);
    setFields(arr);
    dragFrom.current = null;
    setOver(false);
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      draggable: editMode,
      onDragStart: () => {
        dragFrom.current = index;
      },
      onDragEnd: () => {
        dragFrom.current = null;
        setOver(false);
      },
      onDragOver: (e) => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop: handleDrop,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 2px",
        borderBottom: over ? `2px solid ${accent}` : `1px solid ${t.border}40`,
        background: over ? accent + "08" : "transparent",
        transition: "background 0.1s"
      }
    },
    editMode && /* @__PURE__ */ React.createElement("div", { style: { cursor: "grab", opacity: 0.3, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(I, { name: "drag", size: 11, color: t.muted })),
    /* @__PURE__ */ React.createElement("div", { style: { width: 130, fontSize: 11, color: t.sub, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: ft.color, opacity: 0.7 } }, ft.icon), field.name, field.required && /* @__PURE__ */ React.createElement("span", { style: { color: "#EF4444" } }, "*")),
    editing ? /* @__PURE__ */ React.createElement(
      "input",
      {
        autoFocus: true,
        value: val,
        onChange: (e) => setVal(e.target.value),
        onBlur: save,
        onKeyDown: (e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") {
            setVal(field.value || "");
            setEditing(false);
          }
        },
        type: field.type === "number" ? "number" : "text",
        style: {
          flex: 1,
          background: t.surface,
          border: `1px solid ${accent}60`,
          borderRadius: 6,
          padding: "3px 8px",
          fontSize: 12,
          color: t.text,
          outline: "none",
          fontFamily: "inherit"
        }
      }
    ) : field.type === "bool" ? /* @__PURE__ */ React.createElement("div", { onClick: () => editMode && setVal((v) => v === "ja" ? "nein" : "ja"), style: {
      width: 30,
      height: 17,
      borderRadius: 9,
      background: val === "ja" ? "#10B981" : t.border,
      position: "relative",
      cursor: editMode ? "pointer" : "default",
      transition: "background 0.2s",
      marginLeft: "auto"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 13,
      height: 13,
      borderRadius: "50%",
      background: "#fff",
      position: "absolute",
      top: 2,
      left: val === "ja" ? 15 : 2,
      transition: "left 0.2s"
    } })) : /* @__PURE__ */ React.createElement("span", { style: {
      flex: 1,
      fontSize: 11,
      color: val ? t.text : t.muted,
      fontWeight: val ? 500 : 400,
      textAlign: "right"
    } }, val || "—"),
    editMode && !editing && field.type !== "bool" && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setEditing(true),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 2,
          opacity: 0.35,
          transition: "opacity 0.15s"
        },
        onMouseEnter: (e) => e.currentTarget.style.opacity = 1,
        onMouseLeave: (e) => e.currentTarget.style.opacity = 0.35
      },
      /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: accent })
    ),
    editMode && !field.required && !field._stamm && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setFields((f) => f.filter((_, i) => i !== index)),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 2,
          opacity: 0.25,
          transition: "opacity 0.15s"
        },
        onMouseEnter: (e) => e.currentTarget.style.opacity = 0.8,
        onMouseLeave: (e) => e.currentTarget.style.opacity = 0.25
      },
      /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: "#EF4444" })
    )
  );
}
function AddFieldModal({ t, accent, kategorie, onAdd, onClose }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("text");
  const [autoD, setAutoD] = useState(false);
  const [reminder, setReminder] = useState(false);
  const sugg = SUGGESTIONS[kategorie] || SUGGESTIONS.gebaeude;
  const ft = FIELD_TYPES.find((f) => f.id === type) || FIELD_TYPES[0];
  const handleVal = (v) => {
    setValue(v);
    const d = detectType(v);
    if (d !== "text") {
      setType(d);
      setAutoD(true);
    } else setAutoD(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    width: "100%",
    maxWidth: 440,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "12px 16px",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 13, color: accent }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, "Neues Feld anlegen")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer" } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 15, color: t.sub }))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, marginBottom: 7 } }, /* @__PURE__ */ React.createElement(I, { name: "sparkles", size: 11, color: accent }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: accent,
    letterSpacing: "0.1em",
    textTransform: "uppercase"
  } }, "Vorschläge")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, sugg.map((s, i) => {
    const sft = FIELD_TYPES.find((f) => f.id === s.type) || FIELD_TYPES[0];
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => {
      setName(s.name);
      setType(s.type);
      setAutoD(false);
    }, style: {
      background: name === s.name ? accent + "20" : t.surface,
      border: `1px solid ${name === s.name ? accent + "60" : t.border}`,
      borderRadius: 7,
      padding: "4px 9px",
      cursor: "pointer",
      fontSize: 11,
      color: name === s.name ? accent : t.sub,
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontFamily: "inherit"
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10 } }, sft.icon), s.name);
  }))), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Feldname",
      value: name,
      onChange: setName,
      placeholder: "z.B. Umbaujahr, Legionellenprüfung...",
      t,
      accent,
      required: true
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 600, color: t.sub, display: "block", marginBottom: 4 } }, "Wert", autoD && /* @__PURE__ */ React.createElement("span", { style: {
    marginLeft: 8,
    fontSize: 9,
    color: ft.color,
    background: ft.color + "20",
    padding: "1px 6px",
    borderRadius: 5
  } }, "Erkannt: ", ft.label)), /* @__PURE__ */ React.createElement(
    "input",
    {
      value,
      onChange: (e) => handleVal(e.target.value),
      placeholder: type === "date" ? "tt.mm.jjjj" : type === "number" ? "z.B. 68.5" : "Wert eingeben...",
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: {
    fontSize: 11,
    fontWeight: 600,
    color: t.sub,
    display: "block",
    marginBottom: 6
  } }, "Feldtyp"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 } }, FIELD_TYPES.map((ft2) => /* @__PURE__ */ React.createElement("button", { key: ft2.id, onClick: () => {
    setType(ft2.id);
    setAutoD(false);
  }, style: {
    background: type === ft2.id ? ft2.color + "20" : t.surface,
    border: `1.5px solid ${type === ft2.id ? ft2.color : t.border}`,
    borderRadius: 8,
    padding: "7px 4px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    fontFamily: "inherit"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, ft2.icon), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    fontWeight: 600,
    color: type === ft2.id ? ft2.color : t.muted
  } }, ft2.label))))), type === "date" && /* @__PURE__ */ React.createElement("div", { style: {
    background: "#F59E0B10",
    border: "1px solid #F59E0B30",
    borderRadius: 9,
    padding: "9px 12px",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement(I, { name: "bell", size: 13, color: "#F59E0B" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: t.text } }, "Kalender-Erinnerung"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, "Datum erscheint im Kalender")), /* @__PURE__ */ React.createElement(Toggle, { value: reminder, onChange: setReminder, color: "#F59E0B" })), type === "number" && /* @__PURE__ */ React.createElement("div", { style: {
    background: "#0EA5C910",
    border: "1px solid #0EA5C930",
    borderRadius: 9,
    padding: "9px 12px",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 8
  } }, /* @__PURE__ */ React.createElement(I, { name: "calc", size: 13, color: "#0EA5C9" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, "Rechenfeld:"), " Flächen werden automatisch summiert.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    flex: 1,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "8px 0",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (!name.trim()) return;
        onAdd({ id: Date.now(), name: name.trim(), value, type, reminder: type === "date" && reminder });
        onClose();
      },
      disabled: !name.trim(),
      style: {
        flex: 2,
        background: name.trim() ? accent : t.muted,
        border: "none",
        borderRadius: 8,
        padding: "8px 0",
        cursor: name.trim() ? "pointer" : "not-allowed",
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "inherit"
      }
    },
    "Feld anlegen"
  )))));
}
function FieldList({ fields, setFields, t, accent, editMode, kategorie }) {
  const [showModal, setShowModal] = useState(false);
  const dragFrom = useRef(null);
  const flaechen = fields.filter((f) => f.type === "number" && f.name.toLowerCase().includes("fläche") && f.value);
  const gesamt = flaechen.reduce((s, f) => s + (parseFloat((f.value + "").replace(",", ".")) || 0), 0);
  return /* @__PURE__ */ React.createElement("div", null, fields.map((field, i) => /* @__PURE__ */ React.createElement(
    FieldRow,
    {
      key: field.id || i,
      field,
      index: i,
      t,
      accent,
      editMode,
      dragFrom,
      fields,
      setFields
    }
  )), flaechen.length > 1 && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 2px",
    borderBottom: `1px solid ${t.border}40`
  } }, /* @__PURE__ */ React.createElement(I, { name: "calc", size: 12, color: "#0EA5C9" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#0EA5C9", flex: 1 } }, "Gesamtfläche (berechnet)"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#0EA5C9" } }, gesamt.toFixed(1), " m²")), editMode && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowModal(true),
      style: {
        marginTop: 8,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: `1px dashed ${t.border}`,
        borderRadius: 7,
        padding: "6px 0",
        cursor: "pointer",
        justifyContent: "center",
        color: t.muted,
        fontSize: 11,
        transition: "all 0.15s",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = accent + "70";
        e.currentTarget.style.color = accent;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.color = t.muted;
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: "plus", size: 11, color: "currentColor" }),
    "Eigenes Feld hinzufügen"
  ), showModal && /* @__PURE__ */ React.createElement(
    AddFieldModal,
    {
      t,
      accent,
      kategorie,
      onAdd: (f) => setFields((v) => [...v, f]),
      onClose: () => setShowModal(false)
    }
  ));
}
function EinheitDetail({ einheit, t, accent, editMode, onClose, kontakte, setKontakte, onUpdate }) {
  const isStellplatz = isStellplatzTyp(einheit.typ);
  const initialEig = einheit.eigentuemer || [];
  const initialMie = einheit.mieter || [];
  const [tab, setTab] = useState(initialEig.length === 0 ? "eig" : "info");
  const [showWechsel, setShowWechsel] = useState(null);
  const [eig, setEig] = useState(initialEig);
  const [mie, setMie] = useState(initialMie);
  const [rechtsstatus, setRechtsstatus] = useState(einheit.rechtsstatus || "SE");
  const [fields, setFields] = useState(
    isStellplatz ? [
      { id: 0, name: "Nr.", value: einheit.nr || "", type: "text", required: true },
      { id: 1, name: "Verwaltungsnr.", value: einheit.verwNr, type: "text" },
      { id: 2, name: "Typ", value: einheit.typ, type: "text", required: true },
      { id: 3, name: "Lage", value: einheit.lage || "", type: "text" }
    ] : [
      { id: 0, name: "Nr.", value: einheit.nr || "", type: "text", required: true },
      { id: 1, name: "Verwaltungsnr.", value: einheit.verwNr, type: "text" },
      { id: 2, name: "Typ", value: einheit.typ, type: "text", required: true },
      { id: 3, name: "Fläche", value: einheit.flaeche || "", type: "number" },
      { id: 4, name: "MEA", value: einheit.mea || "", type: "number" },
      { id: 5, name: "Lage", value: einheit.lage || "", type: "text" },
      { id: 6, name: "Zimmer", value: einheit.zimmer || "", type: "number" }
    ]
  );
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!onUpdate) return;
    const updated = { ...einheit };
    fields.forEach((f) => {
      if (f.name === "Nr.") updated.nr = f.value;
      else if (f.name === "Verwaltungsnr.") updated.verwNr = f.value;
      else if (f.name === "Typ") updated.typ = f.value;
      else if (f.name === "Fläche") updated.flaeche = f.value;
      else if (f.name === "MEA") updated.mea = f.value;
      else if (f.name === "Lage") updated.lage = f.value;
      else if (f.name === "Zimmer") updated.zimmer = f.value;
    });
    updated.eigentuemer = eig;
    updated.mieter = mie;
    updated.rechtsstatus = rechtsstatus;
    onUpdate(updated);
  }, [fields, eig, mie, rechtsstatus]);
  const handleWechselSave = (neuerKontaktId, bisDatum) => {
    const kontakt = (kontakte || []).find((k) => k.id === neuerKontaktId);
    if (!kontakt) {
      setShowWechsel(null);
      return;
    }
    const neu = {
      name: kontakt.name || "",
      kontaktId: kontakt.id,
      von: (/* @__PURE__ */ new Date()).toLocaleDateString("de-DE"),
      bis: null,
      grundbuch: showWechsel === "eigentuemer"
    };
    if (showWechsel === "eigentuemer") {
      setEig((v) => [neu, ...v.map((e) => e.bis ? e : { ...e, bis: bisDatum || "—" })]);
    } else {
      setMie((v) => [neu, ...v.map((m) => m.bis ? m : { ...m, bis: bisDatum || "—" })]);
    }
    setShowWechsel(null);
  };
  const TABS = isStellplatz ? [{ id: "info", l: "Stammdaten", icon: "document" }, { id: "eig", l: "Eigentümer", icon: "user" }] : [{ id: "info", l: "Stammdaten", icon: "document" }, { id: "eig", l: "Eigentümer", icon: "user" }, { id: "mie", l: "Mieter", icon: "users" }];
  return /* @__PURE__ */ React.createElement("div", { style: { background: t.surface, borderTop: `1px solid ${t.border}`, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 4,
    background: t.bg,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: 3,
    marginBottom: 12
  } }, TABS.map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab(tb.id), style: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: "6px 0",
    background: tab === tb.id ? accent + "20" : "none",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: tab === tb.id ? 700 : 500,
    color: tab === tb.id ? accent : t.sub,
    fontFamily: "inherit"
  } }, /* @__PURE__ */ React.createElement(I, { name: tb.icon, size: 12, color: tab === tb.id ? accent : t.sub }), tb.l))), tab === "info" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    FieldList,
    {
      fields,
      setFields,
      t,
      accent,
      editMode,
      kategorie: "einheit"
    }
  ), isStellplatz && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 12,
    padding: "10px 12px",
    background: t.bg,
    border: `1px solid ${t.border}`,
    borderRadius: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: t.text, marginBottom: 7 } }, "Rechtsstatus"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, [{ id: "SE", l: "Sondereigentum" }, { id: "GE", l: "Gemeinschaft" }, { id: "SNR", l: "Sondernutzung" }].map((o) => /* @__PURE__ */ React.createElement("button", { key: o.id, onClick: () => editMode && setRechtsstatus(o.id), style: {
    flex: 1,
    padding: "5px 0",
    background: rechtsstatus === o.id ? accent + "20" : t.surface,
    border: `1px solid ${rechtsstatus === o.id ? accent : t.border}`,
    borderRadius: 6,
    cursor: editMode ? "pointer" : "default",
    fontSize: 10,
    fontWeight: 600,
    color: rechtsstatus === o.id ? accent : t.sub,
    fontFamily: "inherit"
  } }, o.l))))), tab === "eig" && /* @__PURE__ */ React.createElement("div", null, eig.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.muted,
    textAlign: "center",
    padding: "16px 0",
    fontStyle: "italic"
  } }, "Noch kein Eigentümer hinterlegt") : eig.map((p, i) => /* @__PURE__ */ React.createElement(PersonCard, { key: i, p, pIndex: i, farbe: accent, isAktuell: !p.bis, t, kontakte })), editMode && /* @__PURE__ */ React.createElement("button", { onClick: () => setShowWechsel("eigentuemer"), style: {
    width: "100%",
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: accent + "10",
    border: `1px solid ${accent}30`,
    borderRadius: 9,
    padding: "8px 0",
    cursor: "pointer",
    justifyContent: "center",
    color: accent,
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "inherit"
  } }, "Eigentümerwechsel")), tab === "mie" && /* @__PURE__ */ React.createElement("div", null, mie.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.muted,
    textAlign: "center",
    padding: "16px 0",
    fontStyle: "italic"
  } }, "Kein Mieter · Eigennutzung oder Leerstand") : mie.map((p, i) => /* @__PURE__ */ React.createElement(PersonCard, { key: i, p, pIndex: i, farbe: "#0080FF", isAktuell: !p.bis, t, kontakte })), editMode && /* @__PURE__ */ React.createElement("button", { onClick: () => setShowWechsel("mieter"), style: {
    width: "100%",
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#0080FF10",
    border: `1px solid #0080FF30`,
    borderRadius: 9,
    padding: "8px 0",
    cursor: "pointer",
    justifyContent: "center",
    color: "#0080FF",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "inherit"
  } }, "Mieterwechsel")), showWechsel && /* @__PURE__ */ React.createElement(
    WechselModal,
    {
      typ: showWechsel,
      einheit: { eigentuemer: eig, mieter: mie },
      t,
      accent,
      kontakte,
      setKontakte,
      onSave: handleWechselSave,
      onClose: () => setShowWechsel(null)
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, textAlign: "right" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 11,
    color: t.muted,
    padding: "4px 8px",
    textDecoration: "underline",
    fontFamily: "inherit"
  } }, "↑ Einklappen")));
}
function EinheitZeile({ einheit, t, accent, editMode, isActive, isOver, onToggle, onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop }) {
  const anzeige = useEinheitAnzeige();
  const aktiverEig = (einheit.eigentuemer || []).find((e) => !e.bis);
  const aktiverMieter = (einheit.mieter || []).find((m) => !m.bis);
  const istLeerstand = !aktiverEig && !aktiverMieter;
  const istSelbst = aktiverEig && aktiverEig.selbstnutzer;
  const keinEigentuemer = !aktiverEig;
  const nrText = einheit.nr != null ? String(einheit.nr) : "";
  const lageText = einheit.lage != null ? String(einheit.lage) : "";
  const flaecheText = einheit.flaeche != null ? String(einheit.flaeche) : "";
  const meaText = einheit.mea != null ? String(einheit.mea) : "";
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      draggable: editMode,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDragLeave,
      onDrop,
      style: {
        background: isOver ? accent + "10" : t.bg,
        border: `1px solid ${isOver ? accent : t.border}`,
        borderRadius: 8,
        marginBottom: 5,
        transition: "all 0.1s",
        overflow: "hidden"
      }
    },
    /* @__PURE__ */ React.createElement("div", { onClick: onToggle, style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 12px",
      cursor: "pointer"
    } }, editMode && /* @__PURE__ */ React.createElement("div", { style: { cursor: "grab", opacity: 0.35, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(I, { name: "drag", size: 11, color: t.muted })), /* @__PURE__ */ React.createElement("div", { style: {
      width: 32,
      height: 32,
      borderRadius: 7,
      flexShrink: 0,
      background: accent + "18",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 800, color: accent } }, nrText.replace(/^(WE|TE|SP|GE)[\s\-_]*/, ""))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, nrText, lageText && /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 400, color: t.sub, marginLeft: 5 } }, "· ", lageText)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" } }, anzeige.flaeche && flaecheText && /* @__PURE__ */ React.createElement("span", null, flaecheText), anzeige.mea && meaText && /* @__PURE__ */ React.createElement("span", null, "· MEA ", meaText), anzeige.eigentuemer && aktiverEig && /* @__PURE__ */ React.createElement("span", null, " · ET ", extractNachname(aktiverEig.name || "")), anzeige.mieter && aktiverMieter && /* @__PURE__ */ React.createElement("span", { style: { color: "#0080FF" } }, " · MT ", extractNachname(aktiverMieter.name || "")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3, flexShrink: 0 } }, keinEigentuemer && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 8,
      padding: "1px 5px",
      borderRadius: 5,
      background: accent + "15",
      color: accent,
      border: `1px solid ${accent}30`
    } }, "Eigentümer fehlt"), !keinEigentuemer && istSelbst && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 8,
      padding: "1px 5px",
      borderRadius: 5,
      background: "#10B98115",
      color: "#10B981"
    } }, "Eigennutzer"), !keinEigentuemer && !istSelbst && aktiverMieter && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 8,
      padding: "1px 5px",
      borderRadius: 5,
      background: "#0080FF15",
      color: "#0080FF"
    } }, "Vermietet"), istLeerstand && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 8,
      padding: "1px 5px",
      borderRadius: 5,
      background: "#FF8C0015",
      color: "#FF8C00"
    } }, "Leerstand")), /* @__PURE__ */ React.createElement(I, { name: isActive ? "chevD" : "chevR", size: 12, color: t.muted }))
  );
}
function PersonenAmObjektKarte({
  karte,
  t,
  accent,
  editMode,
  ve,
  kontakte,
  setKontakte,
  onRename,
  onRemove,
  onKontaktClick
}) {
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(karte.name);
  const [addOffen, setAddOffen] = useState(false);
  const personenRollen = useRollen();
  const ves = [];
  const personenMitZuw = (kontakte || []).filter(
    (k) => k.typ === "person" && (k.objektZuweisungen || []).some((z) => z.objektId === ve.id)
  );
  const handleAdd = (kontaktId, rolleEintrag) => {
    if (!setKontakte || !kontaktId) return;
    const neueZuw = { ...rolleEintrag, objektId: ve.id };
    setKontakte((prev) => prev.map((k) => {
      if (k.id !== kontaktId) return k;
      const liste = k.objektZuweisungen || [];
      return { ...k, objektZuweisungen: [...liste, neueZuw] };
    }));
    setAddOffen(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "11px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "👥"), renaming ? /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: name,
      onChange: (e) => setName(e.target.value),
      onBlur: () => {
        onRename && onRename(name);
        setRenaming(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          onRename && onRename(name);
          setRenaming(false);
        }
        if (e.key === "Escape") {
          setName(karte.name);
          setRenaming(false);
        }
      },
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, karte.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 2 } }, personenMitZuw.length === 0 ? "Keine Personen zugewiesen" : `${personenMitZuw.length} ${personenMitZuw.length === 1 ? "Person" : "Personen"}`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexShrink: 0 } }, editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setRenaming((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    transform: expanded ? "rotate(0)" : "rotate(-90deg)"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 11, color: t.sub })))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, personenMitZuw.length === 0 && !addOffen && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.muted,
    fontStyle: "italic",
    padding: "10px 0",
    textAlign: "center"
  } }, "Noch keine Personen für dieses Objekt zugewiesen."), personenMitZuw.map((p) => {
    const zuws = (p.objektZuweisungen || []).filter((z) => z.objektId === ve.id);
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: "8px 12px",
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 10
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => onKontaktClick && onKontaktClick(p.id), style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
      fontFamily: "inherit",
      minWidth: 0
    } }, /* @__PURE__ */ React.createElement(Avatar, { name: p.name, size: 32, accent, zuweisungen: p.objektZuweisungen }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: t.text } }, p.name), (p.tels || [])[0] && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub } }, p.tels[0].nr))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, zuws.map((z, i) => {
      const def = personenRollen.find((r) => r.name === z.rolle);
      if (!def) return null;
      const status = z.status || "aktiv";
      return /* @__PURE__ */ React.createElement(
        Tip,
        {
          key: i,
          text: def.name + (status !== "aktiv" ? ` (${status})` : "") + (z.vorsitz ? " · Vorsitz" : "")
        },
        /* @__PURE__ */ React.createElement("span", { style: {
          fontSize: 10,
          padding: "3px 8px",
          borderRadius: 12,
          background: status === "aktiv" ? def.color : "transparent",
          color: status === "aktiv" ? "#fff" : def.color,
          border: status === "aktiv" ? "none" : `1px ${status === "werdend" ? "dashed" : "solid"} ${def.color}`,
          fontWeight: 600,
          opacity: status === "ehemalig" ? 0.65 : 1
        } }, def.kuerzel, z.vorsitz ? "★" : "")
      );
    })));
  }), editMode && addOffen && /* @__PURE__ */ React.createElement(
    KontaktZuweisungForm,
    {
      t,
      accent,
      ves: [ve],
      kontakte,
      typ: "person",
      onSave: (kontaktId, rolleEintrag) => handleAdd(kontaktId, rolleEintrag),
      onCancel: () => setAddOffen(false)
    }
  ), editMode && !addOffen && /* @__PURE__ */ React.createElement("button", { onClick: () => setAddOffen(true), style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "none",
    border: `1.5px dashed ${accent}55`,
    borderRadius: 9,
    padding: "8px 0",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: accent,
    fontFamily: "inherit",
    marginTop: 4
  } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 13, color: accent }), "Person hinzufügen")));
}
function KontaktZuweisungForm({ t, accent, ves, kontakte, typ, onSave, onCancel }) {
  const [kontaktId, setKontaktId] = useState("");
  const [rolleEintrag, setRolleEintrag] = useState(null);
  const passendeKontakte = (kontakte || []).filter((k) => k.typ === typ);
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: accent, marginBottom: 8 } }, typ === "person" ? "Person zuweisen" : "Firma zuweisen"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("select", { value: kontaktId, onChange: (e) => setKontaktId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, typ === "person" ? "Person wählen…" : "Firma wählen…"), passendeKontakte.map((k) => /* @__PURE__ */ React.createElement("option", { key: k.id, value: k.id }, k.name)))), kontaktId && !rolleEintrag && /* @__PURE__ */ React.createElement(
    RolleEditor,
    {
      initial: { objektId: ves[0] ? ves[0].id : "" },
      ves,
      kontakte,
      t,
      accent,
      typ,
      onCancel,
      onSave: (eintrag) => onSave(Number(kontaktId), eintrag)
    }
  ), !kontaktId && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen")));
}
function DienstleisterKarte({
  karte,
  t,
  accent,
  editMode,
  ve,
  kontakte,
  setKontakte,
  onRename,
  onRemove,
  onKontaktClick
}) {
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(karte.name);
  const [addOffen, setAddOffen] = useState(false);
  const firmenRollen = useFirmenRollen();
  const firmenMitZuweisung = (kontakte || []).filter(
    (k) => k.typ === "firma" && (k.objektZuweisungen || []).some((z) => z.objektId === ve.id)
  );
  const handleAdd = (kontaktId, rolleEintrag) => {
    if (!setKontakte || !kontaktId) return;
    const neueZuw = { ...rolleEintrag, objektId: ve.id };
    setKontakte((prev) => prev.map((k) => {
      if (k.id !== kontaktId) return k;
      const liste = k.objektZuweisungen || [];
      return { ...k, objektZuweisungen: [...liste, neueZuw] };
    }));
    setAddOffen(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "11px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "🤝"), renaming ? /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: name,
      onChange: (e) => setName(e.target.value),
      onBlur: () => {
        onRename && onRename(name);
        setRenaming(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          onRename && onRename(name);
          setRenaming(false);
        }
        if (e.key === "Escape") {
          setName(karte.name);
          setRenaming(false);
        }
      },
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, karte.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 2 } }, firmenMitZuweisung.length === 0 ? "Keine Firmen zugewiesen" : `${firmenMitZuweisung.length} ${firmenMitZuweisung.length === 1 ? "Firma" : "Firmen"} zugewiesen`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexShrink: 0 } }, editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setRenaming((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    transform: expanded ? "rotate(0)" : "rotate(-90deg)"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 11, color: t.sub })))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, firmenMitZuweisung.length === 0 && !addOffen && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.muted,
    fontStyle: "italic",
    padding: "10px 0",
    textAlign: "center"
  } }, "Noch keine Firmen für dieses Objekt zugewiesen."), firmenMitZuweisung.map((firma) => {
    const zuws = (firma.objektZuweisungen || []).filter((z) => z.objektId === ve.id);
    return /* @__PURE__ */ React.createElement("div", { key: firma.id, style: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: "8px 12px",
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 10
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => onKontaktClick && onKontaktClick(firma.id), style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
      fontFamily: "inherit",
      minWidth: 0
    } }, /* @__PURE__ */ React.createElement(Avatar, { name: firma.name, firma: true, size: 30, accent: FC }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: t.text } }, firma.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub } }, (firma.gewerke || []).slice(0, 3).join(" · ") || firma.sub || ""))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, zuws.map((z, i) => {
      const def = firmenRollen.find((r) => r.name === z.rolle);
      if (!def) return null;
      const status = z.status || "aktiv";
      return /* @__PURE__ */ React.createElement("span", { key: i, style: {
        fontSize: 10,
        padding: "3px 8px",
        borderRadius: 12,
        background: status === "aktiv" ? def.color : "transparent",
        color: status === "aktiv" ? "#fff" : def.color,
        border: status === "aktiv" ? "none" : `1px ${status === "werdend" ? "dashed" : "solid"} ${def.color}`,
        fontWeight: 600,
        opacity: status === "ehemalig" ? 0.65 : 1
      } }, def.name);
    })));
  }), editMode && addOffen && /* @__PURE__ */ React.createElement(
    KontaktZuweisungForm,
    {
      t,
      accent,
      ves: [ve],
      kontakte,
      typ: "firma",
      onSave: (kontaktId, rolleEintrag) => handleAdd(kontaktId, rolleEintrag),
      onCancel: () => setAddOffen(false)
    }
  ), editMode && !addOffen && /* @__PURE__ */ React.createElement("button", { onClick: () => setAddOffen(true), style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "none",
    border: `1.5px dashed ${accent}55`,
    borderRadius: 9,
    padding: "8px 0",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: accent,
    fontFamily: "inherit",
    marginTop: 4
  } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 13, color: accent }), "Firma zuweisen")));
}
const VERTRAG_TYPEN = [
  "Wartungsvertrag",
  "Versorger-Vertrag",
  "Versicherungsvertrag",
  "Hausmeistervertrag",
  "Reinigungsvertrag",
  "Winterdienst",
  "Grünpflege",
  "Müllabfuhr",
  "Brandschutz",
  "Sonstiges"
];
function VertraegeKarte({ karte, t, accent, editMode, kontakte, onUpdateKarte, onRename, onRemove, onKontaktClick }) {
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(karte.name);
  const [neuerVertragForm, setNeuerVertragForm] = useState(false);
  const vertraege = karte.vertraege || [];
  useEffect(() => {
    if (!editMode) {
      setNeuerVertragForm(false);
      setRenaming(false);
    }
  }, [editMode]);
  const addVertrag = (v) => {
    onUpdateKarte({ ...karte, vertraege: [...vertraege, { id: Date.now(), ...v }] });
    setNeuerVertragForm(false);
  };
  const removeVertrag = (id) => {
    onUpdateKarte({ ...karte, vertraege: vertraege.filter((v) => v.id !== id) });
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "11px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "📄"), renaming ? /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: name,
      onChange: (e) => setName(e.target.value),
      onBlur: () => {
        onRename && onRename(name);
        setRenaming(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          onRename && onRename(name);
          setRenaming(false);
        }
        if (e.key === "Escape") {
          setName(karte.name);
          setRenaming(false);
        }
      },
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, karte.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 2 } }, vertraege.length === 0 ? "Keine Verträge" : `${vertraege.length} ${vertraege.length === 1 ? "Vertrag" : "Verträge"}`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexShrink: 0 } }, editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setRenaming((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    transform: expanded ? "rotate(0)" : "rotate(-90deg)"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 11, color: t.sub })))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, vertraege.length === 0 && !neuerVertragForm && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.muted,
    fontStyle: "italic",
    padding: "10px 0",
    textAlign: "center"
  } }, "Noch keine Verträge angelegt.", editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("br", null), 'Mit „+ Vertrag hinzufügen" anlegen.')), vertraege.map((v) => {
    const firma = (kontakte || []).find((k) => k.id === v.firmaId);
    return /* @__PURE__ */ React.createElement("div", { key: v.id, style: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: "8px 12px",
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 10
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "📄"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: t.text } }, v.typ, v.leistung ? " · " + v.leistung : ""), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub } }, firma ? /* @__PURE__ */ React.createElement("button", { onClick: () => onKontaktClick && onKontaktClick(firma.id), style: {
      background: "none",
      border: "none",
      color: accent,
      cursor: "pointer",
      padding: 0,
      fontFamily: "inherit",
      fontSize: 11,
      textDecoration: "underline"
    } }, firma.name) : "Keine Firma verknüpft", v.ab && ` · ab ${v.ab}`, v.bis && ` · bis ${v.bis}`)), v.vertragsnr && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 9,
      color: t.muted,
      padding: "2px 6px",
      background: t.card,
      borderRadius: 4
    } }, v.vertragsnr), editMode && /* @__PURE__ */ React.createElement("button", { onClick: () => removeVertrag(v.id), style: {
      background: "none",
      border: `1px solid ${t.border}`,
      borderRadius: 6,
      width: 24,
      height: 24,
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub })));
  }), editMode && neuerVertragForm && /* @__PURE__ */ React.createElement(
    VertragForm,
    {
      t,
      accent,
      kontakte,
      onSave: addVertrag,
      onCancel: () => setNeuerVertragForm(false)
    }
  ), editMode && !neuerVertragForm && /* @__PURE__ */ React.createElement("button", { onClick: () => setNeuerVertragForm(true), style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "none",
    border: `1.5px dashed ${accent}55`,
    borderRadius: 9,
    padding: "8px 0",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    color: accent,
    fontFamily: "inherit",
    marginTop: 4
  } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 13, color: accent }), "Vertrag hinzufügen")));
}
function VertragForm({ t, accent, kontakte, onSave, onCancel }) {
  const [typ, setTyp] = useState("");
  const [leistung, setLeistung] = useState("");
  const [firmaId, setFirmaId] = useState("");
  const [vertragsnr, setVertragsnr] = useState("");
  const [ab, setAb] = useState("");
  const [bis, setBis] = useState("");
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  const valid = typ;
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: accent, marginBottom: 8 } }, "Neuer Vertrag"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } }, /* @__PURE__ */ React.createElement("select", { value: typ, onChange: (e) => setTyp(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Vertragstyp wählen…"), VERTRAG_TYPEN.map((x) => /* @__PURE__ */ React.createElement("option", { key: x, value: x }, x))), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Leistung (z. B. Heizung, Aufzug)",
      value: leistung,
      onChange: (e) => setLeistung(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement("select", { value: firmaId, onChange: (e) => setFirmaId(e.target.value), style: { ...inputStyle, gridColumn: "1 / -1" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Firma wählen (optional)…"), (kontakte || []).filter((k) => k.typ === "firma").map(
    (f) => /* @__PURE__ */ React.createElement("option", { key: f.id, value: f.id }, f.name)
  )), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Vertrags-Nr.",
      value: vertragsnr,
      onChange: (e) => setVertragsnr(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Ab (z. B. 01.01.2024)",
      value: ab,
      onChange: (e) => setAb(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Bis (optional)",
      value: bis,
      onChange: (e) => setBis(e.target.value),
      style: { ...inputStyle, gridColumn: "1 / -1" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onSave({ typ, leistung, firmaId: firmaId ? Number(firmaId) : null, vertragsnr, ab, bis }),
      disabled: !valid,
      style: {
        fontSize: 11,
        padding: "5px 12px",
        background: valid ? accent : t.muted,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: valid ? "pointer" : "not-allowed",
        fontWeight: 600,
        fontFamily: "inherit",
        opacity: valid ? 1 : 0.6
      }
    },
    "Hinzufügen"
  )));
}
const TECHNIK_GERAET_TYPEN = [
  { id: "heizung", label: "Heizung", icon: "🔥" },
  { id: "aufzug", label: "Aufzug", icon: "🛗" },
  { id: "lueftung", label: "Lüftung", icon: "💨" },
  { id: "hebeanlage", label: "Hebeanlage", icon: "⬆" },
  { id: "doppelparker", label: "Doppelparker", icon: "🅿️" },
  { id: "garagentor", label: "Garagentor", icon: "🚪" },
  { id: "schranke", label: "Schranke", icon: "🚧" },
  { id: "automatiktuer", label: "Automatik-Tür", icon: "🚪" },
  { id: "pv", label: "PV-Anlage", icon: "☀" },
  { id: "zaehler", label: "Zähler", icon: "🔢" }
];
function TechnikKarte({ karte, t, accent, editMode, onRename, onRemove, onUpdateKarte, haeuser = [] }) {
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(karte.name);
  const [neuesGeraet, setNeuesGeraet] = useState(null);
  const [editGeraetId, setEditGeraetId] = useState(null);
  const geraete = karte.technikGeraete || [];
  useEffect(() => {
    if (!editMode) {
      setNeuesGeraet(null);
      setEditGeraetId(null);
      setRenaming(false);
    }
  }, [editMode]);
  const addGeraet = (typId, daten) => {
    const def = TECHNIK_GERAET_TYPEN.find((x) => x.id === typId);
    const istCustom = typId === "custom";
    const eintrag = {
      id: Date.now(),
      typ: typId,
      typLabel: daten.typLabel || (def ? def.label : "Gerät"),
      icon: daten.icon || (def ? def.icon : "⚙"),
      hersteller: daten.hersteller || "",
      baujahr: daten.baujahr || "",
      nummer: daten.nummer || "",
      notruf: daten.notruf || "",
      standort: daten.standort || "",
      zugang: daten.zugang || "",
      felder: daten.felder || []
    };
    onUpdateKarte({ ...karte, technikGeraete: [...geraete, eintrag] });
    setNeuesGeraet(null);
  };
  const updateGeraet = (id, daten) => {
    onUpdateKarte({ ...karte, technikGeraete: geraete.map((g) => g.id === id ? { ...g, ...daten } : g) });
    setEditGeraetId(null);
  };
  const removeGeraet = (id) => {
    onUpdateKarte({ ...karte, technikGeraete: geraete.filter((g) => g.id !== id) });
    if (editGeraetId === id) setEditGeraetId(null);
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "11px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "⚙"), renaming ? /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: name,
      onChange: (e) => setName(e.target.value),
      onBlur: () => {
        onRename && onRename(name);
        setRenaming(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          onRename && onRename(name);
          setRenaming(false);
        }
        if (e.key === "Escape") {
          setName(karte.name);
          setRenaming(false);
        }
      },
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, karte.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 2 } }, geraete.length === 0 ? "Keine Geräte hinterlegt" : `${geraete.length} ${geraete.length === 1 ? "Gerät" : "Geräte"}`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexShrink: 0 } }, editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setRenaming((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
    transform: expanded ? "rotate(0)" : "rotate(-90deg)"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 11, color: t.sub })))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, geraete.length === 0 && !neuesGeraet && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.muted,
    fontStyle: "italic",
    padding: "10px 0",
    textAlign: "center"
  } }, "Noch keine technischen Anlagen hinterlegt.", editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("br", null), 'Mit „+ Gerät hinzufügen" anlegen.')), geraete.map((g) => editMode && editGeraetId === g.id ? /* @__PURE__ */ React.createElement(
    TechnikGeraetForm,
    {
      key: "e" + g.id,
      typ: g.typ || "custom",
      initial: g,
      t,
      accent,
      haeuser,
      onCancel: () => setEditGeraetId(null),
      onSave: (daten) => updateGeraet(g.id, daten)
    }
  ) : /* @__PURE__ */ React.createElement("div", { key: g.id, style: {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "10px 12px",
    marginBottom: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, g.icon || "⚙"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, g.typLabel), g.hersteller && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub } }, g.hersteller, g.baujahr ? ` · ${g.baujahr}` : "")), editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditGeraetId(g.id), title: "Bearbeiten", style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 24,
    height: 24,
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), /* @__PURE__ */ React.createElement("button", { onClick: () => removeGeraet(g.id), title: "Entfernen", style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 24,
    height: 24,
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub })))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, display: "flex", gap: 12, flexWrap: "wrap" } }, g.nummer && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: t.muted, fontWeight: 600 } }, "Nr.:"), " ", g.nummer), (() => {
    const haus = g.hausId ? haeuser.find((h) => String(h.id) === String(g.hausId)) : null;
    const raum = haus && g.raumId ? (haus.raeume || []).find((r) => String(r.id) === String(g.raumId)) : null;
    if (!haus && !g.standort) return null;
    const parts = [];
    if (haus) parts.push(haus.name);
    if (raum) parts.push(raum.name + (raum.lage ? ` (${raum.lage})` : ""));
    if (g.standort) parts.push(g.standort);
    return /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: t.muted, fontWeight: 600 } }, "📍"), " ", parts.join(" · "));
  })(), g.notruf && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: t.muted, fontWeight: 600 } }, "Notruf:"), " ", g.notruf), g.zugang && /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", { style: { color: t.muted, fontWeight: 600 } }, "Zugang:"), " ", g.zugang)), Array.isArray(g.felder) && g.felder.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.sub,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 4,
    paddingTop: 6,
    borderTop: `1px dashed ${t.border}50`
  } }, g.felder.map((f) => f.name && /* @__PURE__ */ React.createElement("span", { key: f.id }, /* @__PURE__ */ React.createElement("strong", { style: { color: t.muted, fontWeight: 600 } }, f.name, ":"), " ", f.value || /* @__PURE__ */ React.createElement("span", { style: { color: t.muted, fontStyle: "italic" } }, "—")))))), editMode && neuesGeraet && /* @__PURE__ */ React.createElement(
    TechnikGeraetForm,
    {
      typ: neuesGeraet.typ,
      t,
      accent,
      haeuser,
      onCancel: () => setNeuesGeraet(null),
      onSave: (daten) => addGeraet(neuesGeraet.typ, daten)
    }
  ), editMode && !neuesGeraet && editGeraetId === null && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 6
  } }, "+ Gerät hinzufügen"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, TECHNIK_GERAET_TYPEN.map((typ) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: typ.id,
      onClick: () => setNeuesGeraet({ typ: typ.id }),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 16,
        cursor: "pointer",
        background: t.surface,
        border: `1px solid ${t.border}`,
        color: t.sub,
        fontFamily: "inherit",
        transition: "all 0.12s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.color = accent;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.color = t.sub;
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, typ.icon),
    typ.label
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setNeuesGeraet({ typ: "custom" }),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 16,
        cursor: "pointer",
        background: accent + "12",
        border: `1px dashed ${accent}`,
        color: accent,
        fontFamily: "inherit",
        transition: "all 0.12s",
        fontWeight: 600
      },
      onMouseEnter: (e) => e.currentTarget.style.background = accent + "20",
      onMouseLeave: (e) => e.currentTarget.style.background = accent + "12"
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, "＋"),
    "Eigene Anlage"
  )))));
}
function TechnikGeraetForm({ typ, initial = null, t, accent, onSave, onCancel, haeuser = [] }) {
  const istEdit = !!initial;
  const istCustom = typ === "custom" || initial && initial.typ === "custom";
  const def = TECHNIK_GERAET_TYPEN.find((x) => x.id === typ);
  const [typLabel, setTypLabel] = useState(initial ? initial.typLabel : def ? def.label : "");
  const [icon, setIcon] = useState(initial ? initial.icon : def ? def.icon : "⚙");
  const [hersteller, setHersteller] = useState(initial ? initial.hersteller || "" : "");
  const [baujahr, setBaujahr] = useState(initial ? initial.baujahr || "" : "");
  const [nummer, setNummer] = useState(initial ? initial.nummer || "" : "");
  const [notruf, setNotruf] = useState(initial ? initial.notruf || "" : "");
  const [standort, setStandort] = useState(initial ? initial.standort || "" : "");
  const [zugang, setZugang] = useState(initial ? initial.zugang || "" : "");
  const [hausId, setHausId] = useState(initial ? initial.hausId || "" : "");
  const [raumId, setRaumId] = useState(initial ? initial.raumId || "" : "");
  const aktHaus = haeuser.find((h) => String(h.id) === String(hausId));
  const verfRaeume = aktHaus ? aktHaus.raeume || [] : [];
  const [felder, setFelder] = useState(initial && Array.isArray(initial.felder) ? initial.felder : []);
  const [neuesFeldName, setNeuesFeldName] = useState("");
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  const miniBtn = {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 24,
    height: 24,
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const ICON_VORSCHLAEGE = ["⚙", "🔧", "🔌", "💡", "💧", "🚿", "🚰", "🧯", "📡", "🔋", "🛢", "🌡", "🎛", "🔔"];
  const addFeld = () => {
    const n = neuesFeldName.trim();
    if (!n) return;
    setFelder([...felder, { id: Date.now(), name: n, value: "" }]);
    setNeuesFeldName("");
  };
  const updateFeldValue = (id, value) => setFelder(felder.map((f) => f.id === id ? { ...f, value } : f));
  const updateFeldName = (id, name) => setFelder(felder.map((f) => f.id === id ? { ...f, name } : f));
  const removeFeld = (id) => setFelder(felder.filter((f) => f.id !== id));
  const valid = istCustom ? typLabel.trim().length > 0 : true;
  const handleSave = () => {
    if (!valid) return;
    onSave({
      typLabel: typLabel.trim() || (def ? def.label : "Gerät"),
      icon,
      hersteller,
      baujahr,
      nummer,
      notruf,
      standort,
      zugang,
      hausId: hausId || null,
      raumId: raumId || null,
      felder: felder.filter((f) => f.name && f.name.trim())
    });
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 6,
    marginBottom: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: accent,
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 6
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, icon), istEdit ? "Bearbeiten" : "Neu", ": ", istCustom ? typLabel || "Eigene Anlage" : def ? def.label : "Gerät"), istCustom && /* @__PURE__ */ React.createElement("div", { style: {
    marginBottom: 8,
    padding: "8px 10px",
    background: t.surface,
    borderRadius: 7,
    border: `1px solid ${t.border}`
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 6
  } }, "Anlagen-Typ"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Bezeichnung (z. B. Druckerhöhungsanlage)",
      value: typLabel,
      onChange: (e) => setTypLabel(e.target.value),
      style: { ...inputStyle, marginBottom: 6 }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, marginBottom: 4 } }, "Icon wählen:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, ICON_VORSCHLAEGE.map((em) => /* @__PURE__ */ React.createElement("button", { key: em, onClick: () => setIcon(em), style: {
    width: 28,
    height: 28,
    borderRadius: 6,
    cursor: "pointer",
    background: icon === em ? accent + "22" : t.card,
    border: `1px solid ${icon === em ? accent : t.border}`,
    fontSize: 14,
    padding: 0,
    fontFamily: "inherit"
  } }, em)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Hersteller",
      value: hersteller,
      onChange: (e) => setHersteller(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "Baujahr",
      value: baujahr,
      onChange: (e) => setBaujahr(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Nummer / Serien-Nr.",
      value: nummer,
      onChange: (e) => setNummer(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Kontakt / Notruf",
      value: notruf,
      onChange: (e) => setNotruf(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Standort (Freitext)",
      value: standort,
      onChange: (e) => setStandort(e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Zugang",
      value: zugang,
      onChange: (e) => setZugang(e.target.value),
      style: inputStyle
    }
  )), haeuser.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 3
  } }, "Haus"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: hausId,
      onChange: (e) => {
        setHausId(e.target.value);
        setRaumId("");
      },
      style: inputStyle
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "— ohne Zuordnung —"),
    haeuser.map((h) => /* @__PURE__ */ React.createElement("option", { key: h.id, value: h.id }, h.name))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 3
  } }, "Raum"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: raumId,
      onChange: (e) => setRaumId(e.target.value),
      disabled: !hausId || verfRaeume.length === 0,
      style: {
        ...inputStyle,
        opacity: !hausId || verfRaeume.length === 0 ? 0.5 : 1
      }
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, !hausId ? "— erst Haus wählen —" : verfRaeume.length === 0 ? "— keine Räume vorhanden —" : "— ohne Raum —"),
    verfRaeume.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, r.name, r.lage ? ` (${r.lage})` : ""))
  ))), felder.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 6
  } }, "Weitere Felder (", felder.length, ")"), felder.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.id, style: { display: "flex", gap: 4, alignItems: "center", marginBottom: 4 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Feldname",
      value: f.name,
      onChange: (e) => updateFeldName(f.id, e.target.value),
      style: { ...inputStyle, flex: "0 0 38%" }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Wert",
      value: f.value,
      onChange: (e) => updateFeldValue(f.id, e.target.value),
      style: { ...inputStyle, flex: 1 }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => removeFeld(f.id), style: miniBtn, title: "Feld entfernen" }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center", marginTop: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Eigenes Feld (z. B. Wartungsintervall)",
      value: neuesFeldName,
      onChange: (e) => setNeuesFeldName(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addFeld();
        }
      },
      style: { ...inputStyle, flex: 1 }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: addFeld, disabled: !neuesFeldName.trim(), style: {
    fontSize: 11,
    padding: "5px 10px",
    background: neuesFeldName.trim() ? accent + "20" : t.surface,
    color: neuesFeldName.trim() ? accent : t.muted,
    border: `1px solid ${neuesFeldName.trim() ? accent + "50" : t.border}`,
    borderRadius: 6,
    cursor: neuesFeldName.trim() ? "pointer" : "not-allowed",
    fontWeight: 600,
    fontFamily: "inherit",
    flexShrink: 0
  } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 11, color: neuesFeldName.trim() ? accent : t.muted }), " Feld")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: handleSave, disabled: !valid, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: valid ? accent : t.muted,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: valid ? "pointer" : "not-allowed",
    fontWeight: 600,
    fontFamily: "inherit",
    opacity: valid ? 1 : 0.6
  } }, istEdit ? "Übernehmen" : "Hinzufügen")));
}
function GebaeudeKarte({ karte, t, accent, editMode, onRename, onRemove, kontakte, setKontakte, onUpdateKarte, einheitenStats }) {
  const rechnungsadresseAn = useRechnungsadresseAn();
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(karte.name);
  const [activeEinheit, setActiveEinheit] = useState(null);
  const [allFields, setAllFields] = useState(
    () => [...(karte.stamm || []).map((f) => ({ ...f, _stamm: true })), ...karte.felder || []]
  );
  const [localEinheiten, setLocalEinheiten] = useState(karte.einheiten || []);
  const [overIdx, setOverIdx] = useState(null);
  const dragUnitFrom = useRef(null);
  const fieldsFirstRender = useRef(true);
  useEffect(() => {
    if (fieldsFirstRender.current) {
      fieldsFirstRender.current = false;
      return;
    }
    if (!onUpdateKarte) return;
    const stamm = allFields.filter((f) => f._stamm).map((f) => {
      const { _stamm, ...rest } = f;
      return rest;
    });
    const felder = allFields.filter((f) => !f._stamm);
    onUpdateKarte({ ...karte, stamm, felder });
  }, [allFields]);
  const istGebaeude = karte.kategorie === "gebaeude" || karte.kategorie === "stammdaten" && !karte.fixed;
  const [raeume, setRaeume] = useState(karte.raeume || []);
  const [neuerRaumName, setNeuerRaumName] = useState("");
  const [neuerRaumLage, setNeuerRaumLage] = useState("");
  const persistRaeume = (neu) => {
    setRaeume(neu);
    if (onUpdateKarte) onUpdateKarte({ ...karte, raeume: neu });
  };
  const addRaum = () => {
    const n = neuerRaumName.trim();
    if (!n) return;
    persistRaeume([...raeume, { id: Date.now(), name: n, lage: neuerRaumLage.trim() }]);
    setNeuerRaumName("");
    setNeuerRaumLage("");
  };
  const removeRaum = (id) => persistRaeume(raeume.filter((r) => r.id !== id));
  const updateRaum = (id, daten) => persistRaeume(raeume.map((r) => r.id === id ? { ...r, ...daten } : r));
  const isTG = karte.kategorie === "tiefgarage" || karte.kategorie === "stellplatz";
  const [neueEinheitOffen, setNeueEinheitOffen] = useState(false);
  const defaultTyp = isTG ? "Stellplatz" : "Wohneigentum";
  const [neueEinheit, setNeueEinheit] = useState({
    typ: defaultTyp,
    nr: "",
    lage: "",
    flaeche: "",
    zimmer: "",
    mea: ""
  });
  const persistEinheiten = (neu) => {
    setLocalEinheiten(neu);
    if (onUpdateKarte) onUpdateKarte({ ...karte, einheiten: neu });
  };
  const addEinheit = () => {
    if (!neueEinheit.nr.trim()) return;
    const eintrag = {
      id: `e-${Date.now()}`,
      nr: neueEinheit.nr.trim(),
      verwNr: "",
      typ: neueEinheit.typ,
      flaeche: neueEinheit.flaeche.trim() ? neueEinheit.flaeche.endsWith("²") ? neueEinheit.flaeche : `${neueEinheit.flaeche} m²` : "",
      mea: neueEinheit.mea.trim(),
      lage: neueEinheit.lage.trim(),
      zimmer: neueEinheit.zimmer.trim(),
      eigentuemer: [],
      mieter: []
    };
    persistEinheiten([...localEinheiten, eintrag]);
    setNeueEinheit({ typ: defaultTyp, nr: "", lage: "", flaeche: "", zimmer: "", mea: "" });
    setNeueEinheitOffen(false);
  };
  const removeEinheit = (id) => persistEinheiten(localEinheiten.filter((e) => e.id !== id));
  useEffect(() => {
    if (!editMode) {
      setNeueEinheitOffen(false);
      setRenaming(false);
      setNeuerRaumName("");
      setNeuerRaumLage("");
    }
  }, [editMode]);
  const wohnM2 = localEinheiten.filter((e) => e.typ !== "Teileigentum" && !isStellplatzTyp(e.typ)).reduce((s, e) => s + parseM2(e.flaeche), 0);
  const nutzM2 = localEinheiten.filter((e) => e.typ === "Teileigentum").reduce((s, e) => s + parseM2(e.flaeche), 0);
  const stellplaetze = localEinheiten.filter((e) => isStellplatzTyp(e.typ));
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "11px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, karte.icon), renaming ? /* @__PURE__ */ React.createElement(
    "input",
    {
      autoFocus: true,
      value: name,
      onChange: (e) => setName(e.target.value),
      onBlur: () => {
        onRename && onRename(name);
        setRenaming(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          onRename && onRename(name);
          setRenaming(false);
        }
        if (e.key === "Escape") {
          setName(karte.name);
          setRenaming(false);
        }
      },
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${accent}`,
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, karte.name), (wohnM2 > 0 || nutzM2 > 0 || localEinheiten.length > 0) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, display: "flex", gap: 5, flexWrap: "wrap", marginTop: 2 } }, wohnM2 > 0 && /* @__PURE__ */ React.createElement("span", null, wohnM2.toFixed(0), " m² Wohnfl."), nutzM2 > 0 && /* @__PURE__ */ React.createElement("span", null, "· ", nutzM2.toFixed(0), " m² Nutzfl."), localEinheiten.length > 0 && /* @__PURE__ */ React.createElement("span", null, "· ", localEinheiten.length, " Einheiten"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexShrink: 0 } }, editMode && !karte.fixed && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setRenaming((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })), onRemove && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "trash", size: 11, color: t.sub }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpanded((v) => !v), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 26,
    height: 26,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
    transition: "transform 0.2s"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 13, color: t.sub })))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, allFields.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: localEinheiten.length > 0 ? 14 : 0 } }, /* @__PURE__ */ React.createElement(
    FieldList,
    {
      fields: allFields,
      setFields: setAllFields,
      t,
      accent,
      editMode,
      kategorie: karte.kategorie
    }
  )), karte.fixed && karte.kategorie === "stammdaten" && einheitenStats && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 12,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "10px 13px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, "📊"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: t.text } }, "Einheiten-Übersicht"), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    color: t.muted,
    background: t.card,
    border: `1px solid ${t.border}`,
    padding: "1px 6px",
    borderRadius: 5
  } }, "auto")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 6 } }, einheitenStats.wohnungen > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub } }, "🏠 Wohnungen"), /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 600 } }, einheitenStats.wohnungen)), einheitenStats.gewerbe > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub } }, "🏪 Teileigentum / Gewerbe"), /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 600 } }, einheitenStats.gewerbe)), einheitenStats.stellplaetzeSE > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub } }, "🅿️ Stellplätze (Sondereigentum)"), /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 600 } }, einheitenStats.stellplaetzeSE)), einheitenStats.stellplaetzeSN > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub } }, "🅿️ Stellplätze (Sondernutzung)"), /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 600 } }, einheitenStats.stellplaetzeSN)), einheitenStats.wohnungen + einheitenStats.gewerbe + einheitenStats.stellplaetzeSE + einheitenStats.stellplaetzeSN === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.muted, fontStyle: "italic" } }, "Noch keine Einheiten angelegt."), /* @__PURE__ */ React.createElement("div", { style: {
    borderTop: `1px solid ${t.border}80`,
    marginTop: 4,
    paddingTop: 6,
    display: "flex",
    flexDirection: "column",
    gap: 4
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub, fontWeight: 600 } }, "Verwaltete Einheiten"), /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 700 } }, einheitenStats.verwalteteGesamt)), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub, fontWeight: 600 } }, "MEA gesamt (Soll)"), editMode ? /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      value: (allFields.find((f) => f.name === "Gesamt-MEA") || {}).value || "",
      placeholder: "1000",
      onChange: (e) => {
        const neu = e.target.value;
        const exists = allFields.some((f) => f.name === "Gesamt-MEA");
        if (exists) {
          setAllFields(allFields.map(
            (f) => f.name === "Gesamt-MEA" ? { ...f, value: neu } : f
          ));
        } else {
          const maxId = allFields.reduce((m, f) => Math.max(m, f.id || 0), 0);
          setAllFields([...allFields, {
            id: maxId + 1,
            _stamm: true,
            name: "Gesamt-MEA",
            value: neu,
            type: "number",
            required: true
          }]);
        }
      },
      style: {
        width: 110,
        textAlign: "right",
        background: t.card,
        border: `1px solid ${accent}60`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 700,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ) : /* @__PURE__ */ React.createElement("span", { style: { color: t.text, fontWeight: 700 } }, einheitenStats.meaSoll.toLocaleString("de-DE", { maximumFractionDigits: 3 }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.sub, fontWeight: 600 } }, "MEA gesamt (Ist, berechnet)"), /* @__PURE__ */ React.createElement("span", { style: {
    color: einheitenStats.meaPasst ? t.text : "#c0392b",
    fontWeight: 700
  } }, einheitenStats.meaIst.toLocaleString("de-DE", { maximumFractionDigits: 3 }))), !einheitenStats.meaPasst && einheitenStats.wohnungen + einheitenStats.gewerbe + einheitenStats.stellplaetzeSE + einheitenStats.stellplaetzeSN > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 4,
    display: "flex",
    alignItems: "flex-start",
    gap: 6,
    background: "#c0392b15",
    border: "1px solid #c0392b50",
    borderRadius: 7,
    padding: "6px 10px"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, lineHeight: 1 } }, "⚠️"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 11, color: "#c0392b", lineHeight: 1.4 } }, /* @__PURE__ */ React.createElement("strong", null, "MEA-Summe stimmt nicht mit Soll überein."), " ", "Abweichung:", " ", /* @__PURE__ */ React.createElement("strong", null, einheitenStats.meaDiff > 0 ? "+" : "", einheitenStats.meaDiff.toLocaleString("de-DE", { maximumFractionDigits: 3 })), " ", "— bitte MEAs der Einheiten oder Gesamt-MEA in den Stammdaten prüfen."))))), karte.fixed && karte.kategorie === "stammdaten" && rechnungsadresseAn && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 12,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "10px 13px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, "📬"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: t.text } }, "Rechnungsadresse"), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    color: t.muted,
    background: t.card,
    border: `1px solid ${t.border}`,
    padding: "1px 6px",
    borderRadius: 5
  } }, "auto")), /* @__PURE__ */ React.createElement(CopyBtn, { text: genRechnungsadresse(allFields), label: "Kopieren", t, accent })), /* @__PURE__ */ React.createElement("pre", { style: {
    margin: 0,
    fontSize: 11,
    color: t.sub,
    lineHeight: 1.7,
    fontFamily: "inherit",
    whiteSpace: "pre-wrap"
  } }, genRechnungsadresse(allFields)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 9, color: t.muted } }, "c/o ", HV_ADRESSE.name, " · wird in ", /* @__PURE__ */ React.createElement("strong", null, "Einstellungen"), " hinterlegt")), localEinheiten.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 7
  } }, "Einheiten (", localEinheiten.length, ")"), localEinheiten.map((e, idx) => /* @__PURE__ */ React.createElement("div", { key: e.id }, /* @__PURE__ */ React.createElement(
    EinheitZeile,
    {
      einheit: e,
      t,
      accent,
      editMode,
      isActive: activeEinheit === e.id,
      isOver: overIdx === idx,
      onToggle: () => setActiveEinheit(activeEinheit === e.id ? null : e.id),
      onDragStart: () => {
        dragUnitFrom.current = idx;
      },
      onDragEnd: () => {
        dragUnitFrom.current = null;
        setOverIdx(null);
      },
      onDragOver: (ev) => {
        ev.preventDefault();
        setOverIdx(idx);
      },
      onDragLeave: () => setOverIdx(null),
      onDrop: () => {
        const from = dragUnitFrom.current;
        if (from === null || from === idx) {
          setOverIdx(null);
          return;
        }
        const arr = [...localEinheiten];
        const [moved] = arr.splice(from, 1);
        arr.splice(idx, 0, moved);
        setLocalEinheiten(arr);
        dragUnitFrom.current = null;
        setOverIdx(null);
      }
    }
  ), activeEinheit === e.id && /* @__PURE__ */ React.createElement(
    EinheitDetail,
    {
      einheit: e,
      t,
      accent,
      editMode,
      kontakte,
      setKontakte,
      onUpdate: (neuE) => persistEinheiten(localEinheiten.map((x) => x.id === e.id ? neuE : x)),
      onClose: () => setActiveEinheit(null)
    }
  )))), editMode && !karte.fixed && /* @__PURE__ */ React.createElement("div", { style: { marginTop: localEinheiten.length > 0 ? 10 : 14 } }, !neueEinheitOffen ? /* @__PURE__ */ React.createElement("button", { onClick: () => setNeueEinheitOffen(true), style: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    background: "none",
    border: `1px dashed ${accent}55`,
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
    color: accent,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "inherit"
  } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 13, color: accent }), isTG ? "Stellplatz hinzufügen" : "Einheit hinzufügen") : /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: accent,
    marginBottom: 8
  } }, isTG ? "Neuer Stellplatz" : "Neue Einheit"), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 6
  } }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: neueEinheit.typ,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, typ: e.target.value }),
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit",
        gridColumn: "1 / -1"
      }
    },
    isTG ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("option", { value: "Stellplatz" }, "Stellplatz"), /* @__PURE__ */ React.createElement("option", { value: "Carport" }, "Carport"), /* @__PURE__ */ React.createElement("option", { value: "Doppelparker" }, "Doppelparker")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("option", { value: "Wohneigentum" }, "Wohneigentum"), /* @__PURE__ */ React.createElement("option", { value: "Teileigentum" }, "Teileigentum (Gewerbe etc.)"))
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neueEinheit.nr,
      autoFocus: true,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, nr: e.target.value }),
      placeholder: isTG ? "Nr. (z. B. SP-07)" : "Nr. (z. B. WE 08)",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neueEinheit.lage,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, lage: e.target.value }),
      placeholder: isTG ? "Lage (z. B. TG UG)" : "Lage (z. B. 2. OG rechts)",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), !isTG && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neueEinheit.flaeche,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, flaeche: e.target.value }),
      placeholder: "Fläche (z. B. 78)",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neueEinheit.zimmer,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, zimmer: e.target.value }),
      placeholder: "Zimmer (z. B. 3)",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neueEinheit.mea,
      onChange: (e) => setNeueEinheit({ ...neueEinheit, mea: e.target.value }),
      placeholder: "MEA (z. B. 125 oder 146,678)",
      style: {
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit",
        gridColumn: "1 / -1"
      }
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setNeueEinheitOffen(false);
        setNeueEinheit({ typ: defaultTyp, nr: "", lage: "", flaeche: "", zimmer: "", mea: "" });
      },
      style: {
        background: "none",
        border: `1px solid ${t.border}`,
        color: t.sub,
        borderRadius: 6,
        padding: "5px 12px",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit"
      }
    },
    "Abbrechen"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: addEinheit,
      disabled: !neueEinheit.nr.trim(),
      style: {
        background: neueEinheit.nr.trim() ? accent : "transparent",
        border: `1px solid ${accent}`,
        color: neueEinheit.nr.trim() ? "#fff" : accent,
        borderRadius: 6,
        padding: "5px 12px",
        cursor: neueEinheit.nr.trim() ? "pointer" : "not-allowed",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "inherit"
      }
    },
    "Speichern"
  )))), istGebaeude && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 12, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 8
  } }, "Räume (", raeume.length, ")"), raeume.length === 0 && !editMode && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.muted, fontStyle: "italic" } }, "Keine Räume hinterlegt."), raeume.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: editMode ? 10 : 0 } }, raeume.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "6px 10px"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "🚪"), editMode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: r.name,
      onChange: (e) => updateRaum(r.id, { name: e.target.value }),
      placeholder: "Name",
      style: {
        flex: 2,
        background: t.card,
        border: `1px solid ${t.border}`,
        borderRadius: 5,
        padding: "3px 7px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: r.lage || "",
      onChange: (e) => updateRaum(r.id, { lage: e.target.value }),
      placeholder: "Lage / Etage",
      style: {
        flex: 1,
        background: t.card,
        border: `1px solid ${t.border}`,
        borderRadius: 5,
        padding: "3px 7px",
        fontSize: 12,
        color: t.sub,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => removeRaum(r.id), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 5,
    width: 24,
    height: 24,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 12, color: t.text, fontWeight: 500 } }, r.name), r.lage && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: t.sub } }, r.lage))))), editMode && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neuerRaumName,
      onChange: (e) => setNeuerRaumName(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") addRaum();
      },
      placeholder: "Raum-Name (z. B. Heizungsraum)",
      style: {
        flex: 2,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: neuerRaumLage,
      onChange: (e) => setNeuerRaumLage(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") addRaum();
      },
      placeholder: "Lage (z. B. KG)",
      style: {
        flex: 1,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        outline: "none",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: addRaum, disabled: !neuerRaumName.trim(), style: {
    background: neuerRaumName.trim() ? accent : "transparent",
    border: `1px solid ${accent}`,
    color: neuerRaumName.trim() ? "#fff" : accent,
    borderRadius: 6,
    padding: "5px 10px",
    cursor: neuerRaumName.trim() ? "pointer" : "not-allowed",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "inherit"
  } }, "+ Raum")))));
}
function KartenList({ karten, setKarten, t, accent, editMode, kontakte, setKontakte, ve, onKontaktClick }) {
  const dragKarteFrom = useRef(null);
  const [overKarte, setOverKarte] = useState(null);
  const einheitenStats = (() => {
    const alle = karten.filter((k) => Array.isArray(k.einheiten)).flatMap((k) => k.einheiten);
    const wohnungen = alle.filter((e) => e.typ === "Wohneigentum").length;
    const gewerbe = alle.filter((e) => e.typ === "Teileigentum").length;
    const istSP = (e) => isStellplatzTyp(e.typ);
    const stellplaetzeSE = alle.filter((e) => istSP(e) && (e.rechtsstatus || "SE") === "SE").length;
    const stellplaetzeSN = alle.filter((e) => istSP(e) && (e.rechtsstatus === "GE" || e.rechtsstatus === "SNR")).length;
    const parseM = (s) => {
      if (s == null || s === "") return 0;
      const n = parseFloat(String(s).replace(",", "."));
      return isNaN(n) ? 0 : n;
    };
    const meaIst = alle.reduce((s, e) => s + parseM(e.mea), 0);
    const stamm = karten.find((k) => k.kategorie === "stammdaten" && k.fixed);
    const meaSollFeld = stamm && Array.isArray(stamm.stamm) ? stamm.stamm.find((f) => f.name === "Gesamt-MEA") : null;
    const meaSoll = meaSollFeld ? parseM(meaSollFeld.value) : 1e3;
    const meaDiff = meaIst - meaSoll;
    const meaPasst = Math.abs(meaDiff) < 0.01;
    return {
      wohnungen,
      gewerbe,
      stellplaetzeSE,
      stellplaetzeSN,
      meaIst,
      meaSoll,
      meaDiff,
      meaPasst,
      verwalteteGesamt: wohnungen + gewerbe + stellplaetzeSE
    };
  })();
  return /* @__PURE__ */ React.createElement("div", null, karten.map((karte, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: karte.id,
      draggable: editMode && !karte.fixed,
      onDragStart: () => {
        dragKarteFrom.current = idx;
      },
      onDragEnd: () => {
        dragKarteFrom.current = null;
        setOverKarte(null);
      },
      onDragOver: (e) => {
        e.preventDefault();
        if (!karte.fixed) setOverKarte(idx);
      },
      onDragLeave: () => setOverKarte(null),
      onDrop: () => {
        const from = dragKarteFrom.current;
        if (from === null || from === idx || karte.fixed) {
          setOverKarte(null);
          return;
        }
        const arr = [...karten];
        const [item] = arr.splice(from, 1);
        arr.splice(idx, 0, item);
        setKarten(arr);
        dragKarteFrom.current = null;
        setOverKarte(null);
      },
      style: {
        position: "relative",
        outline: overKarte === idx ? `2px solid ${accent}` : "none",
        outlineOffset: 2,
        transition: "outline 0.1s"
      }
    },
    editMode && !karte.fixed && /* @__PURE__ */ React.createElement("div", { title: "Karte verschieben", style: {
      position: "absolute",
      left: -22,
      top: 14,
      cursor: "grab",
      opacity: 0.4,
      padding: 2,
      zIndex: 5
    } }, /* @__PURE__ */ React.createElement(I, { name: "drag", size: 14, color: accent })),
    karte.kategorie === "vertraege" ? /* @__PURE__ */ React.createElement(
      VertraegeKarte,
      {
        karte,
        t,
        accent,
        editMode,
        kontakte,
        onKontaktClick,
        onUpdateKarte: (neuKarte) => setKarten((v) => v.map((k) => k.id === karte.id ? neuKarte : k)),
        onRename: (neu) => setKarten((v) => v.map((k) => k.id === karte.id ? { ...k, name: neu } : k)),
        onRemove: karte.fixed ? null : () => setKarten((v) => v.filter((k) => k.id !== karte.id))
      }
    ) : karte.kategorie === "technik" ? /* @__PURE__ */ React.createElement(
      TechnikKarte,
      {
        karte,
        t,
        accent,
        editMode,
        haeuser: karten.filter((k) => k.kategorie === "gebaeude"),
        onUpdateKarte: (neuKarte) => setKarten((v) => v.map((k) => k.id === karte.id ? neuKarte : k)),
        onRename: (neu) => setKarten((v) => v.map((k) => k.id === karte.id ? { ...k, name: neu } : k)),
        onRemove: karte.fixed ? null : () => setKarten((v) => v.filter((k) => k.id !== karte.id))
      }
    ) : /* @__PURE__ */ React.createElement(
      GebaeudeKarte,
      {
        karte,
        t,
        accent,
        editMode,
        kontakte,
        setKontakte,
        einheitenStats,
        onUpdateKarte: (neuKarte) => setKarten((v) => v.map((k) => k.id === karte.id ? neuKarte : k)),
        onRename: (neu) => setKarten((v) => v.map((k) => k.id === karte.id ? { ...k, name: neu } : k)),
        onRemove: karte.fixed ? null : () => setKarten((v) => v.filter((k) => k.id !== karte.id))
      }
    )
  )));
}
function NeueKarteMenu({ t, accent, onAdd, optionen }) {
  const [offen, setOffen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (offen && dropdownRef.current) {
      const id = setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 50);
      return () => clearTimeout(id);
    }
  }, [offen]);
  const opts = optionen || [
    { id: "gebaeude", icon: "🏠", label: "Weiteres Gebäude", sub: "Hinterhaus, Nebengebäude…" },
    { id: "tiefgarage", icon: "🅿️", label: "Tiefgarage", sub: "Unterirdische Parkebene(n)" },
    { id: "stellplatz", icon: "🚗", label: "Stellplätze / Carports", sub: "Außenstellplätze, Carports" },
    { id: "technik", icon: "⚙", label: "Technik", sub: "Heizung, Aufzug, Zähler …" },
    { id: "sonstige", icon: "🏷", label: "Eigene Karte", sub: "Frei benennbar" }
  ];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setOffen((v) => !v),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: offen ? accent + "10" : "none",
        border: `2px dashed ${accent}${offen ? "" : "50"}`,
        borderRadius: 12,
        padding: "12px 0",
        cursor: "pointer",
        justifyContent: "center",
        color: accent,
        fontSize: 12,
        fontWeight: 600,
        transition: "all 0.15s",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => {
        if (!offen) e.currentTarget.style.background = accent + "08";
      },
      onMouseLeave: (e) => {
        if (!offen) e.currentTarget.style.background = "none";
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: "plus", size: 15, color: accent }),
    "Neue Karte hinzufügen",
    /* @__PURE__ */ React.createElement(I, { name: offen ? "chevU" : "chevD", size: 12, color: accent })
  ), offen && /* @__PURE__ */ React.createElement("div", { ref: dropdownRef, style: {
    marginTop: 6,
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
  } }, opts.map((opt, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: opt.id,
      onClick: () => {
        onAdd(opt.id);
        setOffen(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "none",
        border: "none",
        borderBottom: i < opts.length - 1 ? `1px solid ${t.border}` : "none",
        padding: "10px 14px",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = accent + "08",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, opt.icon),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, opt.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, opt.sub))
  ))));
}
function LiegenschaftAnsicht({ ve, setVes, t, accent, kontakte, setKontakte, editMode = false, onKontaktClick }) {
  const karten = ve && Array.isArray(ve.karten) && ve.karten.length > 0 ? ve.karten : buildInitialKarten(ve);
  const setKarten = (updater) => {
    if (!setVes) return;
    const neuKarten = typeof updater === "function" ? updater(karten) : updater;
    setVes((prev) => prev.map((v) => {
      if (v.id !== ve.id) return v;
      const updated = { ...v, karten: neuKarten };
      const stammKarte = neuKarten.find((k) => k.kategorie === "stammdaten");
      if (stammKarte && Array.isArray(stammKarte.stamm)) {
        const findVal = (n) => {
          const f = stammKarte.stamm.find((x) => x.name === n);
          return f ? f.value : null;
        };
        const nr = findVal("VE-Nummer");
        const strasse = findVal("Straße");
        const plzOrt = findVal("PLZ / Ort");
        if (nr != null && nr !== "") updated.nr = nr;
        if (strasse != null && strasse !== "" || plzOrt != null && plzOrt !== "") {
          updated.adresse = [strasse, plzOrt].filter((s) => s != null && s !== "").join(", ");
        }
      }
      const alleEinheiten = neuKarten.filter((k) => Array.isArray(k.einheiten)).flatMap((k) => k.einheiten);
      updated.einheiten = alleEinheiten;
      return updated;
    }));
  };
  const addKarte = (typ) => {
    const tpl = {
      gebaeude: {
        name: "Neues Gebäude",
        icon: "🏠",
        kategorie: "gebaeude",
        stamm: [{ id: 1, name: "Baujahr", value: "", type: "number" }],
        raeume: []
      },
      tiefgarage: {
        name: "Tiefgarage",
        icon: "🅿️",
        kategorie: "tiefgarage",
        stamm: [{ id: 1, name: "Stellplätze gesamt", value: "", type: "number" }]
      },
      stellplatz: {
        name: "Stellplätze",
        icon: "🚗",
        kategorie: "stellplatz",
        stamm: [{ id: 1, name: "Stellplätze", value: "", type: "number" }]
      },
      technik: {
        name: "Technik",
        icon: "⚙",
        kategorie: "technik",
        stamm: [{ id: 1, name: "Heizart", value: "", type: "text" }],
        technikGeraete: []
      },
      sonstige: { name: "Neue Karte", icon: "🏷", kategorie: "stammdaten", stamm: [] }
    }[typ];
    if (!tpl) return;
    setKarten((v) => {
      const neu = { id: Date.now(), ...tpl, fixed: false, einheiten: tpl.einheiten || [] };
      let insertIdx = 0;
      for (let i = 0; i < v.length; i++) if (v[i].fixed) insertIdx = i + 1;
      return [...v.slice(0, insertIdx), neu, ...v.slice(insertIdx)];
    });
  };
  return /* @__PURE__ */ React.createElement("div", null, editMode && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    padding: "8px 12px",
    background: accent + "10",
    border: `1px dashed ${accent}55`,
    borderRadius: 8
  } }, /* @__PURE__ */ React.createElement(I, { name: "lockOpen", size: 13, color: accent }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: accent, fontWeight: 600 } }, "Bearbeitung aktiv — Felder ziehen zum Sortieren · Karten umbenennen, ergänzen, löschen")), editMode && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement(NeueKarteMenu, { t, accent, onAdd: addKarte })), /* @__PURE__ */ React.createElement(
    KartenList,
    {
      karten,
      setKarten,
      t,
      accent,
      editMode,
      kontakte,
      setKontakte,
      ve,
      onKontaktClick
    }
  ));
}
function VerwaltungAnsicht({ ve, t, accent, kontakte, setKontakte, editMode = false, onKontaktClick }) {
  const [karten, setKarten] = useState(() => buildInitialVerwaltungsKarten(ve));
  const addKarte = (typ) => {
    const tpl = {
      verwaltung_stamm: {
        name: "Stammdaten Verwaltung",
        icon: "🏷",
        kategorie: "verwaltung_stamm",
        stamm: [{ id: 1, name: "Verwaltung ab", value: "", type: "text" }]
      },
      etv: {
        name: "ETV-Stammdaten",
        icon: "📋",
        kategorie: "etv",
        stamm: [
          { id: 1, name: "Versammlungsort", value: "", type: "text" },
          { id: 2, name: "Abstimmung nach", value: "MEA", type: "text" },
          { id: 3, name: "Gesamtanteile", value: "", type: "text" }
        ]
      },
      versicherungen: {
        name: "Versicherungen",
        icon: "🛡",
        kategorie: "versicherungen",
        stamm: [
          { id: 1, name: "Gebäudeversicherung", value: "", type: "text" },
          { id: 2, name: "Versicherungs-Nr.", value: "", type: "text" },
          { id: 3, name: "Versicherungssumme", value: "", type: "number" }
        ]
      },
      vertraege: {
        name: "Verträge",
        icon: "📄",
        kategorie: "vertraege",
        stamm: [],
        vertraege: []
      },
      sonstige: { name: "Neue Karte", icon: "🏷", kategorie: "stammdaten", stamm: [] }
    }[typ];
    if (!tpl) return;
    setKarten((v) => {
      const neu = { id: Date.now(), ...tpl, fixed: false, einheiten: tpl.einheiten || [] };
      let insertIdx = 0;
      for (let i = 0; i < v.length; i++) if (v[i].fixed) insertIdx = i + 1;
      return [...v.slice(0, insertIdx), neu, ...v.slice(insertIdx)];
    });
  };
  const verwaltungsOptionen = [
    { id: "verwaltung_stamm", icon: "🏷", label: "Stammdaten-Karte", sub: "Verwalter, Beginn, Bestellt-bis …" },
    { id: "etv", icon: "📋", label: "ETV-Stammdaten", sub: "Versammlungsort, Abstimmung, Anteile" },
    { id: "versicherungen", icon: "🛡", label: "Versicherungen", sub: "Gebäude, Haftpflicht, Vermögensschaden" },
    { id: "vertraege", icon: "📄", label: "Verträge", sub: "Wartung, Versorger, Hausmeister" },
    { id: "sonstige", icon: "🏷", label: "Eigene Karte", sub: "Frei benennbar" }
  ];
  return /* @__PURE__ */ React.createElement("div", null, editMode && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    padding: "8px 12px",
    background: accent + "10",
    border: `1px dashed ${accent}55`,
    borderRadius: 8
  } }, /* @__PURE__ */ React.createElement(I, { name: "lockOpen", size: 13, color: accent }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: accent, fontWeight: 600 } }, "Bearbeitung aktiv — Karten umbenennen, ergänzen, sortieren oder löschen")), editMode && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement(NeueKarteMenu, { t, accent, onAdd: addKarte, optionen: verwaltungsOptionen })), /* @__PURE__ */ React.createElement(
    KartenList,
    {
      karten,
      setKarten,
      t,
      accent,
      editMode,
      kontakte,
      setKontakte,
      ve,
      onKontaktClick
    }
  ));
}
function buildInitialKarten(ve) {
  const wohnEinheiten = ve.einheiten.filter((e) => !isStellplatzTyp(e.typ));
  const stellplaetze = ve.einheiten.filter((e) => isStellplatzTyp(e.typ));
  const adrTeile = (ve.adresse || "").split(",").map((s) => s.trim());
  const strasse = adrTeile[0] || "";
  const plzOrt = adrTeile[1] || "";
  const karten = [
    {
      id: 1,
      name: "Stammdaten",
      icon: "🏷",
      fixed: true,
      kategorie: "stammdaten",
      stamm: [
        { id: 1, name: "VE-Nummer", value: ve.nr, type: "text", required: true },
        { id: 2, name: "Verwaltungsart", value: "WEG-Verwaltung", type: "text", required: true },
        { id: 3, name: "Straße", value: strasse, type: "text", required: true },
        { id: 4, name: "PLZ / Ort", value: plzOrt, type: "text", required: true },
        {
          id: 5,
          name: "Gesamt-MEA",
          value: "1000",
          type: "number",
          required: true,
          hint: "Standard: 1000. Bei großen Objekten oft 10.000 oder 100.000."
        }
      ],
      einheiten: []
    },
    {
      id: 2,
      name: "Haus 1",
      icon: "🏠",
      fixed: false,
      kategorie: "gebaeude",
      stamm: [
        { id: 1, name: "Baujahr", value: "", type: "number", required: true },
        { id: 2, name: "Stockwerke", value: "", type: "number" },
        { id: 3, name: "Aufgänge", value: "", type: "number" },
        { id: 4, name: "Ein-/Ausgänge", value: "", type: "number" }
      ],
      einheiten: wohnEinheiten
    }
  ];
  if (stellplaetze.length > 0) {
    karten.push({
      id: 3,
      name: "Stellplätze / Tiefgarage",
      icon: "🅿️",
      fixed: false,
      kategorie: "tiefgarage",
      stamm: [
        { id: 1, name: "Stellplätze gesamt", value: String(stellplaetze.length), type: "number" }
      ],
      einheiten: stellplaetze
    });
  }
  karten.push({
    id: 4,
    name: "Zugang / Schließanlage",
    icon: "🔑",
    fixed: false,
    kategorie: "zugang",
    stamm: [
      { id: 1, name: "Schlüsseldienst", value: "" },
      { id: 2, name: "Sicherheitskarte", value: "" },
      { id: 3, name: "Hersteller", value: "" }
    ],
    einheiten: []
  });
  karten.push({
    id: 7,
    name: "Technik",
    icon: "⚙",
    fixed: false,
    kategorie: "technik",
    stamm: [
      { id: 1, name: "Heizart", value: "", type: "text" },
      { id: 2, name: "Heizungstyp", value: "", type: "text" }
    ],
    einheiten: [],
    technikGeraete: []
  });
  return karten;
}
function buildInitialVerwaltungsKarten(ve) {
  const vw = ve.verwaltung || {};
  return [
    // Stammdaten der Verwaltung
    {
      id: 1,
      name: "Stammdaten Verwaltung",
      icon: "🏷",
      fixed: true,
      kategorie: "verwaltung_stamm",
      stamm: [
        { id: 1, name: "Verwaltung ab", value: vw.beginn || "", type: "text", required: true },
        { id: 2, name: "Bestellt bis", value: vw.bestelltBis || "", type: "text", required: true },
        { id: 3, name: "Verwalter (Firma)", value: "", type: "text" },
        { id: 4, name: "Buchhalter", value: "", type: "text" },
        { id: 5, name: "Übernommen von", value: "", type: "text" },
        { id: 6, name: "Verw.-Zustimmung §12 WEG", value: vw.verwZustimmung ? "Erforderlich" : "Nicht erforderlich", type: "text" },
        { id: 7, name: "Nächste Wahl", value: vw.naechsteWahl || "", type: "text" }
      ],
      einheiten: []
    },
    // ETV-Stammdaten
    {
      id: 2,
      name: "ETV-Stammdaten",
      icon: "📋",
      fixed: false,
      kategorie: "etv",
      stamm: [
        { id: 1, name: "Versammlungsort", value: "", type: "text" },
        { id: 2, name: "Abstimmung nach", value: "MEA", type: "text" },
        { id: 3, name: "Gesamtanteile", value: "1000", type: "number" },
        { id: 4, name: "Nächste ETV", value: vw.naechsteETV || "", type: "date" }
      ],
      einheiten: []
    },
    // Versicherungen
    {
      id: 3,
      name: "Versicherungen",
      icon: "🛡",
      fixed: false,
      kategorie: "versicherungen",
      stamm: [
        { id: 1, name: "Gebäudeversicherung", value: "", type: "text" },
        { id: 2, name: "Versicherungs-Nr.", value: "", type: "text" },
        { id: 3, name: "Versicherungssumme", value: "", type: "number" },
        { id: 4, name: "Haus-/Grundbesitzerhaftpflicht", value: "", type: "text" },
        { id: 5, name: "Vermögensschadenhaftpflicht", value: "", type: "text" },
        { id: 6, name: "Nächste Fälligkeit", value: "", type: "date" }
      ],
      einheiten: []
    },
    // Verträge
    {
      id: 4,
      name: "Verträge",
      icon: "📄",
      fixed: false,
      kategorie: "vertraege",
      stamm: [],
      einheiten: [],
      vertraege: (ve.vertraege || []).map((v) => ({ ...v }))
    }
  ];
}
function StatusLeiste({ typ, text, t, borderColor, eingebettet = false }) {
  const F = {
    ok: "#10B981",
    info: "#3B82F6",
    warn: "#F59E0B",
    error: "#EF4444",
    done: t.muted
  };
  const farbe = typ && F[typ] ? F[typ] : t.muted;
  const bc = borderColor || t.border;
  return /* @__PURE__ */ React.createElement("div", { style: {
    borderLeft: eingebettet ? "none" : `1px solid ${bc}`,
    borderRight: eingebettet ? "none" : `1px solid ${bc}`,
    borderBottom: eingebettet ? "none" : `1px solid ${bc}`,
    borderTop: "none",
    borderRadius: eingebettet ? 0 : "0 0 12px 12px",
    background: t.surface,
    color: farbe,
    padding: "0 12px",
    height: 26,
    boxSizing: "border-box",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.02em",
    display: "flex",
    alignItems: "center",
    gap: 6,
    overflow: "hidden",
    whiteSpace: "nowrap"
  } }, /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, text || " "));
}
function FilterButtons({ arten, aktive, counts, wert, onWert, t, accent, ohneAlle = false }) {
  const sichtbar = arten.filter((a) => (aktive || []).includes(a.id));
  if (sichtbar.length === 0) return null;
  const total = Object.values(counts || {}).reduce((a, b) => a + b, 0);
  const Btn = ({ id, label, count }) => {
    const aktiv = wert === id;
    const klick = () => {
      if (ohneAlle && aktiv) onWert("alle");
      else onWert(id);
    };
    return /* @__PURE__ */ React.createElement("button", { onClick: klick, style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      borderRadius: 999,
      flexShrink: 0,
      fontSize: 11,
      fontWeight: aktiv ? 700 : 500,
      fontFamily: "inherit",
      background: aktiv ? accent + "22" : "transparent",
      border: `1px solid ${aktiv ? accent + "80" : t.border}`,
      color: aktiv ? accent : t.sub,
      cursor: "pointer",
      whiteSpace: "nowrap"
    } }, /* @__PURE__ */ React.createElement("span", null, label), typeof count === "number" && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 10,
      fontWeight: 700,
      padding: "1px 6px",
      borderRadius: 999,
      background: aktiv ? accent + "33" : t.border + "60",
      color: aktiv ? accent : t.muted
    } }, count));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, `.ad-filter-scroll::-webkit-scrollbar{display:none}`), /* @__PURE__ */ React.createElement("div", { className: "ad-filter-scroll", style: {
    display: "flex",
    flexWrap: "nowrap",
    gap: 6,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
    flex: "0 1 auto",
    minWidth: 0
  } }, !ohneAlle && /* @__PURE__ */ React.createElement(Btn, { id: "alle", label: "Alle", count: total }), sichtbar.map((a) => /* @__PURE__ */ React.createElement(Btn, { key: a.id, id: a.id, label: a.kurz, count: counts[a.id] || 0 }))));
}
function EinheitKachel({ ve, einheit, t, accent, onClick, id }) {
  if (!ve || !einheit) return null;
  const istSP = isStellplatzTyp(einheit.typ);
  const adrTeile = (ve.adresse || "").split(",").map((s) => s.trim());
  const strasse = adrTeile[0] || "";
  let ort = "";
  if (adrTeile[1]) {
    const m = adrTeile[1].match(/^\d{4,5}\s+(.+)$/);
    ort = m ? m[1] : adrTeile[1];
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      id,
      style: {
        cursor: "pointer",
        transition: "all 0.15s",
        scrollMarginTop: "var(--ad-header-h, 200px)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      boxSizing: "border-box",
      background: t.card,
      color: t.text,
      border: `1px solid ${t.border}`,
      borderRadius: 12
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      background: accent + "18",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(I, { name: istSP ? "building" : "home", size: 18, color: accent }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: accent,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, ve.nr, " · ", einheit.nr), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      marginTop: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, strasse || " "), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, einheit.lage || ort || " ")), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      whiteSpace: "nowrap",
      flexShrink: 0,
      textAlign: "right"
    } }, istSP ? /* @__PURE__ */ React.createElement("span", null, einheit.rechtsstatus || "Stellplatz") : /* @__PURE__ */ React.createElement(React.Fragment, null, einheit.flaeche && /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, einheit.flaeche), einheit.zimmer && /* @__PURE__ */ React.createElement(React.Fragment, null, " · ", einheit.zimmer, " Zi"))))
  );
}
function VEKachel({ ve, t, accent, onClick, ohneStatus = false, aktiv = false, id }) {
  const statusLeisteSettings = useStatusLeiste();
  const wohneinheiten = ve.einheiten.filter((e) => ["Wohneigentum", "Teileigentum", "Gewerbe"].includes(e.typ));
  const stellplaetze = ve.einheiten.filter((e) => isStellplatzTyp(e.typ));
  let tagesBis = null;
  if (ve.verwaltung.bestelltBis) {
    const parts = ve.verwaltung.bestelltBis.split(".");
    if (parts.length === 3) {
      const d = /* @__PURE__ */ new Date(parts[2] + "-" + parts[1] + "-" + parts[0]);
      tagesBis = Math.round((d - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24));
    }
  }
  const adrTeile = (ve.adresse || "").split(",").map((s) => s.trim());
  const strasse = adrTeile[0] || "";
  let ort = "";
  if (adrTeile[1]) {
    const m = adrTeile[1].match(/^\d{4,5}\s+(.+)$/);
    ort = m ? m[1] : adrTeile[1];
  }
  let status = null;
  if (!ohneStatus && statusLeisteSettings.objekt && tagesBis !== null) {
    if (tagesBis < 0) {
      status = { typ: "error", text: `Bestellung abgelaufen (${Math.abs(tagesBis)} Tage)` };
    } else if (tagesBis < 90) {
      status = { typ: "warn", text: `Bestellung läuft in ${tagesBis} Tagen aus` };
    }
  }
  const bc = aktiv ? accent : t.border;
  const zeigeStatus = !ohneStatus && statusLeisteSettings.objekt;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      id,
      style: {
        cursor: "pointer",
        transition: "all 0.15s",
        border: `1px solid ${bc}`,
        borderRadius: 12,
        overflow: "hidden",
        scrollMarginTop: "var(--ad-header-h, 200px)"
      },
      onMouseEnter: (e) => {
        if (!aktiv) e.currentTarget.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        if (!aktiv) e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      boxSizing: "border-box",
      background: t.card,
      color: t.text
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      background: accent + "18",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(I, { name: "building", size: 18, color: accent }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: accent,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, ve.nr), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      marginTop: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, strasse || " "), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, ort || " ")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, whiteSpace: "nowrap", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, wohneinheiten.length), " WE", stellplaetze.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, " · ", /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, stellplaetze.length), " SP"))),
    zeigeStatus && /* @__PURE__ */ React.createElement(StatusLeiste, { ...status || {}, t, borderColor: bc, eingebettet: true })
  );
}
function VEDetail({
  ve,
  t,
  accent,
  onKontaktClick,
  onBack,
  kontakte,
  setKontakte,
  cardId,
  ves = [],
  setVes,
  externEditMode,
  setExternEditMode,
  headerOhneEditBtn = false
}) {
  const [tab, setTab] = useState("liegenschaft");
  const [internEditMode, setInternEditMode] = useState(false);
  const editMode = typeof externEditMode === "boolean" ? externEditMode : internEditMode;
  const setEditMode = setExternEditMode ? setExternEditMode : setInternEditMode;
  const TABS = [
    { id: "liegenschaft", label: "Liegenschaft", icon: "building" },
    { id: "verwaltung", label: "Verwaltung", icon: "document" },
    { id: "kontakte", label: "Kontakte", icon: "users" },
    { id: "historie", label: "Historie", icon: "calendar" },
    { id: "dokumente", label: "Dokumente", icon: "document" },
    { id: "bilder", label: "Bilder", icon: "paint" }
  ];
  const wechselTab = (id) => {
    setTab(id);
    if (cardId) {
      setTimeout(() => scrollToCard(cardId), 50);
    }
  };
  const beteiligteIds = [...new Set(
    ve.einheiten.flatMap(
      (e) => [
        ...(e.eigentuemer || []).map((et) => et.kontaktId),
        ...(e.mieter || []).map((m) => m.kontaktId)
      ]
    ).filter(Boolean)
  )];
  const beteiligte = beteiligteIds.map((id) => kontakte.find((k) => k.id === id)).filter(Boolean);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    fontSize: 18,
    fontWeight: 800,
    color: accent,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, ve.nr), !headerOhneEditBtn && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEditMode((v) => !v),
      title: editMode ? "Bearbeitung beenden" : "Bearbeiten",
      "aria-label": editMode ? "Bearbeitung beenden" : "Bearbeiten",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        flexShrink: 0,
        background: editMode ? accent + "22" : accent,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        boxShadow: editMode ? `inset 0 0 0 1.5px ${accent}` : `0 1px 2px ${accent}40`
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: editMode ? "check" : "pencil", size: 14, color: editMode ? accent : "#fff" })
  )), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 16,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch"
  } }, TABS.map((tb) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tb.id,
      onClick: () => wechselTab(tb.id),
      ref: (el) => {
        if (el && tab === tb.id) el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      },
      style: {
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "11px 18px",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderBottom: tab === tb.id ? `2px solid ${accent}` : "2px solid transparent",
        fontSize: 12,
        fontWeight: tab === tb.id ? 700 : 500,
        color: tab === tb.id ? accent : t.sub,
        fontFamily: "inherit",
        whiteSpace: "nowrap"
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: tb.icon, size: 13, color: tab === tb.id ? accent : t.sub }),
    tb.label
  ))), tab === "liegenschaft" && /* @__PURE__ */ React.createElement(LiegenschaftAnsicht, { ve, setVes, t, accent, kontakte, setKontakte, editMode, onKontaktClick }), tab === "verwaltung" && /* @__PURE__ */ React.createElement(VerwaltungAnsicht, { ve, t, accent, kontakte, setKontakte, editMode, onKontaktClick }), tab === "kontakte" && /* @__PURE__ */ React.createElement(
    VEKontakteTab,
    {
      ve,
      t,
      accent,
      kontakte,
      setKontakte,
      editMode,
      ves,
      onKontaktClick
    }
  ), tab === "historie" && /* @__PURE__ */ React.createElement(
    PlatzhalterReiter,
    {
      t,
      accent,
      icon: "calendar",
      titel: "Historie",
      beschreibung: "Chronologische Ansicht aller Änderungen, Beschlüsse, Eigentümer-/Mieterwechsel, Wartungen und Vorgänge zu diesem Objekt.",
      punkte: [
        "Zeitleiste mit allen Ereignissen",
        "Filter nach Art (Vertrag, Wartung, Wechsel, Beschluss …)",
        "Verknüpfung zu Personen / Einheiten / Dokumenten"
      ]
    }
  ), tab === "dokumente" && /* @__PURE__ */ React.createElement(
    PlatzhalterReiter,
    {
      t,
      accent,
      icon: "document",
      titel: "Dokumente & Pläne",
      beschreibung: "Vertrag-PDFs, Grundbuchauszüge, Teilungserklärung, Baupläne, Aufmaße und sonstige Dateien zum Objekt.",
      punkte: [
        "Upload per Drag & Drop",
        "Ordner-Struktur (Verträge, Pläne, Protokolle …)",
        "Verknüpfung mit Einheiten und Räumen",
        "AI-Analyse via dokument_analyse.py-Pipeline"
      ]
    }
  ), tab === "bilder" && /* @__PURE__ */ React.createElement(
    PlatzhalterReiter,
    {
      t,
      accent,
      icon: "paint",
      titel: "Bilder",
      beschreibung: "Fotos zum Objekt — Außenansichten, technische Anlagen, Schadensbilder, Begehungs-Fotos.",
      punkte: [
        "Kategorien (Außen, Innen, Technik, Schäden …)",
        "Direkter Upload vom Handy (Kamera)",
        "Verknüpfung mit Einheiten oder Räumen",
        "Lightbox-Vorschau"
      ]
    }
  ));
}
function PlatzhalterReiter({ t, accent, icon, titel, beschreibung, punkte }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    padding: "24px 18px",
    textAlign: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 56,
    height: 56,
    borderRadius: 14,
    margin: "0 auto 14px",
    background: accent + "18",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: icon, size: 26, color: accent })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 6 } }, titel), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.sub,
    marginBottom: 14,
    lineHeight: 1.5,
    maxWidth: 480,
    margin: "0 auto 14px"
  } }, beschreibung), /* @__PURE__ */ React.createElement("div", { style: {
    display: "inline-block",
    fontSize: 9,
    fontWeight: 700,
    color: accent,
    background: accent + "15",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 999,
    marginBottom: 14
  } }, "Funktion folgt"), punkte && punkte.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "12px 16px",
    maxWidth: 480,
    margin: "0 auto",
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8
  } }, "Geplant"), /* @__PURE__ */ React.createElement("ul", { style: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 6
  } }, punkte.map((p, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontSize: 12,
    color: t.text
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: accent, marginTop: 2 } }, "·"), p)))));
}
const KONTAKT_KATEGORIEN = [
  {
    id: "eigentuemer",
    label: "Eigentümer",
    icon: "🏷",
    defaultFarbe: "#F472B6",
    typ: "person",
    rollen: ["Eigentümer", "Miteigentümer"],
    sub: "Eigentümer und Miteigentümer"
  },
  {
    id: "mieter",
    label: "Mieter",
    icon: "🔑",
    defaultFarbe: "#22C55E",
    typ: "person",
    rollen: ["Mieter"],
    sub: "Aktuelle und werdende Mieter"
  },
  {
    id: "gremium",
    label: "Gremium",
    icon: "👥",
    defaultFarbe: "#15803D",
    typ: "person",
    rollen: ["Verwaltungsbeirat", "Rechnungsprüfer", "Bevollmächtigter"],
    sub: "Verwaltungsbeirat · Rechnungsprüfer · Bevollmächtigte"
  },
  {
    id: "vertraglich",
    label: "Vertragliche Dienstleister",
    icon: "📄",
    defaultFarbe: "#2563EB",
    typ: "firma",
    rollen: [
      "Hausverwaltung",
      "Hausmeister",
      "Wartung",
      "Brandschutz",
      "Winterdienst",
      "Grünpflege",
      "Reinigung",
      "Messdienst",
      "Versicherung"
    ],
    sub: "Hausmeister, Reinigung, Wartung, Versicherung etc."
  },
  {
    id: "versorger",
    label: "Ver- und Entsorger",
    icon: "⚡",
    defaultFarbe: "#EA580C",
    typ: "firma",
    rollen: ["Versorger", "Müllabfuhr"],
    sub: "Strom, Gas, Wasser, Müllabfuhr"
  },
  {
    id: "gelegentlich",
    label: "Gelegentliche Aufträge",
    icon: "🛠",
    defaultFarbe: "#71717A",
    typ: "firma",
    rollen: null,
    // null = keine Rolle ODER Sammelrolle "Dienstleister"
    sub: "Einmaltätigkeiten ohne feste Rolle"
  }
];
function farbeFuerKategorie(kat, personenRollen, firmenRollen) {
  if (!kat.rollen || kat.rollen.length === 0) return kat.defaultFarbe;
  const rollenListe = kat.typ === "firma" ? firmenRollen : personenRollen;
  for (const rname of kat.rollen) {
    const def = (rollenListe || []).find((r) => r.name === rname && r.aktiv !== false);
    if (def && def.color) return def.color;
  }
  return kat.defaultFarbe;
}
function sammleFuerKategorie(kat, ve, kontakte) {
  return (kontakte || []).filter((k) => {
    if (k.typ !== kat.typ) return false;
    return (k.objektZuweisungen || []).some((z) => {
      if (z.objektId !== ve.id) return false;
      if (kat.rollen === null) {
        return !z.rolle || z.rolle === "Dienstleister";
      }
      return kat.rollen.includes(z.rolle);
    });
  });
}
function KontaktZeile({ k, ve, t, accent, highlightAccent, isActive, onClick, id }) {
  const hl = highlightAccent || accent;
  const istFirma = k.typ === "firma";
  const name = istFirma ? k.name : `${k.vorname || ""} ${k.nachname || ""}`.trim() || k.name;
  const objektZuw = (k.objektZuweisungen || []).filter((z) => z.objektId === ve.id);
  let bezug = "";
  const zuweisung = objektZuw[0];
  if (zuweisung) {
    if (zuweisung.einheitId) {
      const einheit = (ve.einheiten || []).find((e) => e.id === zuweisung.einheitId);
      if (einheit) bezug = einheit.nr + (einheit.lage ? ` · ${einheit.lage}` : "");
    } else if (istFirma) {
      bezug = zuweisung.rolle || "Auftrag";
    }
  }
  const tel = k.tels && k.tels[0] && k.tels[0].nr || k.tel || "";
  const email = k.emails && k.emails[0] && k.emails[0].email || k.email || "";
  return /* @__PURE__ */ React.createElement("div", { id, onClick, style: {
    background: isActive ? hl + "10" : t.bg,
    border: `1px solid ${isActive ? hl + "50" : t.border}`,
    borderRadius: 8,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    cursor: "pointer",
    transition: "all 0.15s"
  } }, /* @__PURE__ */ React.createElement(
    Avatar,
    {
      name,
      firma: istFirma,
      size: 32,
      accent,
      zuweisungen: istFirma ? null : objektZuw
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    fontWeight: 700,
    color: t.text,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, name), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    color: t.sub,
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
    marginTop: 1
  } }, bezug && /* @__PURE__ */ React.createElement("span", null, bezug), tel && /* @__PURE__ */ React.createElement("span", null, bezug ? "· " : "", "📞 ", tel), email && !tel && /* @__PURE__ */ React.createElement("span", null, bezug ? "· " : "", "✉ ", email))), /* @__PURE__ */ React.createElement(I, { name: isActive ? "chevD" : "chevR", size: 12, color: t.muted }));
}
function KontaktKategorieKarte({
  kategorie,
  kontakte,
  ve,
  alleKontakte,
  ves,
  t,
  editMode,
  expandedKontaktId,
  onKlick,
  onKontaktUpdate,
  onVEKlick,
  setKontakte,
  onGotoKontakt,
  objektAccent
}) {
  const [expanded, setExpanded] = useState(kontakte.length > 0);
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setExpanded((v) => !v), style: {
    padding: "11px 14px",
    background: kategorie.farbe + "08",
    borderBottom: expanded ? `1px solid ${t.border}` : "none",
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, kategorie.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, kategorie.label, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 500, color: t.sub, marginLeft: 6 } }, "(", kontakte.length, ")")), kategorie.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, marginTop: 2 } }, kategorie.sub)), /* @__PURE__ */ React.createElement("div", { style: {
    transition: "transform 0.2s",
    transform: expanded ? "rotate(0)" : "rotate(-90deg)"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 12, color: t.muted }))), expanded && /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px" } }, kontakte.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", padding: "8px 0", textAlign: "center" } }, "Keine ", kategorie.label.toLowerCase(), " verknüpft.") : kontakte.map((k) => {
    const offen = expandedKontaktId === k.id;
    return /* @__PURE__ */ React.createElement(Fragment, { key: k.id }, /* @__PURE__ */ React.createElement(
      KontaktZeile,
      {
        k,
        ve,
        t,
        accent: kategorie.farbe,
        highlightAccent: objektAccent,
        isActive: offen,
        id: "vekon-" + ve.id + "-" + k.id,
        onClick: () => onKlick && onKlick(k.id)
      }
    ), offen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, marginBottom: 10 } }, /* @__PURE__ */ React.createElement(
      KontaktDetailKarte,
      {
        k,
        t,
        accent: objektAccent,
        kategorieFarbe: kategorie.farbe,
        ves,
        kontakte: alleKontakte,
        setKontakte,
        objektFilter: ve.id,
        onGotoKontakt,
        onKontaktClick: (id) => onKlick && onKlick(id),
        onVEClick: onVEKlick,
        onUpdate: (patch) => onKontaktUpdate && onKontaktUpdate(k.id, patch)
      }
    )));
  })));
}
function VEKontakteTab({ ve, t, accent, kontakte, setKontakte, onKontaktClick, editMode = false, ves = [] }) {
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const [addType, setAddType] = useState(null);
  const [pickerOffen, setPickerOffen] = useState(false);
  const [expandedKontaktId, setExpandedKontaktId] = useState(null);
  const updateKontakt = (kontaktId, patch) => {
    setKontakte(kontakte.map((k) => k.id === kontaktId ? { ...k, ...patch } : k));
  };
  const kategorienMitDaten = KONTAKT_KATEGORIEN.map((kat) => ({
    kat: { ...kat, farbe: farbeFuerKategorie(kat, personenRollen, firmenRollen) },
    items: sammleFuerKategorie(kat, ve, kontakte)
  }));
  const gesamtPersonen = kategorienMitDaten.filter((x) => x.kat.typ === "person").reduce((s, x) => s + x.items.length, 0);
  const gesamtFirmen = kategorienMitDaten.filter((x) => x.kat.typ === "firma").reduce((s, x) => s + x.items.length, 0);
  const handleAdd = (kontaktId, rolleEintrag) => {
    if (!setKontakte || !kontaktId) return;
    const neueZuw = { ...rolleEintrag, objektId: ve.id };
    setKontakte((prev) => prev.map((k) => {
      if (k.id !== kontaktId) return k;
      const liste = k.objektZuweisungen || [];
      return { ...k, objektZuweisungen: [...liste, neueZuw] };
    }));
    setAddType(null);
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12
  } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, fontSize: 12, color: t.sub } }, gesamtPersonen, " ", gesamtPersonen === 1 ? "Person" : "Personen", " · ", gesamtFirmen, " ", gesamtFirmen === 1 ? "Firma" : "Firmen", " verknüpft"), editMode && !addType && /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPickerOffen((v) => !v),
      title: "Kontakt hinzufügen",
      "aria-label": "Kontakt hinzufügen",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        background: accent,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        boxShadow: `0 1px 2px ${accent}40`
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: "plus", size: 16, color: "#fff" })
  ), pickerOffen && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    overflow: "hidden",
    zIndex: 100,
    minWidth: 140
  } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setAddType("person");
        setPickerOffen(false);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        background: "none",
        border: "none",
        padding: "10px 14px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        color: KONTAKTE_FARBE,
        textAlign: "left",
        borderBottom: `1px solid ${t.border}`
      },
      onMouseEnter: (e) => e.currentTarget.style.background = KONTAKTE_FARBE + "10",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement(I, { name: "user", size: 14, color: KONTAKTE_FARBE }),
    "Person"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setAddType("firma");
        setPickerOffen(false);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        background: "none",
        border: "none",
        padding: "10px 14px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        color: FIRMEN_FARBE,
        textAlign: "left"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = FIRMEN_FARBE + "10",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement(I, { name: "building", size: 14, color: FIRMEN_FARBE }),
    "Firma"
  )))), addType && /* @__PURE__ */ React.createElement(
    KontaktZuweisungForm,
    {
      t,
      accent: addType === "firma" ? FC : accent,
      ves: [ve],
      kontakte,
      typ: addType,
      onSave: (kontaktId, rolleEintrag) => handleAdd(kontaktId, rolleEintrag),
      onCancel: () => setAddType(null)
    }
  ), kategorienMitDaten.map(({ kat, items }) => /* @__PURE__ */ React.createElement(
    KontaktKategorieKarte,
    {
      key: kat.id,
      kategorie: kat,
      kontakte: items,
      ve,
      alleKontakte: kontakte,
      ves,
      setKontakte,
      objektAccent: accent,
      t,
      editMode,
      expandedKontaktId,
      onKlick: (id) => setExpandedKontaktId(expandedKontaktId === id ? null : id),
      onKontaktUpdate: updateKontakt,
      onGotoKontakt: (id) => {
        setExpandedKontaktId(null);
        onKontaktClick && onKontaktClick(id);
      },
      onVEKlick: (veId) => {
        setExpandedKontaktId(null);
        onKontaktClick && onKontaktClick(veId);
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { height: "40vh" } }));
}
function RolleInfoBox({ kontakt, ve, rolle, t, accent }) {
  const zuw = (kontakt.objektZuweisungen || []).filter((z) => z.objektId === ve.id && z.rolle === rolle);
  if (zuw.length === 0 && rolle !== "Dienstleister") return null;
  const zeilen = zuw.map((z, idx) => {
    const einheit = z.einheitId ? ve.einheiten.find((e) => e.id === z.einheitId) : null;
    let von = "", bis = "";
    let grundbuch = null, selbstnutzer = null;
    if (einheit) {
      if (rolle === "Eigentümer") {
        const e = einheit.eigentuemer.find((x) => x.kontaktId === kontakt.id);
        if (e) {
          von = e.von;
          grundbuch = e.grundbuch;
          selbstnutzer = e.selbstnutzer;
        }
      } else if (rolle === "Mieter") {
        const m = einheit.mieter.find((x) => x.kontaktId === kontakt.id);
        if (m) {
          von = m.von;
          bis = m.bis || "";
        }
      }
    }
    return { z, einheit, von, bis, grundbuch, selbstnutzer, idx };
  });
  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 3
  };
  const wertStyle = { fontSize: 13, color: t.text, fontWeight: 600 };
  const subStyle = { fontSize: 11, color: t.sub };
  const pillStyle = (col) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 8px",
    borderRadius: 999,
    background: col + "22",
    color: col,
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  });
  const statusFarbe = (status) => status === "aktiv" ? "#10B981" : status === "werdend" ? "#F59E0B" : status === "ehemalig" ? "#EF4444" : t.sub;
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0E",
    border: `1px solid ${accent}40`,
    borderRadius: 10,
    padding: "12px 14px",
    marginBottom: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 800,
    color: accent,
    textTransform: "uppercase",
    letterSpacing: "0.1em"
  } }, rolle, " in ", ve.nr), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, fontWeight: 600 } }, "(", zeilen.length, " ", zeilen.length === 1 ? "Zuweisung" : "Zuweisungen", ")")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10 } }, zeilen.map(({ z, einheit, von, bis, grundbuch, selbstnutzer, idx }) => /* @__PURE__ */ React.createElement("div", { key: idx, style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "10px 12px"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBottom: einheit || von || bis ? 8 : 0
  } }, einheit && /* @__PURE__ */ React.createElement("div", { style: wertStyle }, einheit.nr, einheit.lage && /* @__PURE__ */ React.createElement("span", { style: { ...subStyle, marginLeft: 6, fontWeight: 500 } }, "· ", einheit.lage)), /* @__PURE__ */ React.createElement("span", { style: pillStyle(statusFarbe(z.status)) }, z.status || "—"), z.vorsitz && /* @__PURE__ */ React.createElement("span", { style: pillStyle(accent) }, "Vorsitz")), (von || bis || grundbuch !== null || selbstnutzer !== null) && /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 8
  } }, von && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, z.status === "ehemalig" ? "Von" : "Seit"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, von)), bis && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Bis"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, bis)), grundbuch !== null && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Grundbuch"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, grundbuch ? "Ja" : "Nein")), selbstnutzer !== null && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Selbstnutzer"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, selbstnutzer ? "Ja" : "Nein"))), z.status === "ehemalig" && !von && !bis && /* @__PURE__ */ React.createElement("div", { style: { ...subStyle, fontStyle: "italic" } }, "Details der Mietzeit nicht erfasst.")))));
}
function KategorieKacheln({ settings, t, aktiverScreen, suchAktiv = false, onKlick }) {
  const aktiv = settings.kacheln.filter((k) => k.aktiv).sort((a, b) => a.reihenfolge - b.reihenfolge);
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    overflowY: "hidden",
    width: "100%",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch"
  } }, aktiv.map((k) => {
    const ist = !suchAktiv && (aktiverScreen === k.id || aktiverScreen === "ve" && k.id === "objekte");
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: k.id,
        onClick: () => onKlick(k.id),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: ist ? k.farbe + "20" : t.surface,
          border: `1px solid ${ist ? k.farbe : t.border}`,
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.15s",
          fontFamily: "inherit",
          flex: "0 0 auto"
        },
        onMouseEnter: (e) => {
          if (!ist) e.currentTarget.style.borderColor = k.farbe + "60";
        },
        onMouseLeave: (e) => {
          if (!ist) e.currentTarget.style.borderColor = t.border;
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        width: 24,
        height: 24,
        borderRadius: 6,
        flexShrink: 0,
        background: k.farbe + "20",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      } }, /* @__PURE__ */ React.createElement(I, { name: k.icon, size: 12, color: k.farbe })),
      /* @__PURE__ */ React.createElement("span", { style: {
        fontSize: 12,
        fontWeight: ist ? 700 : 600,
        color: ist ? k.farbe : t.text,
        whiteSpace: "nowrap"
      } }, k.label)
    );
  }));
}
function SeitenleisteKacheln({ settings, setSettings, t, aktiverScreen, onKlick }) {
  const aktiv = settings.kacheln.filter((k) => k.aktiv).sort((a, b) => a.reihenfolge - b.reihenfolge);
  const breite = settings.sidebarBreite || 200;
  const modus = sidebarModus(breite);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const neueBreite = Math.max(SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, e.clientX));
      setSettings((s) => ({ ...s, sidebarBreite: neueBreite }));
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [dragging, setSettings]);
  return /* @__PURE__ */ React.createElement("aside", { style: {
    width: breite,
    flexShrink: 0,
    // Sidebar als normales flex-child: stretcht automatisch auf
    // Parent-Höhe (Hauptbereich = flex:1 nach Header).
    // KEIN position:sticky — der Parent scrollt nicht.
    alignSelf: "stretch",
    overflowY: "auto",
    background: t.surface,
    borderRight: `1px solid ${t.border}`,
    display: "flex",
    flexDirection: "column",
    padding: modus === "icon" ? "10px 6px" : "10px 8px",
    gap: 4,
    transition: dragging ? "none" : "width 0.15s ease"
  } }, aktiv.map((k) => {
    const ist = aktiverScreen === k.id || aktiverScreen === "ve" && k.id === "objekte";
    const label = modus === "icon" ? null : modus === "kurz" ? k.label.substring(0, 2) : k.label;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: k.id,
        onClick: () => onKlick(k.id),
        title: k.label,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: modus === "icon" ? "center" : "flex-start",
          gap: 10,
          padding: "9px 10px",
          background: ist ? k.farbe + "20" : t.card,
          border: `1px solid ${ist ? k.farbe + "60" : t.border}`,
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.15s",
          minWidth: 0
        },
        onMouseEnter: (e) => {
          if (!ist) e.currentTarget.style.borderColor = k.farbe + "60";
        },
        onMouseLeave: (e) => {
          if (!ist) e.currentTarget.style.borderColor = t.border;
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        width: 28,
        height: 28,
        borderRadius: 7,
        flexShrink: 0,
        background: k.farbe + "20",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      } }, /* @__PURE__ */ React.createElement(I, { name: k.icon, size: 14, color: k.farbe })),
      label && /* @__PURE__ */ React.createElement("span", { style: {
        fontSize: 13,
        fontWeight: ist ? 700 : 600,
        color: ist ? k.farbe : t.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      } }, label)
    );
  }), /* @__PURE__ */ React.createElement(
    "div",
    {
      onMouseDown: (e) => {
        e.preventDefault();
        setDragging(true);
      },
      style: {
        position: "absolute",
        top: 0,
        right: -3,
        bottom: 0,
        width: 6,
        cursor: "ew-resize",
        zIndex: 10
      },
      title: "Breite ändern – klicken und ziehen"
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      top: 0,
      left: 2,
      bottom: 0,
      width: 2,
      background: dragging ? ACCENT : "transparent",
      transition: "background 0.15s"
    } })
  ));
}
function FilterDropdown({ optionen, value, onChange, t, label = "Filter", disabled = false, fullWidth = false }) {
  const [offen, setOffen] = useState(false);
  const aktiv = (optionen || []).find((o) => o.id === value) || (optionen || [])[0];
  const istLeer = !optionen || optionen.length === 0;
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    flexShrink: fullWidth ? 1 : 0,
    width: fullWidth ? "100%" : "auto"
  } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => !istLeer && !disabled && setOffen((v) => !v),
      disabled: istLeer || disabled,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 10,
        padding: "9px 12px",
        cursor: istLeer || disabled ? "default" : "pointer",
        opacity: istLeer || disabled ? 0.5 : 1,
        color: t.text,
        fontSize: 13,
        fontWeight: 600,
        width: fullWidth ? "100%" : "auto",
        minWidth: fullWidth ? 0 : 170,
        whiteSpace: "nowrap",
        fontFamily: "inherit"
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: {
      flex: 1,
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis"
    } }, istLeer ? label : aktiv && aktiv.label || label),
    /* @__PURE__ */ React.createElement(I, { name: "chevD", size: 13, color: t.sub })
  ), offen && !istLeer && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: fullWidth ? 0 : "auto",
    zIndex: 80,
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    minWidth: fullWidth ? 0 : 220,
    width: fullWidth ? "100%" : "auto",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
    overflow: "hidden"
  } }, optionen.map((opt) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: opt.id,
      onClick: () => {
        onChange(opt.id);
        setOffen(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: "none",
        border: "none",
        borderBottom: `1px solid ${t.border}30`,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = ACCENT + "0C",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    value === opt.id && /* @__PURE__ */ React.createElement(I, { name: "check", size: 13, color: ACCENT }),
    /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 13,
      fontWeight: value === opt.id ? 700 : 500,
      color: value === opt.id ? ACCENT : t.text,
      marginLeft: value === opt.id ? 0 : 21
    } }, opt.label),
    typeof opt.count === "number" && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontSize: 11, color: t.muted } }, "(", opt.count, ")")
  ))));
}
function SucheFeld({ settings, t, accent, onErgebnis, kontakte, ves, resetKey }) {
  const [query, setQuery] = useState("");
  const [vorschlaege, setVS] = useState([]);
  const [fokus, setFokus] = useState(false);
  useEffect(() => {
    setQuery("");
    setVS([]);
    setFokus(false);
  }, [resetKey]);
  useEffect(() => {
    if (!query.trim()) {
      setVS([]);
      return;
    }
    const r = sucheAlles(query, settings, kontakte, ves);
    setVS(r.vorschlaege);
  }, [query]);
  const suchen = (q) => {
    const term = q || query;
    if (!term.trim()) return;
    const r = sucheAlles(term, settings, kontakte, ves);
    onErgebnis(r.ergebnisse, term);
    setVS([]);
    setFokus(false);
  };
  const klar = () => {
    setQuery("");
    setVS([]);
    onErgebnis(null, "");
  };
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    background: t.surface,
    border: `1px solid ${fokus ? accent + "80" : t.border}`,
    borderRadius: 10,
    padding: "8px 12px",
    gap: 8,
    transition: "border-color 0.15s"
  } }, /* @__PURE__ */ React.createElement(I, { name: "search", size: 15, color: fokus ? accent : t.muted }), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: query,
      onChange: (e) => setQuery(e.target.value),
      onFocus: () => setFokus(true),
      onBlur: () => setTimeout(() => setFokus(false), 150),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          suchen();
          e.target.blur();
        }
        if (e.key === "Escape") {
          klar();
          e.target.blur();
        }
      },
      placeholder: "VE-Nr., Adresse, Eigentümer, Firma, Mieter…",
      style: {
        flex: 1,
        background: "none",
        border: "none",
        outline: "none",
        fontSize: 16,
        color: t.text,
        minWidth: 0,
        fontFamily: "inherit"
      }
    }
  ), query && /* @__PURE__ */ React.createElement("button", { onClick: klar, style: { background: "none", border: "none", cursor: "pointer", opacity: 0.5 } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 13, color: t.sub })), /* @__PURE__ */ React.createElement("button", { onClick: () => suchen(), style: {
    background: accent,
    border: "none",
    borderRadius: 7,
    padding: "4px 12px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    whiteSpace: "nowrap",
    fontFamily: "inherit"
  } }, "Suchen")), fokus && vorschlaege.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    zIndex: 100,
    background: t.card,
    border: `1px solid ${accent}40`,
    borderRadius: 10,
    boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
    overflow: "hidden"
  } }, vorschlaege.map((v, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onMouseDown: () => suchen(v.text),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 14px",
        background: "none",
        border: "none",
        borderBottom: `1px solid ${t.border}20`,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = accent + "0C",
      onMouseLeave: (e) => e.currentTarget.style.background = "none"
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      flexShrink: 0,
      background: v.typ === "ve" ? accent + "20" : v.typ === "kontakt" ? FC + "20" : t.surface,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(
      I,
      {
        name: v.typ === "ve" ? "building" : v.typ === "kontakt" ? "user" : "home",
        size: 13,
        color: v.typ === "ve" ? accent : v.typ === "kontakt" ? FC : t.muted
      }
    )),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, v.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.sub } }, v.sub)),
    /* @__PURE__ */ React.createElement(I, { name: "chevR", size: 11, color: t.muted })
  ))));
}
function Suchergebnisse({
  ergebnisse,
  suchbegriff,
  t,
  accent,
  onSchliessen,
  ves,
  setVes,
  kontakte,
  setKontakte
}) {
  const [expandedVEId, setExpandedVEId] = useState(null);
  const [expandedKontaktId, setExpandedKontaktId] = useState(null);
  const updateKontakt = (id, patch) => {
    setKontakte((prev) => prev.map((k) => k.id === id ? { ...k, ...patch } : k));
  };
  const onVEFromKontakt = (id) => {
    setExpandedKontaktId(null);
    setExpandedVEId(id);
  };
  const onKontaktFromVE = (id) => {
    setExpandedVEId(null);
    setExpandedKontaktId(id);
  };
  const renderVEList = (list) => /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10
  } }, list.map((ve) => {
    const offen = expandedVEId === ve.id;
    return /* @__PURE__ */ React.createElement(Fragment, { key: ve.id }, /* @__PURE__ */ React.createElement(
      VEKachel,
      {
        ve,
        t,
        accent,
        aktiv: offen,
        id: "such-obj-" + ve.id,
        onClick: () => setExpandedVEId(offen ? null : ve.id)
      }
    ), offen && /* @__PURE__ */ React.createElement("div", { style: {
      gridColumn: "1 / -1",
      background: accent + "08",
      border: `1px solid ${accent}`,
      borderRadius: 12,
      padding: "14px 16px"
    } }, /* @__PURE__ */ React.createElement(
      VEDetail,
      {
        ve,
        kontakte,
        setKontakte,
        t,
        accent,
        ves,
        setVes,
        cardId: "such-obj-" + ve.id,
        onKontaktClick: onKontaktFromVE,
        onBack: () => setExpandedVEId(null)
      }
    )));
  }));
  const renderKontaktList = (list) => /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10
  } }, list.map((k) => {
    const offen = expandedKontaktId === k.id;
    const kFarbe = k.typ === "firma" ? FIRMEN_FARBE : KONTAKTE_FARBE;
    return /* @__PURE__ */ React.createElement(Fragment, { key: k.id }, /* @__PURE__ */ React.createElement(
      KontaktKarte,
      {
        k,
        t,
        aktiv: offen,
        id: "such-kon-" + k.id,
        onClick: () => setExpandedKontaktId(offen ? null : k.id)
      }
    ), offen && /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1 / -1" } }, /* @__PURE__ */ React.createElement(
      KontaktDetailKarte,
      {
        k,
        t,
        accent: kFarbe,
        ves,
        kontakte,
        onVEClick: onVEFromKontakt,
        onUpdate: (patch) => updateKontakt(k.id, patch)
      }
    )));
  }));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    fontWeight: 700,
    color: t.text,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, "Ergebnisse für „", suchbegriff, '"'), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onSchliessen,
      title: "Suche schließen",
      "aria-label": "Suche schließen",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
        background: accent + "15",
        border: `1px solid ${accent}40`,
        borderRadius: 8,
        padding: "6px 12px",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 700,
        color: accent,
        fontFamily: "inherit"
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: "x", size: 12, color: accent }),
    " Schließen"
  )), ergebnisse.objekte && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 10
  } }, "Objekte"), renderVEList(ergebnisse.objekte)), ergebnisse.objekte_von_kontakt && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement(
    Avatar,
    {
      name: ergebnisse.objekte_von_kontakt.kontakt.name,
      size: 24,
      accent,
      zuweisungen: ergebnisse.objekte_von_kontakt.kontakt.objektZuweisungen
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, "Objekte von ", /* @__PURE__ */ React.createElement("span", { style: { color: accent } }, ergebnisse.objekte_von_kontakt.kontakt.name))), renderVEList(ergebnisse.objekte_von_kontakt.ves)), ergebnisse.kontakte && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 10
  } }, "Kontakte"), renderKontaktList(ergebnisse.kontakte)), !ergebnisse.objekte && !ergebnisse.kontakte && !ergebnisse.objekte_von_kontakt && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.muted, textAlign: "center", padding: "30px 0" } }, "Keine Ergebnisse für „", suchbegriff, '".'));
}
const SLOT_LABELS = {
  ve: "Person VE",
  sev: "SEV",
  gremium: "Zusatzfunktion (Gremium)",
  firma: "Person Firma"
};
function gruppiereRollenNachSlot(rollen) {
  const slots = { ve: [], sev: [], gremium: [], firma: [] };
  (rollen || []).forEach((r) => {
    if (r.aktiv === false) return;
    if (slots[r.slot]) slots[r.slot].push(r);
  });
  return slots;
}
function RolleDetailBox({ z, ves, kontakte, t, accent, typ = "person", embedded = false }) {
  const ve = z.objektId ? (ves || []).find((v) => v.id === z.objektId) : null;
  const einheit = ve && z.einheitId ? ve.einheiten.find((e) => e.id === z.einheitId) : null;
  const firma = z.firmaId ? (kontakte || []).find((k) => k.id === z.firmaId) : null;
  let von = "", bis = "", grundbuch = null, selbstnutzer = null;
  if (einheit && z.kontaktId !== void 0) {
  }
  if (einheit && z.rolle === "Eigentümer" && z.kontaktId) {
    const e = einheit.eigentuemer.find((x) => x.kontaktId === z.kontaktId);
    if (e) {
      von = e.von || "";
      grundbuch = e.grundbuch;
      selbstnutzer = e.selbstnutzer;
    }
  } else if (einheit && z.rolle === "Mieter" && z.kontaktId) {
    const m = einheit.mieter.find((x) => x.kontaktId === z.kontaktId);
    if (m) {
      von = m.von || "";
      bis = m.bis || "";
    }
  }
  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 3
  };
  const wertStyle = { fontSize: 13, color: t.text, fontWeight: 600 };
  const sectionStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "10px 12px",
    marginBottom: 8
  };
  const felder = [];
  if (ve) {
    felder.push({ label: "Objekt", wert: `${ve.nr}` });
    if (ve.adresse) felder.push({ label: "Adresse", wert: ve.adresse });
  }
  if (einheit) {
    felder.push({ label: "Einheit", wert: einheit.nr });
    if (einheit.lage) felder.push({ label: "Lage", wert: einheit.lage });
    if (einheit.flaeche) felder.push({ label: "Fläche", wert: einheit.flaeche });
    if (einheit.zimmer) felder.push({ label: "Zimmer", wert: einheit.zimmer });
    if (einheit.typ) felder.push({ label: "Typ", wert: einheit.typ });
    if (einheit.mea) felder.push({ label: "MEA", wert: einheit.mea });
    if (einheit.rechtsstatus) felder.push({ label: "Rechtsstatus", wert: einheit.rechtsstatus });
  }
  if (firma) {
    felder.push({ label: "Firma", wert: firma.name });
    if (firma.rechtsform) felder.push({ label: "Rechtsform", wert: firma.rechtsform });
  }
  felder.push({ label: "Status", wert: z.status || "aktiv" });
  if (von) felder.push({ label: z.status === "ehemalig" ? "Von" : "Seit", wert: von });
  if (bis) felder.push({ label: "Bis", wert: bis });
  if (grundbuch !== null) felder.push({ label: "Grundbuch", wert: grundbuch ? "Ja" : "Nein" });
  if (selbstnutzer !== null) felder.push({ label: "Selbstnutzer", wert: selbstnutzer ? "Ja" : "Nein" });
  if (z.vorsitz) felder.push({ label: "Funktion", wert: "Vorsitz" });
  if (z.gewerk) felder.push({ label: "Gewerk", wert: z.gewerk });
  return /* @__PURE__ */ React.createElement("div", { style: embedded ? {
    padding: "10px 12px"
  } : {
    background: accent + "0E",
    border: `1px solid ${accent}40`,
    borderRadius: 10,
    padding: "12px 14px"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px 14px"
  } }, felder.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, f.label), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, f.wert)))), z.status === "ehemalig" && !von && !bis && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.muted,
    fontStyle: "italic",
    marginTop: 10
  } }, "Details der ehemaligen Zeit wurden nicht erfasst."));
}
function RolleZeile({
  z,
  ves,
  kontakte,
  editMode,
  onEdit,
  onDelete,
  t,
  accent,
  typ = "person",
  aktiv = false,
  onClick,
  id,
  embedded = false
}) {
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const rollenListe = typ === "firma" ? firmenRollen : personenRollen;
  const rolleDef = z.rolle ? rollenListe.find((r) => r.name === z.rolle) : null;
  if (z.rolle && !rolleDef) return null;
  if (!z.rolle && typ !== "firma") return null;
  const def = rolleDef || { name: "Auftrag", kuerzel: "AT", color: t.muted };
  const status = z.status || "aktiv";
  const ve = z.objektId ? (ves || []).find((v) => v.id === z.objektId) : null;
  const einheit = ve && z.einheitId ? ve.einheiten.find((e) => e.id === z.einheitId) : null;
  const firma = z.firmaId ? (kontakte || []).find((k) => k.id === z.firmaId) : null;
  let bezugZeile = "—";
  if (ve) bezugZeile = ve.nr + (einheit ? " · " + einheit.nr : "");
  else if (firma) bezugZeile = firma.name;
  let adrZeile = " ";
  if (ve) {
    const teile = (ve.adresse || "").split(",").map((s) => s.trim());
    adrZeile = teile[0] || " ";
  }
  const statusFarbe = status === "aktiv" ? "#22C55E" : status === "werdend" ? "#F59E0B" : "#94A3B8";
  const miniBtn = {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 24,
    height: 24,
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        boxSizing: "border-box",
        background: embedded ? "transparent" : t.card,
        border: embedded ? "none" : `1px solid ${aktiv ? def.color : t.border}`,
        borderRadius: embedded ? 0 : 12,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s",
        scrollMarginTop: "var(--ad-header-h, 200px)"
      },
      onMouseEnter: (e) => {
        if (onClick && !aktiv && !embedded) e.currentTarget.style.borderColor = def.color + "80";
      },
      onMouseLeave: (e) => {
        if (onClick && !aktiv && !embedded) e.currentTarget.style.borderColor = t.border;
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      width: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, typ === "firma" ? /* @__PURE__ */ React.createElement(Tip, { text: def.name + (status !== "aktiv" ? ` (${status})` : "") }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      background: status === "aktiv" ? def.color : "transparent",
      border: status === "aktiv" ? "none" : `1.5px ${status === "werdend" ? "dashed" : "solid"} ${def.color}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: status === "ehemalig" ? 0.6 : 1
    } }, /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: status === "aktiv" ? getContrastColor(def.color) : def.color
    } }, def.kuerzel))) : /* @__PURE__ */ React.createElement(RolleBadge, { rolle: z.rolle, size: 36, status, vorsitz: z.vorsitz })),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: def.color,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, def.name, z.vorsitz && def.name === "Verwaltungsbeirat" ? " · Vorsitz" : ""), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      marginTop: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, bezugZeile), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, adrZeile)),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 9,
      padding: "3px 8px",
      borderRadius: 10,
      background: statusFarbe + "22",
      color: statusFarbe,
      fontWeight: 700,
      letterSpacing: "0.02em"
    } }, status), editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          onEdit && onEdit();
        },
        title: "Bearbeiten",
        style: miniBtn
      },
      /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          onDelete && onDelete();
        },
        title: "Entfernen",
        style: miniBtn
      },
      /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub })
    )))
  );
}
function RolleEditor({ initial = {}, ves = [], kontakte = [], onSave, onCancel, t, accent, typ = "person" }) {
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const rollenListe = typ === "firma" ? firmenRollen : personenRollen;
  const [rolle, setRolle] = useState(initial.rolle || "");
  const [status, setStatus] = useState(initial.status || "aktiv");
  const [vorsitz, setVorsitz] = useState(!!initial.vorsitz);
  const [objektId, setObjektId] = useState(initial.objektId || "");
  const [einheitId, setEinheitId] = useState(initial.einheitId || "");
  const [firmaId, setFirmaId] = useState(initial.firmaId || "");
  const def = rollenListe.find((r) => r.name === rolle);
  const slot = typ === "person" && def ? def.slot : null;
  const aktVe = (ves || []).find((v) => v.id === objektId);
  const einheitenAvail = aktVe ? aktVe.einheiten : [];
  const firmen = (kontakte || []).filter((k) => k.typ === "firma");
  const setRolleClean = (neueRolle) => {
    setRolle(neueRolle);
    setVorsitz(false);
    if (typ === "firma") return;
    const neuDef = rollenListe.find((r) => r.name === neueRolle);
    if (!neuDef) return;
    if (neuDef.slot === "firma") {
      setObjektId("");
      setEinheitId("");
    } else {
      setFirmaId("");
    }
  };
  const valid = typ === "firma" ? !!objektId : rolle && (slot === "firma" && firmaId || slot !== "firma" && objektId);
  const handleSave = () => {
    if (!valid) return;
    const eintrag = { status };
    if (rolle) eintrag.rolle = rolle;
    if (typ === "firma") {
      eintrag.objektId = objektId;
      if (einheitId) eintrag.einheitId = einheitId;
    } else if (slot === "ve" || slot === "sev") {
      eintrag.objektId = objektId;
      if (einheitId) eintrag.einheitId = einheitId;
      else eintrag.einheitId = null;
    } else if (slot === "gremium") {
      eintrag.objektId = objektId;
      eintrag.einheitId = null;
      if (vorsitz) eintrag.vorsitz = true;
    } else if (slot === "firma") {
      eintrag.firmaId = Number(firmaId);
    }
    onSave(eintrag);
  };
  const personenGrupp = gruppiereRollenNachSlot(personenRollen);
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 4,
    marginBottom: 4
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  } }, initial.rolle ? "Rolle bearbeiten" : typ === "firma" ? "Objekt verknüpfen" : "Neue Rolle"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("select", { value: rolle, onChange: (e) => setRolleClean(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, typ === "firma" ? "— Keine Rolle (einmaliger Auftrag)" : "Rolle wählen…"), typ === "firma" ? firmenRollen.filter((r) => r.aktiv !== false).map(
    (r) => /* @__PURE__ */ React.createElement("option", { key: r.name, value: r.name }, r.name)
  ) : Object.entries(personenGrupp).map(([slotKey, list]) => list.length > 0 ? /* @__PURE__ */ React.createElement("optgroup", { key: slotKey, label: SLOT_LABELS[slotKey] }, list.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.name, value: r.name }, r.name))) : null)), (rolle || typ === "firma") && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, ["aktiv", "werdend", "ehemalig"].map((s) => {
    const f = def ? def.color : accent;
    return /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setStatus(s), style: {
      flex: 1,
      fontSize: 11,
      padding: "5px 0",
      borderRadius: 6,
      cursor: "pointer",
      background: status === s ? f + "22" : "transparent",
      border: `1px solid ${status === s ? f + "60" : t.border}`,
      color: status === s ? f : t.sub,
      fontFamily: "inherit",
      fontWeight: status === s ? 700 : 500
    } }, s);
  })), typ === "firma" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("select", { value: objektId, onChange: (e) => {
    setObjektId(e.target.value);
    setEinheitId("");
  }, style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Objekt wählen…"), (ves || []).map((v) => /* @__PURE__ */ React.createElement("option", { key: v.id, value: v.id }, v.nr, " · ", v.adresse))), objektId && einheitenAvail.length > 0 && /* @__PURE__ */ React.createElement("select", { value: einheitId, onChange: (e) => setEinheitId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Einheit (optional, nur falls einheitenbezogen)"), einheitenAvail.map((e) => /* @__PURE__ */ React.createElement("option", { key: e.id, value: e.id }, e.nr, " · ", e.typ)))), typ === "person" && (slot === "ve" || slot === "sev" || slot === "gremium") && /* @__PURE__ */ React.createElement("select", { value: objektId, onChange: (e) => {
    setObjektId(e.target.value);
    setEinheitId("");
  }, style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Objekt wählen…"), (ves || []).map((v) => /* @__PURE__ */ React.createElement("option", { key: v.id, value: v.id }, v.nr, " · ", v.adresse))), typ === "person" && (slot === "ve" || slot === "sev") && objektId && einheitenAvail.length > 0 && /* @__PURE__ */ React.createElement("select", { value: einheitId, onChange: (e) => setEinheitId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Einheit (optional)"), einheitenAvail.map((e) => /* @__PURE__ */ React.createElement("option", { key: e.id, value: e.id }, e.nr, " · ", e.typ))), typ === "person" && slot === "firma" && /* @__PURE__ */ React.createElement("select", { value: firmaId, onChange: (e) => setFirmaId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Firma wählen…"), firmen.map((f) => /* @__PURE__ */ React.createElement("option", { key: f.id, value: f.id }, f.name))), typ === "person" && rolle === "Verwaltungsbeirat" && status !== "ehemalig" && /* @__PURE__ */ React.createElement("label", { style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: t.sub,
    cursor: "pointer"
  } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: vorsitz, onChange: (e) => setVorsitz(e.target.checked) }), "Vorsitz (VBV)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: handleSave, disabled: !valid, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: valid ? accent : t.muted,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: valid ? "pointer" : "not-allowed",
    fontWeight: 600,
    fontFamily: "inherit",
    opacity: valid ? 1 : 0.6
  } }, initial.rolle ? "Übernehmen" : "Hinzufügen"))));
}
function ObjektZuweisungEditor({ kontakt, ves = [], onSave, onCancel, t, accent }) {
  const personenRollen = useRollen();
  const [bezugsart, setBezugsart] = useState("objekt");
  const [objektId, setObjektId] = useState("");
  const [einheitId, setEinheitId] = useState("");
  const [geraetId, setGeraetId] = useState("");
  const vorhandeneRollen = kontakt && Array.isArray(kontakt.rollen) ? kontakt.rollen : [];
  const [rolle, setRolle] = useState(vorhandeneRollen[0] || "");
  const [status, setStatus] = useState("aktiv");
  const [vorsitz, setVorsitz] = useState(false);
  const aktVe = (ves || []).find((v) => v.id === objektId);
  const einheitenAvail = aktVe ? aktVe.einheiten || [] : [];
  const technikAvail = aktVe && Array.isArray(aktVe.karten) ? aktVe.karten.flatMap((k) => (k.technikGeraete || []).map((g) => ({
    ...g,
    karteName: k.name || ""
  }))) : [];
  const fallbackRollen = personenRollen.filter((r) => r.aktiv !== false);
  const def = personenRollen.find((r) => r.name === rolle);
  const setBezugsartClean = (b) => {
    setBezugsart(b);
    if (b !== "einheit") setEinheitId("");
    if (b !== "technik") setGeraetId("");
  };
  const valid = objektId && rolle && status;
  const handleSave = () => {
    if (!valid) return;
    const eintrag = { rolle, status, objektId };
    if (bezugsart === "einheit" && einheitId) {
      eintrag.einheitId = einheitId;
    } else if (bezugsart === "technik" && geraetId) {
      eintrag.geraetId = geraetId;
    } else {
      eintrag.einheitId = null;
    }
    if (rolle === "Verwaltungsbeirat" && vorsitz && status !== "ehemalig") {
      eintrag.vorsitz = true;
    }
    onSave(eintrag);
  };
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  const segBtn = (aktiv, farbe) => ({
    flex: 1,
    fontSize: 11,
    padding: "5px 0",
    borderRadius: 6,
    cursor: "pointer",
    background: aktiv ? (farbe || accent) + "22" : "transparent",
    border: `1px solid ${aktiv ? (farbe || accent) + "60" : t.border}`,
    color: aktiv ? farbe || accent : t.sub,
    fontFamily: "inherit",
    fontWeight: aktiv ? 700 : 500
  });
  const hatRollen = vorhandeneRollen.length > 0;
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 4,
    marginBottom: 4
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  } }, "Objekt zuweisen"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, hatRollen && vorhandeneRollen.length > 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  } }, "Welche Rolle dieser Person?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, vorhandeneRollen.map((r) => {
    const rdef = personenRollen.find((x) => x.name === r);
    const f = rdef ? rdef.color : accent;
    const ist = rolle === r;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: r,
        onClick: () => {
          setRolle(r);
          setVorsitz(false);
        },
        style: {
          fontSize: 11,
          padding: "4px 10px",
          borderRadius: 999,
          background: ist ? f + "22" : "transparent",
          border: `1px solid ${ist ? f + "60" : t.border}`,
          color: ist ? f : t.sub,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: ist ? 700 : 500
        }
      },
      r
    );
  }))), !hatRollen && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  } }, "Rolle (Person hat noch keine — bitte wählen)"), /* @__PURE__ */ React.createElement("select", { value: rolle, onChange: (e) => {
    setRolle(e.target.value);
    setVorsitz(false);
  }, style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Rolle wählen…"), fallbackRollen.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.name, value: r.name }, r.name)))), hatRollen && vorhandeneRollen.length === 1 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, padding: "2px 0" } }, "Rolle: ", /* @__PURE__ */ React.createElement("span", { style: { color: def ? def.color : accent, fontWeight: 700 } }, rolle)), /* @__PURE__ */ React.createElement("select", { value: objektId, onChange: (e) => {
    setObjektId(e.target.value);
    setEinheitId("");
    setGeraetId("");
  }, style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Objekt wählen…"), (ves || []).map((v) => /* @__PURE__ */ React.createElement("option", { key: v.id, value: v.id }, v.nr, " · ", v.adresse))), objektId && (einheitenAvail.length > 0 || technikAvail.length > 0) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setBezugsartClean("objekt"),
      style: segBtn(bezugsart === "objekt")
    },
    "Ganzes Objekt"
  ), einheitenAvail.length > 0 && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setBezugsartClean("einheit"),
      style: segBtn(bezugsart === "einheit")
    },
    "Einheit / Stellplatz"
  ), technikAvail.length > 0 && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setBezugsartClean("technik"),
      style: segBtn(bezugsart === "technik")
    },
    "Technische Anlage"
  )), objektId && bezugsart === "einheit" && einheitenAvail.length > 0 && /* @__PURE__ */ React.createElement("select", { value: einheitId, onChange: (e) => setEinheitId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Einheit / Stellplatz wählen (optional)…"), einheitenAvail.map((e) => /* @__PURE__ */ React.createElement("option", { key: e.id, value: e.id }, e.nr, " · ", e.typ, e.lage ? ` · ${e.lage}` : ""))), objektId && bezugsart === "technik" && technikAvail.length > 0 && /* @__PURE__ */ React.createElement("select", { value: geraetId, onChange: (e) => setGeraetId(e.target.value), style: inputStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Anlage wählen (optional)…"), technikAvail.map((g) => /* @__PURE__ */ React.createElement("option", { key: g.id, value: g.id }, g.icon ? `${g.icon} ` : "", g.name || g.typ, g.karteName ? ` · ${g.karteName}` : ""))), rolle && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, ["aktiv", "werdend", "ehemalig"].map(
    (s) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s,
        onClick: () => setStatus(s),
        style: segBtn(status === s, def ? def.color : accent)
      },
      s
    )
  )), rolle === "Verwaltungsbeirat" && status !== "ehemalig" && /* @__PURE__ */ React.createElement("label", { style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: t.sub,
    cursor: "pointer"
  } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: vorsitz, onChange: (e) => setVorsitz(e.target.checked) }), "Vorsitz (VBV)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: handleSave, disabled: !valid, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: valid ? accent : t.muted,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: valid ? "pointer" : "not-allowed",
    fontWeight: 600,
    fontFamily: "inherit",
    opacity: valid ? 1 : 0.6
  } }, "Hinzufügen"))));
}
function StammdatenEditor({ edit, setEdit, t, accent }) {
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  const miniBtn = {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 22,
    height: 22,
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const addBtn = {
    fontSize: 10,
    padding: "3px 8px",
    background: accent + "15",
    color: accent,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit",
    alignSelf: "flex-start"
  };
  const ANREDEN = ["", "Herr", "Frau", "Familie", "Firma", "Dr.", "Prof."];
  const TEL_TYPEN = ["Mobil", "Festnetz", "Geschäftlich", "Fax"];
  const EMAIL_TYPEN = ["Privat", "Geschäftlich"];
  const tels = edit.tels || [];
  const emails = edit.emails || [];
  const setTel = (i, patch) => setEdit({
    ...edit,
    tels: tels.map((t2, idx) => idx === i ? { ...t2, ...patch } : t2)
  });
  const addTel = () => setEdit({ ...edit, tels: [...tels, { type: "Mobil", nr: "" }] });
  const rmTel = (i) => setEdit({ ...edit, tels: tels.filter((_, idx) => idx !== i) });
  const setEmail = (i, patch) => setEdit({
    ...edit,
    emails: emails.map((e, idx) => idx === i ? { ...e, ...patch } : e)
  });
  const addEmail = () => setEdit({ ...edit, emails: [...emails, { type: "Privat", email: "" }] });
  const rmEmail = (i) => setEdit({ ...edit, emails: emails.filter((_, idx) => idx !== i) });
  const sammleFavs = (tArr, eArr, adrFav) => [
    ...tArr.map((tt, idx) => tt.favorit ? { kind: "tel", idx } : null),
    ...eArr.map((ee, idx) => ee.favorit ? { kind: "email", idx } : null),
    adrFav ? { kind: "adresse", idx: 0 } : null
  ].filter(Boolean);
  const toggleFav = (kind, i) => {
    const istFav = kind === "tel" ? !!tels[i].favorit : kind === "email" ? !!emails[i].favorit : (
      /* adresse */
      !!edit.adresseFavorit
    );
    let newTels = tels.map((x) => ({ ...x }));
    let newEmails = emails.map((x) => ({ ...x }));
    let newAdrFav = !!edit.adresseFavorit;
    if (istFav) {
      if (kind === "tel") newTels[i].favorit = false;
      else if (kind === "email") newEmails[i].favorit = false;
      else newAdrFav = false;
    } else {
      const favs = sammleFavs(newTels, newEmails, newAdrFav);
      if (favs.length >= 2) {
        const oldest = favs[0];
        if (oldest.kind === "tel") newTels[oldest.idx].favorit = false;
        else if (oldest.kind === "email") newEmails[oldest.idx].favorit = false;
        else newAdrFav = false;
      }
      if (kind === "tel") newTels[i].favorit = true;
      else if (kind === "email") newEmails[i].favorit = true;
      else newAdrFav = true;
    }
    setEdit({ ...edit, tels: newTels, emails: newEmails, adresseFavorit: newAdrFav });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: edit.anrede || "",
      onChange: (e) => setEdit({ ...edit, anrede: e.target.value }),
      style: { ...inputStyle, width: 90, flexShrink: 0 }
    },
    ANREDEN.map((a) => /* @__PURE__ */ React.createElement("option", { key: a, value: a }, a || "Anrede…"))
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Vorname",
      value: edit.vorname || "",
      onChange: (e) => setEdit({ ...edit, vorname: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Nachname",
      value: edit.nachname || "",
      onChange: (e) => setEdit({ ...edit, nachname: e.target.value }),
      style: inputStyle
    }
  )), tels.map((tel, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "📞"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: tel.type,
      onChange: (e) => setTel(i, { type: e.target.value }),
      style: { ...inputStyle, width: 105, flexShrink: 0 }
    },
    TEL_TYPEN.map((tp) => /* @__PURE__ */ React.createElement("option", { key: tp, value: tp }, tp))
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: tel.nr,
      placeholder: "0151 …",
      onChange: (e) => setTel(i, { nr: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toggleFav("tel", i),
      title: tel.favorit ? "Von der Kontaktkarte entfernen" : "Auf der Kontaktkarte anzeigen (max. 2)",
      style: {
        ...miniBtn,
        color: tel.favorit ? "#EF4444" : t.muted,
        borderColor: tel.favorit ? "#EF4444" : t.border
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, lineHeight: 1, fontWeight: 700 } }, tel.favorit ? "★" : "☆")
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => rmTel(i), style: miniBtn, title: "Telefon entfernen" }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub })))), /* @__PURE__ */ React.createElement("button", { onClick: addTel, style: addBtn }, "+ Telefon"), emails.map((em, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "✉"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: em.type,
      onChange: (e) => setEmail(i, { type: e.target.value }),
      style: { ...inputStyle, width: 105, flexShrink: 0 }
    },
    EMAIL_TYPEN.map((tp) => /* @__PURE__ */ React.createElement("option", { key: tp, value: tp }, tp))
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: em.email,
      placeholder: "mail@…",
      onChange: (e) => setEmail(i, { email: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toggleFav("email", i),
      title: em.favorit ? "Von der Kontaktkarte entfernen" : "Auf der Kontaktkarte anzeigen (max. 2)",
      style: {
        ...miniBtn,
        color: em.favorit ? "#EF4444" : t.muted,
        borderColor: em.favorit ? "#EF4444" : t.border
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, lineHeight: 1, fontWeight: 700 } }, em.favorit ? "★" : "☆")
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => rmEmail(i), style: miniBtn, title: "E-Mail entfernen" }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub })))), /* @__PURE__ */ React.createElement("button", { onClick: addEmail, style: addBtn }, "+ E-Mail"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "🏠"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Straße + Hausnr.",
      value: edit.strasse || "",
      onChange: (e) => setEdit({ ...edit, strasse: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toggleFav("adresse", 0),
      title: edit.adresseFavorit ? "Adresse von der Karte entfernen" : "Adresse auf der Karte anzeigen (max. 2)",
      style: {
        ...miniBtn,
        color: edit.adresseFavorit ? "#EF4444" : t.muted,
        borderColor: edit.adresseFavorit ? "#EF4444" : t.border
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, lineHeight: 1, fontWeight: 700 } }, edit.adresseFavorit ? "★" : "☆")
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "📮"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "PLZ Ort",
      value: edit.plzOrt || "",
      onChange: (e) => setEdit({ ...edit, plzOrt: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toggleFav("adresse", 0),
      title: edit.adresseFavorit ? "Adresse von der Karte entfernen" : "Adresse auf der Karte anzeigen (max. 2)",
      style: {
        ...miniBtn,
        color: edit.adresseFavorit ? "#EF4444" : t.muted,
        borderColor: edit.adresseFavorit ? "#EF4444" : t.border
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, lineHeight: 1, fontWeight: 700 } }, edit.adresseFavorit ? "★" : "☆")
  )));
}
function FirmaStammdatenEditor({ edit, setEdit, t, accent }) {
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    outline: "none",
    fontFamily: "inherit"
  };
  const miniBtn = {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    width: 22,
    height: 22,
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const addBtn = {
    fontSize: 10,
    padding: "3px 8px",
    background: accent + "15",
    color: accent,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit",
    alignSelf: "flex-start"
  };
  const gewerke = edit.gewerke || [];
  const setGewerk = (i, val) => setEdit({
    ...edit,
    gewerke: gewerke.map((g, idx) => idx === i ? val : g)
  });
  const addGewerk = () => setEdit({ ...edit, gewerke: [...gewerke, ""] });
  const rmGewerk = (i) => setEdit({ ...edit, gewerke: gewerke.filter((_, idx) => idx !== i) });
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Firmenname",
      value: edit.name || "",
      onChange: (e) => setEdit({ ...edit, name: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Rechtsform (GmbH, OHG, e.K. …)",
      value: edit.rechtsform || "",
      onChange: (e) => setEdit({ ...edit, rechtsform: e.target.value }),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "📞"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: edit.tel || "",
      placeholder: "Zentrale Tel.",
      onChange: (e) => setEdit({ ...edit, tel: e.target.value }),
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "✉"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: edit.email || "",
      placeholder: "zentrale@…",
      onChange: (e) => setEdit({ ...edit, email: e.target.value }),
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "🌐"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: edit.homepage || "",
      placeholder: "www.…",
      onChange: (e) => setEdit({ ...edit, homepage: e.target.value }),
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "🏠"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Straße + Hausnr.",
      value: edit.strasse || "",
      onChange: (e) => setEdit({ ...edit, strasse: e.target.value }),
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "📮"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "PLZ Ort",
      value: edit.plzOrt || "",
      onChange: (e) => setEdit({ ...edit, plzOrt: e.target.value }),
      style: inputStyle
    }
  )), gewerke.map((g, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, width: 16, textAlign: "center", flexShrink: 0 } }, "🔧"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: g,
      placeholder: "Gewerk (z. B. Sanitär)",
      onChange: (e) => setGewerk(i, e.target.value),
      style: inputStyle
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: () => rmGewerk(i), style: miniBtn, title: "Gewerk entfernen" }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 11, color: t.sub })))), /* @__PURE__ */ React.createElement("button", { onClick: addGewerk, style: addBtn }, "+ Gewerk"));
}
function NotizenSektion({ wert, onChange, t, accent, embedded = false }) {
  return /* @__PURE__ */ React.createElement("div", { style: embedded ? {} : { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 6
  } }, "Notizen"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: wert || "",
      onChange: (e) => onChange(e.target.value),
      placeholder: "Notizen, Anmerkungen, Erinnerungen…",
      rows: 3,
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 12,
        color: t.text,
        fontFamily: "inherit",
        outline: "none",
        resize: "vertical",
        minHeight: 60
      },
      onFocus: (e) => e.currentTarget.style.borderColor = accent + "80",
      onBlur: (e) => e.currentTarget.style.borderColor = t.border
    }
  ));
}
const CUSTOM_FELD_TYPEN = [
  { id: "text", label: "Text", icon: "Aa", htmlType: "text" },
  { id: "number", label: "Zahl", icon: "#", htmlType: "number" },
  { id: "date", label: "Datum", icon: "📅", htmlType: "date" },
  { id: "email", label: "E-Mail", icon: "✉", htmlType: "email" },
  { id: "tel", label: "Telefon", icon: "📞", htmlType: "tel" },
  { id: "url", label: "Link", icon: "🔗", htmlType: "url" }
];
function formatCustomWert(typ, wert) {
  if (wert == null || wert === "") return "";
  if (typ === "date") {
    const parts = String(wert).split("-");
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    return String(wert);
  }
  if (typ === "url") return String(wert);
  return String(wert);
}
function CustomFeldZeile({ feld, onWertChange, onFeldChange, onRemove, editMode, t, accent }) {
  const [editing, setEditing] = useState(false);
  const typDef = CUSTOM_FELD_TYPEN.find((x) => x.id === feld.typ) || CUSTOM_FELD_TYPEN[0];
  if (editing && editMode) {
    return /* @__PURE__ */ React.createElement(
      CustomFeldForm,
      {
        initial: feld,
        onSave: (neuesFeld) => {
          onFeldChange(neuesFeld);
          setEditing(false);
        },
        onCancel: () => setEditing(false),
        t,
        accent
      }
    );
  }
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 0",
    borderBottom: `1px solid ${t.border}30`
  } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "0 0 130px", minWidth: 0, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, opacity: 0.7 } }, typDef.icon), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 12,
    color: t.sub,
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, feld.name)), editMode ? /* @__PURE__ */ React.createElement(
    "input",
    {
      type: typDef.htmlType,
      value: feld.wert || "",
      onChange: (e) => onWertChange(e.target.value),
      placeholder: `${typDef.label}…`,
      style: {
        flex: 1,
        minWidth: 0,
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 8px",
        fontSize: 12,
        color: t.text,
        fontFamily: "inherit",
        outline: "none"
      },
      onFocus: (e) => e.currentTarget.style.borderColor = accent + "80",
      onBlur: (e) => e.currentTarget.style.borderColor = t.border
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    fontSize: 12,
    color: t.text,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "5px 8px"
  } }, feld.wert ? formatCustomWert(feld.typ, feld.wert) : /* @__PURE__ */ React.createElement("span", { style: { color: t.muted, fontStyle: "italic" } }, "—")), editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEditing(true),
      title: "Feld bearbeiten (Name, Typ)",
      style: {
        background: "transparent",
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "2px 6px",
        cursor: "pointer",
        color: t.sub,
        fontFamily: "inherit",
        fontSize: 11,
        fontWeight: 600
      }
    },
    "✎"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onRemove,
      title: "Feld löschen",
      style: {
        background: "transparent",
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "2px 6px",
        cursor: "pointer",
        color: "#EF4444",
        fontFamily: "inherit",
        fontSize: 11,
        fontWeight: 600
      }
    },
    "✕"
  )));
}
function CustomFeldForm({ initial, onSave, onCancel, t, accent }) {
  const istBearbeitung = !!initial;
  const [name, setName] = useState(initial && initial.name || "");
  const [typ, setTyp] = useState(initial && initial.typ || "text");
  const [wert, setWert] = useState(initial && initial.wert || "");
  const typDef = CUSTOM_FELD_TYPEN.find((x) => x.id === typ) || CUSTOM_FELD_TYPEN[0];
  const kannSpeichern = name.trim().length > 0;
  const speichern = () => {
    if (!kannSpeichern) return;
    if (istBearbeitung) {
      onSave({ ...initial, name: name.trim(), typ, wert });
    } else {
      onSave({
        id: Date.now() + Math.floor(Math.random() * 1e3),
        name: name.trim(),
        typ,
        wert
      });
    }
  };
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    fontFamily: "inherit",
    outline: "none"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "0A",
    border: `1px dashed ${accent}55`,
    borderRadius: 9,
    padding: 10,
    marginTop: 6,
    marginBottom: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  } }, istBearbeitung ? "Feld bearbeiten" : "Neues Feld"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, marginBottom: 3 } }, "Feldname"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "z. B. Geburtstag, Hobby, IBAN…",
      autoFocus: true,
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, marginBottom: 3 } }, "Typ"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, CUSTOM_FELD_TYPEN.map((td) => {
    const ist = typ === td.id;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: td.id,
        onClick: () => {
          setTyp(td.id);
          if (!istBearbeitung) setWert("");
        },
        style: {
          fontSize: 11,
          padding: "4px 10px",
          borderRadius: 999,
          background: ist ? accent + "22" : "transparent",
          border: `1px solid ${ist ? accent + "60" : t.border}`,
          color: ist ? accent : t.sub,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: ist ? 700 : 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 4
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12 } }, td.icon),
      td.label
    );
  }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, marginBottom: 3 } }, "Wert (optional)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: typDef.htmlType,
      value: wert,
      onChange: (e) => setWert(e.target.value),
      placeholder: `${typDef.label}…`,
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 2 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    cursor: "pointer",
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: speichern, disabled: !kannSpeichern, style: {
    fontSize: 11,
    padding: "5px 12px",
    background: kannSpeichern ? accent : t.muted,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: kannSpeichern ? "pointer" : "not-allowed",
    fontWeight: 600,
    fontFamily: "inherit",
    opacity: kannSpeichern ? 1 : 0.6
  } }, istBearbeitung ? "Speichern" : "Hinzufügen"))));
}
function CustomFelderSektion({ felder, onChange, editMode, t, accent, embedded = false }) {
  const [neuesFeldForm, setNeuesFeldForm] = useState(false);
  const liste = Array.isArray(felder) ? felder : [];
  const update = (idx, neueFeld) => {
    onChange(liste.map((f, i) => i === idx ? neueFeld : f));
  };
  const remove = (idx) => {
    onChange(liste.filter((_, i) => i !== idx));
  };
  const add = (neuesFeld) => {
    onChange([...liste, neuesFeld]);
    setNeuesFeldForm(false);
  };
  return /* @__PURE__ */ React.createElement("div", { style: embedded ? {} : { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.1em"
  } }, "Eigene Felder (", liste.length, ")"), editMode && !neuesFeldForm && /* @__PURE__ */ React.createElement("button", { onClick: () => setNeuesFeldForm(true), style: {
    fontSize: 11,
    padding: "3px 10px",
    background: accent + "20",
    color: accent,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600
  } }, "+ Feld hinzufügen")), liste.length === 0 && !neuesFeldForm && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", padding: "6px 0" } }, editMode ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Noch keine eigenen Felder. Klick ", "„+ Feld hinzufügen“", " für Geburtstag, Hobby etc.") : "Keine eigenen Felder."), liste.length > 0 && /* @__PURE__ */ React.createElement("div", null, liste.map((f, i) => /* @__PURE__ */ React.createElement(
    CustomFeldZeile,
    {
      key: f.id || i,
      feld: f,
      onWertChange: (neuWert) => update(i, { ...f, wert: neuWert }),
      onFeldChange: (neuesFeld) => update(i, neuesFeld),
      onRemove: () => remove(i),
      editMode,
      t,
      accent
    }
  ))), neuesFeldForm && editMode && /* @__PURE__ */ React.createElement(
    CustomFeldForm,
    {
      onSave: add,
      onCancel: () => setNeuesFeldForm(false),
      t,
      accent
    }
  ));
}
function getFirmaMitarbeiter(firmaId, kontakte) {
  return (kontakte || []).filter((k) => k && k.typ === "person" && k.firmaId === firmaId).map((p) => {
    const zuw = (p.objektZuweisungen || []).find(
      (z) => z.firmaId === firmaId && !z.objektId
    );
    return {
      person: p,
      rolle: zuw ? zuw.rolle : null,
      status: zuw ? zuw.status || "aktiv" : "aktiv",
      von: zuw ? zuw.von || "" : "",
      bis: zuw ? zuw.bis || "" : ""
    };
  });
}
function MitarbeiterKarte({
  person,
  rolle,
  status,
  von,
  bis,
  t,
  accent,
  editMode,
  aktiv = false,
  onClick,
  onRemove,
  onPersonUpdate,
  onRolleUpdate,
  onGoto
}) {
  const rollen = useRollen();
  const firmaRollen = rollen.filter((r) => r.slot === "firma" && r.aktiv !== false);
  const def = rollen.find((r) => r.name === rolle);
  const rolleFarbe = def ? def.color : accent;
  const name = [person.vorname, person.nachname].filter(Boolean).join(" ") || person.name || "(ohne Name)";
  const tels = (person.tels || []).filter((tt) => tt && tt.nr);
  const emails = (person.emails || []).filter((ee) => ee && ee.email);
  const adresse = [person.strasse, person.plzOrt].filter(Boolean).join(", ");
  const headerTel = tels[0] && tels[0].nr;
  const headerEmail = emails[0] && emails[0].email;
  const restTels = tels.slice(1);
  const restEmails = emails.slice(1);
  const inputStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  };
  const labelStyle = {
    fontSize: 10,
    color: t.muted,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 2
  };
  const updateTel = (val) => {
    const liste = person.tels && person.tels.length > 0 ? [{ ...person.tels[0], nr: val }, ...person.tels.slice(1)] : [{ nr: val, typ: "Mobil" }];
    onPersonUpdate && onPersonUpdate({ tels: liste });
  };
  const updateEmail = (val) => {
    const liste = person.emails && person.emails.length > 0 ? [{ ...person.emails[0], email: val }, ...person.emails.slice(1)] : [{ email: val, typ: "Geschäftlich" }];
    onPersonUpdate && onPersonUpdate({ emails: liste });
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: aktiv ? accent + "08" : t.card,
    border: `1px solid ${aktiv ? accent : t.border}`,
    borderRadius: 10,
    transition: "all 0.15s",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      style: {
        cursor: onClick ? "pointer" : "default",
        padding: "10px 12px",
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      },
      onMouseEnter: (e) => {
        if (onClick && !aktiv) e.currentTarget.parentElement.style.borderColor = accent + "80";
      },
      onMouseLeave: (e) => {
        if (onClick && !aktiv) e.currentTarget.parentElement.style.borderColor = t.border;
      }
    },
    /* @__PURE__ */ React.createElement(Avatar, { name, size: 36, accent }),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, name), rolle && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 10,
      padding: "1px 7px",
      borderRadius: 10,
      background: rolleFarbe + "20",
      color: rolleFarbe,
      fontWeight: 600
    } }, rolle), status && status !== "aktiv" && /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 10,
      padding: "1px 7px",
      borderRadius: 10,
      background: (status === "ehemalig" ? "#EF4444" : "#F59E0B") + "20",
      color: status === "ehemalig" ? "#EF4444" : "#F59E0B",
      fontWeight: 600
    } }, status)), headerTel && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 3 } }, "📞 ", headerTel), headerEmail && /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, "✉ ", headerEmail)),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, flexShrink: 0 } }, editMode && onRemove && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          onRemove();
        },
        title: "Person aus Firma entfernen",
        style: {
          background: "transparent",
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          padding: "2px 6px",
          cursor: "pointer",
          color: "#EF4444",
          fontFamily: "inherit",
          fontSize: 11,
          fontWeight: 600
        }
      },
      "✕"
    ), /* @__PURE__ */ React.createElement(I, { name: aktiv ? "chevD" : "chevR", size: 12, color: t.muted }))
  ), aktiv && (editMode ? (
    /* --- Edit-Modus: direkte Inputs --- */
    /* @__PURE__ */ React.createElement("div", { style: {
      padding: "0 12px 12px 12px",
      borderTop: `1px solid ${accent}30`,
      paddingTop: 10
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Vorname"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: person.vorname || "",
        onChange: (e) => onPersonUpdate && onPersonUpdate({ vorname: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Nachname"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: person.nachname || "",
        onChange: (e) => onPersonUpdate && onPersonUpdate({ nachname: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Telefon"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "tel",
        value: headerTel || "",
        onChange: (e) => updateTel(e.target.value),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Email"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        value: headerEmail || "",
        onChange: (e) => updateEmail(e.target.value),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Straße"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: person.strasse || "",
        onChange: (e) => onPersonUpdate && onPersonUpdate({ strasse: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "PLZ Ort"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: person.plzOrt || "",
        onChange: (e) => onPersonUpdate && onPersonUpdate({ plzOrt: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Rolle"), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: rolle || "",
        onChange: (e) => onRolleUpdate && onRolleUpdate({ rolle: e.target.value }),
        style: { ...inputStyle, cursor: "pointer" }
      },
      firmaRollen.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.name, value: r.name }, r.name))
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Status"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, ["aktiv", "werdend", "ehemalig"].map((s) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s,
        onClick: () => onRolleUpdate && onRolleUpdate({ status: s }),
        style: {
          flex: 1,
          fontSize: 11,
          padding: "5px 0",
          background: status === s ? accent : t.surface,
          color: status === s ? getContrastColor(accent) : t.sub,
          border: `1px solid ${status === s ? accent : t.border}`,
          borderRadius: 6,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: status === s ? 700 : 500
        }
      },
      s
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Ab"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: von || "",
        onChange: (e) => onRolleUpdate && onRolleUpdate({ von: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Bis"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: bis || "",
        onChange: (e) => onRolleUpdate && onRolleUpdate({ bis: e.target.value }),
        style: inputStyle
      }
    ))))
  ) : (
    /* --- Read-Modus aufgeklappt: weitere Daten + Goto --- */
    /* @__PURE__ */ React.createElement("div", { style: {
      padding: "0 12px 12px 12px",
      borderTop: `1px solid ${accent}30`,
      paddingTop: 10
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } }, restTels.map((tt, i) => /* @__PURE__ */ React.createElement("div", { key: "t" + i, style: { fontSize: 12, color: t.sub } }, "📞 ", tt.nr, tt.typ ? /* @__PURE__ */ React.createElement("span", { style: { color: t.muted } }, " (", tt.typ, ")") : null)), restEmails.map((ee, i) => /* @__PURE__ */ React.createElement("div", { key: "e" + i, style: {
      fontSize: 12,
      color: t.sub,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, "✉ ", ee.email, ee.typ ? /* @__PURE__ */ React.createElement("span", { style: { color: t.muted } }, " (", ee.typ, ")") : null)), adresse && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub } }, "🏠 ", adresse), (von || bis) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub } }, "📅 ", von ? `ab ${von.split("-").reverse().join(".")}` : "", von && bis ? " · " : "", bis ? `bis ${bis.split("-").reverse().join(".")}` : ""), !restTels.length && !restEmails.length && !adresse && !von && !bis && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic" } }, "Keine weiteren Daten hinterlegt.")), onGoto && /* @__PURE__ */ React.createElement("button", { onClick: onGoto, style: {
      marginTop: 8,
      fontSize: 11,
      padding: "5px 10px",
      background: accent + "15",
      color: accent,
      border: `1px solid ${accent}40`,
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 600,
      fontFamily: "inherit",
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    } }, "Vollständigen Kontakt anzeigen", /* @__PURE__ */ React.createElement(I, { name: "chevR", size: 10, color: accent })))
  )));
}
function ObjektZeile({
  ve,
  einheit,
  zuweisungen,
  t,
  accent,
  editMode,
  aktiv = false,
  onClick,
  oneRolle,
  onBearbeiten,
  onRemove,
  onZuweisungUpdate
}) {
  if (!ve) return null;
  const istEinheit = !!einheit;
  const istSP = istEinheit && isStellplatzTyp(einheit.typ);
  const adrTeile = (ve.adresse || "").split(",").map((s) => s.trim());
  const strasse = adrTeile[0] || "";
  const z = zuweisungen[0] || {};
  const rolle = z.rolle;
  const status = z.status || "aktiv";
  const von = z.von || "";
  const bis = z.bis || "";
  const statusFarbe = status === "aktiv" ? "#22C55E" : status === "werdend" ? "#F59E0B" : "#94A3B8";
  const inputStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: t.text,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  };
  const labelStyle = {
    fontSize: 10,
    color: t.muted,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 2
  };
  const wertStyle = { fontSize: 12, color: t.text };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: aktiv ? accent + "08" : t.card,
    border: `1px solid ${aktiv ? accent : t.border}`,
    borderRadius: 10,
    overflow: "hidden",
    transition: "all 0.15s"
  } }, /* @__PURE__ */ React.createElement("div", { onClick, style: {
    cursor: onClick ? "pointer" : "default",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 12
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 40,
    height: 40,
    borderRadius: 9,
    background: accent + "20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  } }, /* @__PURE__ */ React.createElement(I, { name: istSP ? "building" : "home", size: 18, color: accent })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, ve.nr, istEinheit ? ` · ${einheit.nr}` : ""), rolle && /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 10,
    padding: "1px 7px",
    borderRadius: 10,
    background: accent + "20",
    color: accent,
    fontWeight: 600
  } }, rolle), status !== "aktiv" && /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 10,
    padding: "1px 7px",
    borderRadius: 10,
    background: statusFarbe + "20",
    color: statusFarbe,
    fontWeight: 600
  } }, status)), (strasse || istEinheit && einheit.lage) && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.sub,
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, strasse, istEinheit && einheit.lage ? ` · ${einheit.lage}` : "")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, flexShrink: 0 } }, editMode && oneRolle && onBearbeiten && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onBearbeiten();
      },
      title: "Zuweisung bearbeiten",
      style: {
        background: "transparent",
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "2px 6px",
        cursor: "pointer",
        color: t.sub,
        fontFamily: "inherit",
        fontSize: 11,
        fontWeight: 600
      }
    },
    "✎"
  ), editMode && onRemove && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onRemove();
      },
      title: zuweisungen.length > 1 ? `Verknüpfung lösen (${zuweisungen.length} Rollen werden entfernt)` : "Verknüpfung lösen",
      style: {
        background: "transparent",
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "2px 6px",
        cursor: "pointer",
        color: "#EF4444",
        fontFamily: "inherit",
        fontSize: 11,
        fontWeight: 600
      }
    },
    "✕"
  ), /* @__PURE__ */ React.createElement(I, { name: aktiv ? "chevD" : "chevR", size: 12, color: t.muted }))), aktiv && (editMode && onZuweisungUpdate ? (
    /* --- Edit-Modus: Status + Ab/Bis Inputs --- */
    /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", borderTop: `1px solid ${accent}30` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1 / -1" } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Status"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, ["aktiv", "werdend", "ehemalig"].map((s) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s,
        onClick: () => onZuweisungUpdate({ status: s }),
        style: {
          flex: 1,
          fontSize: 11,
          padding: "5px 0",
          background: status === s ? accent : t.surface,
          color: status === s ? getContrastColor(accent) : t.sub,
          border: `1px solid ${status === s ? accent : t.border}`,
          borderRadius: 6,
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: status === s ? 700 : 500
        }
      },
      s
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Ab"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: von,
        onChange: (e) => onZuweisungUpdate({ von: e.target.value }),
        style: inputStyle
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Bis"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: bis,
        onChange: (e) => onZuweisungUpdate({ bis: e.target.value }),
        style: inputStyle
      }
    ))))
  ) : (
    /* --- Read-Modus: Details als Grid --- */
    /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", borderTop: `1px solid ${accent}30` } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: 10
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Objekt"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, ve.nr)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Adresse"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, ve.adresse || "—")), istEinheit && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Einheit"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, einheit.nr)), einheit.lage && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Lage"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, einheit.lage)), einheit.flaeche && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Fläche"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, einheit.flaeche)), einheit.zimmer && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Zimmer"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, einheit.zimmer))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Status"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, status)), von && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Ab"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, von.split("-").reverse().join("."))), bis && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Bis"), /* @__PURE__ */ React.createElement("div", { style: wertStyle }, bis.split("-").reverse().join(".")))))
  )));
}
function AddMitarbeiterModal({ firma, kontakte, t, accent, onClose, onSave }) {
  const rollen = useRollen();
  const firmaRollen = rollen.filter((r) => r.slot === "firma" && r.aktiv !== false);
  const [modus, setModus] = useState("neu");
  const [rolle, setRolle] = useState(firmaRollen[0] ? firmaRollen[0].name : "Mitarbeiter");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [auswahlId, setAuswahlId] = useState(null);
  const [suchBegr, setSuchBegr] = useState("");
  const verfuegbare = kontakte.filter((k) => k.typ === "person" && k.firmaId !== firma.id).filter((k) => {
    if (!suchBegr.trim()) return true;
    const q = suchBegr.toLowerCase();
    return (k.name || "").toLowerCase().includes(q) || (k.vorname || "").toLowerCase().includes(q) || (k.nachname || "").toLowerCase().includes(q);
  }).slice(0, 30);
  const kannSpeichern = modus === "neu" ? vorname.trim().length > 0 || nachname.trim().length > 0 : auswahlId != null;
  const speichern = () => {
    if (!kannSpeichern) return;
    if (modus === "neu") {
      onSave({
        typ: "neu",
        person: {
          vorname: vorname.trim(),
          nachname: nachname.trim(),
          tels: tel.trim() ? [{ nr: tel.trim(), type: "Mobil" }] : [],
          emails: email.trim() ? [{ email: email.trim() }] : []
        },
        rolle,
        status: "aktiv"
      });
    } else {
      onSave({ typ: "bestehend", kontaktId: auswahlId, rolle, status: "aktiv" });
    }
  };
  const tabStyle = (aktiv) => ({
    flex: 1,
    padding: "8px 12px",
    background: aktiv ? accent + "20" : "transparent",
    border: "none",
    borderBottom: `2px solid ${aktiv ? accent : "transparent"}`,
    color: aktiv ? accent : t.sub,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600
  });
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    fontSize: 13,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    color: t.text,
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 4
  };
  return /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: {
    position: "fixed",
    inset: 0,
    background: "#0008",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: {
    background: t.card,
    borderRadius: 14,
    padding: 20,
    maxWidth: 480,
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: `0 10px 40px ${accent}30, 0 4px 12px #0008`
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 } }, "Person zu Firma hinzufügen"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 16 } }, firma.name), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    borderBottom: `1px solid ${t.border}`,
    marginBottom: 14
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setModus("bestehend"), style: tabStyle(modus === "bestehend") }, "Bestehende Person"), /* @__PURE__ */ React.createElement("button", { onClick: () => setModus("neu"), style: tabStyle(modus === "neu") }, "Neue Person")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Rolle in der Firma"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, firmaRollen.map((r) => {
    const ist = rolle === r.name;
    return /* @__PURE__ */ React.createElement("button", { key: r.name, onClick: () => setRolle(r.name), style: {
      fontSize: 12,
      padding: "5px 10px",
      borderRadius: 999,
      background: ist ? r.color + "22" : "transparent",
      border: `1px solid ${ist ? r.color + "80" : t.border}`,
      color: ist ? r.color : t.sub,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: ist ? 700 : 500
    } }, r.name);
  }))), modus === "neu" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Vorname"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: vorname,
      onChange: (e) => setVorname(e.target.value),
      placeholder: "Max",
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Nachname"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: nachname,
      onChange: (e) => setNachname(e.target.value),
      placeholder: "Mustermann",
      style: inputStyle
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Telefon"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: tel,
      onChange: (e) => setTel(e.target.value),
      placeholder: "0151 1234567",
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "E-Mail"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "max@firma.de",
      style: inputStyle
    }
  ))) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: suchBegr,
      onChange: (e) => setSuchBegr(e.target.value),
      placeholder: "Person suchen…",
      style: { ...inputStyle, marginBottom: 8 }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: {
    maxHeight: 280,
    overflow: "auto",
    border: `1px solid ${t.border}`,
    borderRadius: 8
  } }, verfuegbare.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { padding: 16, fontSize: 12, color: t.muted, fontStyle: "italic", textAlign: "center" } }, "Keine Personen gefunden.") : verfuegbare.map((p) => {
    const name = [p.vorname, p.nachname].filter(Boolean).join(" ") || p.name;
    const ist = auswahlId === p.id;
    return /* @__PURE__ */ React.createElement("div", { key: p.id, onClick: () => setAuswahlId(p.id), style: {
      padding: "8px 12px",
      cursor: "pointer",
      background: ist ? accent + "20" : "transparent",
      borderBottom: `1px solid ${t.border}40`,
      display: "flex",
      alignItems: "center",
      gap: 8
    } }, /* @__PURE__ */ React.createElement(Avatar, { name, size: 28, accent }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: t.text } }, name), p.firmaId && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted } }, "aktuell bei: ", (kontakte.find((f) => f.id === p.firmaId) || {}).name || "?")));
  })), auswahlId != null && (() => {
    const p = kontakte.find((k) => k.id === auswahlId);
    if (p && p.firmaId && p.firmaId !== firma.id) {
      const altFirma = kontakte.find((f) => f.id === p.firmaId);
      return /* @__PURE__ */ React.createElement("div", { style: {
        marginTop: 8,
        padding: "6px 10px",
        fontSize: 11,
        background: "#F59E0B15",
        border: "1px solid #F59E0B40",
        borderRadius: 6,
        color: t.text
      } }, "Hinweis: Diese Person ist aktuell bei „", altFirma ? altFirma.name : "?", '" eingetragen. Beim Speichern wird die Verknüpfung dorthin entfernt.');
    }
    return null;
  })()), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 18, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    padding: "8px 14px",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    color: t.text,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: speichern, disabled: !kannSpeichern, style: {
    padding: "8px 14px",
    background: kannSpeichern ? accent : t.border,
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: kannSpeichern ? "pointer" : "not-allowed",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 700,
    opacity: kannSpeichern ? 1 : 0.5
  } }, "Hinzufügen"))));
}
function KontaktDetailKarte({
  k,
  t,
  accent,
  ves,
  kontakte,
  onVEClick,
  onUpdate,
  onDelete,
  onKontaktClick,
  setKontakte,
  objektFilter = null,
  onGotoKontakt = null,
  kategorieFarbe = null,
  externEditMode,
  setExternEditMode,
  headerOhneEditBtn = false
}) {
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const [internEditMode, setInternEditMode] = useState(false);
  const editMode = typeof externEditMode === "boolean" ? externEditMode : internEditMode;
  const setEditMode = setExternEditMode ? setExternEditMode : setInternEditMode;
  const [edit, setEdit] = useState(k);
  const [neueRolleForm, setNeueRolleForm] = useState(false);
  const [editRolleIdx, setEditRolleIdx] = useState(null);
  const [expandedRolleIdx, setExpandedRolleIdx] = useState(() => /* @__PURE__ */ new Set());
  const toggleRolleIdx = (i) => {
    setExpandedRolleIdx((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const [addMitarbeiterOffen, setAddMitarbeiterOffen] = useState(false);
  const [objektZuweisungForm, setObjektZuweisungForm] = useState(false);
  const [expandedKey, setExpandedKey] = useState(() => /* @__PURE__ */ new Set());
  const toggleKey = (key) => {
    setExpandedKey((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const [expandedMitarbeiterIds, setExpandedMitarbeiterIds] = useState(() => /* @__PURE__ */ new Set());
  const toggleMitarbeiter = (id) => {
    setExpandedMitarbeiterIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  useEffect(() => {
    setEdit(k);
    setEditMode(false);
    setNeueRolleForm(false);
    setEditRolleIdx(null);
    setObjektZuweisungForm(false);
    setExpandedKey(/* @__PURE__ */ new Set());
    setExpandedRolleIdx(/* @__PURE__ */ new Set());
    setExpandedMitarbeiterIds(/* @__PURE__ */ new Set());
  }, [k.id]);
  if (!k) return null;
  const istFirma = k.typ === "firma";
  const rolleTyp = istFirma ? "firma" : "person";
  const farbe = objektFilter ? accent : istFirma ? FIRMEN_FARBE : KONTAKTE_FARBE;
  const nameFarbe = kategorieFarbe || farbe;
  const updateZuweisungen = (neu) => setEdit({ ...edit, objektZuweisungen: neu });
  const addRolle = (zuw) => {
    updateZuweisungen([...edit.objektZuweisungen || [], zuw]);
    setNeueRolleForm(false);
  };
  const updateRolle = (idx, zuw) => {
    updateZuweisungen((edit.objektZuweisungen || []).map((r, i) => i === idx ? zuw : r));
    setEditRolleIdx(null);
  };
  const removeRolle = (idx) => {
    updateZuweisungen((edit.objektZuweisungen || []).filter((_, i) => i !== idx));
  };
  const save = () => {
    let finalEdit = edit;
    if (!istFirma) {
      const computed = `${edit.vorname || ""} ${edit.nachname || ""}`.trim();
      finalEdit = { ...edit, name: computed || edit.name || k.name };
    }
    onUpdate(finalEdit);
    setEditMode(false);
    setNeueRolleForm(false);
    setEditRolleIdx(null);
    setObjektZuweisungForm(false);
  };
  const cancel = () => {
    setEdit(k);
    setEditMode(false);
    setNeueRolleForm(false);
    setEditRolleIdx(null);
    setObjektZuweisungForm(false);
  };
  const prevExternEdit = useRef(externEditMode);
  useEffect(() => {
    if (typeof externEditMode !== "boolean") return;
    if (prevExternEdit.current === true && externEditMode === false) {
      const dirtyNow = JSON.stringify(edit) !== JSON.stringify(k);
      if (dirtyNow) {
        let finalEdit = edit;
        if (!istFirma) {
          const computed = `${edit.vorname || ""} ${edit.nachname || ""}`.trim();
          finalEdit = { ...edit, name: computed || edit.name || k.name };
        }
        onUpdate(finalEdit);
      }
      setNeueRolleForm(false);
      setEditRolleIdx(null);
      setObjektZuweisungForm(false);
    }
    prevExternEdit.current = externEditMode;
  }, [externEditMode]);
  const alleZuweisungen = edit.objektZuweisungen || [];
  const zuweisungen = objektFilter ? alleZuweisungen.filter((z) => z.objektId === objektFilter) : alleZuweisungen;
  const dirty = JSON.stringify(edit) !== JSON.stringify(k);
  const filterVE = objektFilter ? (ves || []).find((v) => v.id === objektFilter) : null;
  const btnEdit = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 6,
    cursor: "pointer",
    background: "transparent",
    border: `1px solid ${t.border}`,
    color: t.sub,
    fontFamily: "inherit"
  };
  const btnPrimary = {
    fontSize: 11,
    padding: "4px 12px",
    background: farbe,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: farbe + "08",
    border: `1px solid ${farbe}`,
    borderRadius: 12,
    padding: "12px 14px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    fontSize: 18,
    fontWeight: 800,
    color: nameFarbe,
    textDecoration: istFirma ? "underline" : "none",
    textDecorationThickness: 1.5,
    textUnderlineOffset: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  } }, k.name || "—"), objektFilter && onGotoKontakt && !editMode && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onGotoKontakt(k.id),
      title: "Zum vollständigen Kontakt wechseln",
      style: {
        fontSize: 11,
        padding: "5px 10px",
        background: farbe + "15",
        color: farbe,
        border: `1px solid ${farbe}40`,
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: 600,
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        flexShrink: 0
      }
    },
    "Vollständige",
    istFirma ? " Firma" : "n Kontakt",
    " anzeigen",
    /* @__PURE__ */ React.createElement(I, { name: "chevR", size: 10, color: farbe })
  ), !headerOhneEditBtn && (!editMode ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setEditMode(true),
      title: "Bearbeiten",
      "aria-label": "Bearbeiten",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        flexShrink: 0,
        background: farbe,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        boxShadow: `0 1px 2px ${farbe}40`
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 14, color: "#fff" })
  ) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: cancel, style: btnEdit }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: !dirty, style: {
    ...btnPrimary,
    opacity: dirty ? 1 : 0.5,
    cursor: dirty ? "pointer" : "not-allowed"
  } }, "Speichern")))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 12,
    marginBottom: 12
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 6
  } }, "Stammdaten"), editMode ? istFirma ? /* @__PURE__ */ React.createElement(FirmaStammdatenEditor, { edit, setEdit, t, accent: farbe }) : /* @__PURE__ */ React.createElement(StammdatenEditor, { edit, setEdit, t, accent: farbe }) : /* @__PURE__ */ React.createElement("div", null, istFirma ? /* @__PURE__ */ React.createElement(React.Fragment, null, edit.tel && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "📞 ", edit.tel), edit.email && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "✉ ", edit.email), edit.homepage && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "🌐 ", edit.homepage), edit.strasse && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "🏠 ", edit.strasse, ", ", edit.plzOrt), (edit.gewerke || []).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 } }, edit.gewerke.map((g, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: {
    fontSize: 10,
    padding: "2px 7px",
    borderRadius: 10,
    background: FC + "20",
    color: FC,
    fontWeight: 500
  } }, g)))) : /* @__PURE__ */ React.createElement(React.Fragment, null, (edit.tels || []).map((tel, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "📞 ", tel.nr, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: t.muted } }, "(", tel.type, ")"))), (edit.emails || []).map((em, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "✉ ", em.email)), edit.strasse && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "2px 0" } }, "🏠 ", edit.strasse, ", ", edit.plzOrt)))), /* @__PURE__ */ React.createElement(
    CustomFelderSektion,
    {
      felder: editMode ? edit.customFelder || [] : k.customFelder || [],
      onChange: (neueFelder) => {
        if (editMode) {
          setEdit({ ...edit, customFelder: neueFelder });
        } else {
          onUpdate({ ...k, customFelder: neueFelder });
        }
      },
      editMode,
      t,
      accent: farbe,
      embedded: true
    }
  ), /* @__PURE__ */ React.createElement(
    NotizenSektion,
    {
      wert: editMode ? edit.notizen || "" : k.notizen || "",
      onChange: (neu) => {
        if (editMode) {
          setEdit({ ...edit, notizen: neu });
        } else {
          onUpdate({ ...k, notizen: neu });
        }
      },
      t,
      accent: farbe,
      embedded: true
    }
  )), istFirma && setKontakte && (() => {
    const mitarbeiter = getFirmaMitarbeiter(k.id, kontakte);
    const handleAdd = (daten) => {
      if (daten.typ === "neu") {
        const maxId = kontakte.reduce((m, x) => x.id > m ? x.id : m, 0);
        const neuId = maxId + 1;
        const name = [daten.person.vorname, daten.person.nachname].filter(Boolean).join(" ") || "(ohne Name)";
        const neuKontakt = {
          id: neuId,
          typ: "person",
          vorname: daten.person.vorname,
          nachname: daten.person.nachname,
          name,
          tels: daten.person.tels || [],
          emails: daten.person.emails || [],
          firmaId: k.id,
          rollen: [],
          objektZuweisungen: [{ firmaId: k.id, rolle: daten.rolle, status: daten.status }]
        };
        setKontakte((prev) => [...prev, neuKontakt]);
      } else {
        setKontakte((prev) => prev.map((p) => {
          if (p.id !== daten.kontaktId) return p;
          const ohneAlteFirma = (p.objektZuweisungen || []).filter((z) => !(z.firmaId && !z.objektId && z.firmaId !== k.id));
          return {
            ...p,
            firmaId: k.id,
            objektZuweisungen: [
              ...ohneAlteFirma,
              { firmaId: k.id, rolle: daten.rolle, status: daten.status }
            ]
          };
        }));
      }
      setAddMitarbeiterOffen(false);
    };
    const handleRemove = (personId) => {
      setKontakte((prev) => prev.map((p) => {
        if (p.id !== personId) return p;
        return {
          ...p,
          firmaId: null,
          objektZuweisungen: (p.objektZuweisungen || []).filter(
            (z) => !(z.firmaId === k.id && !z.objektId)
          )
        };
      }));
    };
    return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      fontWeight: 700,
      color: t.sub,
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    } }, "Mitarbeiter (", mitarbeiter.length, ")"), /* @__PURE__ */ React.createElement("button", { onClick: () => setAddMitarbeiterOffen(true), style: {
      fontSize: 11,
      padding: "3px 10px",
      background: farbe + "20",
      color: farbe,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 600
    } }, "+ Person hinzufügen")), mitarbeiter.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", padding: "6px 0" } }, "Noch keine Mitarbeiter erfasst.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, mitarbeiter.map((m) => {
      const offen = expandedMitarbeiterIds.has(m.person.id);
      const handlePersonUpdate = (patch) => {
        setKontakte((prev) => prev.map((p) => p.id === m.person.id ? { ...p, ...patch } : p));
      };
      const handleRolleUpdate = ({ rolle, status, von, bis }) => {
        setKontakte((prev) => prev.map((p) => {
          if (p.id !== m.person.id) return p;
          const neuZuw = (p.objektZuweisungen || []).map((z) => {
            if (!(z.firmaId === k.id && !z.objektId)) return z;
            return {
              ...z,
              rolle: rolle !== void 0 ? rolle : z.rolle,
              status: status !== void 0 ? status : z.status,
              von: von !== void 0 ? von : z.von || "",
              bis: bis !== void 0 ? bis : z.bis || ""
            };
          });
          return { ...p, objektZuweisungen: neuZuw };
        }));
      };
      return /* @__PURE__ */ React.createElement(
        MitarbeiterKarte,
        {
          key: m.person.id,
          person: m.person,
          rolle: m.rolle,
          status: m.status,
          von: m.von,
          bis: m.bis,
          t,
          accent: farbe,
          editMode,
          aktiv: offen,
          onClick: () => toggleMitarbeiter(m.person.id),
          onRemove: () => handleRemove(m.person.id),
          onPersonUpdate: handlePersonUpdate,
          onRolleUpdate: handleRolleUpdate,
          onGoto: onKontaktClick ? () => onKontaktClick(m.person.id) : null
        }
      );
    })), addMitarbeiterOffen && /* @__PURE__ */ React.createElement(
      AddMitarbeiterModal,
      {
        firma: k,
        kontakte,
        t,
        accent: farbe,
        onClose: () => setAddMitarbeiterOffen(false),
        onSave: handleAdd
      }
    ));
  })(), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.1em"
  } }, istFirma ? `Objekte (${zuweisungen.length})` : `Rollen (${zuweisungen.length})`), editMode && !neueRolleForm && editRolleIdx === null && /* @__PURE__ */ React.createElement("button", { onClick: () => setNeueRolleForm(true), style: {
    fontSize: 11,
    padding: "3px 10px",
    background: farbe + "20",
    color: farbe,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600
  } }, istFirma ? "+ Objekt verknüpfen" : "+ Rolle hinzufügen")), zuweisungen.length === 0 && !neueRolleForm && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", padding: "6px 0" } }, istFirma ? "Keine Objekte zugewiesen." : "Keine Rollen zugewiesen."), (zuweisungen.length > 0 || neueRolleForm) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, zuweisungen.map((z, i) => {
    if (editRolleIdx === i) {
      return /* @__PURE__ */ React.createElement("div", { key: "e" + i }, /* @__PURE__ */ React.createElement(
        RolleEditor,
        {
          initial: z,
          ves,
          kontakte,
          t,
          accent: farbe,
          typ: rolleTyp,
          onCancel: () => setEditRolleIdx(null),
          onSave: (zuw) => updateRolle(i, zuw)
        }
      ));
    }
    const offen = expandedRolleIdx.has(i);
    const rolleDef = (rolleTyp === "firma" ? firmenRollen : personenRollen).find((r) => r.name === z.rolle);
    const zAkzent = rolleDef && rolleDef.color || farbe;
    const zMitKontakt = { ...z, kontaktId: k.id };
    return /* @__PURE__ */ React.createElement("div", { key: i, style: {
      background: offen ? zAkzent + "08" : t.card,
      border: `1px solid ${offen ? zAkzent : t.border}`,
      borderRadius: 10,
      overflow: "hidden",
      transition: "all 0.15s"
    } }, /* @__PURE__ */ React.createElement(
      RolleZeile,
      {
        z,
        ves,
        kontakte,
        editMode,
        onEdit: () => setEditRolleIdx(i),
        onDelete: () => removeRolle(i),
        t,
        accent: farbe,
        typ: rolleTyp,
        aktiv: offen,
        embedded: true,
        id: "rolle-" + k.id + "-" + i,
        onClick: () => toggleRolleIdx(i)
      }
    ), offen && /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${zAkzent}30` } }, /* @__PURE__ */ React.createElement(
      RolleDetailBox,
      {
        z: zMitKontakt,
        ves,
        kontakte,
        t,
        accent: zAkzent,
        typ: rolleTyp,
        embedded: true
      }
    )));
  }), neueRolleForm && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    RolleEditor,
    {
      initial: {},
      ves,
      kontakte,
      t,
      accent: farbe,
      typ: rolleTyp,
      onCancel: () => setNeueRolleForm(false),
      onSave: addRolle
    }
  ))), (() => {
    if (objektFilter) return null;
    const paare = [];
    const seen = /* @__PURE__ */ new Set();
    (zuweisungen || []).forEach((z) => {
      if (!z.objektId) return;
      if (seen.has(z.objektId)) {
        const vorh = paare.find((p) => p.objektId === z.objektId);
        if (vorh && !vorh.einheitId && z.einheitId) {
          vorh.einheitId = z.einheitId;
          vorh.key = `${z.objektId}::${z.einheitId}`;
        }
        return;
      }
      seen.add(z.objektId);
      paare.push({
        key: `${z.objektId}::${z.einheitId || ""}`,
        objektId: z.objektId,
        einheitId: z.einheitId || null
      });
    });
    if (paare.length === 0 && !editMode) return null;
    return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      fontWeight: 700,
      color: t.sub,
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    } }, "Objekte (", paare.length, ")"), editMode && !objektZuweisungForm && /* @__PURE__ */ React.createElement("button", { onClick: () => setObjektZuweisungForm(true), style: {
      fontSize: 11,
      padding: "3px 10px",
      background: farbe + "20",
      color: farbe,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: 600
    } }, "+ Objekt zuweisen")), paare.length === 0 && !objektZuweisungForm ? /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.muted,
      fontStyle: "italic",
      padding: "6px 0"
    } }, "Noch keinem Objekt zugewiesen.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, paare.map((p) => {
      const v = (ves || []).find((x) => x.id === p.objektId);
      if (!v) return null;
      const einheit = p.einheitId ? v.einheiten.find((x) => x.id === p.einheitId) : null;
      const offen = expandedKey.has(p.key);
      const matchIdx = (edit.objektZuweisungen || []).map((z, i) => ({ z, i })).filter(({ z }) => z.objektId === p.objektId && (z.einheitId || null) === (p.einheitId || null)).map(({ i }) => i);
      const matchZuweisungen = matchIdx.map((i) => (edit.objektZuweisungen || [])[i]);
      const removeVerknuepfung = () => {
        updateZuweisungen((edit.objektZuweisungen || []).filter(
          (z) => !(z.objektId === p.objektId && (z.einheitId || null) === (p.einheitId || null))
        ));
      };
      const oneRolle = matchIdx.length === 1;
      const bearbeiten = () => {
        if (oneRolle) setEditRolleIdx(matchIdx[0]);
      };
      const handleZuweisungUpdate = (patch) => {
        updateZuweisungen((edit.objektZuweisungen || []).map(
          (z, i) => matchIdx.includes(i) ? { ...z, ...patch } : z
        ));
      };
      return /* @__PURE__ */ React.createElement(
        ObjektZeile,
        {
          key: p.key,
          ve: v,
          einheit,
          zuweisungen: matchZuweisungen,
          t,
          accent: ACCENT,
          editMode,
          aktiv: offen,
          oneRolle,
          onClick: () => toggleKey(p.key),
          onBearbeiten: oneRolle ? bearbeiten : null,
          onRemove: removeVerknuepfung,
          onZuweisungUpdate: handleZuweisungUpdate
        }
      );
    }), objektZuweisungForm && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      ObjektZuweisungEditor,
      {
        kontakt: k,
        ves,
        t,
        accent: farbe,
        onCancel: () => setObjektZuweisungForm(false),
        onSave: (zuw) => {
          addRolle(zuw);
          setObjektZuweisungForm(false);
        }
      }
    ))));
  })(), !istFirma && !editMode && (() => {
    const PRIO = { aktiv: 3, werdend: 2, ehemalig: 1 };
    const labelOf = (n) => n === 3 ? "aktiv" : n === 2 ? "werdend" : "ehemalig";
    const colorOf = (n) => n === 3 ? "#22C55E" : n === 2 ? "#F59E0B" : "#94A3B8";
    const firmenSlots = (k.objektZuweisungen || []).filter((z) => {
      const def = (k.rollen || []).length > 0 ? null : null;
      return z.firmaId;
    });
    if (firmenSlots.length === 0) return null;
    const abgeleitet = [];
    firmenSlots.forEach((z) => {
      const firma = (kontakte || []).find((c) => c.id === z.firmaId);
      if (!firma) return;
      const personStatusN = PRIO[z.status || "aktiv"];
      (firma.objektZuweisungen || []).forEach((fz) => {
        const firmaStatusN = PRIO[fz.status || "aktiv"];
        const minStatusN = Math.min(personStatusN, firmaStatusN);
        const ve = (ves || []).find((x) => x.id === fz.objektId);
        if (!ve) return;
        abgeleitet.push({ firma, ve, firmaRolle: fz.rolle, status: labelOf(minStatusN), statusN: minStatusN });
      });
    });
    if (abgeleitet.length === 0) return null;
    return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.border}40` } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.muted,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom: 6
    } }, "Abgeleitet über Firma"), abgeleitet.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 8,
      padding: "6px 10px",
      marginBottom: 4,
      display: "flex",
      alignItems: "center",
      gap: 8
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => onVEClick(a.ve.id), style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "left",
      fontFamily: "inherit",
      minWidth: 0
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: t.text } }, a.ve.nr, " · ", a.firmaRolle), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: t.muted } }, "über ", a.firma.name)), /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 9,
      padding: "2px 7px",
      borderRadius: 10,
      background: colorOf(a.statusN) + "22",
      color: colorOf(a.statusN),
      fontWeight: 600
    } }, a.status))));
  })()));
}
function KontaktKarte({ k, t, aktiv, onClick, id }) {
  const istFirma = k.typ === "firma";
  const farbe = istFirma ? FIRMEN_FARBE : KONTAKTE_FARBE;
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const kartenBadges = useKartenBadges();
  const zeigeKartenBadges = istFirma ? kartenBadges.firma : kartenBadges.person;
  const name = istFirma ? k.name : `${k.vorname || ""} ${k.nachname || ""}`.trim() || k.name;
  const zuweisungen = (k.objektZuweisungen || []).filter((z) => (z.status || "aktiv") !== "ehemalig");
  const uniRollenNamen = [...new Set(zuweisungen.map((z) => z.rolle))].slice(0, 3);
  const PRIO = { aktiv: 3, werdend: 2 };
  const rollenAnzeige = uniRollenNamen.map((rn) => {
    const beste = zuweisungen.filter((z) => z.rolle === rn).sort((a, b) => (PRIO[b.status || "aktiv"] || 0) - (PRIO[a.status || "aktiv"] || 0))[0];
    return { rolle: rn, status: beste.status || "aktiv", vorsitz: !!beste.vorsitz };
  });
  let details = [];
  if (istFirma) {
    if (k.tel) details.push({ icon: "📞", text: k.tel });
    if (k.email) details.push({ icon: "✉", text: k.email });
  } else {
    const favTels = (k.tels || []).filter((x) => x.favorit).map((x) => ({ icon: "📞", text: x.nr }));
    const favEmails = (k.emails || []).filter((x) => x.favorit).map((x) => ({ icon: "✉", text: x.email }));
    const favAdresse = k.adresseFavorit && (k.strasse || k.plzOrt) ? [{ icon: "🏠", text: [k.strasse, k.plzOrt].filter(Boolean).join(", ") }] : [];
    if (favTels.length + favEmails.length + favAdresse.length > 0) {
      details = [...favTels, ...favEmails, ...favAdresse];
    } else {
      if ((k.tels || [])[0]) details.push({ icon: "📞", text: k.tels[0].nr });
      if ((k.emails || [])[0]) details.push({ icon: "✉", text: k.emails[0].email });
    }
  }
  details = details.slice(0, 2);
  const statusLeisteSettings = useStatusLeiste();
  let status = null;
  if (statusLeisteSettings.kontakt && !istFirma) {
    const allZuw = k.objektZuweisungen || [];
    const hatWerd = allZuw.some((z) => z.status === "werdend");
    const hatAktiv = allZuw.some((z) => (z.status || "aktiv") === "aktiv");
    const hatEhem = allZuw.some((z) => z.status === "ehemalig");
    if (hatWerd) {
      status = { typ: "info", text: "Eigentümerwechsel in Vorbereitung" };
    } else if (hatEhem && !hatAktiv) {
      status = { typ: "done", text: "Keine aktiven Beteiligungen" };
    }
  }
  const bc = aktiv ? farbe : t.border;
  const zeigeStatus = statusLeisteSettings.kontakt;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick,
      id,
      style: {
        cursor: "pointer",
        transition: "all 0.15s",
        border: `1px solid ${bc}`,
        borderRadius: 12,
        overflow: "hidden",
        scrollMarginTop: "var(--ad-header-h, 200px)"
      },
      onMouseEnter: (e) => {
        if (!aktiv) e.currentTarget.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        if (!aktiv) e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      boxSizing: "border-box",
      background: istFirma ? t.surface : t.card
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(
      Avatar,
      {
        name,
        firma: istFirma,
        size: 38,
        accent: farbe,
        zuweisungen: istFirma ? null : k.objektZuweisungen
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: farbe,
      textDecoration: istFirma ? "underline" : "none",
      textDecorationThickness: 1,
      textUnderlineOffset: 3,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, name || "—"), [0, 1].map((i) => {
      const d = details[i];
      if (d) {
        return /* @__PURE__ */ React.createElement("div", { key: i, style: {
          fontSize: 11,
          color: t.sub,
          marginTop: 1,
          display: "flex",
          alignItems: "center",
          gap: 4,
          overflow: "hidden",
          whiteSpace: "nowrap"
        } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11 } }, d.icon), /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, d.text));
      }
      if (i === 0 && details.length === 0) {
        return /* @__PURE__ */ React.createElement("div", { key: i, style: {
          fontSize: 11,
          color: t.muted,
          fontStyle: "italic",
          marginTop: 1
        } }, "Keine Kontaktdaten");
      }
      return /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 11, marginTop: 1 } }, " ");
    })), zeigeKartenBadges && rollenAnzeige.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3, flexShrink: 0, alignItems: "center" } }, rollenAnzeige.map((r, i) => /* @__PURE__ */ React.createElement(
      RolleBadge,
      {
        key: i,
        rolle: r.rolle,
        size: 18,
        status: r.status,
        vorsitz: r.vorsitz
      }
    )))),
    zeigeStatus && /* @__PURE__ */ React.createElement(StatusLeiste, { ...status || {}, t, borderColor: bc, eingebettet: true })
  );
}
function KontakteMasterDetail({
  cardWidth,
  renderKartenSpalte,
  aktivK,
  t,
  accent,
  ves,
  kontakte,
  setKontakte,
  onVEClick,
  setAktiv,
  updateKontakt
}) {
  const [mdRef, mdLayout] = useMasterDetailLayout(cardWidth);
  if (mdLayout.masterCols === 0) {
    return /* @__PURE__ */ React.createElement("div", { ref: mdRef, style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAktiv(null), style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: `1px solid ${t.border}`,
      color: t.text,
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 8,
      alignSelf: "flex-start"
    } }, /* @__PURE__ */ React.createElement(I, { name: "chevron-left", size: 12, color: t.text }), "Zurück zur Liste"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, /* @__PURE__ */ React.createElement(
      KontaktDetailKarte,
      {
        k: aktivK,
        t,
        accent,
        ves,
        kontakte,
        setKontakte,
        onVEClick,
        onKontaktClick: (id) => setAktiv(id),
        onUpdate: updateKontakt
      }
    )));
  }
  return /* @__PURE__ */ React.createElement("div", { ref: mdRef, style: {
    display: "flex",
    gap: 10,
    flex: 1,
    minHeight: 0,
    alignItems: "stretch"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: `0 0 ${mdLayout.masterWidth}px`,
    overflowY: "auto"
  } }, renderKartenSpalte(mdLayout.masterCols)), /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto"
  } }, /* @__PURE__ */ React.createElement(
    KontaktDetailKarte,
    {
      k: aktivK,
      t,
      accent,
      ves,
      kontakte,
      setKontakte,
      onVEClick,
      onKontaktClick: (id) => setAktiv(id),
      onUpdate: updateKontakt
    }
  )));
}
function KontakteScreen({
  t,
  accent,
  initialKontaktId,
  onVEClick,
  filter,
  kontaktart,
  kontakte,
  setKontakte,
  ves,
  cardWidth = 340,
  externAktiv,
  setExternAktiv,
  externEditMode,
  setExternEditMode,
  mobileDetailHeaderOhneEditBtn = false
}) {
  const [internAktiv, setInternAktiv] = useState(initialKontaktId || null);
  const aktiv = externAktiv !== void 0 ? externAktiv : internAktiv;
  const setAktiv = setExternAktiv ? setExternAktiv : setInternAktiv;
  const ww = useWindowWidth();
  const personenRollen = useRollen();
  const firmenRollen = useFirmenRollen();
  const arten = buildKontaktarten(personenRollen, firmenRollen);
  const passt = (k) => {
    if (filter === "alle" || !filter) return true;
    if (filter === "personen") return k.typ === "person";
    if (filter === "firmen") return k.typ === "firma";
    if (k.typ !== "person") return false;
    const rollen = k.rollen || [];
    if (filter === "eigentuemer") return rollen.includes("Eigentümer") || rollen.includes("Miteigentümer");
    if (filter === "mieter") return rollen.includes("Mieter");
    if (filter === "vbeirat") return rollen.includes("Verwaltungsbeirat") || rollen.includes("Verwaltungsbeiratsvorsitzender");
    return true;
  };
  const updateKontakt = (updated) => {
    if (!setKontakte) return;
    setKontakte((prev) => prev.map((c) => c.id === updated.id ? updated : c));
  };
  const gefiltert = kontakte.filter((k) => passt(k) && kontaktPasstZuArt(k, kontaktart || "alle", arten));
  const aktivK = kontakte.find((k) => k.id === aktiv);
  const artDef = arten.find((a) => a.id === kontaktart);
  const personenErlaubt = !artDef || artDef.typ === "kategorie" && artDef.id !== "firma" || artDef.typ === "rolle_person" || kontaktart === "alle" || !kontaktart;
  const firmenErlaubt = !artDef || artDef.typ === "kategorie" && artDef.id !== "person" || artDef.typ === "rolle_firma" || kontaktart === "alle" || !kontaktart;
  const altFilterPersonen = filter === "alle" || filter === "personen" || ["eigentuemer", "mieter", "vbeirat"].includes(filter) || !filter;
  const altFilterFirmen = filter === "alle" || filter === "firmen" || !filter;
  const zeigePersonen = personenErlaubt && altFilterPersonen;
  const zeigeFirmen = firmenErlaubt && altFilterFirmen;
  const personenGef = gefiltert.filter((k) => k.typ === "person");
  const firmenGef = gefiltert.filter((k) => k.typ === "firma");
  const wrapStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10,
    gridAutoFlow: "dense"
  };
  const windowW = useWindowWidth();
  const istDesktop = windowW >= 900;
  const hatOffen = aktiv != null && aktivK != null;
  const renderKartenSpalte = (cols) => /* @__PURE__ */ React.createElement(React.Fragment, null, zeigePersonen && personenGef.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 8,
    alignContent: "start"
  } }, personenGef.map((k) => /* @__PURE__ */ React.createElement(
    KontaktKarte,
    {
      key: k.id,
      k,
      t,
      aktiv: aktiv === k.id,
      id: "kon-" + k.id,
      onClick: () => setAktiv(aktiv === k.id ? null : k.id)
    }
  ))), zeigeFirmen && firmenGef.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 8,
    alignContent: "start",
    marginTop: zeigePersonen && personenGef.length > 0 ? 12 : 0
  } }, firmenGef.map((k) => /* @__PURE__ */ React.createElement(
    KontaktKarte,
    {
      key: k.id,
      k,
      t,
      aktiv: aktiv === k.id,
      id: "kon-" + k.id,
      onClick: () => setAktiv(aktiv === k.id ? null : k.id)
    }
  ))));
  if (hatOffen && istDesktop) {
    return /* @__PURE__ */ React.createElement(
      KontakteMasterDetail,
      {
        cardWidth,
        renderKartenSpalte,
        aktivK,
        t,
        accent,
        ves,
        kontakte,
        setKontakte,
        onVEClick,
        setAktiv,
        updateKontakt
      }
    );
  }
  if (hatOffen && !istDesktop) {
    return /* @__PURE__ */ React.createElement("div", { style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAktiv(null), style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: `1px solid ${t.border}`,
      color: t.text,
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 8,
      alignSelf: "flex-start"
    } }, /* @__PURE__ */ React.createElement(I, { name: "chevron-left", size: 12, color: t.text }), "Zurück zur Liste"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, /* @__PURE__ */ React.createElement(
      KontaktDetailKarte,
      {
        k: aktivK,
        t,
        accent,
        ves,
        kontakte,
        setKontakte,
        externEditMode,
        setExternEditMode,
        headerOhneEditBtn: mobileDetailHeaderOhneEditBtn,
        onVEClick,
        onKontaktClick: (id) => setAktiv(id),
        onUpdate: updateKontakt
      }
    )));
  }
  const renderGruppe = (liste, typ) => /* @__PURE__ */ React.createElement("div", { style: wrapStyle }, liste.map((k) => /* @__PURE__ */ React.createElement(
    KontaktKarte,
    {
      key: k.id,
      k,
      t,
      aktiv: false,
      id: "kon-" + k.id,
      onClick: () => setAktiv(k.id)
    }
  )));
  return /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, zeigePersonen && personenGef.length > 0 && renderGruppe(personenGef, "person"), zeigeFirmen && firmenGef.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: zeigePersonen && personenGef.length > 0 ? 16 : 0 } }, renderGruppe(firmenGef, "firma")), gefiltert.length === 0 && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 13,
    color: t.sub,
    textAlign: "center",
    padding: "40px 0",
    fontStyle: "italic"
  } }, "Keine Kontakte für diesen Filter."));
}
function EinstellKarte({ title, children, t, accent }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "10px 14px",
    background: accent + "08",
    borderBottom: `1px solid ${t.border}`
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: t.text } }, title)), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px" } }, children));
}
function EinstellZeile({ label, sub, children, t }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 0",
    borderBottom: `1px solid ${t.border}25`
  } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 500, color: t.text } }, label), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginTop: 3, lineHeight: 1.4 } }, sub)), children);
}
function FarbPalettenGrid({ value, onChange, t, hoehe = null }) {
  const [suche, setSuche] = useState("");
  const gefiltert = suche.trim() ? PALETTE_FARBEN.filter((f) => f.familie.toLowerCase().includes(suche.toLowerCase().trim())) : PALETTE_FARBEN;
  const containerStyle = { background: t.card, border: `1px solid ${t.border}`, borderRadius: 9, padding: 8 };
  const scrollStyle = hoehe ? { maxHeight: hoehe, overflowY: "auto" } : {};
  return /* @__PURE__ */ React.createElement("div", { style: containerStyle }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Familie suchen…",
      value: suche,
      onChange: (e) => setSuche(e.target.value),
      style: {
        width: "100%",
        boxSizing: "border-box",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 6,
        padding: "5px 9px",
        fontSize: 11,
        color: t.text,
        outline: "none",
        marginBottom: 8
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: scrollStyle }, gefiltert.map((fam) => /* @__PURE__ */ React.createElement("div", { key: fam.familie, style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 600, color: t.sub, flex: 1 } }, fam.familie), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: t.muted } }, fam.gruppe)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 2 } }, fam.stufen.map((st) => {
    const istGewaehlt = value && value.toLowerCase() === st.hex.toLowerCase();
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: st.stufe,
        onClick: () => onChange(st.hex),
        title: `${fam.familie} ${st.stufe} · ${st.hex}`,
        style: {
          width: 22,
          height: 22,
          borderRadius: 4,
          background: st.hex,
          border: istGewaehlt ? `2px solid ${t.text}` : `1px solid ${t.border}40`,
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
          flex: 1,
          transition: "transform 0.1s"
        },
        onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.15)",
        onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
      }
    );
  })))), gefiltert.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, textAlign: "center", padding: "12px 0", fontStyle: "italic" } }, "Keine Familie gefunden")));
}
function FarbPicker({ value, onChange, t }) {
  const [offen, setOffen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOffen((v) => !v), title: "Farbe wählen", style: {
    width: 26,
    height: 26,
    borderRadius: 7,
    background: value,
    border: `2px solid ${t.border}`,
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit"
  } }), offen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { onClick: () => setOffen(false), style: {
    position: "fixed",
    inset: 0,
    zIndex: 60
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "calc(100% + 4px)",
    right: 0,
    zIndex: 70,
    width: 320,
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
  } }, /* @__PURE__ */ React.createElement(
    FarbPalettenGrid,
    {
      value,
      onChange: (c) => {
        onChange(c);
        setOffen(false);
      },
      t,
      hoehe: 360
    }
  ))));
}
function DetailHeader({ titel, t, onBack }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, title: "Zurück", style: {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    width: 36,
    height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    flexShrink: 0
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevL", size: 14, color: t.sub })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: t.text } }, titel));
}
function SektionProfil({ kontakte, settings, setSettings, t, accent }) {
  const [pickerOffen, setPickerOffen] = useState(false);
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  const userKontakt = kontakte.find((k) => k.id === settings.userKontaktId);
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Mein Profil", t, accent }, userKontakt ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 8 } }, /* @__PURE__ */ React.createElement(
    Avatar,
    {
      name: userKontakt.name,
      size: 64,
      accent,
      zuweisungen: userKontakt.typ === "firma" ? null : userKontakt.objektZuweisungen
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginBottom: 2, fontWeight: 500 } }, userKontakt.anrede), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: t.text } }, userKontakt.vorname, " ", userKontakt.nachname), userKontakt.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accent, fontWeight: 600, marginTop: 2 } }, userKontakt.sub), userKontakt.rollen && userKontakt.rollen.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement(RollenBadges, { rollen: userKontakt.rollen, size: 20 })))) : /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.muted,
    padding: "12px 0",
    fontStyle: "italic",
    textAlign: "center"
  } }, "Noch kein Profil verknüpft"), userKontakt && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, paddingTop: 10, borderTop: `1px solid ${t.border}30` } }, (userKontakt.tels || []).map((tel, i) => /* @__PURE__ */ React.createElement("div", { key: "tel" + i, style: { fontSize: 12, color: t.sub, padding: "3px 0" } }, "📞 ", tel.nr, " ", /* @__PURE__ */ React.createElement("span", { style: { color: t.muted } }, "· ", tel.type))), (userKontakt.emails || []).map((em, i) => /* @__PURE__ */ React.createElement("div", { key: "em" + i, style: { fontSize: 12, color: t.sub, padding: "3px 0" } }, "✉ ", em.email)), userKontakt.strasse && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, padding: "3px 0" } }, "🏠 ", userKontakt.strasse, ", ", userKontakt.plzOrt)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 10, borderTop: `1px solid ${t.border}30` } }, pickerOffen ? /* @__PURE__ */ React.createElement(
    KontaktPicker,
    {
      value: settings.userKontaktId,
      onChange: (id) => {
        save({ userKontaktId: id });
        setPickerOffen(false);
      },
      label: userKontakt ? "Anderen Kontakt wählen" : "Kontakt verknüpfen",
      t,
      accent,
      editMode: true,
      kontakte
    }
  ) : /* @__PURE__ */ React.createElement("button", { onClick: () => setPickerOffen(true), style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 7,
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: 12,
    color: t.sub,
    fontFamily: "inherit"
  } }, /* @__PURE__ */ React.createElement(I, { name: "pencil", size: 11, color: t.sub }), userKontakt ? "Anderen Kontakt wählen" : "Kontakt verknüpfen")));
}
function SektionErscheinungsbild({ settings, setSettings, t, accent, mode, setMode }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Erscheinungsbild", t, accent }, /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Dunkelmodus", sub: "Helles oder dunkles Design", t }, /* @__PURE__ */ React.createElement(Toggle, { value: mode === "dark", onChange: (v) => setMode(v ? "dark" : "light"), color: accent })), /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Schriftgröße", sub: "Skaliert Texte und Bedienelemente in der gesamten App", t }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 4,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: 3
  } }, [
    { id: "compact", label: "Klein" },
    { id: "normal", label: "Normal" },
    { id: "relaxed", label: "Groß" }
  ].map((opt) => {
    const aktiv = (settings.dichte || "normal") === opt.id;
    return /* @__PURE__ */ React.createElement("button", { key: opt.id, onClick: () => save({ dichte: opt.id }), style: {
      padding: "6px 12px",
      borderRadius: 7,
      background: aktiv ? accent + "20" : "transparent",
      border: `1px solid ${aktiv ? accent : "transparent"}`,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      color: aktiv ? accent : t.sub,
      transition: "all 0.15s"
    } }, opt.label);
  }))), /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Höherer Kontrast", sub: "Sekundäre Texte deutlich heller bzw. dunkler – bessere Lesbarkeit", t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: !!settings.hoherKontrast,
      onChange: (v) => save({ hoherKontrast: v }),
      color: accent
    }
  )), /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Bewegung reduzieren", sub: "Animationen und Übergänge ausschalten", t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: !!settings.reduceMotion,
      onChange: (v) => save({ reduceMotion: v }),
      color: accent
    }
  )));
}
function SektionObjekte({ settings, setSettings, t, accent }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Einheit-Übersicht im Liegenschaft-Tab", t, accent }, /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Fläche anzeigen",
      sub: "z. B. „128 m²“ in der Einheit-Zeile",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.einheitAnzeigeFlaeche !== false,
        onChange: (v) => save({ einheitAnzeigeFlaeche: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "MEA anzeigen",
      sub: "Miteigentumsanteil, z. B. „MEA 100/1000“",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.einheitAnzeigeMea !== false,
        onChange: (v) => save({ einheitAnzeigeMea: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Eigentümer anzeigen",
      sub: "z. B. „ET Müller“ — Nachname des aktuellen Eigentümers",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.einheitAnzeigeEigentuemer !== false,
        onChange: (v) => save({ einheitAnzeigeEigentuemer: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Mieter anzeigen",
      sub: "z. B. „MT Schmidt“ — Nachname des aktuellen Mieters (wenn vorhanden)",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.einheitAnzeigeMieter !== false,
        onChange: (v) => save({ einheitAnzeigeMieter: v }),
        color: accent
      }
    )
  )), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Stammdaten der Liegenschaft", t, accent }, /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Rechnungsadresse anzeigen",
      sub: "Auto-Sektion „c/o Hausverwaltung …“ unter den Stammdaten. Standard: aus.",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.rechnungsadresseAnzeigen === true,
        onChange: (v) => save({ rechnungsadresseAnzeigen: v }),
        color: accent
      }
    )
  )));
}
function SektionHeader({ settings, setSettings, t, accent }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Header", t, accent }, /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Filter anzeigen",
      sub: "Wenn aus: Logo & HV-Name werden stattdessen mittig angezeigt",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.filterAktiv,
        onChange: (v) => save({ filterAktiv: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Profilbild anzeigen",
      sub: "Profilbild oben rechts (Zahnrad wenn aus). Einstellungen sind immer erreichbar.",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.headerZeigeAvatar,
        onChange: (v) => save({ headerZeigeAvatar: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Hell-/Dunkelmodus-Schalter anzeigen",
      sub: "Sonne-/Mond-Button im Header (Modus kann immer unter Erscheinungsbild gewechselt werden)",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.headerZeigeDunkelmodus !== false,
        onChange: (v) => save({ headerZeigeDunkelmodus: v }),
        color: accent
      }
    )
  ));
}
function SektionFilterOpt({ settings, setSettings, t, accent, ves = [], kontakte = [] }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  const verw = settings.filterVerwaltungsarten || { weg: true, miet: false, gewerbe: false, sev: false };
  const kart = settings.filterKontaktarten || { person: true, firma: true };
  const filterTyp = settings.filterTyp || "verwalter";
  const feld = filterTyp === "buchhalter" ? "buchhalter" : "verwalter";
  const aktivMap = settings.filterAktive || {};
  const counts = {};
  ves.forEach((ve) => {
    const id = ve.verwaltung && ve.verwaltung[feld];
    if (id) counts[id] = (counts[id] || 0) + 1;
  });
  const personen = Object.keys(counts).map((id) => {
    const k = kontakte.find((x) => x.id === id);
    const name = k ? k.typ === "firma" ? k.name : [k.nachname, k.vorname].filter(Boolean).join(", ") || k.name || id : id;
    return { id, name, count: counts[id], k };
  }).sort((a, b) => a.name.localeCompare(b.name, "de"));
  const toggleAktiv = (id, v) => {
    const next = { ...aktivMap };
    if (v) delete next[id];
    else next[id] = false;
    save({ filterAktive: next });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Filter-Dropdown (Objekte)", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, "Steuert das Filter-Dropdown im Header der Objekt-Übersicht. Die Personen werden automatisch aus den eingetragenen Verwaltern/Buchhaltern der Objekte gelesen."), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Filtern nach",
      sub: "Verwalter oder Buchhalter der Objekte",
      t
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      gap: 4,
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: 3
    } }, [
      { id: "verwalter", label: "Verwalter" },
      { id: "buchhalter", label: "Buchhalter" }
    ].map((opt) => {
      const aktiv = filterTyp === opt.id;
      return /* @__PURE__ */ React.createElement("button", { key: opt.id, onClick: () => save({ filterTyp: opt.id }), style: {
        background: aktiv ? accent : "transparent",
        color: aktiv ? "#fff" : t.sub,
        border: "none",
        borderRadius: 6,
        padding: "5px 12px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: 600
      } }, opt.label);
    }))
  )), /* @__PURE__ */ React.createElement(
    EinstellKarte,
    {
      title: filterTyp === "buchhalter" ? "Buchhalter im Filter" : "Verwalter im Filter",
      t,
      accent
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, personen.length === 0 ? `Keine ${filterTyp === "buchhalter" ? "Buchhalter" : "Verwalter"} in den Objekten eingetragen. Zuordnung erfolgt im Objekt-Detail unter „Verwaltung“.` : `Welche ${filterTyp === "buchhalter" ? "Buchhalter" : "Verwalter"} im Filter erscheinen sollen. Die Zuordnung erfolgt im Objekt-Detail.`),
    personen.map((p) => /* @__PURE__ */ React.createElement(
      EinstellZeile,
      {
        key: p.id,
        label: p.name,
        sub: `${p.count} ${p.count === 1 ? "Objekt" : "Objekte"}`,
        t
      },
      /* @__PURE__ */ React.createElement(
        Toggle,
        {
          value: aktivMap[p.id] !== false,
          onChange: (v) => toggleAktiv(p.id, v),
          color: accent
        }
      )
    ))
  ), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Filter-Buttons: Objekte", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 8, lineHeight: 1.4 } }, 'Welche Verwaltungsarten als Filter-Buttons neben der Überschrift „Objekte" erscheinen. „Alle" ist immer sichtbar.'), VERWALTUNGSARTEN.map((a) => /* @__PURE__ */ React.createElement(EinstellZeile, { key: a.id, label: a.label, t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: !!verw[a.id],
      onChange: (v) => save({ filterVerwaltungsarten: { ...verw, [a.id]: v } }),
      color: accent
    }
  )))), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Filter-Buttons: Kontakte", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 8, lineHeight: 1.4 } }, 'Welche Arten als Filter-Buttons neben der Überschrift „Kontakte" erscheinen. Klick auf den Schriftzug „Kontakte" setzt zurück auf alle.'), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: 4,
    marginBottom: 4
  } }, "Hauptarten"), KONTAKTARTEN_KATEGORIEN.map((a) => /* @__PURE__ */ React.createElement(EinstellZeile, { key: a.id, label: a.label, t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: !!kart[a.id],
      onChange: (v) => save({ filterKontaktarten: { ...kart, [a.id]: v } }),
      color: accent
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: 12,
    marginBottom: 4
  } }, "Personen-Rollen"), (settings.rollen || DEFAULT_ROLLEN).filter((r) => r.aktiv !== false).map((r) => {
    const id = "p_" + r.name;
    return /* @__PURE__ */ React.createElement(EinstellZeile, { key: id, label: r.name, t }, /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: !!kart[id],
        onChange: (v) => save({ filterKontaktarten: { ...kart, [id]: v } }),
        color: r.color || accent
      }
    ));
  }), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: 12,
    marginBottom: 4
  } }, "Firmen-Rollen"), (settings.firmenRollen || DEFAULT_FIRMEN_ROLLEN).filter((r) => r.aktiv !== false).map((r) => {
    const id = "f_" + r.name;
    return /* @__PURE__ */ React.createElement(EinstellZeile, { key: id, label: r.name, t }, /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: !!kart[id],
        onChange: (v) => save({ filterKontaktarten: { ...kart, [id]: v } }),
        color: r.color || accent
      }
    ));
  })));
}
function SektionDashboard({ settings, setSettings, t, accent }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  const sortierteKacheln = [...settings.kacheln].sort((a, b) => a.reihenfolge - b.reihenfolge);
  const dashboardAktiv = settings.dashboardModus !== "aus";
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Dashboard", t, accent }, /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Dashboard anzeigen", sub: "Kategorien als Navigationsleiste oben", t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: dashboardAktiv,
      onChange: (v) => save({ dashboardModus: v ? "immer" : "aus" }),
      color: accent
    }
  )), dashboardAktiv && /* @__PURE__ */ React.createElement(EinstellZeile, { label: "Auf allen Seiten", sub: "An: immer · Aus: nur Startseite", t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: settings.dashboardModus === "immer",
      onChange: (v) => save({ dashboardModus: v ? "immer" : "home" }),
      color: accent
    }
  )), dashboardAktiv && /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Beim Scrollen sichtbar bleiben",
      sub: "An: bleibt im Hochkant unter dem Header · Aus: scrollt mit weg",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.dashboardSticky === true,
        onChange: (v) => save({ dashboardSticky: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 10, marginTop: 4, borderTop: `1px solid ${t.border}30` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: t.sub, marginBottom: 8 } }, "Kacheln & Reihenfolge"), sortierteKacheln.map((k, i, arr) => /* @__PURE__ */ React.createElement("div", { key: k.id, style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 0",
    borderBottom: `1px solid ${t.border}25`
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 28,
    height: 28,
    borderRadius: 7,
    flexShrink: 0,
    background: k.farbe + "20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: k.icon, size: 13, color: k.farbe })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 13, color: t.text } }, k.label), /* @__PURE__ */ React.createElement(
    FarbPicker,
    {
      value: k.farbe,
      onChange: (c) => save({ kacheln: settings.kacheln.map((x) => x.id === k.id ? { ...x, farbe: c } : x) }),
      t
    }
  ), /* @__PURE__ */ React.createElement("button", { disabled: i === 0, onClick: () => save({
    kacheln: settings.kacheln.map((x) => x.id === k.id ? { ...x, reihenfolge: x.reihenfolge - 1 } : x.reihenfolge === k.reihenfolge - 1 ? { ...x, reihenfolge: x.reihenfolge + 1 } : x)
  }), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 5,
    width: 22,
    height: 22,
    cursor: i === 0 ? "default" : "pointer",
    opacity: i === 0 ? 0.3 : 1,
    fontFamily: "inherit",
    fontSize: 9
  } }, "▲"), /* @__PURE__ */ React.createElement("button", { disabled: i === arr.length - 1, onClick: () => save({
    kacheln: settings.kacheln.map((x) => x.id === k.id ? { ...x, reihenfolge: x.reihenfolge + 1 } : x.reihenfolge === k.reihenfolge + 1 ? { ...x, reihenfolge: x.reihenfolge - 1 } : x)
  }), style: {
    background: "none",
    border: `1px solid ${t.border}`,
    borderRadius: 5,
    width: 22,
    height: 22,
    cursor: i === arr.length - 1 ? "default" : "pointer",
    opacity: i === arr.length - 1 ? 0.3 : 1,
    fontFamily: "inherit",
    fontSize: 9
  } }, "▼"), /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: k.aktiv,
      onChange: (v) => save({ kacheln: settings.kacheln.map((x) => x.id === k.id ? { ...x, aktiv: v } : x) }),
      color: k.farbe
    }
  )))));
}
function SektionRollen({ settings, setSettings, t, accent }) {
  const ww = useWindowWidth();
  const zweispaltig = ww >= 700;
  const [kategorie, setKategorie] = useState("personen");
  const personenRollen = settings.rollen || DEFAULT_ROLLEN;
  const firmenRollen = settings.firmenRollen || DEFAULT_FIRMEN_ROLLEN;
  const rollen = kategorie === "firmen" ? firmenRollen : personenRollen;
  const setKey = kategorie === "firmen" ? "firmenRollen" : "rollen";
  const [selektiertName, setSelektiertName] = useState((rollen[0] || {}).name);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  let aktuell = rollen.find((r) => r.name === selektiertName);
  if (!aktuell && rollen.length > 0) aktuell = rollen[0];
  const updateRollen = (neu) => setSettings((s) => ({ ...s, [setKey]: neu }));
  const setFarbe = (name, color) => updateRollen(rollen.map((r) => r.name === name ? { ...r, color } : r));
  const toggleAktiv = (name) => updateRollen(rollen.map((r) => r.name === name ? { ...r, aktiv: r.aktiv === false ? true : false } : r));
  const handleDrop = (toIdx) => {
    if (dragIdx === null || dragIdx === toIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const neu = [...rollen];
    const [moved] = neu.splice(dragIdx, 1);
    neu.splice(toIdx, 0, moved);
    updateRollen(neu);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const wechselKategorie = (kat) => {
    setKategorie(kat);
    const liste = kat === "firmen" ? firmenRollen : personenRollen;
    setSelektiertName((liste[0] || {}).name);
  };
  const toggleAvatarIconsPerson = () => setSettings((s) => ({ ...s, avatarIconsPerson: !(s.avatarIconsPerson !== false) }));
  const toggleAvatarIconsFirma = () => setSettings((s) => ({ ...s, avatarIconsFirma: !(s.avatarIconsFirma !== false) }));
  const toggleKartenBadgesPerson = () => setSettings((s) => ({ ...s, kartenBadgesPerson: !(s.kartenBadgesPerson !== false) }));
  const toggleKartenBadgesFirma = () => setSettings((s) => ({ ...s, kartenBadgesFirma: !(s.kartenBadgesFirma !== false) }));
  const toggleStatusObjekt = () => setSettings((s) => ({ ...s, statusLeisteObjekt: !(s.statusLeisteObjekt !== false) }));
  const toggleStatusKontakt = () => setSettings((s) => ({ ...s, statusLeisteKontakt: !(s.statusLeisteKontakt !== false) }));
  const ToggleZeile = ({ titel, desc, value, onChange, akzent, extra }) => /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    gap: 10,
    minWidth: 0
  } }, /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: t.text } }, titel), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: t.muted, marginTop: 2 } }, desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 } }, extra, /* @__PURE__ */ React.createElement(Toggle, { value, onChange, t, accent: akzent })));
  const KonfigurierenBtn = () => /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => alert("Konfiguration der Statusleisten-Inhalte folgt.\n\nGeplant: Auswahl welche Statusarten angezeigt werden (z. B. Bestellung, Mahnungen, Eigentümerwechsel, …)."),
      title: "Inhalte der Statusleiste auswählen (folgt)",
      style: {
        background: "transparent",
        border: `1px solid ${t.border}`,
        color: t.muted,
        fontSize: 10,
        fontWeight: 600,
        padding: "4px 8px",
        borderRadius: 7,
        cursor: "pointer",
        fontFamily: "inherit",
        opacity: 0.7
      }
    },
    "⚙"
  );
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Rollen", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: zweispaltig ? "row" : "column", gap: 6 } }, /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Eck-Icons · Personen",
      desc: "Rollen-Badges in den Ecken der Personen-Avatare.",
      value: settings.avatarIconsPerson !== false,
      onChange: toggleAvatarIconsPerson,
      akzent: accent
    }
  ), /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Karten-Badges · Personen",
      desc: "Rollen-Badges rechts auf der Kontaktkarte.",
      value: settings.kartenBadgesPerson !== false,
      onChange: toggleKartenBadgesPerson,
      akzent: accent
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: zweispaltig ? "row" : "column", gap: 6 } }, /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Eck-Icons · Firmen",
      desc: "Eck-Badges an Firmen-Avataren (aktuell ohne sichtbaren Effekt).",
      value: settings.avatarIconsFirma !== false,
      onChange: toggleAvatarIconsFirma,
      akzent: FC
    }
  ), /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Karten-Badges · Firmen",
      desc: "Dienstleister-Rollen rechts auf der Firmenkarte.",
      value: settings.kartenBadgesFirma !== false,
      onChange: toggleKartenBadgesFirma,
      akzent: FC
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: zweispaltig ? "row" : "column", gap: 6 } }, /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Statusleiste · Objekt-Karten",
      desc: `Hinweis-Zeile unter Objekten (z. B. „Bestellung abgelaufen“).`,
      value: settings.statusLeisteObjekt !== false,
      onChange: toggleStatusObjekt,
      akzent: accent,
      extra: /* @__PURE__ */ React.createElement(KonfigurierenBtn, null)
    }
  ), /* @__PURE__ */ React.createElement(
    ToggleZeile,
    {
      titel: "Statusleiste · Kontakt-Karten",
      desc: "Hinweis-Zeile unter Kontakten (Demo, Konfiguration folgt).",
      value: settings.statusLeisteKontakt !== false,
      onChange: toggleStatusKontakt,
      akzent: accent,
      extra: /* @__PURE__ */ React.createElement(KonfigurierenBtn, null)
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 4,
    marginBottom: 10,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: 3
  } }, [
    { id: "personen", label: "Personen-Rollen", count: personenRollen.length },
    { id: "firmen", label: "Firmen-Rollen", count: firmenRollen.length }
  ].map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => wechselKategorie(tb.id), style: {
    flex: 1,
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    background: kategorie === tb.id ? accent : "transparent",
    border: "none",
    color: kategorie === tb.id ? "#fff" : t.sub,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  } }, tb.label, /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    padding: "1px 6px",
    borderRadius: 8,
    background: kategorie === tb.id ? "rgba(255,255,255,0.25)" : t.card,
    color: kategorie === tb.id ? "#fff" : t.muted
  } }, tb.count)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, kategorie === "firmen" ? "Dienstleister-Rollen für Firmen (Hausverwaltung, Wartung, …). Farbe, Reihenfolge und Aktiv-Status." : "Farbe der Rollen-Badges, Reihenfolge und Aktiv-Status. Eine Rolle wählen, dann rechts die Farbe anpassen."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: zweispaltig ? "row" : "column", gap: 10, alignItems: "stretch" } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: zweispaltig ? "0 0 220px" : "1 1 auto",
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: 8
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8,
    padding: "0 4px"
  } }, "Rollen (", rollen.length, ")"), rollen.map((r, i) => {
    const istSelektiert = aktuell && r.name === aktuell.name;
    const istDragOver = dragOverIdx === i && dragIdx !== null && dragIdx !== i;
    const istInaktiv = r.aktiv === false;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: r.name,
        draggable: true,
        onDragStart: (e) => {
          setDragIdx(i);
          e.dataTransfer.effectAllowed = "move";
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragOverIdx(i);
        },
        onDragLeave: () => {
          if (dragOverIdx === i) setDragOverIdx(null);
        },
        onDrop: (e) => {
          e.preventDefault();
          handleDrop(i);
        },
        onClick: () => setSelektiertName(r.name),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 8px",
          borderRadius: 6,
          cursor: "pointer",
          background: istSelektiert ? r.color + "20" : istDragOver ? accent + "15" : "transparent",
          border: `1px solid ${istSelektiert ? r.color + "60" : istDragOver ? accent + "60" : "transparent"}`,
          marginBottom: 2,
          opacity: istInaktiv ? 0.55 : 1,
          transition: "all 0.12s"
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: t.muted, cursor: "grab", flexShrink: 0 }, title: "Ziehen zum Umsortieren" }, "⋮⋮"),
      /* @__PURE__ */ React.createElement("div", { style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: r.color + "22",
        border: `1.5px solid ${r.color}60`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 7, fontWeight: 800, color: r.color } }, r.kuerzel)),
      /* @__PURE__ */ React.createElement("span", { style: {
        fontSize: 12,
        flex: 1,
        color: t.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: istSelektiert ? 700 : 500
      } }, r.name),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            toggleAktiv(r.name);
          },
          title: istInaktiv ? "Aktivieren" : "Deaktivieren",
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            opacity: 0.55,
            flexShrink: 0
          },
          onMouseEnter: (e) => e.currentTarget.style.opacity = 1,
          onMouseLeave: (e) => e.currentTarget.style.opacity = 0.55
        },
        /* @__PURE__ */ React.createElement(I, { name: istInaktiv ? "eyeOff" : "eye", size: 13, color: t.sub })
      )
    );
  })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, aktuell ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 10,
    fontWeight: 700,
    color: t.muted,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8,
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    gap: 6
  } }, /* @__PURE__ */ React.createElement("span", null, "Farbe für"), /* @__PURE__ */ React.createElement("span", { style: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: aktuell.color,
    display: "inline-block",
    border: `1px solid ${aktuell.color}80`
  } }), /* @__PURE__ */ React.createElement("span", { style: { color: t.text } }, "„", aktuell.name, '"')), /* @__PURE__ */ React.createElement(
    FarbPalettenGrid,
    {
      value: aktuell.color,
      onChange: (c) => setFarbe(aktuell.name, c),
      t,
      hoehe: zweispaltig ? 420 : 280
    }
  )) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.muted, padding: "12px 4px" } }, "Keine Rolle ausgewählt."))));
}
function SektionSuche({ settings, setSettings, t, accent }) {
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Suchabdeckung", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 8, lineHeight: 1.4 } }, "Welche Bereiche werden in der Universalsuche durchsucht."), settings.suchKategorien.map((kat, i) => /* @__PURE__ */ React.createElement(EinstellZeile, { key: kat.id, label: kat.label, t }, /* @__PURE__ */ React.createElement(
    Toggle,
    {
      value: kat.aktiv,
      onChange: (v) => save({ suchKategorien: settings.suchKategorien.map((k, j) => j === i ? { ...k, aktiv: v } : k) }),
      color: accent
    }
  )))), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Intelligente Suche", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, "Findet auch ähnliche Schreibweisen, ähnlich klingende Namen und Tippfehler. Exakte Treffer werden immer zuerst angezeigt."), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Umlaute & Akzente ignorieren",
      sub: "„müller“ findet „Müller“, „Mueller“, „Muller“",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.sucheDiakritika !== false,
        onChange: (v) => save({ sucheDiakritika: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Mehrere Wortteile",
      sub: "„lin marc“ findet „Marcus Linder“",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.sucheWoerter !== false,
        onChange: (v) => save({ sucheWoerter: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Ähnlich klingende Namen (Kölner Phonetik)",
      sub: "„Meier“ findet auch „Meyer“, „Mayer“, „Maier“ – und „Mathias“ findet „Matthias“, „Matieas“",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.suchePhonetik !== false,
        onChange: (v) => save({ suchePhonetik: v }),
        color: accent
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Tippfehler-Toleranz",
      sub: "Findet Treffer mit kleinen Schreibfehlern",
      t
    },
    /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: settings.sucheTippfehler !== false,
        onChange: (v) => save({ sucheTippfehler: v }),
        color: accent
      }
    )
  ), settings.sucheTippfehler !== false && /* @__PURE__ */ React.createElement(
    EinstellZeile,
    {
      label: "Tippfehler-Schärfe",
      sub: "Wie viele Buchstaben darf der Treffer maximal abweichen",
      t
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      gap: 4,
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 9,
      padding: 3
    } }, [
      { v: 1, label: "Streng" },
      { v: 2, label: "Normal" },
      { v: 3, label: "Tolerant" }
    ].map((opt) => {
      const aktiv = (settings.sucheTippfehlerSchwelle || 2) === opt.v;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: opt.v,
          onClick: () => save({ sucheTippfehlerSchwelle: opt.v }),
          style: {
            background: aktiv ? accent : "transparent",
            color: aktiv ? "#fff" : t.sub,
            border: "none",
            borderRadius: 6,
            padding: "5px 12px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 600
          }
        },
        opt.label
      );
    }))
  )));
}
function SektionHV({ settings, setSettings, t, accent }) {
  const [hvName, setHvName] = useState(settings.hvName);
  const save = (partial) => setSettings((s) => ({ ...s, ...partial }));
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Hausverwaltung", t, accent }, /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Name",
      value: hvName,
      onChange: (v) => {
        setHvName(v);
        save({ hvName: v });
      },
      placeholder: "Muster Hausverwaltung GmbH",
      t,
      accent
    }
  ));
}
function OrdnerAnbindenKarte({ t, accent }) {
  const s = useStorageStatus();
  const [busy, setBusy] = useState(false);
  const onWaehlen = async () => {
    setBusy(true);
    try {
      await storage.waehleOrdner();
    } finally {
      setBusy(false);
    }
  };
  const onAktivieren = async () => {
    setBusy(true);
    try {
      await storage.aktiviereOrdnerErneut();
    } finally {
      setBusy(false);
    }
  };
  const onTrennen = async () => {
    if (!confirm("Ordner-Anbindung wirklich trennen?\n\nDie App speichert dann wieder nur im Browser. Deine Daten im Ordner bleiben unverändert.")) return;
    setBusy(true);
    try {
      await storage.trenneOrdner();
    } finally {
      setBusy(false);
    }
  };
  const btnPrimary = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: accent,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: busy ? "wait" : "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600,
    opacity: busy ? 0.6 : 1
  };
  const btnSecondary = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: t.surface,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "8px 14px",
    cursor: busy ? "wait" : "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  };
  const btnDanger = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    color: "#EF4444",
    border: "1px solid #EF444460",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: busy ? "wait" : "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  };
  if (!s.fsaVerfuegbar) {
    return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Ordner auf der Festplatte anbinden", t, accent }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      padding: "10px 12px",
      background: "#F59E0B15",
      border: "1px solid #F59E0B40",
      borderRadius: 8,
      fontSize: 12,
      color: t.text,
      lineHeight: 1.5
    } }, /* @__PURE__ */ React.createElement(I, { name: "settings", size: 14, color: "#F59E0B" }), /* @__PURE__ */ React.createElement("div", null, "Dein Browser unterstützt keinen direkten Ordnerzugriff. In Safari und Firefox funktioniert das Anbinden nicht — bitte", /* @__PURE__ */ React.createElement("strong", null, " Chrome oder Edge"), " nutzen, wenn du diese Funktion brauchst.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Du kannst hier trotzdem weiterarbeiten: Daten und Einstellungen werden im Browser gespeichert, und du kannst sie über die Exportieren/Einspielen-Buttons oben als JSON-Datei sichern bzw. wiederherstellen.")));
  }
  const istAngebunden = s.modus === "datei" || s.modus === "datei-pause";
  const aktiv = s.modus === "datei";
  const pause = s.modus === "datei-pause";
  const dotFarbe = aktiv ? "#10B981" : pause ? "#F59E0B" : "#94A3B8";
  const dotBg = aktiv ? "#10B98115" : pause ? "#F59E0B15" : "#94A3B815";
  const dotRand = aktiv ? "#10B98140" : pause ? "#F59E0B40" : "#94A3B840";
  const formatZeit = (d) => {
    if (!d) return "—";
    const pad = (n) => String(n).padStart(2, "0");
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  };
  return /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Ordner auf der Festplatte anbinden", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.5 } }, "Bindet einen Ordner auf deinem Mac/PC als feste Ablage für AllesDa an. Daten und Einstellungen werden dann automatisch in ", /* @__PURE__ */ React.createElement("strong", null, `<Ordner>/aktiv/`), " gespeichert, und du kannst die Dateien direkt im Finder austauschen (z. B. um zwischen echten Daten und einer Vorführungs-Version zu wechseln)."), istAngebunden && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    background: dotBg,
    border: `1px solid ${dotRand}`,
    borderRadius: 8,
    fontSize: 12,
    color: t.text,
    marginBottom: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: dotFarbe,
    flexShrink: 0
  } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700 } }, aktiv ? "Aktiv: " : "Pausiert: ", s.ordnerName || "(Ordner ohne Namen)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 2 } }, aktiv && s.letzteSpeicherung && "Zuletzt gespeichert um " + formatZeit(s.letzteSpeicherung), pause && (s.fehler || "Berechtigung muss erneut erteilt werden."), aktiv && !s.letzteSpeicherung && "Wartet auf erste Speicherung."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: "6px 0" } }, !istAngebunden && /* @__PURE__ */ React.createElement("button", { onClick: onWaehlen, disabled: busy, style: btnPrimary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: "#fff" }), "Ordner wählen…"), pause && /* @__PURE__ */ React.createElement("button", { onClick: onAktivieren, disabled: busy, style: btnPrimary }, /* @__PURE__ */ React.createElement(I, { name: "check", size: 12, color: "#fff" }), "Zugriff erneuern"), istAngebunden && /* @__PURE__ */ React.createElement("button", { onClick: onWaehlen, disabled: busy, style: btnSecondary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: t.text }), "Anderen Ordner wählen…"), istAngebunden && /* @__PURE__ */ React.createElement("button", { onClick: onTrennen, disabled: busy, style: btnDanger }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 12, color: "#EF4444" }), "Anbindung trennen")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, marginTop: 8, lineHeight: 1.5 } }, "Hinweis: Die Berechtigung gilt pro Browser-Sitzung. Beim nächsten Start bittet Chrome einmalig um Bestätigung — ein Klick reicht. Der Browser-Speicher (localStorage) läuft parallel als Ausfallschutz mit."));
}
function SektionDaten({
  t,
  accent,
  settings,
  setSettings,
  mode,
  setMode,
  kontakte,
  setKontakte,
  ves,
  setVes
}) {
  const groesse = storage.speicherGroesse();
  const formatKB = (n) => (n / 1024).toFixed(1) + " KB";
  const datumStempel = () => {
    const d = /* @__PURE__ */ new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  };
  const onSettingsExport = () => {
    exportiereJSON({
      typ: "allesda-settings",
      schema: STORAGE_SCHEMA_VERSION,
      exportiertAm: (/* @__PURE__ */ new Date()).toISOString(),
      mode,
      settings
    }, `allesda-einstellungen_${datumStempel()}.json`);
  };
  const onSettingsImport = () => {
    importiereJSON((obj, dateiname) => {
      if (!obj || obj.typ !== "allesda-settings" || !obj.settings) {
        alert("Diese Datei enthält keine AllesDa-Einstellungen.\n\n(" + (dateiname || "unbekannt") + ")");
        return;
      }
      if (!confirm('Einstellungen aus Datei "' + dateiname + '" einspielen?\nDie aktuellen Einstellungen werden überschrieben.')) return;
      setSettings((s) => ({ ...s, ...obj.settings }));
      if (obj.mode === "dark" || obj.mode === "light") setMode(obj.mode);
    });
  };
  const onDatenExport = () => {
    const ok = exportiereJSON({
      typ: "allesda-daten",
      schema: STORAGE_SCHEMA_VERSION,
      exportiertAm: (/* @__PURE__ */ new Date()).toISOString(),
      kontakte,
      ves
    }, `allesda-daten_${datumStempel()}.json`);
    if (ok) {
      try {
        window.dispatchEvent(new CustomEvent(
          "allesda:datei-saved",
          { detail: { quelle: "manuell-backup" } }
        ));
      } catch (e) {
      }
    }
  };
  const onDatenImport = () => {
    importiereJSON((obj, dateiname) => {
      if (!obj || obj.typ !== "allesda-daten") {
        alert("Diese Datei enthält keine AllesDa-Daten.\n\n(" + (dateiname || "unbekannt") + ")");
        return;
      }
      const anzKont = Array.isArray(obj.kontakte) ? obj.kontakte.length : 0;
      const anzVes = Array.isArray(obj.ves) ? obj.ves.length : 0;
      if (!confirm('Daten aus Datei "' + dateiname + '" einspielen?\n\n' + anzKont + " Kontakte · " + anzVes + " Objekte\n\nDie aktuellen Daten werden überschrieben.")) return;
      try {
        window.dispatchEvent(new CustomEvent(
          "allesda:datei-loaded",
          { detail: { quelle: "manuell-import" } }
        ));
      } catch (e) {
      }
      if (Array.isArray(obj.kontakte)) setKontakte(obj.kontakte);
      if (Array.isArray(obj.ves)) setVes(obj.ves);
    });
  };
  const onExcelImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls,.xlsm,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    input.style.display = "none";
    input.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        const erg = await importiereExcel(file);
        if (erg.fehler.length > 0) {
          alert("Der Import konnte nicht ausgeführt werden:\n\n  • " + erg.fehler.join("\n  • "));
          return;
        }
        const s = erg.statistik;
        let msg = 'Aus Datei "' + file.name + '":\n\n  ' + s.objekte + " Objekte\n  " + s.einheiten + " Einheiten\n  " + s.personen + " Personen\n  " + s.firmen + " Firmen\n  " + s.zuordnungen + " Zuordnungen";
        if (erg.warnungen.length > 0) {
          msg += "\n\n⚠ Hinweise:\n  • " + erg.warnungen.join("\n  • ");
        }
        msg += "\n\nDie aktuellen Daten werden ERSETZT. Fortfahren?";
        if (!confirm(msg)) return;
        try {
          window.dispatchEvent(new CustomEvent(
            "allesda:datei-loaded",
            { detail: { quelle: "excel-import" } }
          ));
        } catch (err) {
        }
        setKontakte(erg.kontakte);
        setVes(erg.ves);
      } catch (err) {
        alert("Excel-Datei konnte nicht eingelesen werden:\n\n" + (err.message || err));
      } finally {
        try {
          document.body.removeChild(input);
        } catch (e2) {
        }
      }
    };
    document.body.appendChild(input);
    input.click();
  };
  const onSettingsReset = () => {
    if (!confirm("Einstellungen wirklich auf Werkseinstellungen zurücksetzen?")) return;
    storage.setzeZurueck("settings");
    setSettings(DEFAULT_SETTINGS);
  };
  const onDatenReset = () => {
    if (!confirm("Alle Arbeitsdaten (Kontakte + Objekte) wirklich auf die Demo-Daten zurücksetzen?\n\nDiese Aktion kann nicht rückgängig gemacht werden.")) return;
    storage.setzeZurueck("daten");
    setKontakte(DEFAULT_KONTAKTE);
    setVes(DEFAULT_VES);
  };
  const btnPrimary = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: accent,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  };
  const btnSecondary = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: t.surface,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  };
  const btnDanger = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    color: "#EF4444",
    border: "1px solid #EF444460",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Excel-Vorlage einspielen", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.5 } }, "Liest eine ausgefüllte ", /* @__PURE__ */ React.createElement("strong", null, "AllesDa-Vorlage"), " (.xlsx) ein und ersetzt die aktuellen Arbeitsdaten. Ideal zum Erstbefüllen aus deinem Bestand oder zum Wechsel auf eine Vorführungs-Version.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Die Vorlage hat fünf Tabellenblätter:", /* @__PURE__ */ React.createElement("em", null, " Objekte, Einheiten, Personen, Firmen, Zuordnungen"), ". Vor dem Anwenden zeigt die App eine Zusammenfassung."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: "6px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: onExcelImport, style: btnPrimary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: "#fff" }), "Excel-Datei wählen…")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, marginTop: 8, lineHeight: 1.5 } }, "Hinweis: Die Excel-Bibliothek (SheetJS) wird beim ersten Import vom CDN nachgeladen. Dafür braucht es einmalig Internet \\u2014 danach läuft alles offline weiter.")), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Einstellungen sichern", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, "Persönliche Einstellungen (Dunkelmodus, Filter, Rollen, Sektions-Reihenfolge usw.) als JSON-Datei speichern oder aus einer Datei wiederherstellen."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: "6px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: onSettingsExport, style: btnPrimary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: "#fff" }), "Einstellungen exportieren"), /* @__PURE__ */ React.createElement("button", { onClick: onSettingsImport, style: btnSecondary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: t.text }), "Einstellungen einspielen…"), /* @__PURE__ */ React.createElement("button", { onClick: onSettingsReset, style: btnDanger }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 12, color: "#EF4444" }), "Zurücksetzen")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, marginTop: 6 } }, "Aktuelle Größe im Browser: ", formatKB(groesse.settings))), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Arbeitsdaten sichern", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, marginBottom: 10, lineHeight: 1.4 } }, "Alle Kontakte und Objekte als JSON-Datei speichern oder aus einer Datei wiederherstellen. Geeignet als Backup vor größeren Änderungen."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: "6px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: onDatenExport, style: btnPrimary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: "#fff" }), "Daten exportieren"), /* @__PURE__ */ React.createElement("button", { onClick: onDatenImport, style: btnSecondary }, /* @__PURE__ */ React.createElement(I, { name: "document", size: 12, color: t.text }), "Daten einspielen…"), /* @__PURE__ */ React.createElement("button", { onClick: onDatenReset, style: btnDanger }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 12, color: "#EF4444" }), "Auf Demo zurücksetzen")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, marginTop: 6 } }, kontakte.length, " Kontakte · ", ves.length, " Objekte · ", formatKB(groesse.daten), " im Browser")), /* @__PURE__ */ React.createElement(OrdnerAnbindenKarte, { t, accent }), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Speicherort", t, accent }, storage.istVerfuegbar() ? /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    background: "#10B98115",
    border: "1px solid #10B98140",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 12,
    color: t.text
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#10B981",
    flexShrink: 0
  } }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Speichern aktiv."), " Einstellungen und Daten bleiben beim Schließen des Browsers erhalten.")) : /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "8px 12px",
    background: "#F59E0B15",
    border: "1px solid #F59E0B60",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 12,
    color: t.text,
    lineHeight: 1.4
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#F59E0B",
    flexShrink: 0,
    marginTop: 5
  } }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Speichern nicht verfügbar."), ' Diese Umgebung (z.B. Vorschau in Claude oder privater Browsermodus) blockiert den lokalen Speicher. Änderungen gehen beim Reload verloren. Lade die Datei lokal herunter und öffne sie in deinem Browser — dann funktioniert das Auto-Speichern. Zwischendurch kannst du oben mit „Exportieren" eine Datei-Sicherung anlegen.')), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.sub, lineHeight: 1.5 } }, "Aktuell werden alle Daten lokal im ", /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, "Browser-Speicher"), " dieses Geräts abgelegt. Beim Wechsel des Geräts oder beim Löschen des Browser-Speichers sind die Daten weg — bitte vorher exportieren.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: t.text } }, "Geplant:"), " automatische Synchronisation über die Cloud, damit die Einstellungen auf allen Geräten verfügbar sind und mehrere Benutzer am gleichen Datenbestand arbeiten können.")), /* @__PURE__ */ React.createElement(EinstellKarte, { title: "Über AllesDa", t, accent }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "8px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, color: t.text } }, "AllesDa ", /* @__PURE__ */ React.createElement("span", { style: { color: accent } }, "v", APP_VERSION)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.sub, marginTop: 4 } }, "Build: ", APP_BUILD)))));
}
const SEKTIONEN = [
  { id: "profil", icon: "user", farbe: "#0E7490", title: "Mein Profil", sub: "Name, Anrede, Kontaktdaten" },
  { id: "erscheinung", icon: "paint", farbe: "#8B5CF6", title: "Erscheinungsbild", sub: "Dunkelmodus, Schriftgröße, Kontrast" },
  { id: "header", icon: "settings", farbe: "#10B981", title: "Header", sub: "Avatar, Filter-Anzeige" },
  { id: "filter", icon: "search", farbe: "#F59E0B", title: "Filter-Optionen", sub: "Welche Filter sichtbar sind" },
  { id: "rollen", icon: "badge", farbe: "#4F46E5", title: "Rollen", sub: "Farben, Reihenfolge, Aktivierung" },
  { id: "dashboard", icon: "building", farbe: "#0080FF", title: "Dashboard", sub: "Kacheln, Reihenfolge, Farben" },
  { id: "objekte", icon: "building", farbe: "#06B6D4", title: "Objekte", sub: "Einheit-Übersicht: was angezeigt wird" },
  { id: "suche", icon: "search", farbe: "#EC4899", title: "Suche", sub: "Welche Bereiche durchsucht werden" },
  { id: "hv", icon: "building", farbe: "#64748B", title: "Hausverwaltung", sub: "Name und Stammdaten" },
  { id: "daten", icon: "document", farbe: "#0EA5C9", title: "Daten", sub: "Import, Export, Backup" }
];
function KachelUebersicht({ t, accent, onClick }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
    gap: 10
  } }, SEKTIONEN.map((s) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: s.id,
      onClick: () => onClick(s.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px",
        background: t.card,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        fontFamily: "inherit",
        minWidth: 0
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = s.farbe + "70";
        e.currentTarget.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      width: 42,
      height: 42,
      borderRadius: 10,
      flexShrink: 0,
      background: s.farbe + "20",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(I, { name: s.icon, size: 20, color: s.farbe })),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, s.title), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 12,
      color: t.sub,
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, s.sub)),
    /* @__PURE__ */ React.createElement(I, { name: "chevR", size: 14, color: t.muted })
  )));
}
function SektionKachel({
  sektion,
  aktiv,
  t,
  onClick,
  id,
  editReihenfolge = false,
  kannHoch = false,
  kannRunter = false,
  onHoch,
  onRunter
}) {
  const bc = aktiv ? sektion.farbe : t.border;
  const klickbar = !!onClick;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: klickbar ? onClick : void 0,
      id,
      style: {
        cursor: klickbar ? "pointer" : "default",
        transition: "all 0.15s",
        border: `1px solid ${bc}`,
        borderRadius: 12,
        overflow: "hidden",
        scrollMarginTop: "var(--ad-header-h, 200px)"
      },
      onMouseEnter: (e) => {
        if (klickbar && !aktiv) e.currentTarget.style.transform = "translateY(-1px)";
      },
      onMouseLeave: (e) => {
        if (klickbar && !aktiv) e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      boxSizing: "border-box",
      background: t.card,
      color: t.text
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 48,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 38,
      height: 38,
      borderRadius: 9,
      flexShrink: 0,
      background: sektion.farbe + "20",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, /* @__PURE__ */ React.createElement(I, { name: sektion.icon, size: 18, color: sektion.farbe }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 13,
      fontWeight: 800,
      color: sektion.farbe,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, sektion.title), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 11,
      color: t.sub,
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    } }, sektion.sub)), editReihenfolge && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: !kannHoch,
        onClick: (e) => {
          e.stopPropagation();
          onHoch && onHoch();
        },
        "aria-label": "Nach oben",
        title: "Nach oben",
        style: {
          background: kannHoch ? sektion.farbe + "18" : "transparent",
          border: `1px solid ${kannHoch ? sektion.farbe + "60" : t.border}`,
          borderRadius: 6,
          width: 28,
          height: 22,
          cursor: kannHoch ? "pointer" : "default",
          opacity: kannHoch ? 1 : 0.3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
          fontSize: 9,
          color: kannHoch ? sektion.farbe : t.sub
        }
      },
      "▲"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        disabled: !kannRunter,
        onClick: (e) => {
          e.stopPropagation();
          onRunter && onRunter();
        },
        "aria-label": "Nach unten",
        title: "Nach unten",
        style: {
          background: kannRunter ? sektion.farbe + "18" : "transparent",
          border: `1px solid ${kannRunter ? sektion.farbe + "60" : t.border}`,
          borderRadius: 6,
          width: 28,
          height: 22,
          cursor: kannRunter ? "pointer" : "default",
          opacity: kannRunter ? 1 : 0.3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
          fontSize: 9,
          color: kannRunter ? sektion.farbe : t.sub
        }
      },
      "▼"
    )))
  );
}
function EinstellungenZentrale({
  settings,
  setSettings,
  kontakte,
  setKontakte,
  ves = [],
  setVes,
  t,
  accent,
  mode,
  setMode,
  cardWidth = 340
}) {
  const [aktSektion, setAktSektion] = useState(null);
  const [editReihenfolge, setEditReihenfolge] = useState(false);
  useEffect(() => {
    if (aktSektion) {
      scrollToCard("set-" + aktSektion);
    }
  }, [aktSektion]);
  const reihenfolge = settings.sektionenReihenfolge && settings.sektionenReihenfolge.length > 0 ? settings.sektionenReihenfolge : SEKTIONEN.map((s) => s.id);
  const sortierteSektionen = [];
  reihenfolge.forEach((id) => {
    const s = SEKTIONEN.find((x) => x.id === id);
    if (s) sortierteSektionen.push(s);
  });
  SEKTIONEN.forEach((s) => {
    if (!reihenfolge.includes(s.id)) sortierteSektionen.push(s);
  });
  const moveSektion = (id, delta) => {
    const liste = sortierteSektionen.map((s) => s.id);
    const idx = liste.indexOf(id);
    const neu = idx + delta;
    if (idx < 0 || neu < 0 || neu >= liste.length) return;
    const reordered = [...liste];
    [reordered[idx], reordered[neu]] = [reordered[neu], reordered[idx]];
    setSettings((s) => ({ ...s, sektionenReihenfolge: reordered }));
  };
  const renderSektionDetail = (s) => /* @__PURE__ */ React.createElement("div", { style: {
    background: s.farbe + "08",
    border: `1px solid ${s.farbe}`,
    borderRadius: 12,
    padding: "14px 16px"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: s.farbe,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 12
  } }, s.title), s.id === "profil" && /* @__PURE__ */ React.createElement(SektionProfil, { kontakte, settings, setSettings, t, accent: s.farbe }), s.id === "erscheinung" && /* @__PURE__ */ React.createElement(SektionErscheinungsbild, { settings, setSettings, t, accent: s.farbe, mode, setMode }), s.id === "header" && /* @__PURE__ */ React.createElement(SektionHeader, { settings, setSettings, t, accent: s.farbe }), s.id === "filter" && /* @__PURE__ */ React.createElement(SektionFilterOpt, { settings, setSettings, t, accent: s.farbe, ves, kontakte }), s.id === "rollen" && /* @__PURE__ */ React.createElement(SektionRollen, { settings, setSettings, t, accent: s.farbe }), s.id === "dashboard" && /* @__PURE__ */ React.createElement(SektionDashboard, { settings, setSettings, t, accent: s.farbe }), s.id === "objekte" && /* @__PURE__ */ React.createElement(SektionObjekte, { settings, setSettings, t, accent: s.farbe }), s.id === "suche" && /* @__PURE__ */ React.createElement(SektionSuche, { settings, setSettings, t, accent: s.farbe }), s.id === "hv" && /* @__PURE__ */ React.createElement(SektionHV, { settings, setSettings, t, accent: s.farbe }), s.id === "daten" && /* @__PURE__ */ React.createElement(
    SektionDaten,
    {
      t,
      accent: s.farbe,
      settings,
      setSettings,
      mode,
      setMode,
      kontakte,
      setKontakte,
      ves,
      setVes
    }
  ));
  const windowW = useWindowWidth();
  const istDesktop = windowW >= 900;
  const offenSektion = aktSektion ? sortierteSektionen.find((x) => x.id === aktSektion) : istDesktop ? sortierteSektionen[0] : null;
  useEffect(() => {
    if (istDesktop && !aktSektion && sortierteSektionen.length > 0) {
      setAktSektion(sortierteSektionen[0].id);
    }
  }, [istDesktop]);
  const toggleEdit = () => {
    setEditReihenfolge((v) => {
      const neuV = !v;
      if (neuV && !istDesktop) setAktSektion(null);
      return neuV;
    });
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement(StickySectionHeader, { t, accent }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    fontSize: 20,
    fontWeight: 800,
    color: t.text,
    userSelect: "none"
  } }, "Einstellungen"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: toggleEdit,
      title: editReihenfolge ? "Reihenfolge speichern" : "Reihenfolge bearbeiten",
      "aria-label": editReihenfolge ? "Reihenfolge speichern" : "Reihenfolge bearbeiten",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        flexShrink: 0,
        background: editReihenfolge ? accent + "22" : accent,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        boxShadow: editReihenfolge ? `inset 0 0 0 1.5px ${accent}` : `0 1px 2px ${accent}40`
      }
    },
    /* @__PURE__ */ React.createElement(
      I,
      {
        name: editReihenfolge ? "check" : "pencil",
        size: 14,
        color: editReihenfolge ? accent : "#fff"
      }
    )
  ))), editReihenfolge && /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    color: t.sub,
    fontStyle: "italic",
    marginBottom: 12,
    padding: "10px 14px",
    background: accent + "08",
    border: `1px solid ${accent}40`,
    borderRadius: 10,
    flexShrink: 0
  } }, "Reihenfolge bearbeiten — mit den Pfeilen ▲ ▼ verschieben. Mit dem Häkchen bestätigen."), offenSektion && istDesktop && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    flex: 1,
    minHeight: 0,
    alignItems: "stretch"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: `0 0 ${cardWidth}px`,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8
  } }, sortierteSektionen.map((s, i) => /* @__PURE__ */ React.createElement(
    SektionKachel,
    {
      key: s.id,
      sektion: s,
      aktiv: offenSektion && offenSektion.id === s.id,
      t,
      id: "set-" + s.id,
      editReihenfolge,
      kannHoch: i > 0,
      kannRunter: i < sortierteSektionen.length - 1,
      onHoch: () => moveSektion(s.id, -1),
      onRunter: () => moveSektion(s.id, 1),
      onClick: () => setAktSektion(s.id)
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, overflowY: "auto" } }, renderSektionDetail(offenSektion))), offenSektion && !istDesktop && !editReihenfolge && /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAktSektion(null), style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: `1px solid ${t.border}`,
    color: t.text,
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 8,
    alignSelf: "flex-start"
  } }, /* @__PURE__ */ React.createElement(I, { name: "chevron-left", size: 12, color: t.text }), "Zurück zur Liste"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, renderSektionDetail(offenSektion))), !istDesktop && (!offenSektion || editReihenfolge) && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10
  } }, sortierteSektionen.map((s, i) => /* @__PURE__ */ React.createElement(
    SektionKachel,
    {
      key: s.id,
      sektion: s,
      aktiv: false,
      t,
      id: "set-" + s.id,
      editReihenfolge,
      kannHoch: i > 0,
      kannRunter: i < sortierteSektionen.length - 1,
      onHoch: () => moveSektion(s.id, -1),
      onRunter: () => moveSektion(s.id, 1),
      onClick: () => setAktSektion(s.id)
    }
  )))));
}
function NeuerKontaktModal({ t, accent, onClose, onSave, ves = [], kontakte = [] }) {
  const [typ, setTyp] = useState("person");
  const [anrede, setAnrede] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [firmenname, setFirmenname] = useState("");
  const [rechtsform, setRechtsform] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plzOrt, setPlzOrt] = useState("");
  const [zuweisungen, setZuweisungen] = useState([]);
  const [neueRolleForm, setNeueRolleForm] = useState(false);
  const istPerson = typ === "person";
  const farbe = istPerson ? accent : FC;
  const validPerson = vorname.trim().length > 0 && nachname.trim().length > 0;
  const validFirma = firmenname.trim().length > 0;
  const valid = istPerson ? validPerson : validFirma;
  const speichern = () => {
    if (!valid) return;
    const neu = istPerson ? {
      typ: "person",
      anrede,
      vorname,
      nachname,
      tel,
      email,
      strasse,
      plzOrt,
      objektZuweisungen: zuweisungen
    } : {
      typ: "firma",
      name: firmenname,
      rechtsform,
      tel,
      email,
      strasse,
      plzOrt,
      objektZuweisungen: zuweisungen
    };
    onSave && onSave(neu);
    onClose();
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    width: "100%",
    maxWidth: 480,
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "12px 16px",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    background: t.card,
    zIndex: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 14, color: farbe }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, "Neuer Kontakt")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer" } }, /* @__PURE__ */ React.createElement(I, { name: "x", size: 16, color: t.sub }))), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8
  } }, "Was möchtest du anlegen?"), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginBottom: 18
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTyp("person"), style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "14px 10px",
    background: istPerson ? accent + "18" : t.surface,
    border: `2px solid ${istPerson ? accent : t.border}`,
    borderRadius: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: accent + "22",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "user", size: 18, color: accent })), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 13,
    fontWeight: 700,
    color: istPerson ? accent : t.text
  } }, "Person"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: t.sub, textAlign: "center", lineHeight: 1.3 } }, "Eigentümer, Mieter, Beirat …")), /* @__PURE__ */ React.createElement("button", { onClick: () => setTyp("firma"), style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "14px 10px",
    background: !istPerson ? FC + "18" : t.surface,
    border: `2px solid ${!istPerson ? FC : t.border}`,
    borderRadius: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: 38,
    height: 38,
    borderRadius: 9,
    background: FC + "22",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } }, /* @__PURE__ */ React.createElement(I, { name: "building", size: 18, color: FC })), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 13,
    fontWeight: 700,
    color: !istPerson ? FC : t.text
  } }, "Firma"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: t.sub, textAlign: "center", lineHeight: 1.3 } }, "Hausverwaltung, Handwerker …"))), istPerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Anrede",
      value: anrede,
      onChange: setAnrede,
      placeholder: "Herr, Frau, Familie …",
      t,
      accent: farbe
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Vorname",
      value: vorname,
      onChange: setVorname,
      placeholder: "Max",
      t,
      accent: farbe,
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Nachname",
      value: nachname,
      onChange: setNachname,
      placeholder: "Mustermann",
      t,
      accent: farbe,
      required: true
    }
  ))), !istPerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Firmenname",
      value: firmenname,
      onChange: setFirmenname,
      placeholder: "Maier GmbH",
      t,
      accent: farbe,
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Rechtsform",
      value: rechtsform,
      onChange: setRechtsform,
      placeholder: "GmbH, OHG, e.K. …",
      t,
      accent: farbe
    }
  )), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 8,
    paddingTop: 8,
    borderTop: `1px solid ${t.border}30`
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8
  } }, "Kontaktdaten (optional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Telefon",
      value: tel,
      onChange: setTel,
      placeholder: "0171 …",
      t,
      accent: farbe
    }
  ), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "E-Mail",
      value: email,
      onChange: setEmail,
      placeholder: "name@…",
      t,
      accent: farbe
    }
  )), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "Straße",
      value: strasse,
      onChange: setStrasse,
      placeholder: "Hauptstraße 1",
      t,
      accent: farbe
    }
  ), /* @__PURE__ */ React.createElement(
    Inp,
    {
      label: "PLZ / Ort",
      value: plzOrt,
      onChange: setPlzOrt,
      placeholder: "80331 München",
      t,
      accent: farbe
    }
  )), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: `1px solid ${t.border}30`
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  } }, istPerson ? "Rollen" : "Dienstleister-Rollen", zuweisungen.length > 0 ? ` (${zuweisungen.length})` : ""), !neueRolleForm && /* @__PURE__ */ React.createElement("button", { onClick: () => setNeueRolleForm(true), style: {
    fontSize: 11,
    padding: "3px 10px",
    background: farbe + "20",
    color: farbe,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600
  } }, "+ Rolle hinzufügen")), zuweisungen.length === 0 && !neueRolleForm && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: t.muted, fontStyle: "italic", padding: "4px 0" } }, "Optional – kann auch später ergänzt werden."), zuweisungen.map((z, i) => /* @__PURE__ */ React.createElement(
    RolleZeile,
    {
      key: i,
      z,
      ves,
      kontakte,
      editMode: true,
      onEdit: () => {
      },
      onDelete: () => setZuweisungen(zuweisungen.filter((_, idx) => idx !== i)),
      t,
      accent: farbe,
      typ: istPerson ? "person" : "firma"
    }
  )), neueRolleForm && /* @__PURE__ */ React.createElement(
    RolleEditor,
    {
      initial: {},
      ves,
      kontakte,
      t,
      accent: farbe,
      typ: istPerson ? "person" : "firma",
      onCancel: () => setNeueRolleForm(false),
      onSave: (zuw) => {
        setZuweisungen([...zuweisungen, zuw]);
        setNeueRolleForm(false);
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 18 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    flex: 1,
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 9,
    padding: "10px 0",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    color: t.sub,
    fontFamily: "inherit"
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: speichern, disabled: !valid, style: {
    flex: 2,
    background: valid ? farbe : t.muted,
    border: "none",
    borderRadius: 9,
    padding: "10px 0",
    cursor: valid ? "pointer" : "not-allowed",
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    fontFamily: "inherit",
    transition: "all 0.15s"
  } }, istPerson ? "Person anlegen" : "Firma anlegen")))));
}
function computeFilterOptionen(screen, settings, kontakte, ves = []) {
  if (screen === "kontakte") {
    const personen = kontakte.filter((k) => k.typ === "person");
    const firmen = kontakte.filter((k) => k.typ === "firma");
    const ets = personen.filter((k) => (k.rollen || []).some((r) => r === "Eigentümer" || r === "Miteigentümer"));
    const mts = personen.filter((k) => (k.rollen || []).includes("Mieter"));
    const vbs = personen.filter((k) => (k.rollen || []).some((r) => r === "Verwaltungsbeirat" || r === "Verwaltungsbeiratsvorsitzender"));
    return [
      { id: "alle", label: "Alle Kontakte", count: kontakte.length },
      { id: "personen", label: "Personen", count: personen.length },
      { id: "firmen", label: "Firmen", count: firmen.length },
      { id: "eigentuemer", label: "Eigentümer", count: ets.length },
      { id: "mieter", label: "Mieter", count: mts.length },
      { id: "vbeirat", label: "Verwaltungsbeirat", count: vbs.length }
    ];
  }
  const filterTyp = settings.filterTyp || "verwalter";
  const feld = filterTyp === "buchhalter" ? "buchhalter" : "verwalter";
  const prefix = filterTyp === "buchhalter" ? "Buchh." : "Verw.";
  const aktivMap = settings.filterAktive || {};
  const counts = {};
  ves.forEach((ve) => {
    const id = ve.verwaltung && ve.verwaltung[feld];
    if (id) counts[id] = (counts[id] || 0) + 1;
  });
  const optionen = [
    { id: "alle", label: "Alle Objekte", count: ves.length }
  ];
  Object.keys(counts).forEach((id) => {
    const k = kontakte.find((x) => x.id === id);
    if (!k) return;
    const name = k.typ === "firma" ? k.name : [k.nachname, k.vorname].filter(Boolean).join(", ") || k.name || id;
    if (aktivMap[id] === false) return;
    optionen.push({ id, label: prefix + " " + name, count: counts[id] });
  });
  return optionen;
}
function NeuesObjektModal({ t, accent, onClose, onSave, vorhandeneVes = [] }) {
  const naechsteNr = (() => {
    const jahr = (/* @__PURE__ */ new Date()).getFullYear();
    const hochs = vorhandeneVes.map((v) => {
      const m = (v.nr || "").match(/^WEG-\d{4}-(\d{3,})$/);
      return m ? parseInt(m[1], 10) : 0;
    }).reduce((a, b) => Math.max(a, b), 0);
    return `WEG-${jahr}-${String(hochs + 1).padStart(3, "0")}`;
  })();
  const [nr, setNr] = useState(naechsteNr);
  const [strasse, setStrasse] = useState("");
  const [plzOrt, setPlzOrt] = useState("");
  const [verwaltungsart, setVerwaltungsart] = useState("weg");
  const valid = nr.trim().length > 0 && strasse.trim().length > 0;
  const speichern = () => {
    if (!valid) return;
    const adresse = plzOrt.trim() ? `${strasse.trim()}, ${plzOrt.trim()}` : strasse.trim();
    const neueVE = {
      id: "ve-" + Date.now(),
      nr: nr.trim(),
      adresse,
      verwaltungsart,
      einheiten: [],
      verwaltung: {
        beginn: "",
        bestelltBis: "",
        verwalter: null,
        buchhalter: null,
        uebernommenVon: null,
        verwZustimmung: false,
        naechsteETV: "",
        naechsteWahl: ""
      },
      vertraege: [],
      etvHistorie: []
    };
    onSave && onSave(neueVE);
    onClose();
  };
  const arten = [
    { id: "weg", label: "WEG", beschr: "Wohnungseigentümergemeinschaft" },
    { id: "miet", label: "Miet", beschr: "Mietverwaltung" },
    { id: "gewerbe", label: "Gewerbe", beschr: "Gewerbeobjekt" },
    { id: "sev", label: "SEV", beschr: "Sondereigentumsverwaltung" }
  ];
  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6
  };
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    background: t.surface,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: t.card,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    width: "100%",
    maxWidth: 480,
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "12px 16px",
    borderBottom: `1px solid ${t.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    background: t.card,
    zIndex: 10
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(I, { name: "plus", size: 14, color: accent }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: t.text } }, "Neues Objekt")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      style: { background: "none", border: "none", cursor: "pointer" },
      title: "Schließen",
      "aria-label": "Schließen"
    },
    /* @__PURE__ */ React.createElement(I, { name: "x", size: 16, color: t.sub })
  )), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "WEG-Nummer"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: nr,
      onChange: (e) => setNr(e.target.value),
      placeholder: "WEG-2026-001",
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Straße + Hausnummer"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: strasse,
      onChange: (e) => setStrasse(e.target.value),
      placeholder: "z. B. Sebastian-Bach-Straße 189",
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "PLZ + Ort"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: plzOrt,
      onChange: (e) => setPlzOrt(e.target.value),
      placeholder: "z. B. 80339 München",
      style: inputStyle
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: labelStyle }, "Verwaltungsart"), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8
  } }, arten.map((a) => {
    const aktiv = verwaltungsart === a.id;
    return /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => setVerwaltungsart(a.id), style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 2,
      padding: "10px 12px",
      background: aktiv ? accent + "18" : t.surface,
      border: `2px solid ${aktiv ? accent : t.border}`,
      borderRadius: 10,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.15s",
      textAlign: "left"
    } }, /* @__PURE__ */ React.createElement("span", { style: {
      fontSize: 13,
      fontWeight: 700,
      color: aktiv ? accent : t.text
    } }, a.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: t.sub, lineHeight: 1.3 } }, a.beschr));
  }))), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: t.muted,
    fontStyle: "italic",
    padding: "10px 0 0",
    lineHeight: 1.4
  } }, "Einheiten und Verwaltungsdetails können nach dem Anlegen im Objekt-Detail ergänzt werden.")), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "12px 16px",
    borderTop: `1px solid ${t.border}`,
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    position: "sticky",
    bottom: 0,
    background: t.card
  } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: t.surface,
    color: t.text,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600
  } }, "Abbrechen"), /* @__PURE__ */ React.createElement("button", { onClick: speichern, disabled: !valid, style: {
    background: valid ? accent : t.surface,
    color: valid ? "#fff" : t.muted,
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: valid ? "pointer" : "not-allowed",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 700,
    opacity: valid ? 1 : 0.6
  } }, "Anlegen"))));
}
function ObjekteMasterDetail({
  cardWidth,
  gefiltert,
  expandedVEId,
  setExpandedVEId,
  offenVE,
  t,
  accent,
  kontakte,
  setKontakte,
  ves,
  setVes,
  gotoKontakt
}) {
  const [mdRef, mdLayout] = useMasterDetailLayout(cardWidth);
  const renderDetail = () => /* @__PURE__ */ React.createElement("div", { style: {
    background: accent + "08",
    border: `1px solid ${accent}`,
    borderRadius: 12,
    padding: "14px 16px"
  } }, /* @__PURE__ */ React.createElement(
    VEDetail,
    {
      ve: offenVE,
      t,
      accent,
      kontakte,
      setKontakte,
      ves,
      setVes,
      cardId: "obj-" + offenVE.id,
      onKontaktClick: (id) => {
        setExpandedVEId(null);
        gotoKontakt(id);
      },
      onBack: () => setExpandedVEId(null)
    }
  ));
  if (mdLayout.masterCols === 0) {
    return /* @__PURE__ */ React.createElement("div", { ref: mdRef, style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setExpandedVEId(null), style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: `1px solid ${t.border}`,
      color: t.text,
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 8,
      alignSelf: "flex-start"
    } }, /* @__PURE__ */ React.createElement(I, { name: "chevron-left", size: 12, color: t.text }), "Zurück zur Liste"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0 } }, renderDetail()));
  }
  return /* @__PURE__ */ React.createElement("div", { ref: mdRef, style: {
    display: "flex",
    gap: 10,
    flex: 1,
    minHeight: 0,
    alignItems: "stretch"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: `0 0 ${mdLayout.masterWidth}px`,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: `repeat(${mdLayout.masterCols}, 1fr)`,
    gap: 8,
    alignContent: "start"
  } }, gefiltert.map((ve) => /* @__PURE__ */ React.createElement(
    VEKachel,
    {
      key: ve.id,
      ve,
      t,
      accent,
      aktiv: expandedVEId === ve.id,
      id: "obj-" + ve.id,
      onClick: () => setExpandedVEId(expandedVEId === ve.id ? null : ve.id)
    }
  ))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, overflowY: "auto" } }, renderDetail()));
}
function useStorageStatus() {
  const [status, setStatus] = useState(storage.status());
  useEffect(() => {
    const unsub = storage.abonniereStatus((s) => setStatus(s));
    return unsub;
  }, []);
  return status;
}
function StatusBand({
  t,
  status,
  dirty,
  onGotoDaten,
  onAktivieren,
  onJetztSichern,
  kompakt
}) {
  if (!status) return null;
  if (status.modus === "lokal" && !status.fsaVerfuegbar && !dirty) return null;
  let bg, fg, dot, text, action = null;
  const subText = (() => {
    if (!status.letzteSpeicherung) return null;
    const d = status.letzteSpeicherung;
    const pad = (n) => String(n).padStart(2, "0");
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
  })();
  if (dirty && status.modus !== "datei") {
    bg = "#F59E0B22";
    fg = t.text;
    dot = "#F59E0B";
    text = kompakt ? "Ungespeichert" : "Ungespeicherte Änderungen — bitte nach iCloud sichern";
    action = { label: kompakt ? "Sichern" : "Jetzt sichern", fn: onJetztSichern };
  } else if (status.modus === "datei") {
    bg = "#10B98115";
    fg = t.text;
    dot = "#10B981";
    text = kompakt ? "Datei-Sync aktiv" : "Live-Sync mit Ordner „" + (status.ordnerName || "?") + "/aktiv/daten.json“" + (subText ? "  ·  zuletzt " + subText : "");
  } else if (status.modus === "datei-pause") {
    bg = "#F59E0B18";
    fg = t.text;
    dot = "#F59E0B";
    text = kompakt ? "Sync pausiert" : "Datei-Sync pausiert" + (status.ordnerName ? "  ·  " + status.ordnerName : "") + " — Zugriff erneuern";
    action = { label: "Zugriff erneuern", fn: onAktivieren };
  } else if (status.modus === "nicht-verf") {
    bg = "#EF444418";
    fg = t.text;
    dot = "#EF4444";
    text = "Speichern blockiert (privater Modus oder Sandbox)";
  } else {
    bg = "#F59E0B12";
    fg = t.text;
    dot = "#F59E0B";
    text = kompakt ? "Nur im Browser" : "Nur in diesem Browser gespeichert  ·  Tipp: Ordner anbinden für Auto-Backup";
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: onGotoDaten,
      title: "Klicken: zu Einstellungen \\u2192 Daten",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 14px",
        background: bg,
        borderBottom: `1px solid ${t.border}`,
        fontSize: 11,
        color: fg,
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: dot,
      flexShrink: 0
    } }),
    /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis", flex: 1, minWidth: 0 } }, text),
    action && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          action.fn && action.fn();
        },
        style: {
          background: dot,
          border: "none",
          color: "#fff",
          fontFamily: "inherit",
          fontSize: 10,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 999,
          cursor: "pointer",
          flexShrink: 0,
          boxShadow: `0 1px 2px ${dot}40`
        }
      },
      action.label
    )
  );
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "reset", () => {
      this.setState({ hasError: false, error: null, info: null });
    });
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    try {
      const log = {
        zeit: (/* @__PURE__ */ new Date()).toISOString(),
        nachricht: error && error.message ? error.message : String(error),
        stack: error && error.stack ? error.stack : null,
        komponente: info && info.componentStack ? info.componentStack : null
      };
      localStorage.setItem("allesda:lastError", JSON.stringify(log));
    } catch (e) {
    }
    this.setState({ info });
    console.error("AllesDa Render-Fehler:", error, info);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    const err = this.state.error;
    const msg = err && err.message ? err.message : String(err);
    const stack = err && err.stack ? err.stack : "(kein Stack-Trace)";
    const compStack = this.state.info && this.state.info.componentStack ? this.state.info.componentStack : "";
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: "#1A1A2E",
      color: "#F0F0FF",
      padding: "max(20px, env(safe-area-inset-top, 0px)) 20px max(20px, env(safe-area-inset-bottom, 0px))",
      overflowY: "auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      zIndex: 99999
    } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 720, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      background: "#EF444420",
      color: "#EF4444",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      marginBottom: 16
    } }, "Render-Fehler in AllesDa"), /* @__PURE__ */ React.createElement("h2", { style: { margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#F0F0FF" } }, msg), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 16px", fontSize: 13, color: "#A0A0CD", lineHeight: 1.5 } }, 'Etwas in der App hat einen Fehler ausgelöst. Die wichtigsten Daten sind sicher (lokal gespeichert). Du kannst die App weiter benutzen, indem du unten auf „Weiter" tippst.'), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: this.reset, style: {
      padding: "10px 18px",
      background: "#0E7490",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13
    } }, "Weiter"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      const text = "Fehler: " + msg + "\n\nStack:\n" + stack + "\n\nKomponenten:\n" + compStack;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        alert("Fehler-Details in die Zwischenablage kopiert.");
      } else {
        window.prompt("Fehler-Details (kopieren mit Cmd+C / Strg+C):", text);
      }
    }, style: {
      padding: "10px 18px",
      background: "transparent",
      color: "#F0F0FF",
      border: "1px solid #6B7280",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13
    } }, "Fehler kopieren"), /* @__PURE__ */ React.createElement("button", { onClick: () => window.location.reload(), style: {
      padding: "10px 18px",
      background: "transparent",
      color: "#F0F0FF",
      border: "1px solid #6B7280",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13
    } }, "App neu laden")), /* @__PURE__ */ React.createElement("details", { style: { marginTop: 16, fontSize: 11, color: "#A0A0CD" } }, /* @__PURE__ */ React.createElement("summary", { style: {
      cursor: "pointer",
      padding: "6px 0",
      color: "#F0F0FF",
      fontWeight: 600
    } }, "Technische Details"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "Stack-Trace:"), /* @__PURE__ */ React.createElement("pre", { style: {
      background: "#000",
      padding: 12,
      borderRadius: 6,
      overflowX: "auto",
      fontSize: 10,
      lineHeight: 1.4,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    } }, stack), compStack && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, margin: "12px 0 4px" } }, "Komponenten-Stack:"), /* @__PURE__ */ React.createElement("pre", { style: {
      background: "#000",
      padding: 12,
      borderRadius: 6,
      overflowX: "auto",
      fontSize: 10,
      lineHeight: 1.4,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    } }, compStack))))));
  }
}
function App() {
  const [mode, setMode] = useState("dark");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const objektAccent = (settings.kacheln.find((k) => k.id === "objekte") || {}).farbe || ACCENT;
  const kontaktAccent = (settings.kacheln.find((k) => k.id === "kontakte") || {}).farbe || KONTAKTE_FARBE;
  useEffect(() => {
    if (typeof document === "undefined") return;
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";
  }, []);
  const SCHEMA_VERSION = 1;
  const [kontakte, setKontakte] = useState(DEFAULT_KONTAKTE);
  const [ves, setVes] = useState(DEFAULT_VES);
  const [storageGeladen, setStorageGeladen] = useState(false);
  useEffect(() => {
    const sett = storage.ladeSettings();
    if (sett && typeof sett === "object") {
      setSettings((s) => ({ ...s, ...sett }));
      if (sett.mode === "dark" || sett.mode === "light") setMode(sett.mode);
    }
    const daten = storage.ladeDaten();
    if (daten && typeof daten === "object") {
      if (Array.isArray(daten.kontakte)) setKontakte(daten.kontakte);
      if (Array.isArray(daten.ves)) setVes(daten.ves);
    }
    setStorageGeladen(true);
    if (!storage.istVerfuegbar()) {
      storage.status();
    }
    let abgebrochen = false;
    (async function hydriereAusDatei() {
      if (!storage.fsaVerfuegbar()) return;
      const verbunden = await storage.versucheOrdnerWiederherstellen();
      if (!verbunden || abgebrochen) return;
      const sFromFile = await storage.ladeSettingsAusDatei();
      if (sFromFile && sFromFile.settings && !abgebrochen) {
        skipDirtyRef.current = true;
        setSettings((s) => ({ ...s, ...sFromFile.settings }));
        if (sFromFile.settings.mode === "dark" || sFromFile.settings.mode === "light") {
          setMode(sFromFile.settings.mode);
        }
      }
      const dFromFile = await storage.ladeDatenAusDatei();
      if (dFromFile && !abgebrochen) {
        skipDirtyRef.current = true;
        if (Array.isArray(dFromFile.kontakte)) setKontakte(dFromFile.kontakte);
        if (Array.isArray(dFromFile.ves)) setVes(dFromFile.ves);
        setDirty(false);
      }
    })();
    return () => {
      abgebrochen = true;
    };
  }, []);
  useEffect(() => {
    if (!storageGeladen) return;
    const refresh = async () => {
      const s = storage.status();
      if (s.modus !== "datei") return;
      const dFromFile = await storage.ladeDatenAusDatei();
      if (!dFromFile) return;
      const aktiveKAnz = (kontakte || []).length;
      const aktiveVAnz = (ves || []).length;
      const fileKAnz = Array.isArray(dFromFile.kontakte) ? dFromFile.kontakte.length : 0;
      const fileVAnz = Array.isArray(dFromFile.ves) ? dFromFile.ves.length : 0;
      if (fileKAnz === aktiveKAnz && fileVAnz === aktiveVAnz) return;
      const ok = window.confirm(
        "Die Datei „aktiv/daten.json“ wurde extern verändert.\n\nDatei:    " + fileKAnz + " Kontakte, " + fileVAnz + " Objekte\nAktuell:  " + aktiveKAnz + " Kontakte, " + aktiveVAnz + " Objekte\n\nNeue Version aus der Datei übernehmen?"
      );
      if (!ok) return;
      skipDirtyRef.current = true;
      if (Array.isArray(dFromFile.kontakte)) setKontakte(dFromFile.kontakte);
      if (Array.isArray(dFromFile.ves)) setVes(dFromFile.ves);
      setDirty(false);
    };
    const onFocus = () => {
      refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [storageGeladen, kontakte, ves]);
  useEffect(() => {
    if (!storageGeladen) return;
    storage.speichereSettings({ ...settings, mode });
  }, [settings, mode, storageGeladen]);
  const [dirty, setDirty] = useState(false);
  const skipDirtyRef = useRef(true);
  useEffect(() => {
    if (!storageGeladen) return;
    storage.speichereDaten({ kontakte, ves });
    if (skipDirtyRef.current) {
      skipDirtyRef.current = false;
    } else {
      setDirty(true);
    }
  }, [kontakte, ves, storageGeladen]);
  useEffect(() => {
    const onSaved = () => setDirty(false);
    const onLoaded = () => {
      skipDirtyRef.current = true;
      setDirty(false);
    };
    window.addEventListener("allesda:datei-saved", onSaved);
    window.addEventListener("allesda:datei-loaded", onLoaded);
    return () => {
      window.removeEventListener("allesda:datei-saved", onSaved);
      window.removeEventListener("allesda:datei-loaded", onLoaded);
    };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
  const onJetztSichern = () => {
    const ok = exportiereJSON({
      typ: "allesda-daten",
      schema: STORAGE_SCHEMA_VERSION,
      exportiertAm: (/* @__PURE__ */ new Date()).toISOString(),
      kontakte,
      ves
    }, "daten.json");
    if (ok) {
      try {
        window.dispatchEvent(new CustomEvent(
          "allesda:datei-saved",
          { detail: { quelle: "jetzt-sichern" } }
        ));
      } catch (e) {
      }
    }
  };
  const speicherStatus = useStorageStatus();
  const aktiviereSpeicherErneut = async () => {
    const ok = await storage.aktiviereOrdnerErneut();
    if (!ok) {
      alert("Konnte den Zugriff nicht aktivieren. Bitte den Ordner unter Einstellungen → Daten neu anbinden.");
    }
  };
  const [filter, setFilter] = useState("alle");
  const [filterArt, setFilterArt] = useState("alle");
  const [contentRef, cardWidth] = useCardWidth(280, 10);
  const [expandedVEId, setExpandedVEId] = useState(null);
  const [filterKontaktart, setFilterKontaktart] = useState("alle");
  const [screen, setScreen] = useState("objekte");
  const [kontaktId, setKontaktId] = useState(null);
  const [suchErg, setSuchErg] = useState(null);
  const [suchBegriff, setSuchBegr] = useState("");
  const [neuerKontaktOffen, setNeuerKontaktOffen] = useState(false);
  const [neuesObjektOffen, setNeuesObjektOffen] = useState(false);
  const [objektDetailEditMode, setObjektDetailEditMode] = useState(false);
  useEffect(() => {
    setObjektDetailEditMode(false);
  }, [expandedVEId]);
  const [aktivKontaktId, setAktivKontaktId] = useState(null);
  const [kontaktDetailEditMode, setKontaktDetailEditMode] = useState(false);
  useEffect(() => {
    setKontaktDetailEditMode(false);
  }, [aktivKontaktId]);
  const [sucheResetCounter, setSucheResetCounter] = useState(0);
  const sucheReset = () => {
    setSuchErg(null);
    setSuchBegr("");
    setSucheResetCounter((c) => c + 1);
  };
  const resetUI = () => {
    sucheReset();
    setExpandedVEId(null);
  };
  const headerRef = useRef(null);
  const [headerBreit, setHeaderBreit] = useState(true);
  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;
    const check = () => {
      setHeaderBreit(el.offsetWidth >= 880);
      document.documentElement.style.setProperty(
        "--ad-header-h",
        el.offsetHeight + "px"
      );
    };
    check();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(check);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const windowWidth = useWindowWidth();
  const istDesktop = windowWidth >= DESKTOP_MIN_WIDTH;
  const tBase = mode === "light" ? LIGHT : DARK;
  const t = settings.hoherKontrast ? {
    ...tBase,
    sub: mode === "light" ? "#2A2E40" : "#D0D0E8",
    muted: mode === "light" ? "#454A60" : "#A8A8C5"
  } : tBase;
  const DICHTE_MULT = { compact: 0.9, normal: 1, relaxed: 1.18 };
  const dichteMult = DICHTE_MULT[settings.dichte] || 1;
  const filterOptionen = computeFilterOptionen(screen, settings, kontakte, ves);
  useEffect(() => {
    const ids = filterOptionen.map((o) => o.id);
    if (filterOptionen.length > 0 && !ids.includes(filter)) {
      setFilter(filterOptionen[0].id);
    }
  }, [screen]);
  const wechselScreen = (s) => {
    setScreen(s);
    resetUI();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };
  const gotoVE = (id) => {
    setExpandedVEId(id);
    setAktivKontaktId(null);
    wechselScreen("objekte");
  };
  const gotoKontakt = (id) => {
    setKontaktId(id);
    wechselScreen("kontakte");
  };
  const goHome = () => {
    wechselScreen("objekte");
  };
  const gefilterteVEs = ves.filter((ve) => {
    if (filter === "alle" || !filter) return true;
    const filterTyp = settings.filterTyp || "verwalter";
    const feld = filterTyp === "buchhalter" ? "buchhalter" : "verwalter";
    return (ve.verwaltung && ve.verwaltung[feld]) === filter;
  });
  const navTo = (id) => {
    if (id === "objekte" || id === "kontakte") wechselScreen(id);
    else wechselScreen(id);
  };
  const dashboardSichtbar = settings.dashboardModus === "immer" || settings.dashboardModus === "home" && screen === "home";
  return /* @__PURE__ */ React.createElement(TipProvider, null, /* @__PURE__ */ React.createElement(RollenContext.Provider, { value: settings.rollen || DEFAULT_ROLLEN }, /* @__PURE__ */ React.createElement(FirmenRollenContext.Provider, { value: settings.firmenRollen || DEFAULT_FIRMEN_ROLLEN }, /* @__PURE__ */ React.createElement(AvatarIconsContext.Provider, { value: {
    person: settings.avatarIconsPerson !== false,
    firma: settings.avatarIconsFirma !== false
  } }, /* @__PURE__ */ React.createElement(KartenBadgesContext.Provider, { value: {
    person: settings.kartenBadgesPerson !== false,
    firma: settings.kartenBadgesFirma !== false
  } }, /* @__PURE__ */ React.createElement(StatusLeisteContext.Provider, { value: {
    objekt: settings.statusLeisteObjekt !== false,
    kontakt: settings.statusLeisteKontakt !== false
  } }, /* @__PURE__ */ React.createElement(EinheitAnzeigeContext.Provider, { value: {
    flaeche: settings.einheitAnzeigeFlaeche !== false,
    mea: settings.einheitAnzeigeMea !== false,
    eigentuemer: settings.einheitAnzeigeEigentuemer !== false,
    mieter: settings.einheitAnzeigeMieter !== false
  } }, /* @__PURE__ */ React.createElement(RechnungsadresseContext.Provider, { value: settings.rechnungsadresseAnzeigen === true }, /* @__PURE__ */ React.createElement("div", { style: {
    // Container-Größe an zoom kompensieren, damit nach der Skalierung
    // wieder genau ein Viewport voll erreicht wird (sonst weiße/leere
    // Streifen rechts/unten bei zoom < 1 bzw. Overflow bei zoom > 1).
    // dvh statt vh: iOS Safari rechnet URL-Bar in 100vh ein → bei
    // sichtbarer URL-Bar wäre der echte Viewport kleiner als 100vh und
    // Inhalt unten würde abgeschnitten.
    height: `${100 / dichteMult}dvh`,
    width: `${100 / dichteMult}vw`,
    overflow: "hidden",
    background: t.bg,
    fontFamily: FONT,
    color: t.text,
    zoom: dichteMult,
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("link", { rel: "stylesheet", href: FONT_URL }), /* @__PURE__ */ React.createElement("style", null, `
        html, body { background: ${t.bg}; margin: 0; }
        * { box-sizing: border-box; }
        button { font-family: ${FONT}; }
        input, textarea, select { font-family: ${FONT}; }
        /* iOS Safari zoomt automatisch in Eingabefelder mit font-size < 16px.
           Auf Touch-Devices erzwingen wir 16px als Minimum. !important
           überschreibt inline-styles in den Komponenten. */
        @media (hover: none) and (pointer: coarse) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
        ${settings.reduceMotion ? `
          * { transition: none !important; animation: none !important; }
        ` : ""}
      `), /* @__PURE__ */ React.createElement("div", { ref: headerRef, "data-app-sticky-header": "1", style: {
    background: t.header,
    borderBottom: `1px solid ${t.border}`,
    position: "sticky",
    top: 0,
    zIndex: 50,
    paddingTop: "env(safe-area-inset-top, 0px)"
  } }, !headerBreit && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: 10,
    padding: "6px 14px 8px"
  } }, /* @__PURE__ */ React.createElement("button", { onClick: goHome, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: 1
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.text } }, "Alles"), /* @__PURE__ */ React.createElement("span", { style: { color: ACCENT } }, "Da")), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    color: t.muted,
    marginTop: 2,
    letterSpacing: "0.05em",
    fontVariantNumeric: "tabular-nums"
  } }, "v", APP_VERSION)), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, settings.filterAktiv ? /* @__PURE__ */ React.createElement(
    FilterDropdown,
    {
      optionen: filterOptionen,
      value: filter,
      onChange: setFilter,
      label: "Filter",
      t,
      fullWidth: true
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: 0,
    overflow: "hidden"
  } }, settings.hvLogoUrl && /* @__PURE__ */ React.createElement("img", { src: settings.hvLogoUrl, alt: "", style: {
    width: 22,
    height: 22,
    borderRadius: 5,
    flexShrink: 0,
    objectFit: "cover"
  } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 12,
    fontWeight: 600,
    color: t.sub,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  } }, settings.hvName || ""))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 } }, settings.headerZeigeDunkelmodus !== false && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode(mode === "dark" ? "light" : "dark"),
      title: mode === "dark" ? "Hellmodus" : "Dunkelmodus",
      "aria-label": mode === "dark" ? "Hellmodus" : "Dunkelmodus",
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        padding: 0,
        background: "transparent",
        border: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s"
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: mode === "dark" ? "sun" : "moon", size: 16, color: t.sub })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => wechselScreen("einstellungen"),
      title: "Einstellungen",
      "aria-label": "Einstellungen",
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        padding: 0,
        background: settings.headerZeigeAvatar ? !suchErg && screen === "einstellungen" ? ACCENT + "30" : ACCENT + "20" : "transparent",
        border: settings.headerZeigeAvatar ? `2px solid ${!suchErg && screen === "einstellungen" ? ACCENT : ACCENT + "60"}` : `1px solid ${!suchErg && screen === "einstellungen" ? ACCENT : t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s"
      }
    },
    /* @__PURE__ */ React.createElement(
      I,
      {
        name: settings.headerZeigeAvatar ? "user" : "settings",
        size: 16,
        color: settings.headerZeigeAvatar ? ACCENT : !suchErg && screen === "einstellungen" ? ACCENT : t.sub
      }
    )
  ))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    padding: "0 14px 10px"
  } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement(
    SucheFeld,
    {
      settings,
      t,
      accent: ACCENT,
      kontakte,
      ves,
      resetKey: screen + "-" + sucheResetCounter,
      onErgebnis: (er, beg) => {
        setSuchErg(er);
        setSuchBegr(beg);
      }
    }
  )))), headerBreit && /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px"
  } }, /* @__PURE__ */ React.createElement("button", { onClick: goHome, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: 1
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.text } }, "Alles"), /* @__PURE__ */ React.createElement("span", { style: { color: ACCENT } }, "Da")), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 9,
    color: t.muted,
    marginTop: 2,
    letterSpacing: "0.05em",
    fontVariantNumeric: "tabular-nums"
  } }, "v", APP_VERSION)), settings.filterAktiv ? /* @__PURE__ */ React.createElement(
    FilterDropdown,
    {
      optionen: filterOptionen,
      value: filter,
      onChange: setFilter,
      label: "Filter",
      t
    }
  ) : /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
    overflow: "hidden"
  } }, settings.hvLogoUrl && /* @__PURE__ */ React.createElement("img", { src: settings.hvLogoUrl, alt: "", style: {
    width: 22,
    height: 22,
    borderRadius: 5,
    flexShrink: 0,
    objectFit: "cover"
  } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 12,
    fontWeight: 500,
    color: t.sub,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 220
  } }, settings.hvName || "")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement(
    SucheFeld,
    {
      settings,
      t,
      accent: ACCENT,
      kontakte,
      ves,
      resetKey: screen + "-" + sucheResetCounter,
      onErgebnis: (er, beg) => {
        setSuchErg(er);
        setSuchBegr(beg);
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 } }, settings.headerZeigeDunkelmodus !== false && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode(mode === "dark" ? "light" : "dark"),
      title: mode === "dark" ? "Hellmodus" : "Dunkelmodus",
      "aria-label": mode === "dark" ? "Hellmodus" : "Dunkelmodus",
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        padding: 0,
        background: "transparent",
        border: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s"
      }
    },
    /* @__PURE__ */ React.createElement(I, { name: mode === "dark" ? "sun" : "moon", size: 16, color: t.sub })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => wechselScreen("einstellungen"),
      title: "Einstellungen",
      "aria-label": "Einstellungen",
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        padding: 0,
        background: settings.headerZeigeAvatar ? !suchErg && screen === "einstellungen" ? ACCENT + "30" : ACCENT + "20" : "transparent",
        border: settings.headerZeigeAvatar ? `2px solid ${!suchErg && screen === "einstellungen" ? ACCENT : ACCENT + "60"}` : `1px solid ${!suchErg && screen === "einstellungen" ? ACCENT : t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s"
      }
    },
    /* @__PURE__ */ React.createElement(
      I,
      {
        name: settings.headerZeigeAvatar ? "user" : "settings",
        size: 16,
        color: settings.headerZeigeAvatar ? ACCENT : !suchErg && screen === "einstellungen" ? ACCENT : t.sub
      }
    )
  ))), !istDesktop && dashboardSichtbar && settings.dashboardSticky && /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${t.border}`, padding: "8px 16px" } }, /* @__PURE__ */ React.createElement(KategorieKacheln, { settings, t, aktiverScreen: screen, suchAktiv: !!suchErg, onKlick: navTo })), /* @__PURE__ */ React.createElement(
    StatusBand,
    {
      t,
      status: speicherStatus,
      dirty,
      kompakt: !headerBreit,
      onGotoDaten: () => wechselScreen("einstellungen"),
      onAktivieren: aktiviereSpeicherErneut,
      onJetztSichern
    }
  )), !istDesktop && dashboardSichtbar && !settings.dashboardSticky && /* @__PURE__ */ React.createElement("div", { style: {
    background: t.header,
    borderBottom: `1px solid ${t.border}`,
    padding: "8px 16px"
  } }, /* @__PURE__ */ React.createElement(KategorieKacheln, { settings, t, aktiverScreen: screen, suchAktiv: !!suchErg, onKlick: navTo })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flex: 1, minHeight: 0 } }, istDesktop && dashboardSichtbar && /* @__PURE__ */ React.createElement(
    SeitenleisteKacheln,
    {
      settings,
      setSettings,
      t,
      aktiverScreen: screen,
      onKlick: navTo
    }
  ), /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    margin: "0 auto",
    padding: "0 10px",
    width: "100%",
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("div", { ref: contentRef, style: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))"
  } }, !suchErg && screen === "einstellungen" && /* @__PURE__ */ React.createElement(
    EinstellungenZentrale,
    {
      settings,
      setSettings,
      kontakte,
      setKontakte,
      ves,
      setVes,
      t,
      accent: ACCENT,
      mode,
      setMode,
      cardWidth
    }
  ), suchErg && /* @__PURE__ */ React.createElement(
    Suchergebnisse,
    {
      ergebnisse: suchErg,
      suchbegriff: suchBegriff,
      t,
      accent: ACCENT,
      ves,
      setVes,
      kontakte,
      setKontakte,
      onSchliessen: sucheReset
    }
  ), !suchErg && screen === "objekte" && (() => {
    const countsArt = {};
    VERWALTUNGSARTEN.forEach((a) => {
      countsArt[a.id] = 0;
    });
    ves.forEach((v) => {
      const a = v.verwaltungsart || "weg";
      if (countsArt[a] !== void 0) countsArt[a] += 1;
    });
    const aktiveArten = Object.entries(settings.filterVerwaltungsarten || {}).filter(([_, an]) => an).map(([id]) => id);
    const gefiltert = filterArt === "alle" ? ves : ves.filter((v) => (v.verwaltungsart || "weg") === filterArt);
    const titleAktiv = filterArt === "alle";
    const offenVE = gefiltert.find((v) => v.id === expandedVEId);
    const istMobileDetail = offenVE && !istDesktop;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StickySectionHeader, { t, accent: objektAccent }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setFilterArt("alle"),
        title: "Alle Objekte anzeigen",
        style: {
          fontSize: 20,
          fontWeight: 800,
          flexShrink: 0,
          color: titleAktiv ? t.text : t.sub,
          cursor: "pointer",
          userSelect: "none",
          transition: "color 0.15s"
        }
      },
      "Objekte"
    ), /* @__PURE__ */ React.createElement(
      FilterButtons,
      {
        arten: VERWALTUNGSARTEN,
        aktive: aktiveArten,
        counts: countsArt,
        wert: filterArt,
        onWert: setFilterArt,
        t,
        accent: objektAccent,
        ohneAlle: true
      }
    ), istMobileDetail ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setObjektDetailEditMode((v) => !v),
        title: objektDetailEditMode ? "Bearbeitung beenden" : "Objekt bearbeiten",
        "aria-label": objektDetailEditMode ? "Bearbeitung beenden" : "Objekt bearbeiten",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          flexShrink: 0,
          marginLeft: "auto",
          background: objektDetailEditMode ? objektAccent + "22" : objektAccent,
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: objektDetailEditMode ? `inset 0 0 0 1.5px ${objektAccent}` : `0 1px 2px ${objektAccent}40`
        }
      },
      /* @__PURE__ */ React.createElement(
        I,
        {
          name: objektDetailEditMode ? "check" : "pencil",
          size: 14,
          color: objektDetailEditMode ? objektAccent : "#fff"
        }
      )
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setNeuesObjektOffen(true),
        title: "Neues Objekt",
        "aria-label": "Neues Objekt",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          flexShrink: 0,
          marginLeft: "auto",
          background: objektAccent,
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: `0 1px 2px ${objektAccent}40`
        }
      },
      /* @__PURE__ */ React.createElement(I, { name: "plus", size: 16, color: "#fff" })
    ))), (() => {
      const offenVE2 = gefiltert.find((v) => v.id === expandedVEId);
      const hatOffen = !!offenVE2;
      if (hatOffen && istDesktop) {
        return /* @__PURE__ */ React.createElement(
          ObjekteMasterDetail,
          {
            cardWidth,
            gefiltert,
            expandedVEId,
            setExpandedVEId,
            offenVE: offenVE2,
            t,
            accent: objektAccent,
            kontakte,
            setKontakte,
            ves,
            setVes,
            gotoKontakt
          }
        );
      }
      if (hatOffen && !istDesktop) {
        return /* @__PURE__ */ React.createElement("div", { style: {
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column"
        } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setExpandedVEId(null), style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: `1px solid ${t.border}`,
          color: t.text,
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 8,
          alignSelf: "flex-start"
        } }, /* @__PURE__ */ React.createElement(I, { name: "chevron-left", size: 12, color: t.text }), "Zurück zur Liste"), /* @__PURE__ */ React.createElement("div", { style: {
          background: objektAccent + "08",
          border: `1px solid ${objektAccent}`,
          borderRadius: 12,
          padding: "14px 16px"
        } }, /* @__PURE__ */ React.createElement(
          VEDetail,
          {
            ve: offenVE2,
            t,
            accent: objektAccent,
            kontakte,
            setKontakte,
            ves,
            setVes,
            cardId: "obj-" + offenVE2.id,
            externEditMode: objektDetailEditMode,
            setExternEditMode: setObjektDetailEditMode,
            headerOhneEditBtn: true,
            onKontaktClick: (id) => {
              setExpandedVEId(null);
              gotoKontakt(id);
            },
            onBack: () => setExpandedVEId(null)
          }
        )));
      }
      return /* @__PURE__ */ React.createElement("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 10
      } }, gefiltert.map((ve) => /* @__PURE__ */ React.createElement(
        VEKachel,
        {
          key: ve.id,
          ve,
          t,
          accent: objektAccent,
          aktiv: false,
          id: "obj-" + ve.id,
          onClick: () => setExpandedVEId(ve.id)
        }
      )));
    })(), gefiltert.length === 0 && /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 12,
      color: t.muted,
      fontStyle: "italic",
      marginTop: 20
    } }, "Keine Objekte dieser Verwaltungsart vorhanden."));
  })(), !suchErg && screen === "kontakte" && (() => {
    const arten = buildKontaktarten(settings.rollen, settings.firmenRollen);
    const countsArt = {};
    arten.forEach((a) => {
      countsArt[a.id] = kontakte.filter((k) => kontaktPasstZuArt(k, a.id, arten)).length;
    });
    const aktiveArten = Object.entries(settings.filterKontaktarten || {}).filter(([_, an]) => an).map(([id]) => id);
    const titleAktiv = filterKontaktart === "alle";
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StickySectionHeader, { t, accent: kontaktAccent }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setFilterKontaktart("alle"),
        title: "Alle Kontakte anzeigen",
        style: {
          fontSize: 20,
          fontWeight: 800,
          flexShrink: 0,
          color: titleAktiv ? t.text : t.sub,
          cursor: "pointer",
          userSelect: "none",
          transition: "color 0.15s"
        }
      },
      "Kontakte"
    ), /* @__PURE__ */ React.createElement(
      FilterButtons,
      {
        arten,
        aktive: aktiveArten,
        counts: countsArt,
        wert: filterKontaktart,
        onWert: setFilterKontaktart,
        t,
        accent: kontaktAccent,
        ohneAlle: true
      }
    ), aktivKontaktId && !istDesktop ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setKontaktDetailEditMode((v) => !v),
        title: kontaktDetailEditMode ? "Speichern" : "Kontakt bearbeiten",
        "aria-label": kontaktDetailEditMode ? "Speichern" : "Kontakt bearbeiten",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          flexShrink: 0,
          marginLeft: "auto",
          background: kontaktDetailEditMode ? kontaktAccent + "22" : kontaktAccent,
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: kontaktDetailEditMode ? `inset 0 0 0 1.5px ${kontaktAccent}` : `0 1px 2px ${kontaktAccent}40`
        }
      },
      /* @__PURE__ */ React.createElement(
        I,
        {
          name: kontaktDetailEditMode ? "check" : "pencil",
          size: 14,
          color: kontaktDetailEditMode ? kontaktAccent : "#fff"
        }
      )
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setNeuerKontaktOffen(true),
        title: "Neuer Kontakt",
        "aria-label": "Neuer Kontakt",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          flexShrink: 0,
          marginLeft: "auto",
          background: kontaktAccent,
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: `0 1px 2px ${kontaktAccent}40`
        }
      },
      /* @__PURE__ */ React.createElement(I, { name: "plus", size: 16, color: "#fff" })
    ))), /* @__PURE__ */ React.createElement(
      KontakteScreen,
      {
        t,
        accent: kontaktAccent,
        filter,
        kontaktart: filterKontaktart,
        kontakte,
        setKontakte,
        ves,
        initialKontaktId: kontaktId,
        onVEClick: gotoVE,
        externAktiv: aktivKontaktId,
        setExternAktiv: setAktivKontaktId,
        externEditMode: kontaktDetailEditMode,
        setExternEditMode: setKontaktDetailEditMode,
        mobileDetailHeaderOhneEditBtn: !istDesktop,
        cardWidth
      }
    ));
  })(), neuerKontaktOffen && /* @__PURE__ */ React.createElement(
    NeuerKontaktModal,
    {
      t,
      accent: ACCENT,
      ves,
      kontakte,
      onClose: () => setNeuerKontaktOffen(false),
      onSave: (neu) => {
        const maxId = kontakte.reduce((m, k) => k.id > m ? k.id : m, 0);
        const id = maxId + 1;
        const eintrag = neu.typ === "person" ? {
          id,
          typ: "person",
          name: `${neu.vorname || ""} ${neu.nachname || ""}`.trim(),
          vorname: neu.vorname || "",
          nachname: neu.nachname || "",
          anrede: neu.anrede || "",
          tels: neu.tel ? [{ type: "Mobil", nr: neu.tel }] : [],
          emails: neu.email ? [{ type: "Privat", email: neu.email }] : [],
          strasse: neu.strasse || "",
          plzOrt: neu.plzOrt || "",
          rollen: [...new Set((neu.objektZuweisungen || []).map((z) => z.rolle))],
          objektZuweisungen: neu.objektZuweisungen || [],
          badges: []
        } : {
          id,
          typ: "firma",
          name: neu.name || "",
          rechtsform: neu.rechtsform || "",
          tel: neu.tel || "",
          email: neu.email || "",
          strasse: neu.strasse || "",
          plzOrt: neu.plzOrt || "",
          ansprechpartner: [],
          gewerke: [],
          objektZuweisungen: neu.objektZuweisungen || []
        };
        setKontakte((v) => [...v, eintrag]);
      }
    }
  ), neuesObjektOffen && /* @__PURE__ */ React.createElement(
    NeuesObjektModal,
    {
      t,
      accent: ACCENT,
      vorhandeneVes: ves,
      onClose: () => setNeuesObjektOffen(false),
      onSave: (neueVE) => {
        setVes((v) => [...v, neueVE]);
        setExpandedVEId(neueVE.id);
      }
    }
  ), !suchErg && (screen === "etv" || screen === "tickets" || screen === "kommunikation" || screen === "finanzen" || screen === "technik" || screen === "dokumente") && (() => {
    const kachel = settings.kacheln.find((k) => k.id === screen) || {};
    const SUB = {
      etv: [
        "Stammdaten",
        "Beschlusssammlung",
        "Versammlung / Planung",
        "Protokoll",
        "HGA",
        "WPL",
        "ERL",
        "Beschluss-Vorbereitung & Nachbereitung"
      ],
      tickets: [
        "Vorgangsliste",
        "Status (offen/in Arbeit/erledigt)",
        "Zuweisung an Person/Firma",
        "Verknüpfung mit Objekt",
        "Anhänge",
        "Verlauf / Historie"
      ],
      kommunikation: [
        "E-Mail-Postfach",
        "SMS / Push",
        "Briefe & Serienbriefe",
        "Vorlagen",
        "Versandhistorie",
        "Adressverteiler"
      ],
      finanzen: [
        "Hausgeldabrechnung (HGA)",
        "Wirtschaftsplan (WPL)",
        "Einzelabrechnungen (ERL)",
        "Rechnungen",
        "Zahlungsverkehr",
        "Mahnwesen",
        "Bankverbindungen"
      ],
      technik: [
        "Heizung",
        "Aufzug",
        "Lüftung",
        "Hebeanlage",
        "Doppelparker",
        "Garagentor / Schranke / Automatik-Tür",
        "PV-Anlage",
        "Zähler"
      ],
      dokumente: ["Verträge", "Rechnungen", "Grundbuchauszüge", "Protokolle", "Pläne", "Fotos"]
    };
    const subs = SUB[screen] || [];
    return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 720, margin: "32px auto", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 64,
      height: 64,
      borderRadius: 16,
      background: (kachel.farbe || t.muted) + "22",
      marginBottom: 16
    } }, /* @__PURE__ */ React.createElement(I, { name: kachel.icon || "building", size: 28, color: kachel.farbe || t.muted })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 6 } }, kachel.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: t.muted, marginBottom: 24 } }, "Bereich in Vorbereitung"), subs.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-block",
      textAlign: "left",
      background: t.card,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: "14px 18px",
      minWidth: 280
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.sub,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom: 10
    } }, "Geplante Unterbereiche"), subs.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      fontSize: 13,
      color: t.sub,
      padding: "4px 0",
      display: "flex",
      alignItems: "center",
      gap: 8
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: (kachel.farbe || t.muted) + "80",
      flexShrink: 0
    } }), s))));
  })()), " "), " "), "   "), "     ")))))))));
}
(function bootstrap() {
  try {
    document.title = "AllesDa v" + APP_VERSION + " — Immobilienverwaltung";
  } catch (e) {
  }
  var ladeIndikator = document.getElementById("ladeIndikator");
  try {
    var container = document.getElementById("root");
    if (!container) throw new Error("#root nicht gefunden");
    ReactDOM.createRoot(container).render(
      React.createElement(ErrorBoundary, null, React.createElement(App))
    );
    if (ladeIndikator) {
      setTimeout(function() {
        ladeIndikator.style.opacity = "0";
        setTimeout(function() {
          ladeIndikator.style.display = "none";
        }, 300);
      }, 50);
    }
  } catch (e) {
    if (ladeIndikator) {
      ladeIndikator.innerHTML = '<div style="max-width:480px;padding:30px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#EF4444;margin-bottom:10px;">AllesDa konnte nicht gestartet werden</div><div style="font-size:13px;color:#A0A0CD;line-height:1.5;">' + (e && e.message ? e.message : String(e)) + "</div></div>";
    }
    console.error(e);
  }
})();
