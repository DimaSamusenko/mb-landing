/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { createCache, memoryStore } from 'cache-manager';
import { getCookie, setCookie } from 'cookies-next';

import "./../../builder.config";
import {localeDefault, locales} from "@/config";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const cacheTtl = 240 * 1000;
const memoryCache = createCache(
	memoryStore({
		max: 100,
		ttl: cacheTtl,
	}),
);

function getLocale(url: string) {
	return [url.split("-"), url.split("_")]
		.map((url) => getLocaleByKey(url.at(-1)))
		.filter(Boolean)
		.pop()
}

function getLocaleByKey(key) {
	return locales[key];
}

export async function getServerSideProps({ req, res, resolvedUrl, query }) {
	const slug = ((query?.page as string[])?.join("/") || "");
	const urlLocale = getLocale(slug);

	if (cookieRedirect(req, res, query)) {
		const queryParam = getQuery(req);
		return redirectUrl("https://rbalancer.com" + queryParam);
	}

	if (query.lang) {
		const {home, group, paths} = await getPages(slug);
		const cachedData: any = await memoryCache.get(slug);
		console.log('lang cache', !!cachedData, slug);
		let page = cachedData?.page;
		if (slug.slice(-3) === `-${query.lang}`) {
			if (!page) {
				page = await getPage(slug, urlLocale);
				await memoryCache.set(slug, { page }, cacheTtl);
			}
			return { props: { page, locale: urlLocale } }
		} else if (query.lang === 'en') {
			const redirectSlug = group.find(i => i.indexOf(`-${query.lang}`) !== -1) || home;
			if (slug !== redirectSlug) {
				const queryParam = getQuery(req);
				return redirectUrl(redirectSlug + queryParam);
			}
			page = await getPage(redirectSlug, localeDefault);
			await memoryCache.set(redirectSlug, { page }, cacheTtl);
			return { props: { page, locale: localeDefault } }
		} else {
			const redirectSlug = group.find(i => i.indexOf(`-${query.lang}`) !== -1) || home;
			const queryParam = getQuery(req);
			return redirectUrl(redirectSlug + queryParam);
		}

	}

	const {home, group} = await getPages(slug);

	const acceptLanguage = req.headers['accept-language']?.slice(0, 2) || 'en';
	const redirectSlug = `${home}-${acceptLanguage}`;
	const cachedData: any = (await Promise.all([
		memoryCache.get(redirectSlug),
		memoryCache.get(home)
	])).filter(Boolean)[0] || null;
	console.log('redirectSlug cache', !!cachedData, redirectSlug);
	let page = cachedData?.page;

	if (slug === redirectSlug) {
		if (!page) {
			page = await getPage(redirectSlug, getLocaleByKey(acceptLanguage));
			await memoryCache.set(redirectSlug, { page }, cacheTtl);
		}
		return { props: { page, locale: getLocaleByKey(acceptLanguage) } }
	} else if (!group.includes(redirectSlug) && home === slug) {
		if (!page) {
			page = await getPage(home, urlLocale || localeDefault);
			await memoryCache.set(home, { page }, cacheTtl);
		}
		return { props: { page, locale: urlLocale || localeDefault } }
	} else if (!group.includes(redirectSlug)) {
		return redirectUrl(`/${home}`);
	} else {
		return redirectUrl(`/${redirectSlug}`);
	}
}

export default function Page({ page, locale }: { locale: string, page: BuilderContent | null }) {
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
				locale={locale}
			/>
		</>
	);
}

async function getPage(slug: string, locale: string) {
	return await builder
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
		.toPromise() || null;
}

async function getAllPages() {
	return await builder.getAll("page", {
		fields: "data.url",
		options: { noTargeting: true },
	});
}

function cookieRedirect(req, res, query) {
	const visited = getCookie('visited', { req, res });
	const redirect = query.redirect !== "false";
	return visited && redirect;
}

function redirectUrl(destination: string) {
	return {
		redirect: {
			permanent: true,
			destination,
		},
	}
}

async function getPages(slug) {
	const cachedPages: any = await memoryCache.get('pages');
	console.log('pages cache');
	let pages = cachedPages?.pages;
	if (!pages) {
		pages = await getAllPages();
	}
	const paths = pages.map(page => [page.data.url].flat());
	const group = paths.map((path) => {
		if (path.includes('/' + slug)) {
			return path.map(url => url.substring(1));
		}
	}).filter(Boolean).flat();
	const home = group.sort((a, b) => a.length - b.length)[0];
	await memoryCache.set('pages', { pages }, cacheTtl);
	return {
		paths,
		group,
		home
	};
}

function getQuery(req) {
	const q = req.url.split('?');
	return q[1] ? `?${q[1]}` : '';
}
