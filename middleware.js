import { NextResponse } from "next/server";

function getRequestHost(request) {
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const firstHost = hostHeader.split(",")[0].trim().toLowerCase();
  return firstHost.split(":")[0];
}

function isLocalHost(host) {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="AdminOps SEO Agent"'
    }
  });
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin/seo-agent")) {
    return NextResponse.next();
  }

  const requestHost = getRequestHost(request);
  const adminHost = String(process.env.ADMIN_DASHBOARD_HOST || "admin.adminops.cloud").toLowerCase();

  if (requestHost && !isLocalHost(requestHost) && requestHost !== adminHost) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https";
    redirectUrl.host = adminHost;
    return NextResponse.redirect(redirectUrl);
  }

  const adminUser = process.env.ADMIN_BASIC_AUTH_USER;
  const adminPass = process.env.ADMIN_BASIC_AUTH_PASS;

  if (!adminUser || !adminPass) {
    return unauthorizedResponse();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [user, pass] = decoded.split(":");

  if (user !== adminUser || pass !== adminPass) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
