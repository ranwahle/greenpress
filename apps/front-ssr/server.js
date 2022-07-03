import fetch from 'node-fetch'
import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import FastifyDXVue from 'fastify-dx-vue'


globalThis.fetch = fetch;

globalThis.gatewayUrl = (() => {
	const protocol = process.env.GATEWAY_SERVICE_PROTOCOL || 'http';
	const url = process.env.GATEWAY_SERVICE_URL || 'localhost';
	const port = process.env.GATEWAY_SERVICE_PORT || '3000';
	return `${protocol}://${url}:${port}`;
})();

export const port = process.env.PORT || 3002;
export const host = process.env.IP || '127.0.0.1';

const server = Fastify()

await server.register(FastifyVite, {
	root: import.meta.url,
	renderer: FastifyDXVue,
})

await server.vite.ready()

await server.listen(port, host)

