import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native';
import {IPContext} from '../contexts.js';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();
  const [id,setid]=useState('');
  const {IP} = useContext(IPContext);
  const [password,setpassword]=useState('');
  const [repassword,setrepassword]=useState('');
  const signUp=()=>{
    fetch(`http://${IP}/signup?userId=${encodeURIComponent(id)}&userPs=${encodeURIComponent(password)}&userRPs=${encodeURIComponent(repassword)}`)
     .then(response => response.json())
       .then(json => {
         if(json.userId){
           alert('회원가입에 성공하셨습니다.');
           navigation.navigate('Login')
         }
         else{
            alert(json.message)
         }
         // 결과를 알림으로 표시
         
       })//navigation.navigate('MainPage')
       .catch(error => {
         console.error('Error fetching data:', error);
         alert('로그인에 실패하셨습니다.');
       });
      }
      const duplication=()=>{
        fetch(`http://${IP}/duplication?userId=${encodeURIComponent(id)}`)
         .then(response => response.json())
           .then(json => {
             
                alert(json.message)
             
             // 결과를 알림으로 표시
             
           })//navigation.navigate('MainPage')
           .catch(error => {
             console.error('Error fetching data:', error);
             alert('서버에러');
           });
          }
    return (
      <View styles={signUpStyles.body}>
      <View style={[signUpStyles.container]}>
        <View style={signUpStyles.main}>
          <TouchableOpacity style={signUpStyles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.9}>
            <Text style={{textDecorationLine: 'underline'}}>뒤로가기</Text>
          </TouchableOpacity>
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.idInput]} 
            placeholder="아이디를 입력해주세요.." 
            value={id}
            onChangeText={setid}
          />
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.passwordInput]} 
            placeholder="비밀번호를 입력해주세요.." 
            value={password}
            onChangeText={setpassword}
            secureTextEntry 
          />
          <Text style={[signUpStyles.label, signUpStyles.idLabel]}>아이디</Text>
          <TouchableOpacity style={signUpStyles.confirmBtn} onPress={()=>duplication()}>
            <Text style={[signUpStyles.checkId,{color: 'white'}]}>확인</Text>
          </TouchableOpacity>
          <Text style={[signUpStyles.label, signUpStyles.passwordLabel]}>비밀번호</Text>
          <Text style={[signUpStyles.label, signUpStyles.passwordConfirmLabel]}>비밀번호 확인</Text>
          <TextInput 
            style={[signUpStyles.inputBox, signUpStyles.passwordConfirmInput]} 
            placeholder="비밀번호를 입력해주세요.." 
            value={repassword}
            onChangeText={setrepassword}
            secureTextEntry 
          />
          <Text style={signUpStyles.title}>회원가입</Text>
            <Text style={signUpStyles.existingText}>이미 회원이신가요?</Text>
            <Text style={signUpStyles.loginText} onPress={() => navigation.navigate('Login')} activeOpacity={0.9}>로그인하기</Text>
          <TouchableOpacity style={signUpStyles.submitBtn} onPress={() => signUp()} activeOpacity={0.9}>
            <Text style={[signUpStyles.complete,{color: 'white'}]} >가입완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
}

  const signUpStyles = StyleSheet.create({
    body: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '85%',
      justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: 'white',
    },
    container: {
     
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      position: 'relative',
      width: 393,
      height: 852,
    },
    backBtn: {
      position: 'absolute',
      left: 172,
      top: 520,
      opacity: 0.80,
      textAlign: 'center',
    },
    backBtnText: {
      color: 'rgba(255, 255, 255, 0.90)',
      fontSize: 13,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      lineHeight: 22,
    },
    inputBox: {
      position: 'absolute',
      height: 45,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      paddingLeft: 10,
      justifyContent: 'center',
    },
    idInput: {
      width: 233,
      left: 34,
      top: 201,
    },
    passwordInput: {
      width: 324,
      left: 34,
      top: 280,
    },
    passwordConfirmInput: {
      width: 324,
      left: 34,
      top: 358,
    },
    input: {
      height: '100%',
      fontSize: 13,
      fontWeight: 'bold',
    },
    placeholder: {
      position: 'absolute',
      left: 12,
      top: 12,
      textAlign: 'center',
      color: 'rgba(138, 138, 138, 0.80)',
      fontSize: 13,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    label: {
      position: 'absolute',
      left: 34,
      textAlign: 'center',
      color: 'black',
      fontSize: 13,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    idLabel: {
      top: 175,
    },
    passwordLabel: {
      top: 256,
    },
    passwordConfirmLabel: {
      top: 335,
    },
    confirmBtn: {
      position: 'absolute',
      width: 81,
      height: 45,
      left: 277,
      top: 201,
      backgroundColor: 'black',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmBtnText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    title: {
      position: 'absolute',
      left: 133,
      top: 127,
      textAlign: 'center',
      color: 'black',
      fontSize: 34,
      fontWeight: 'bold',
     
    },
    existingText: {
      textAlign: 'center',
      color: '#868686',
      fontSize: 14,
      top:418,
      fontWeight: 'bold',
      lineHeight: 22,
      marginRight:70,
    },
    loginText: {
      color: '#0085FF',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 22,
      top:396,
      marginLeft:220,
    },
    submitBtn: {
      position: 'absolute',
      width: 324,
      height: 45,
      left: 34,
      top: 460,
      backgroundColor: 'black',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtnText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 22,
    },
  });