/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";
import "./../../builder.config";
import {localeDefault, locales} from "@/config";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

function getLocale(url: string) {
	return [url.split("-"), url.split("_")].map((url) => {
		return locales[url.at(-1)]
	}).filter(Boolean).pop()
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = ((params?.page as string[])?.join("/") || "");
	const locale = getLocale(slug) || localeDefault;
	const page = await builder
		.get("page", {
			userAttributes: {
				urlPath: "/" + slug,
				jurisdiction: "curacao",
				// locale: locale,
			},
			options: {
				locale,
			},
		})
		.toPromise();

	return {
		props: {
			page: page || null,
		},
		revalidate: 5,
	};
};

export async function getStaticPaths() {
	const pages = await builder.getAll("page", {
		fields: "data.url",
		options: { noTargeting: true },
	});

	return {
		paths: pages
			.map((page) => `${page.data?.url}`)
			.filter((url) => url !== "/"),
		fallback: "blocking",
	};
}

export default function Page({ page }: { page: BuilderContent | null }) {
	const isPreviewing = useIsPreviewing();

	if (!page && !isPreviewing) {
		return <DefaultErrorPage statusCode={404} />;
	}

	return (
		<>
			<Head>
				<title>{page?.data?.title}</title>
			</Head>
			<BuilderComponent
				model="page"
				content={page || undefined}
				// locale={locale}
			/>
		</>
	);
}
