import {
  AtomHttpApi,
  Result,
  useAtomSet,
  useAtomValue,
} from '@effect-atom/atom-react';
import * as FetchHttpClient from '@effect/platform/FetchHttpClient';
import * as HttpApi from '@effect/platform/HttpApi';
import * as HttpApiEndpoint from '@effect/platform/HttpApiEndpoint';
import * as HttpApiGroup from '@effect/platform/HttpApiGroup';
import * as Effect from 'effect/Effect';
import * as Schema from 'effect/Schema';

// https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-client

// Define your api
class Api extends HttpApi.make('api').add(
  // HttpApiGroup.make("share").add(
  //   HttpApiEndpoint.get("share", "/share").addSuccess(Schema.Number)
  // ).add(
  //   HttpApiEndpoint.post("share", "/share")
  // ).add(
  //   HttpApiEndpoint.patch("share", "/share")
  // ).add(
  //   HttpApiEndpoint.del("share", "/share")
  // )
  HttpApiGroup.make('test').add(
    HttpApiEndpoint.get('root', '/').addSuccess(Schema.String)
  )
) {}

// Use AtomHttpApi.Tag to create a special Context.Tag that builds the client
export class BottleClient extends AtomHttpApi.Tag<BottleClient>()(
  'BottleClient',
  {
    api: Api,
    // Provide a Layer that provides the HttpClient
    httpClient: FetchHttpClient.layer,
    baseUrl: 'http://localhost:3000',
  }
) {}
