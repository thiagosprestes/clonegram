import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Profile from '..';

const buttonStories = storiesOf('Profile', module);

buttonStories.add('default view', () => <Profile />);
