#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const files = ["README.md", "CONTRIBUTING.md"];
const ignoredHosts = new Set([
  "www.youtube.com",
  "youtube.com",
]);

const knownAutomatedBlocks = new Map([
  ["education.minecraft.net", new Set([503])],
  ["thekidshouldseethis.com", new Set([403])],
  ["www.amnh.org", new Set([403])],
  ["www.canva.com", new Set([403])],
  ["www.practicalmoneyskills.com", new Set([403])],
]);

const urls = new Set();

for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    urls.add(match[1]);
  }
}

let failures = 0;

for (const url of [...urls].sort()) {
  const host = new URL(url).hostname.replace(/^m\./, "");
  if (ignoredHosts.has(host)) {
    console.log(`SKIP ${url}`);
    continue;
  }

  const result = await check(url);
  if (result.ok) {
    console.log(`OK   ${url}`);
  } else if (knownAutomatedBlocks.get(host)?.has(result.status)) {
    console.log(`WARN ${url} ${result.status} blocks automated checks`);
  } else {
    failures += 1;
    console.log(`FAIL ${url} ${result.status ?? result.error}`);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}

async function check(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "awesome-kids-link-check/1.0",
      },
    });

    if ([403, 405, 406].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "awesome-kids-link-check/1.0",
        },
      });
    }

    return { ok: response.status >= 200 && response.status < 400, status: response.status };
  } catch (error) {
    return { ok: false, error: error.name === "AbortError" ? "timeout" : error.message };
  } finally {
    clearTimeout(timeout);
  }
}
