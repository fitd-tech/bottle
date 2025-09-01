import {
  HttpApiBuilder,
  HttpApiSwagger,
  HttpMiddleware,
  HttpServer,
} from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Effect, Layer } from 'effect';
import { createServer } from 'node:http';
import { bottleApi, ShareNotFound } from './api.js';

const shares = [
  {
    id: 1,
    name: 'OMG HAHA',
    // createdAt: DateTime.unsafeNow(),
  },
  {
    id: 2,
    name: 'OMEGALUL',
    // createdAt: DateTime.unsafeNow(),
  },
  {
    id: 3,
    name: 'ROFLCOPTER',
    // createdAt: DateTime.unsafeNow(),
  },
];

// https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-server

// API SERVER

// class LoggerError extends Schema.TaggedError<LoggerError>()(
//   'LoggerError',
//   {}
// ) {}

// class Logger extends HttpApiMiddleware.Tag<Logger>()(
// 'Http/Logger'
// {
// Optionally define the error schema for the middleware
// failure: LoggerError
// }
// ) {}

// const LoggerLive = Layer.effect(
//   Logger,
//   Effect.gen(function* () {
//     yield* Effect.log('creating Logger middleware');

//     // Middleware implementation as an Effect
//     // that can access the `HttpServerRequest` context.
//     return Effect.gen(function* () {
//       const request = yield* HttpServerRequest.HttpServerRequest;
//       yield* Effect.log(`Request: ${request.method} ${request.url}`);
//     });
//   })
// );

const usersGroupLive = HttpApiBuilder.group(bottleApi, 'shares', (handlers) =>
  handlers
    .handle('getShares', () => {
      console.log('called getShares handler');
      return Effect.succeed(shares);
    })
    .handle('getShare', ({ path: { id } }) => {
      console.log('called getShare handler');
      const existing = shares.find((share) => share.id === id);
      console.log('existing from getShare handler', existing);
      if (existing === undefined) {
        return Effect.fail(new ShareNotFound());
      }
      return Effect.succeed(existing);
    })
); // .pipe(Layer.provide(LoggerLive));

const BottleApiLive = HttpApiBuilder.api(bottleApi).pipe(
  Layer.provide(usersGroupLive)
);

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiSwagger.layer()),
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(BottleApiLive),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 8080 }))
);

Layer.launch(HttpLive).pipe(NodeRuntime.runMain);
