import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts.js';
import {IPContext} from '../contexts.js';

import { Text, View, StyleSheet, TouchableOpacity,Dimensions, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import PlusSquare from'./assets/img/PlusSquare.svg'
import Footer from './components/footer.js'
import Arrow_back from './assets/img/arrow_back.svg'
import LogoSvg from './assets/img/logo.svg';
import Btn from './components/Button.js'

const { width, height } = Dimensions.get('window');

export default function MyAllergy({ navigation }) {
  const route = useRoute(); //useRoute로 등록했던 알러지정보들을 받아옴.
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const { userId } = useContext(UserContext);
  const {IP} = useContext(IPContext);
  // const { selectedAllergies = [] } = route.params || {}; //selectedAllergies 에 선택한 알러지들을 저장
  const images = [ //기본알러지들의 아이디, 이름, 파란아이콘, 선택됐을때 아이콘(흰색)으로 구성해서 DB에 저장해야함.
    // { name: '계란', image: require('./assets/addAllergyImg/friedEggswhite.png') },
    // { name: '밀가루', image: require('./assets/addAllergyImg/loafBreadwhite.png') },
    // { name: '우유', image: require('./assets/addAllergyImg/jarwhite.png') },
    // { name: '닭고기', image: require('./assets/addAllergyImg/meat3white.png') },
    // { name: '돼지고기', image: require('./assets/addAllergyImg/meat2white.png') },
    // { name: '견과류', image: require('./assets/addAllergyImg/nutswhite.png') },
    // { name: '새우', image: require('./assets/addAllergyImg/shrimpwhite.png') },
    // { name: '해산물', image: require('./assets/addAllergyImg/fish1white.png') },
    // { name: '생선', image: require('./assets/addAllergyImg/fishwhite.png') },
    // { name: '포도', image: require('./assets/addAllergyImg/grapewhite.png') },
    // { name: '바나나', image: require('./assets/addAllergyImg/bananawhite.png') },
    // { name: '사과', image: require('./assets/addAllergyImg/applewhite.png') },
    { name: '계란', image: require('./assets/addAllergyImg/friedEggswhite.png') },
    { name: '밀', image: require('./assets/addAllergyImg/meal_white.png') },
    { name: "우유", image: require('./assets/addAllergyImg/Milk_white.png') },
    { name: '닭고기', image: require('./assets/addAllergyImg/meat3white.png') },
    { name: '돼지고기', image: require('./assets/addAllergyImg/Pork_white.png') },
    { name: '견과류', image: require('./assets/addAllergyImg/nutswhite.png') },
    { name: '새우', image: require('./assets/addAllergyImg/shrimpwhite.png') },
    { name: '오징어', image: require('./assets/addAllergyImg/Squid_white.png') },
    { name: '고등어', image: require('./assets/addAllergyImg/bluefish_white.png') },
    { name: '게', image: require('./assets/addAllergyImg/Crab_white.png') },
    { name: '조개', image: require('./assets/addAllergyImg/shel_white.png') },
    { name: '복숭아', image: require('./assets/addAllergyImg/Peach_white.png') },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respond = await fetch(`http://${IP}/allergy/myAllergy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });

        const result = await respond.json();
        const allergies = result.map((value, index) => {
          const allergyImage = images.find(i => i.name === value)?.image || require('./assets/addAllergyImg/foodIconwhite.png');
          return {
            id: index,
            selectedImage: allergyImage,
            name: value,
          };
        });

        setSelectedAllergies(allergies);
      } catch (error) {
        console.error(error);
        alert('알러지 수정에 실패하였습니다.');
      }
    };

    fetchData();
  });
  return (
    <View style={styles.container}>
    <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
    <View>
      
          <Image source={require('./assets/myAllergyImg/header-img.png')} style = {styles.headerImg}></Image>
          <View style = {styles.logo}>
            <LogoSvg />
            <Text style = {styles.h2Text}>자신의 알러지</Text>
          </View>
        </View>
        <View style={styles.main}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // 이전 페이지로 이동
          activeOpacity={0.9}
        >
          <Arrow_back style={styles.mainImg} ></Arrow_back>
          </TouchableOpacity>

          <Text style={styles.mainText}>자신의 알러지를 관리하여{'\n'}안전하고 맛있는 식사를 하세요.</Text>  
          <Text style = {styles.pText}>언제든지 알러지를 추가할 수 있어요.</Text>
          <ScrollView contentContainerStyle={styles.scrollView} style={styles.myAllergyList} //ScrollView로 알러지가 화면을 초과해도 스크롤되게
          > 
          {selectedAllergies.length > 0 ? ( //전달된 등록된 알러지가 0보다 크다면 map함수를 이용해서 알러지들을 생성 selectedAllergies 이친구를 생성될때마다 DB에 저장시켜야할듯 알러지 id, img-icon, name 정도?
              selectedAllergies.map(allergy => (
                <View key={allergy.id} style={styles.myAllergy}>
                  <Image source={allergy.selectedImage} />
                  <Text style={styles.allergyName}>{allergy.name}</Text>
                </View>
              ))
            ) : (
              <Text>알러지 정보가 없습니다.</Text>
            )}
            

            </ScrollView>
            <Btn value = {"알러지 추가하기"} svg = {PlusSquare} onPress={() => navigation.navigate("AddAllergy")} style={styles.addAllergy}/>
        </View>
        <Footer home = {false} allergy = {true} camera = {false} record = {false}/>
    </LinearGradient>
  </View>
);
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      gradient: {
        width:'100%',
        height:'100%'
      },
      headerImg: {
        width:'100%',
      },
      logo :{
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        color: 'white',
        width: 230,
        justifyContent: 'space-around',
        marginBottom: '3%',
      },
      h2Text:{
        color:'white',
        fontSize:24,
        fontWeight: '800'
      },
      main:{
        backgroundColor: 'white', // 배경색 흰색
        borderTopRightRadius: 80, // 오른쪽 위 모서리 둥글게
        width:'100%', // 너비 360px
        height:height*0.5,
      },
      mainImg:{
        marginVertical: '3%', // 위아래 여백 10px
        marginHorizontal: '5%', // 좌우 여백 20px
      },
      mainText:{
        fontSize: 20, // 폰트 크기 20px
        marginLeft: '5%', // 왼쪽 여백 10px
        fontWeight: '700'
      },
      pText : {
        marginVertical: '2%', // 위아래 여백 10px
        marginLeft: '5%',
        marginBottom:'3%',
        fontSize: 14, // 폰트 크기 14px
        color: '#757575', // 텍스트 색상
      },
      myAllergyList:{
        width:'95%', // 너비 340px
        marginHorizontal: 'auto', // 수평 중앙 정렬
        flexWrap: 'wrap', // 자식 요소들을 래핑
        flexDirection: 'row', // 자식 요소들을 수평으로 배치
        marginLeft: '3%',
        flex: 1,
        
      },
      scrollView: {
        width:'100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '4%',
      },
      allergyName:{
        color:'white',
        fontSize: 16,
        fontWeight: '600',
      },
      myAllergy:{
        marginRight: '3%', // 오른쪽 여백 10px
        marginBottom: '3%', // 아래쪽 여백 10px
        backgroundColor: '#FF4444', // 배경색 빨간색
        width: '30%', // 너비 100px
        height: '50%', // 높이 90px
        borderRadius: 10, // 모서리 둥글게 10px
        flexDirection: 'column', // 자식 요소를 수직으로 배치
        alignItems: 'center', // 자식 요소를 수평으로 중앙 정렬
        justifyContent: 'space-around', // 자식 요소들 사이에 균등한 여백 추가
      },
      addAllergy:{
        position: 'absolute', // 절대 위치 지정
        bottom: '10%', // 화면 하단에서 100px
        left: '31%', // 화면 왼쪽에서 90px
      },
});
