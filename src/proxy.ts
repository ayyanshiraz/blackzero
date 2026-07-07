import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";

const deadLinks = [
    "/home",
    "/home/",
];

const authMiddleware = withAuth({
    pages: {
        signIn: "/login",
    },
});

// Added types for req and event to fix TypeScript errors
export default function middleware(req: NextRequest, event: NextFetchEvent) {
    const path = req.nextUrl.pathname;

    if (deadLinks.includes(path)) {
        return new NextResponse("This page is permanently gone.", { status: 410 });
    }

    if (path.startsWith("/dashboard")) {
        return authMiddleware(req as any, event);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};