import React from 'react';
import { Alert,Text, View, StyleSheet, Image, TouchableOpacity, BackHandler, ScrollView, FlatList} from 'react-native';

import { Images, nowTheme } from '../constants/';

class TeacherHome extends React.Component { 

      constructor(props){
        super(props);
        
        this.state ={
            products : [],
            product_id: ''
        }

    }
    
    render() {
        return (
            <View style={styles.container}>
                    <View >
                        <View style= {{flex: 1, flexDirection: 'row',marginTop: 75 }}>
                            <View style = {{marginTop: '10%', marginLeft: '5%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Students')} 
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.StudentIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Students
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                            <View style = {{marginTop: '10%', marginLeft: '10%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Quizes')}
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.QuizIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Quizes
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                        </View>
                        <View style= {{flex: 1, flexDirection: 'row',marginTop: 1 }}>
                            <View style = {{marginTop: '10%', marginLeft: '5%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Assignments')} 
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.AssignmentIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Assignments
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                            <View style = {{marginTop: '10%', marginLeft: '10%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Lectures')}
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.LectureIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Lectures
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                        </View>
                        <View style= {{flex: 1, flexDirection: 'row',marginTop: 1 }}>
                            <View style = {{marginTop: '10%', marginLeft: '5%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Sessionals')} 
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.SessionalIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Sessionals
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                            <View style = {{marginTop: '10%', marginLeft: '10%', width: '40%'}}>
                                <TouchableOpacity onPress={()=> Alert.alert('Profile')}
                                    style= {{position: 'absolute', alignSelf:'center'}}>
                                    <Image 
                                        style= {{width: 100, height: 100 }}
                                        source= {Images.ProfileIcon}/>

                                    <Text style={{alignSelf:'center', color: '#f96331', fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                                        Profile
                                    </Text>
                                </TouchableOpacity>   
                            </View>
                        </View>

                    </View>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50a4fc',
        height: "100%",
     },

    top: {
       // flex: 1,
       // flexDirection: 'horizontal',
        marginTop: '1%',
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        //color: 'white',
        backgroundColor: 'skyblue',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderStyle: 'solid'
    },

    header : {
        backgroundColor: 'skyblue',
       // float: 'top',
      //  flex: 1,
      //  justifyContent: 'center',
     //   alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        fontSize: 30,
       // height: "10%",
        color: 'white'
    },

    item: {
        padding: 10,
        height: 150,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        fontWeight: 'bold'
      }
    
});
export default TeacherHome;