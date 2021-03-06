import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Fonts, Colors, Metrics } from '../shared/themes'
import BackButton from '../shared/components/BackButton';
import MoreButton from '../shared/components/MoreButton';

const styles = StyleSheet.create({
  icon: {
    padding: Metrics.smallMargin,
  },
  title: {
    ...Fonts.header(),
  }
});

export default function DetailHeader({ navigation }) {
  const name = navigation.getParam('name') || '';

  return ({
    headerStyle: {
      backgroundColor: Colors.main,
    },
    headerLeft: <BackButton style={styles.icon} navigation={navigation} />,
    headerTitle: <Text numberOfLines={1} style={styles.title}>{name}</Text>,
    headerRight: <MoreButton style={styles.icon} onPress={navigation.toggleDrawer} />,
  });
}
