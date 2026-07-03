import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const deadLinks = [
    "/home",
    "/home/",
];

const authMiddleware = withAuth({
    pages: {
        signIn: "/login",
    },
});

export default function middleware(req, event) {
    const path = req.nextUrl.pathname;

    if (deadLinks.includes(path)) {
        return new NextResponse("This page is permanently gone.", { status: 410 });
    }

    if (path.startsWith("/dashboard")) {
        return authMiddleware(req, event);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};