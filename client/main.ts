import { bottleBackendUrl } from '@/constants/General';
import { bottleApi } from '@/server/api';
import { AtomHttpApi } from '@effect-atom/atom-react';
import { FetchHttpClient } from '@effect/platform';
import { Layer } from 'effect';

// https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-client

const CustomFetchLive = FetchHttpClient.layer.pipe(
  Layer.provide(
    Layer.succeed(FetchHttpClient.RequestInit, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    })
  )
);

// DERIVED CLIENT
export class BottleApiClient extends AtomHttpApi.Tag<BottleApiClient>()(
  'BottleApiClient',
  {
    api: bottleApi,
    httpClient: CustomFetchLive, // FetchHttpClient.layer,
    baseUrl: bottleBackendUrl,
  }
) {}
