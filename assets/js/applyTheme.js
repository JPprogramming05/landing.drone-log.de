(async function () {
  try {
    const res = await fetch("assets/data/theme.json", { cache: "no-store" });
    const theme = await res.json();

    const root = document.documentElement;
    const setVar = (k, v) => root.style.setProperty(k, v);

    // Colors
    for (const [k, v] of Object.entries(theme.colors || {})) {
      setVar(`--c-${k}`, v);
    }
    // Layout
    for (const [k, v] of Object.entries(theme.layout || {})) {
      setVar(`--l-${k}`, v);
    }
    // Typography
    for (const [k, v] of Object.entries(theme.typography || {})) {
      setVar(`--t-${k}`, v);
    }
    // Effects
    for (const [k, v] of Object.entries(theme.effects || {})) {
      setVar(`--e-${k}`, v);
    }
  } catch (e) {
    console.warn("Theme konnte nicht geladen werden:", e);
  }
})();
