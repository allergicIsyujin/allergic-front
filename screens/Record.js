import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts.js';
import { IPContext } from '../contexts.js';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Footer from './components/footer.js';
import Arrow_back from './assets/img/arrow_back.svg';

export default function Record() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};
  const { userId } = useContext(UserContext);
  const { IP } = useContext(IPContext);

  const [foodList, setFoodList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredFoodList, setFilteredFoodList] = useState([]); // 필터링된 음식 리스트 상태

  let a = 0;

  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    fetch(`http://${IP}/food/foodRecord?userid=${encodeURIComponent(userId)}`)
      .then(response => response.json())
      .then(json => {
        if (json && json.length > 0) {
          const newFoodList = json.map((item, index) => ({
            id: (index + 1).toString(),
            name: json[a].foodName,
            backgroundColor: json[a++].backgroundColor ? "#51CE54" : "#FF4444",
            image: item.image,
            description: item.description,
            ingredient: item.ingredient,
            calo:item.calo,
            today:item.today
          }));
          setFoodList(newFoodList);
          setFilteredFoodList(newFoodList); // 필터링된 리스트도 초기화
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('기록 가져오기에 실패하였습니다.');
      });
  }, []); 

  // 검색어가 변경될 때마다 호출되는 함수
  useEffect(() => {
    if (searchText.trim() === '') {
      // 검색어가 없으면 전체 리스트 표시
      setFilteredFoodList(foodList);
    } else {
      // 검색어로 필터링된 리스트 생성
      const filteredList = foodList.filter(food =>
        food.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFoodList(filteredList);
    }
  }, [searchText, foodList]);

  const goToResult = (foodId) => {
    navigation.navigate('Result', { foodList, foodId: foodId });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#51CE54', '#0D7FFB']} style={styles.gradient}>
        <View>
          {/* 헤더 이미지 추가 */}
          <Image style={styles.headerImg} source={require('./assets/recordImg/header-img.png')} />
          <Text style={styles.title}>기록</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.mainbox}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} 
              activeOpacity={0.9}
            >
              <Arrow_back />
            </TouchableOpacity>

            {/* 검색 인풋 박스 */}
            <TextInput
              style={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchText}
              onChangeText={setSearchText}
            />

            <ScrollView contentContainerStyle={styles.scrollView} style={styles.RecordList}>
              {filteredFoodList && filteredFoodList.length > 0 ? (
                filteredFoodList.map((food) => (
                  <View
                    key={food.id}
                    style={[
                      styles.RecordBox, { backgroundColor: food.backgroundColor }
                    ]}
                  >
                    <Text style={styles.RecordBoxText}>{food.name}</Text>
                    <TouchableOpacity style={styles.View} onPress={() => goToResult(food.id)}>
                      <Text>상세보기</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noRecord}>아직 기록이 없습니다.</Text>
              )}
              {filteredFoodList.length % 2 === 1 ? (
                <View key={filteredFoodList.length + 1} style={[styles.RecordBox]} />
              ) : null}
            </ScrollView>
          </View>
        </View>
        <Footer home={false} allergy={false} camera={false} record={true} />
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
    alignItems: 'center',
  },
  mainbox: {
    width: '95%',
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
    justifyContent: 'space-around',
    flexGrow: 2,
  },
  RecordBox: {
    width: 150,
    height: 150,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  View: {
    width: 80,
    marginTop: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  RecordBoxText: {
    marginTop: '30%',
    marginBottom: 8,
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  noRecord: {
    width: '100%',
    textAlign: 'center',
  },
  searchinput: {
    width: '90%',
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
