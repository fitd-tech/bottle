import { Atom } from '@effect-atom/atom-react';
import { Layer, Logger, LogLevel } from 'effect';

export const makeAtomRuntime = Atom.context({ memoMap: Atom.defaultMemoMap });

makeAtomRuntime.addGlobalLayer(
  Layer.mergeAll(Logger.pretty, Logger.minimumLogLevel(LogLevel.Debug))
);
