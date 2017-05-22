import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { create } from 'mobx-persist';
import localForage from 'localforage';
import Tree from './Tree';

useStrict(true);

if (process.env.NODE_ENV !== 'production') {
  enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false,
    predicate: () => true,
  });
}

const hydrate = create({ storage: localForage });

export const tree = new Tree({
	id: 1,
	name: 'Root',
	children: []
});
