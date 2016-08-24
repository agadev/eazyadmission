import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  main: {
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>
          Details
      </Text>
    </View>
  );
};

export default Home;
