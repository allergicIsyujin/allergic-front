import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from '../contexts.js';
import {IPContext} from '../contexts.js';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TurboModuleRegistry } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import Footer from './components/footer.js'
import Arrow_back from './assets/img/arrow_back.svg'

export default function Record() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};
  const {userId}=useContext(UserContext)
  const {IP} = useContext(IPContext);
  
  const [foodList, setfoodList] = useState([]);
  let a=0;
  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    fetch(`http://${IP}/foodRecord?userid=${encodeURIComponent(userId)}`)
    .then(response => response.json())
      .then(json => {
        if (json && json.length > 0) {
          // 기존 foodList에 새로운 데이터를 추가
          setfoodList(prevFoodList => [
              ...prevFoodList,
              ...json.map((item, index) => ({
                  id: (prevFoodList.length + index + 1).toString(),
                  name: json[a].foodName,
                  backgroundColor: json[a++].backgroundColor ? "#51CE54" : "#FF4444", 
                  image: item.image,
                  description: item.description,
                  ingredient:item.ingredient
              }))
          ]);
        // console.log(foodList[0].backgroundColor)//이쪽에서 에러뜸
      }})//navigation.navigate('MainPage')
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('기록 가져오기에 실패하였습니다.');
      });
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 마운트될 때만 호출합니다
//받은 데이터를 foodList에 추가후 DB에 저장, 저장 후 저장한 데이터들을 모두 가져와서 보여주기
const goToResult = ((foodId)=>{
  navigation.navigate('Result',  {foodList, foodId : foodId})
})

    return (
      <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
      <View>
          <Image style={styles.headerImg} source={require('./assets/recordImg/header-img.png')} />
          <Text style={styles.title}>기록</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.mainbox}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // 이전 페이지로 이동
          activeOpacity={0.9}
          >
            <Arrow_back />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView} style={styles.RecordList}>
              {foodList && foodList.length > 0 ? foodList.map((food) => ( //추후foodList가 아닌 DB에 있는것들을 가져와서 할 예정
                <View
                  key={food.id}
                  style={[
                    styles.RecordBox,{backgroundColor:food.backgroundColor}
                  ]}
                >
                  <Text style={styles.RecordBoxText}>{food.name}</Text>
                  <TouchableOpacity style={styles.View} onPress={() => goToResult(food.id)}>
                    <Text>상세보기</Text>
                  </TouchableOpacity>

                </View>
              )) : (<Text style={styles.noRecord}>아직 기록이 없습니다.</Text>)}

          </ScrollView>
        </View>
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
    top: '65%',
    left: '45%',
    fontWeight: '700',
  },
  main: {
    backgroundColor: 'white',
    width: '100%',
    borderTopRightRadius: 80,
    height: '80%',
  },
  mainbox: {
    width:'90%',
    marginLeft:'8%',
    marginTop: '5%',
  },
  RecordList: {
    width: '100%',
    height: '85%',
    marginTop: '5%',
  },
  scrollView: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 2,
  },
  RecordBox:{
    width: 150,
    height: 150,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5%',
    marginRight: '5%',
  },
  View:{
    width:80,
    marginTop:5,
    backgroundColor:'white',
    alignItems:'center',
    borderRadius:10,
    paddingVertical: 5,   // 위와 아래에 5 dp 패딩 적용
    paddingHorizontal: 10, // 좌우에 10 dp 패딩 적용
  },
  RecordBoxText:{
    marginTop:'30%',
    marginBottom:8,
    color:'white',
    fontSize:22,
    fontWeight:'500'
  },
  noRecord:{
    width:'100%',
    textAlign:'center'
  },
});
