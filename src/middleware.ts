import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const visited = request.cookies.get("visited")?.value;

	const redirect = !request.headers.get("referer")?.includes("redirect=false");

	console.log("is visited", visited);

	const response =
		visited && redirect
			? NextResponse.redirect(
					new URL("https://www.marathonbet.com/", request.url)
			  )
			: NextResponse.next();
	response.cookies.set("visited", "true");
	return response;
}
