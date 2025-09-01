import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
} from '@effect/platform';
import { Brand, Schema } from 'effect';

export type ShareId = number & Brand.Brand<'ShareId'>;

// interface SharePayload {
//   readonly id: number;
//   readonly name: string;
//   // readonly createdAt: string;
// }

export const Share = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  // createdAt: Schema.DateTimeUtc,
});

export class ShareNotFound extends Schema.TaggedError<ShareNotFound>()(
  'ShareNotFound',
  {}
) {}

export const Shares = Schema.Array(Share);

const idParam = HttpApiSchema.param('id', Schema.NumberFromString);

const sharesGroup = HttpApiGroup.make('shares')
  .add(HttpApiEndpoint.get('getShares')`/`.addSuccess(Shares))
  .add(HttpApiEndpoint.get('getShare')`/${idParam}`.addSuccess(Share))
  .addError(ShareNotFound, { status: 404 })
  .prefix('/share');

export const bottleApi = HttpApi.make('bottleApi').add(sharesGroup);
