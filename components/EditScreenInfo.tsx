import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { bottleBackendUrl } from '@/constants/General';

export default function EditScreenInfo({ path }: { path: string }) {
  const [test, setTest] = useState('');

  async function handleClickTest() {
    console.log('called handleClickTest');
    try {
      const response = await fetch(`${bottleBackendUrl}/`);
      console.log('response', response);
      if (!response.ok) {
        const error = await response.text();
        console.log('error in response', `${response.status}: ${error}`);
        return;
      }

      const responseBody = await response.text();
      console.log('responseBody', responseBody);
      setTest(responseBody);
    } catch (error) {
      const _error = error as unknown as Error;
      console.log('error in fetch', _error.message);
    }
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          {test}
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <Button onPress={handleClickTest} title="Test" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
