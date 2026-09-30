export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "admin.bmxbike.ir") {
      const adminUrl = new URL(request.url);
      adminUrl.pathname = "/admin/index.html";

      const response = await env.ASSETS.fetch(new Request(adminUrl, request));
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("X-Frame-Options", "DENY");
      headers.set("Referrer-Policy", "no-referrer");
      headers.set("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    // Never expose the administration files through the public site hostname.
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) {
      return new Response("Not Found", { status: 404 });
    }

    return env.ASSETS.fetch(request);
  }
};
