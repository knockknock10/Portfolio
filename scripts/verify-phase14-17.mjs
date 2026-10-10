import assert from "node:assert/strict"
import { chromium } from "playwright"

const base = "http://127.0.0.1:3000";

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkPage(browser, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const result = await page.evaluate(() => ({
    headings: document.querySelectorAll("main.home-page h1").length,
    sections: Array.from(document.querySelectorAll("main.home-page > section")).map((item) => item.id),
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    signal: Boolean(document.querySelector("#signals")),
    research: Boolean(document.querySelector("#research")),
    internships: Boolean(document.querySelector("#internships")),
    certifications: Boolean(document.querySelector("#certifications")),
  }));
  assert.equal(result.headings, 1, "Home page has exactly one h1");
  assert(result.width <= result.viewport, "Unexpected horizontal overflow at " + width + "px");
  assert(result.signal && result.research, "Expected non-empty Signals and Research");
  assert(
    result.sections.indexOf("signals") < result.sections.indexOf("research") &&
    result.sections.indexOf("research") < result.sections.indexOf("craft"),
    "Signals and Research should appear before Craft",
  );
  assert.equal(result.internships, false, "Empty internships should not create a homepage section");
  assert.equal(result.certifications, false, "Empty certifications should not create a homepage section");
  console.log("Viewport " + width + ": " + JSON.stringify(result));

  for (const route of [
    { path: "/signals", title: "Signals" },
    { path: "/research", title: "Research" },
    { path: "/internships", title: "Internships" },
    { path: "/certifications", title: "Certifications" },
  ]) {
    await page.goto(base + route.path, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1, route.path + " needs exactly one h1");
    if (route.path === "/signals") {
      assert.equal(await page.locator(".signals-leetcode-block").count(), 1, "LeetCode panel should render");
      assert.equal(await page.locator(".signals-calendar-block").count(), 0, "Missing GitHub calendar should be hidden");
    }
    if (route.path === "/research") {
      assert.equal(await page.locator(".research-row").count(), 2, "Two sourced research records should render");
    }
    if (route.path === "/internships") {
      assert((await page.locator("body").innerText()).includes("Internships coming soon."));
      assert.equal(await page.locator(".internships-section").count(), 0);
    }
    if (route.path === "/certifications") {
      assert((await page.locator("body").innerText()).includes("Certifications coming soon."));
      assert.equal(await page.locator(".certifications-section").count(), 0);
    }
  }
  await page.goto(base + "/work", { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1").count(), 1, "/work needs exactly one h1");
  assert.equal(await page.locator(".work-card").count(), 24, "/work should retain all 24 records");
  await page.close();
}

async function measureFps(page, throttled) {
  const cdp = await page.context().newCDPSession(page);
  if (throttled) await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const el = document.querySelector("#signals");
    if (!el) return;
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 20, behavior: "instant" });
  });
  await wait(400);

  const measuring = page.evaluate(async () => {
    const frames = [];
    let last = performance.now();
    let stop = false;
    const start = last;
    function onFrame(now) {
      frames.push(now - last);
      last = now;
      if (!stop) requestAnimationFrame(onFrame);
    }
    requestAnimationFrame(onFrame);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    stop = true;
    const elapsed = performance.now() - start;
    const valid = frames.filter((delta) => delta > 0 && delta < 100);
    const fps = valid.length / (elapsed / 1000);
    return { fps: Number(fps.toFixed(1)), frames: valid.length, durationMs: Math.round(elapsed) };
  });

  const wheel = (async () => {
    const end = Date.now() + 10000;
    while (Date.now() < end) {
      await page.mouse.wheel(0, 24);
      await wait(70);
    }
  })();
  const [reading] = await Promise.all([measuring, wheel]);
  if (throttled) await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await cdp.detach();
  console.log((throttled ? "4x-throttled" : "Normal") + " Signals scroll FPS: " + reading.fps + " (" + reading.frames + " frames / " + reading.durationMs + "ms)");
  return reading.fps;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [375, 768, 1440]) await checkPage(browser, width, 900);

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const normal = await measureFps(page, false);
    const throttled = await measureFps(page, true);
    await page.close();
    assert(normal >= 55, "Normal scroll FPS fell below 55: " + normal);
    assert(throttled >= 40, "4x-throttled scroll FPS fell below 40: " + throttled);
    console.log("Responsive and scroll FPS checks passed.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
