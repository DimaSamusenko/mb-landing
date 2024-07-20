import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const visited = request.cookies.get("visited")?.value;
	const redirect = request.nextUrl.searchParams.get("redirect") !== "false";

	const response =
		visited && redirect
			? NextResponse.redirect(
					new URL("https://www.marathonbet.com/", request.url)
			  )
			: NextResponse.next();

	response.cookies.set("visited", "true", {
		path: `${path}`,
	});

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
