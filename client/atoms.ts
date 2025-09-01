import { Atom, Result } from '@effect-atom/atom-react';
import { Array, Data, Effect } from 'effect';
import { BottleApiClient } from './main';
import { ShareId, Share } from '@/server/api';
import { makeAtomRuntime } from './runtime';

const sharesAtomRuntime = makeAtomRuntime(BottleApiClient.layer);

const remoteSharesAtom = sharesAtomRuntime.atom(
  Effect.fn(function* () {
    const client = yield* BottleApiClient;
    console.log('client from remoteSharesAtom', client);
    const shares = yield* client.shares.getShares();
    console.log('shares from remoteSharesAtom', shares);
    return shares;
  })
);

type Action = Data.TaggedEnum<{
  Upsert: {
    share: typeof Share.Type;
  };
  Del: {
    id: ShareId;
  };
}>;
const Action = Data.taggedEnum<Action>();

export const sharesAtom = Atom.writable(
  (get: Atom.Context) => {
    const shares = get(remoteSharesAtom);
    console.log('shares from sharesAtom', shares);
    return shares;
  },
  (ctx, action: Action) => {
    const result = ctx.get(sharesAtom);
    if (Result.isResult(result) && !Result.isSuccess(result)) {
      console.log('Error from sharesAtom: type is not a Result');
      return;
    }
    const update = Action.$match(action, {
      Del: ({ id }) => result.value.filter((share) => share.id !== id),
      Upsert: ({ share }) => {
        const existing = result.value.find((_share) => _share.id === share.id);
        if (existing) {
          return result.value.map((_share) =>
            _share.id === share.id ? share : _share
          );
        }
        return Array.prepend(result.value, share);
      },
    });

    ctx.setSelf(Result.success(update));
  }
);
