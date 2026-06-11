import { writeFileSync } from "fs";

async function prerender() {
  const serverModule = await import(new URL("../dist/server/index.mjs", import.meta.url).href);
  const server = serverModule.default || serverModule;

  const request = new Request("http://localhost/");
  const response = await server.fetch(request, {}, {});
  const html = await response.text();

  writeFileSync("./dist/client/index.html", html);
  console.log("✓ Generated dist/client/index.html");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
