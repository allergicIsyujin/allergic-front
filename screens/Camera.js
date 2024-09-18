import React, { useState, useCallback, useContext } from 'react';
import { UserContext } from '../contexts.js';
import { IPContext } from '../contexts.js';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Footer from './components/footer.js';
import MiniCamera from './assets/img/MiniCamera.svg';
import Check from './assets/img/Check.svg';
import Btn from './components/Button.js'
export default function Camera() {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [imageUri, setImageUri] = useState(null);
    const [error, setError] = useState(null);
    const { IP } = useContext(IPContext);

    useFocusEffect(
        useCallback(() => {
            const takePhoto = async () => {
                // 카메라 권한 요청
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    setError('죄송합니다, 카메라 권한이 필요합니다.');
                    return;
                }

                // 사진 촬영
                let result = await ImagePicker.launchCameraAsync({
                    base64: false,  // Base64 데이터 비활성화
                    quality: 0.4,
                });

                if (!result.canceled) {
                    const uri = result.assets[0].uri; // URI 데이터
                    const fileName = uri.split('/').pop(); // 파일명 추출

                    // 새로운 폴더 위치 설정 (앱의 로컬 파일 시스템 내에 images 폴더)
                    const folderUri = FileSystem.documentDirectory + 'screens/assets/image/'; // 폴더 URI

                    // 폴더가 없으면 생성
                    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });

                    // 파일을 지정한 폴더로 이동
                    const newUri = folderUri + fileName;
                    await FileSystem.moveAsync({
                        from: uri,
                        to: newUri,
                    });

                    setImageUri(newUri); // 새 URI 저장
                    console.log('Image saved to:', newUri); // URI 출력
                }
            };

            takePhoto();

            return () => {
                // 정리 함수 (선택 사항)
            };
        }, [])
    );

    const navigateJnformation = () => {
        if (imageUri) {
            navigation.navigate('Jnformation', { photoUrl: imageUri });
        } else {
            setError('사진이 촬영되지 않았습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
                <Image style={styles.headerImg} source={require('./assets/cameraImg/header-img.png')} />
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                )}
                <View style={styles.buttonBox}>
                <Btn value = {"다시 촬영하기"} svg = {MiniCamera} onPress={() => navigation.goBack()} style={null}/>
                <Btn value = {"사진 사용하기"} svg = {Check} onPress={navigateJnformation} style={null}/>
                </View>
                
                <View style={styles.white}></View>
                <Footer home = {false} allergy = {false} camera = {true} record = {false}/>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    white: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 0
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    buttonBox:{
        zIndex:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        width:'90%',
        marginLeft:'5%',
        position:'absolute',
        bottom:'15%',
    
    },
    image: {
        width: '100%',
        height: '50%',
        marginTop: '10%',
    },
});
