import React from 'react';
import { Button, StyleSheet } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { Result, useAtomValue } from '@effect-atom/atom-react';
import { sharesAtom } from '@/client/atoms';

function Shares() {
  const shares = useAtomValue(sharesAtom);
  console.log('shares from Shares', shares);
  return Result.match(shares, {
    onInitial: () => (
      <View>
        <Text>Loading...</Text>
      </View>
    ),
    onFailure: (error) => {
      console.log('error from Shares', error);
      return (
        <View>
          <Text>There was an error.</Text>
        </View>
      );
    },
    onSuccess: (success) => {
      console.log('success from Shares onSuccess', success);
      return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          {success.value.map((share) => (
            <View key={share.id}>
              <Text>{share.name}</Text>
            </View>
          ))}
        </View>
      );
    },
  });
}

export default function EditScreenInfo({ path }: { path: string }) {
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
          <Shares />
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <Button
          onPress={() => {
            // console.log('share', share);
            // getShare();
            // setShare((previous) => String(Number(previous) + 1));
          }}
          title="Test"
        />
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
