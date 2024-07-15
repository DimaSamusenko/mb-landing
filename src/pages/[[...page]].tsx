/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";
import "./../../builder.config";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = await builder
		.get("page", {
			userAttributes: {
				urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
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

			<BuilderComponent model="page" content={page || undefined} />
		</>
	);
}
