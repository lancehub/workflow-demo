import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';
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

export const tree = new Tree({
  id: 1,
  name: 'Root',
  children: [],
});
