import { NextResponse } from "next/server";

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
