import * as React from 'react';
import { render } from '@testing-library/react-native';
import { test, expect } from '@jest/globals';

import { MonoText } from '../StyledText';

test(`renders correctly`, () => {
  const tree = render(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
