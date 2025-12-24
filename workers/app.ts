import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		
		// Handle /reflect endpoint
		if (url.pathname === '/reflect' && request.method === 'POST') {
			const { handleReflect } = await import('./reflect');
			return handleReflect(request, env, ctx);
		}
		
		// Handle React Router app
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
} satisfies ExportedHandler<Env>;