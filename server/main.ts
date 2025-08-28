import { HttpRouter, HttpServer, HttpServerResponse } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { createServer } from 'node:http';

// https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-server

// Define the router with a single route for the root URL
const router = HttpRouter.empty.pipe(
  HttpRouter.get('/', HttpServerResponse.text('Hello World'))
);

// Set up the application server with logging
const app = router.pipe(HttpServer.serve(), HttpServer.withLogAddress);

// Specify the port
const port = 8080;

// Create a server layer with the specified port
const ServerLive = NodeHttpServer.layer(() => createServer(), { port });

// Run the application
NodeRuntime.runMain(Layer.launch(Layer.provide(app, ServerLive)));
