export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "admin.bmxbike.ir") {
      const adminUrl = new URL(request.url);
      adminUrl.pathname = "/admin/index.html";
      return env.ASSETS.fetch(new Request(adminUrl, request));
    }

    return env.ASSETS.fetch(request);
  }
};
