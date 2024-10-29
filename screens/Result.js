import React, { useContext } from 'react';
import { UserContext } from '../contexts.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import Footer from './components/footer.js'
import SearchSvg from './assets/img/MiniSearch.svg';
import MiniCamera from './assets/img/MiniCamera.svg';

export default function Result() {
  const route = useRoute();
  const { foodList, foodId } = route.params || {};
  const { userId } = useContext(UserContext);
  const navigation = useNavigation();

  // 식품 ID로 상세정보 찾기
  const foodDetail = foodList.find(item => item.id === foodId) || {};
  const { description = [], ingredient = [], image, name, backgroundColor } = foodDetail;

  // 결과 화면에서 보여줄 음식의 설명을 포함된 알러지 재료가 빨간색으로 표시할 수 있도록 스타일링
  const getDescriptionStyle = (desc) => {
    console.log( ingredient)
    return ingredient.includes(desc) ? styles.allergyRed : styles.allergy;
  };
   let back=foodList[foodId-1].backgroundColor
  // backgroundColor가 배열이 아닌 경우 처리
  
  console.log(foodId)
  return (
    <View style={styles.container}>
      <LinearGradient colors={[back,back]} style={styles.gradient}>
        <View>
          <Image style={styles.headerImg} source={require('./assets/recordImg/header-img.png')} />
          <Text style={styles.title}>음식 정보</Text>
        </View>
        <View style={styles.main}>
          <Image source={{ uri: image }} style={styles.foodImg} />
          <View style={styles.foodBox}>
            <Text style={styles.foodName}>{name}</Text>
            <ScrollView contentContainerStyle={styles.foodData}>
              {description?description.map((desc, index) => (
                <Text key={index} style={getDescriptionStyle(desc)}>
                  {desc}
                </Text>
              )):<Text>재료없음</Text>}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
            <MiniCamera />
            <Text style={styles.buttonText}>요리 촬영하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
            <SearchSvg />
            <Text style={styles.buttonText}>요리 검색하기</Text>
          </TouchableOpacity>
        </View>
        <Footer home = {false} allergy = {false} camera = {false} record = {true}/>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
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
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    position: 'absolute',
    top: 85,
    left: 135,
    fontWeight: '700',
  },
  main: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 80,
    height: 650,
    overflow: 'hidden',
  },
  foodImg: {
    width: '100%',
    height: 380,
  },
  foodData: {
    flexDirection: 'row',
    width: 350,
    flexWrap: 'wrap',
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
  },
  allergy: {
    marginTop: 8,
    marginRight: 8,
  },
  allergyRed: {
    marginTop: 8,
    marginRight: 8,
    color: 'red',
  },
  foodBox: {
    width: '98%',
    marginLeft: 20,
    marginTop: 20,
  },
  button1: {
    position: 'absolute',
    left: 30,
    bottom: 110,
    width: 150,
    padding: 10,
    backgroundColor: '#0075FF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  button2: {
    position: 'absolute',
    left: 190,
    bottom: 110,
    width: 150,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#0075FF',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10,
  },
});