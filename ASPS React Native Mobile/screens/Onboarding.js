import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { Icon,Input } from '../components';
import SwitchSelector from "react-native-switch-selector";
import { AsyncStorage } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default class Onboarding extends React.Component {

  constructor(props){
    super(props);

    this.state= {
        roll_number: '',
        password: '',
        user_type: 'T',
        errors: {},
        error: '',
        errorlog: null
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.NowLogo} style={{ width: 150, height: 150,borderRadius: 80, borderWidth: 0, bottom: 50, position: 'absolute' }} />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular', bottom: 10, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                    }}
                    color="white"
                    size={44}
                  >
                    ASPS
                  </Text>
                </Block>
              </Block>
              {!!this.state.errorlog && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{this.state.errorlog}</Text>)}
              {!!this.state.error && ( <Text style={{ color: "red" , alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>{this.state.error}</Text>)}
              <Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                  <Input
                    placeholder="Student/Teacher Id"
                    onChangeText= {(val)=>this.setState({roll_number: (val), error: null, errorlog: null})}
                    style={styles.inputs}
                    iconContent={
                      <Icon size={16}
                        color="#ADB5BD"
                        name="profile-circle"
                        family="NowExtra"
                        style={styles.inputIcons}
                      />
                      }
                      />
                </Block>
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                <Input placeholder="Password"
                  style={styles.inputs}
                  password={true}
                  onChangeText= {(val)=>this.setState({password: (val), error: null, errorlog: null})}
                  iconContent={
                    <Icon size={16}
                      color="#ADB5BD"
                      name="key-252x"
                      family="NowExtra"
                      style={styles.inputIcons}
                    />
                    }
                    />
              </Block>
              <Block width={width * 0.8}>
                <SwitchSelector
                    initial={0}
                    onPress={value => this.setState({ user_type : value, error: null, errorlog: null })}
                    textColor={"#7B7B7B"}
                    selectedColor={"#FFFFFF"}
                    buttonColor={nowTheme.COLORS.PRIMARY}
                    borderColor={"#5DA2FF"}
                    hasPadding
                    options={[
                      { label: "Teacher", value: "T"},
                      { label: "Student", value: "S"}
                    ]}
                    testID="gender-switch-selector"
                    accessibilityLabel="gender-switch-selector"
                  />
              </Block>
              <Block middle
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => {
                    AsyncStorage.setItem('user',
                     this.state.user_type
                    );
                    //this.props.navigation.navigate('App')
                    if (this.state.roll_number.trim()=== "" || this.state.password.trim() === "" ) {
                        this.setState(() => ({ error: "All Fields Are Required" }));
                      }else if(this.state.roll_number.length != 12){
                        this.setState(() => ({ error: "Roll No. have 11 letters." }));
                      }else{
                        if(this.state.roll_number=="teacher12345" && this.state.password=="teacher" && this.state.user_type=="T"){
                          this.props.navigation.navigate('App', { user: this.state.user_type })  
                        }else if(this.state.roll_number=="student12345" && this.state.password=="student" && this.state.user_type=="S"){
                          this.props.navigation.navigate('App', { user: this.state.user_type })
                        }else{
                          this.setState(() => ({ error: "Invalid credentials!" }));
                        }
                      }
                    }
                  }
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Log in
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
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
