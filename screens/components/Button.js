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
        flexDirection: 'row',           
        justifyContent: 'space-around',  
        alignItems: 'center',           
        width: 150,                      
        height: 50,                      
        backgroundColor: '#0D7FFB',      
        borderRadius: 10,                
        paddingHorizontal: 10,
      },
      ButtonText:{
        fontSize:16,
        fontWeight:'600',
        color:'white'
      },
})