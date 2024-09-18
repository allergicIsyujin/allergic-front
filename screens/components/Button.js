import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Btn(props){
    const Svg = props.svg
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress} activeOpacity={0.9}>
             <Svg  />
            <Text style={styles.ButtonText}>{props.value}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',            // 가로 정렬
        justifyContent: 'space-around',  // 공간을 균등하게 분배
        alignItems: 'center',            // 중앙 정렬
        width: 150,                      // 너비 130px
        height: 50,                      // 높이 50px
        backgroundColor: '#0D7FFB',      // 배경색 파란색
        borderRadius: 10,                // 둥근 모서리 10px
        paddingHorizontal: 10,
      },
      ButtonText:{
        fontSize:16,
        fontWeight:'600',
        color:'white'
      },
})