import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AllergyInfo() {
  const [dishInfo, setDishInfo] = useState(null);
  const [allergyIngredients, setAllergyIngredients] = useState([]);
  const [showLoading, setShowLoading] = useState(true);  // 로딩 상태를 관리하는 상태
  const userAllergies = ['닭고기', '계란'];  // 예시: 사용자의 알러지 목록
  const route = useRoute();
  const navigation = useNavigation();
  const { inputValue } = route.params;  // 이전 페이지에서 전달된 inputValue

  useEffect(() => {
    const fetchDishInfo = async () => {
      // 여기에 ChatGPT나 다른 API를 이용한 정보 요청 로직이 들어갑니다.
      // 예시로 반환된 데이터를 가정
      const response = {
        name: inputValue,
        description: `${inputValue}을(를) 사용하는 요리입니다.`,
        allergyIngredients: ['닭고기', '대두', '밀', '계란', '우유']
      };
      const ingredients = response.allergyIngredients; // 알러지 유발 성분 리스트
      setDishInfo(response);
      setAllergyIngredients(ingredients);
    };

    fetchDishInfo();

    // 10초 후에 로딩 화면을 숨깁니다.
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 10000);  // 10000ms = 10초

    // 컴포넌트 언마운트 시 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [inputValue]);

  const isAllergic = (ingredient) => userAllergies.includes(ingredient);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showLoading ? (
        <View style={styles.containe}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.hi}>결과를 분석중입니다...</Text>
        </View>
      ) : (
        <>
          {dishInfo && (
            <View style={styles.resultContainer}>
              <Text style={styles.inputValue}>{dishInfo.name}</Text>
              <Text style={styles.description}>{dishInfo.description}</Text>
              <Text style={styles.allergyTitle}>알러지 유발 성분:</Text>
              {allergyIngredients.map((ingredient, index) => (
                <Text key={index} style={[styles.ingredient, isAllergic(ingredient) ? styles.allergic : styles.safe]}>
                  {ingredient}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MainPage')}>
              <Text style={styles.actionButtonText}>다른음식 검색하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Record')}>
              <Text style={styles.actionButtonText}>기록 저장하기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerBar}>
              <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MainPage')} activeOpacity={0.9}>
                <Image source={require('./assets/homeImg/Home.png')} style={styles.icon} />
                <Text style={styles.selectText}>홈</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('MyAllergy')} activeOpacity={0.9}>
                <Image source={require('./assets/homeImg/CheckSquare.png')} style={styles.icon} />
                <Text style={styles.footerText}>알러지 등록</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Camera')} activeOpacity={0.9}>
                <Image source={require('./assets/homeImg/Camera.png')} style={styles.icon} />
                <Text style={styles.footerText}>알러지 검색</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerCenter} onPress={() => navigation.navigate('Record')} activeOpacity={0.9}>
                <Image source={require('./assets/homeImg/record.png')} style={styles.icon} />
                <Text style={styles.footerText}>기록</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  resultContainer: {
    marginTop: 20,
  },
  inputValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  allergyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  allergic: {
    color: 'red',
  },
  safe: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    shadowColor: 'rgba(0, 0, 255, 1)',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
  },
  footerCenter: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  footerText: {
    color: '#757575',
    fontWeight: '500',
  },
  selectText: {
    color: '#51CE54',
    fontWeight: '500',
  },
  containe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFFFF', 
  },
  hi: {
    color: '#00000',
    marginTop: 20, 
  },
});

