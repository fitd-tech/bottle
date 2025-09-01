import { bottleBackendUrl } from '@/constants/General';
import { bottleApi } from '@/server/api';
import { AtomHttpApi } from '@effect-atom/atom-react';
import { FetchHttpClient } from '@effect/platform';

// https://github.com/Effect-TS/effect/blob/main/packages/platform/README.md#http-client

// DERIVED CLIENT
export class BottleApiClient extends AtomHttpApi.Tag<BottleApiClient>()(
  'BottleApiClient',
  {
    api: bottleApi,
    httpClient: FetchHttpClient.layer,
    baseUrl: bottleBackendUrl,
  }
) {}
