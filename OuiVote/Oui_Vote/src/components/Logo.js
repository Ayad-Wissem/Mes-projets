import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/images/Base/LogoOUI.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 203,
    height: 50,
    marginBottom: 32,
    marginTop:-82
  },
});

export default memo(Logo);
