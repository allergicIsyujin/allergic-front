import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts.js'; // 유저 정보를 관리하는 컨텍스트
import { IPContext } from '../contexts.js'; // 서버 IP 주소를 관리하는 컨텍스트
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TouchableWithoutFeedback } from 'react-native'; // React Native에서 사용하는 기본 컴포넌트
import { LinearGradient } from 'expo-linear-gradient'; // 그라데이션 배경을 위한 컴포넌트
import { useNavigation, useRoute } from '@react-navigation/native'; // 네비게이션을 위한 훅

import Footer from './components/footer.js'
import MiniCamera from './assets/img/MiniCamera.svg';
import RecordSave from './assets/img/RecordSave.svg';
import Loading from './roading.js';
import BigYes from './assets/img/bigYes.svg';
import BigNo from './assets/img/bigNo.svg';

export default function Jnformation() {
    const navigation = useNavigation(); // 네비게이션 객체를 가져옴
    const { userId } = useContext(UserContext); // 유저 ID를 가져옴
    const { IP } = useContext(IPContext); // 서버 IP 주소를 가져옴
    const route = useRoute(); // 현재 라우트 정보를 가져옴
    const { photoUrl } = route.params || {}; // 이전 화면에서 전달된 이미지 URL을 가져옴
    const [foodName, setFoodName] = useState("치킨"); // 음식 이름 상태 (기본값: 치킨)
    const [backgroundColor, setBackgroundColor] = useState(1); // 배경색 상태 (1: 초록색-파란색, 0: 빨간색)
    const [descriptions, setDescriptions] = useState([]); // 재료 목록 상태
    const [notIngredients, setNotIngredients] = useState([]); // 제외 재료 목록 상태
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        // 이미지 URL을 base64로 변환하는 함수
        const getBase64 = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1]; // base64 부분 추출
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };

        // 데이터 가져오기
        const fetchData = async () => {
            if (photoUrl) {
                try {
                    const base64Image = await getBase64(photoUrl); // 이미지 URL을 base64로 변환
                    const response = await fetch(`http://${IP}/image/base64`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userid: userId,
                            imageUrl: photoUrl,
                            food: base64Image, // base64 이미지 포함
                        }),
                    });
                    const json = await response.json();
                    console.log(json)
                    setFoodName(json.result.foodName); // 음식 이름 설정
                    console.log(foodName)
                    // "ok" 값에 따라 배경색 설정
                    if (json.result.ok === "O") {
                        setBackgroundColor(1);
                    } else {
                        setBackgroundColor(0);
                    }

                    // 재료 목록과 제외 재료 목록 설정
                    const updatedDescriptions = json.result.ingredients.map((ingredient, index) => ({
                        id: index + 1, // 고유 ID 부여
                        name: ingredient,
                    }));

                    setDescriptions(updatedDescriptions); // 재료 목록 업데이트
                    setNotIngredients(json.result.notIngredients || []); // 제외 재료 목록 업데이트, 기본값은 빈 배열
                } catch (error) {
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                    alert('데이터를 가져오는 데 실패했습니다.'); // 오류 시 알림 표시
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [photoUrl, IP, userId]); // photoUrl, IP, userId가 변경될 때마다 이 효과 실행

    const save = () => {
        // 이미지를 서버에 저장 요청
        fetch(`http://${IP}/image/saveImage?userId=${encodeURIComponent(userId)}`)
            .then(response => response.json())
            .then(json => {
                navigation.navigate('Record');
            })
            .catch(error => {
                console.error('이미지 저장 중 오류 발생:', error);
                alert('이미지 저장에 실패했습니다.'); // 오류 시 알림 표시
            });
    };

    const goToRecord = () => {
        const data = [
            {
                image: photoUrl,
                description: descriptions,
                foodName: foodName,
                backgroundColor: backgroundColor,
            },
        ];

        navigation.navigate('Record', { data }); // Record 화면으로 데이터 전달 후 이동
    };

    const showModal = () => { // 알러지 추가하기를 눌렀을 때 검은 화면 보여주기
        setIsModalVisible(true);
    };

    const hideModal = () => { // 검은 화면 숨기기
        setIsModalVisible(false);
    };

    if (loading) {
        return <Loading style={styles.view} />;
    }

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={showModal}
                animationType="fade"
            >
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.darkOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalContent, { backgroundColor: backgroundColor ? '#51CE54' : '#FF4444' }]}>
                                {backgroundColor ?
                                    (<View style={styles.IconBox}>
                                        <BigYes />
                                        <Text style={styles.modalText}>드셔도 괜찮아요!</Text>
                                        <View>
                                            <Text style={styles.text}>많이 사용되는 레시피를 기준으로 만들었습니다</Text>
                                            <Text style={styles.text}>좀더 상세히 검색 후 안전하게 드세요</Text>
                                        </View>
                                    </View>) :
                                    (<View style={styles.IconBox}>
                                        <BigNo  />
                                        <Text style={styles.modalText}>먹으면 위험해요!</Text>
                                        <View>
                                            <Text style={styles.text}>많이 사용되는 레시피를 기준으로 만들었습니다</Text>
                                            <Text style={styles.text}>좀더 상세히 검색 후 안전하게 드세요</Text>
                                        </View>
                                    </View>)
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <LinearGradient
                colors={backgroundColor === 1 ? ['#51CE54', '#0D7FFB'] : ['#FF4444', '#FF4444']}
                style={styles.gradient}
            >
                <View>
                    <Image style={styles.headerImg} source={require('./assets/cameraImg/header-img.png')} />
                    <Text style={styles.title}>음식 정보</Text>
                </View>
                <View style={styles.main}>
                    {photoUrl ? (
                        <Image source={{ uri: photoUrl }} style={styles.foodImg} />
                    ) : (
                        <Text>사진이 없습니다</Text>
                    )}
                    <View style={styles.foodBox}>
                        <Text style={styles.foodName}>{foodName}</Text>
                        <View style={styles.foodData}>
                            {/* 재료 목록 표시, notIngredients에 포함된 재료는 빨간색으로 표시 */}
                            {descriptions.map((item) => (
                                <Text
                                    key={item.id}
                                    style={[
                                        styles.allergy,
                                        notIngredients.includes(item.name) && { color: 'red' } // notIngredients가 포함된 경우 빨간색으로 표시
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={() => navigation.goBack()} // 이전 화면으로 이동
                        activeOpacity={0.9}
                    >
                        <MiniCamera />
                        <Text style={styles.buttonText}>다시 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => save()}>
                        <RecordSave />
                        <Text style={styles.buttonText}>기록 저장하기</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <Footer home = {false} allergy = {false} camera = {true} record = {false}/>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    darkOverlay: {
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        width:'78%',
        height: '30%',
        flexDirection: 'column',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center'
      },
      modalText: {
        color:'white',
        marginTop: '11%',
        marginBottom: '8%',
        fontSize: 22,
        fontWeight: '700',
      },
      text:{
        color:'white',
        textAlign:'center'
      },
      title: {
        color: '#FFFFFF',
        fontSize: 25,
        position: 'absolute',
        top: '60%',
        left: '38.5%',
        fontWeight: '700',
      },
      IconBox:{
        alignItems:'center',
      },
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    headerImg: {
        width: '100%',
        resizeMode: 'cover',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white',
        borderTopRightRadius:80
    },
    foodImg: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        borderTopRightRadius:80
    },
    foodBox: {
        zIndex:10,
        width:'88%',
    },
    foodName: {
        marginTop: '3%',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: '3%',
    },
    foodData: {
        marginTop: '3%',
    },
    allergy: {
        fontSize: 16,
        color: 'black',
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
    button1: {
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    button2: {
        width: 150,
        padding: 10,
        backgroundColor: '#0075FF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    image: {
        width: '100%',
        height: '50%',
        marginTop: '10%',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
