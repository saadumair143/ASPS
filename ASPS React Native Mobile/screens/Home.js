import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { Icon,Input } from '../components';
import Teacher from "./Teacher";
import Student from "./Student";
import { AsyncStorage } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.state= {
        user_type: "",
        errors: {},
        error: '',
        errorlog: null
    }
  }
  async componentDidMount(){
    await AsyncStorage.getItem('user', async (err, result) => {
      await this.setState({user_type : result});
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.user_type=="T" && <Teacher/>}
        {this.state.user_type=="S" && <Student/>}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 15,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  }
});
