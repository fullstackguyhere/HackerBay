import results from '../.jest-test-results';
import { withTests } from '@storybook/addon-jest';
import { storiesOf } from '@storybook/react';

storiesOf('MyComponent', module)
  .addDecorator(withTests({ results }))
  .add(
    'This story shows test results from test_login.js and test_signup.js',
    () => <div>Jest results in storybook</div>,
    {
      jest: ['../__tests__/test_login.js', '../__tests__/test_signup.js'],
    }
  );