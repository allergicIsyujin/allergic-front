import { StyleSheet, Text, View, BackHandler, ImageBackground, Modal, TextInput, Platform,  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import HomeG from '../assets/img/HomeG.svg'
import CameraG from '../assets/img/CameraG.svg';
import CheckSquareG from'../assets/img/CheckSquareG.svg'
import RecordG from'../assets/img/RecordG.svg'
import Home from '../assets/img/Home.svg';
import CheckSquare from'../assets/img/CheckSquare.svg'
import Camera from'../assets/img/Camera.svg'
import Record from'../assets/img/Record.svg'
import { useNavigation } from '@react-navigation/native';


export default function footer(props){
  const navigation = useNavigation();
    return(
        <View style={styles.footer}>
        <View style={styles.footerBar}>
        <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            {props.home ? <HomeG style={styles.icon} /> : <Home style={styles.icon} />}
            <Text style={styles[props.home ? 'selectText' : 'footerCenter']}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
            {props.allergy ? <CheckSquareG style = {styles.icon} /> : <CheckSquare style={styles.icon} />}
            <Text style={styles[props.allergy ? 'selectText' : 'footerCenter']}>알러지 등록</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            {props.camera ? <CameraG style= {styles.icon} /> :  <Camera style={styles.icon} />}
            <Text style={styles[props.camera ? 'selectText' : 'footerCenter']}>알러지 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
            {props.record ? <RecordG style = {styles.icon} /> :<Record style={styles.icon} />}
            <Text style={styles[props.record ? 'selectText' : 'footerCenter']}>기록</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  footerBar: {
    width: '98%',
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:'1%'
  },
  footerCenter: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  footerText:{
    color:'#757575',
    fontWeight:'500'
  },
  selectText:{
    color:'#51CE54',
    fontWeight:'500'
  }
})