import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../contexts.js';
import {IPContext} from '../contexts.js';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, BackHandler, ImageBackground, Dimensions, Modal, TextInput, Platform,  TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {Image} from 'react-native';
import LogoSvg from './assets/img/logo.svg';
import ReTake from './assets/img/Retake.svg';
import SearchSvg from './assets/img/find.svg'
import { useNavigation } from '@react-navigation/native';
import Loading from './roading.js'
import Bg from './assets/img/background.svg';
import GuideX from './assets/homeImg/guideX.svg';
import GuidePlus from './assets/homeImg/guidePlus.svg';
import Yes from './assets/img/yes.svg'
import X from './assets/img/X.svg'
import No from './assets/img/no.svg'
import Footer from './components/footer.js'
import GuideOne from './assets/homeImg/gudieOne.svg';
import GuideTwo from './assets/homeImg/guideTwo.svg';
import GuideThree from './assets/homeImg/guideThree.svg';

const { width, height } = Dimensions.get('window');

export default function MainPage() {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const {userId}=useContext(UserContext)
  const {IP} = useContext(IPContext);
  const [selectIcon, setselectIcon] = useState();
  const [searchExplain, setsearchExplain] = useState();
  const [description, setdescription] = useState([]);
  const [notIngredients, setNotIngredients] = useState([]);
 const [loading, setLoading] =useState(false);
 const [isGuide1, setIsGuide1] = useState(false);
 const [isGuide2, setIsGuide2] = useState(false);
 const [isGuide3, setIsGuide3] = useState(false);
 
 const guideani = (id)=>{
  setIsGuide1(false)
  setIsGuide2(false)
  setIsGuide3(false)
  if(id === 1) setIsGuide1(!isGuide1)
  else if(id===2) setIsGuide2(!isGuide2)
  else if(id===3) setIsGuide3(!isGuide3)
 }
 
 const [isGuideline, setIsGuideline] = useState(false);
 const Guideline = ()=>{
   setIsGuideline(!isGuideline);
 }
 
 
 async function openai_say(foodname){
  try{
    const respond = await fetch(`http://${IP}/openAI/say`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        food: foodname
      })
    })
    .then(setLoading(true))
    if (!respond.ok) {
      throw new Error(`HTTP error! Status: ${respond.status}`);
    }
    const textResponse = await respond.json(); // 응답 본문을 문자열로 읽기
    
    setselectIcon(
      textResponse.ok == 'O' ? true:false
    )
    setdescription(textResponse.ingredients); 
    setsearchExplain(textResponse.description)
    setNotIngredients(textResponse.notIngredients)
    console.log(textResponse.ingredients)
    setLoading(false)
    return textResponse.ok;
  } catch (error) {
    console.error(error);
  }
}
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => { //알러지 추가하기를 눌렀을때 검은화면보여주기
    setIsModalVisible(true);
  };

  const hideModal = () => { //검은화면 숨기기
    setIsModalVisible(false);
  };
  if (loading) {
    return <Loading  style={styles.view}/>;
  }
  
  return (
                       
    <View style={{flex:1}}>
      <LinearGradient style={styles.container} colors={['#51CE54', '#0D7FFB']}>
      <StatusBar style="auto" />
      {isModalVisible ? (<Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.darkOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                
                <TouchableWithoutFeedback onPress={hideModal}>
                <X style={styles.xSvg}/>
                </TouchableWithoutFeedback>
                <View style={styles.noBox}>
                  {selectIcon  ? 
                  (
                    <View>
                 
                  <Yes />
                  </View>) :
                  (<View>
                  
                  <No/>
                  </View>
                  )}
                </View>
                
                <Text style={styles.textFoodName}>{text}</Text>
                <View style={styles.descriptionBox}>
                {description.map((item) => (
                                <Text 
                                key={item} 
                                    style={[
                                        styles.textdescription, 
                                        notIngredients.includes(item) && { color: 'red' } 
                                    ]}
                                >
                                    {item}
                                </Text>
                            ))}
                  </View>
                <Text style={styles.textFoodD}>{searchExplain}</Text>
                <View style={{position: 'absolute', bottom: 30,left: 15}}>
                  <Text style={styles.text}>많이 사용되는 레시피를 기준으로 만들었습니다</Text>
                  <Text style={styles.text}>좀더 상세하게 알고싶다면 음식점에 문의하세요</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>) : (null)}
      {isGuideline ? 
      <Modal 
      transparent={true}
        visible={isGuideline}
        onRequestClose={Guideline}
        animationType="fade"
      >
          <TouchableWithoutFeedback onPress={Guideline}>
          <View style={styles.darkOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, styles.guide]}>
              <TouchableWithoutFeedback onPress={Guideline}>
                <X style={styles.xSvg}/>
                </TouchableWithoutFeedback>

              <TouchableOpacity style={styles.guideBox} onPress={()=>guideani(1)}>
                <View style={styles.guideTitleBox}>
                  <Text style={styles.guideTitleText}>1. 자신의 알러지 등록하기</Text>
                  {isGuide1 ? <GuideX /> : <GuidePlus /> }
                </View>
                <Text>알러지등록을 누르시고 자신의 알러지를 등록해주세요</Text>
                {isGuide1 ? <GuideOne /> : null}
              </TouchableOpacity>
              <TouchableOpacity style={styles.guideBox} onPress={()=>guideani(2)}>
                <View style={styles.guideTitleBox}>
                  <Text style={styles.guideTitleText}>2. 음식 촬영하기</Text>
                  {isGuide2 ? <GuideX /> : <GuidePlus /> }
                </View>
                <Text>카메라 모양의 알러지 검색을 누르시고 음식을 촬영해주세요</Text>
                {isGuide2 ? <GuideTwo /> : null}
              </TouchableOpacity>
              <TouchableOpacity style={styles.guideBox} onPress={()=>guideani(3)}>
                <View style={styles.guideTitleBox}>
                  <Text style={styles.guideTitleText}>3. 결과</Text>
                  {isGuide3 ? <GuideX /> : <GuidePlus /> }
                </View>
                <Text>분석이 끝난 결과를 받아 먹을 수 없는 음식이라면 성분을 빨간색으로 표시해줍니다.</Text>
                {isGuide3 ? <GuideThree /> : null}
              </TouchableOpacity>
              </View>
              </TouchableWithoutFeedback>
              </View>
              </TouchableWithoutFeedback>
      </Modal> : null}
      <View style={styles.backgroundImg}>
        <Bg />
      </View>
      <View style={styles.BgUnbox}>
      </View>
      <TouchableOpacity style={styles.guidelines} onPress={Guideline}>
        <Text style={styles.guidelinesText}>?</Text>
      </TouchableOpacity>
          <View style={[styles.logo, { height: 62 }]}>
            <LogoSvg height={62}></LogoSvg>
            <Text style={styles.logoText}>Allergic</Text>
          </View>
          <View style={styles.unMainBox}></View>
          
          
          <View style={[styles.main]}>
              <View style={styles.mainBox}>
                  <Text style={styles.mainText}>식사를 하기전</Text>{/* class="text" style="display: inline-block; margin-bottom:10px"*/}
                  <Text style={styles.mainText}>알러지 식품을 체크해보세요!</Text>{/* class="text" */}
                  <Text style={styles.mainSmallText}>사진촬영이나 요리명을 검색해보세요.</Text>{/* class="small-text" */}
              </View>
              <View style={[styles.section]}>
                  <TouchableOpacity
                    title="Go to Camera"
                    onPress={() => navigation.navigate("Camera")}
                  >
                    
                  <View style={styles.But}>
                      <ReTake/>
                      <View style={styles.textBox}>{/* class="textBox" */}
                          <Text style={styles.Cam_text}>사진촬영</Text>{/* class="text" */}
                          <Text style={styles.Cam_smallText}>완성된 요리를 촬영해주세요</Text>{/* class="small-text" */}
                      </View>
                  </View>
                  
                  </TouchableOpacity>
                  <View style={styles.find}>
                      <TouchableOpacity
                        onPress={async() => {
                          showModal();
                          result = await openai_say(text);
                        }}
                      >
                        <SearchSvg/>
                      </TouchableOpacity>
                      
                            <View >
                                <TextInput
                                style={styles.input}
                                placeholder="요리명 검색"
                                onChangeText={setText}
                                value={text}
                              />
                            </View>
                           
                      { text.length > 0 ? 
                      <TouchableOpacity
                        // 글자 삭제
                        onPress={()=>{setText('')}}
                      >
                      <Image source={require('./assets/img/X.png')}/>{/* class="smallImg" id="inputDelete" */}
                      </TouchableOpacity> : null
                      }
                  </View>
              </View>
          </View>
          



          {/* 여기서부터 푸터 */}
          <Footer home = {true} allergy = {false} camera = {false} record = {false}/>
      </LinearGradient>
    </View>
  );
}


const styles = StyleSheet.create({
  guideBox:{
    marginBottom:20
  },
  guide:{
    width:'87%',
    padding:20,
    paddingTop:50,
    paddingBottom:30
  },
  guideTitleBox:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center'
  },
  guideTitleText:{
    fontSize:18,
    fontWeight:'700'
  }, 
  guidelinesText:{
    fontSize:20,
    fontWeight:'600'
  },
  guidelines:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    width:40,
    height:40,
    backgroundColor:'#FFFFFF',
    borderRadius:100,
    position:'absolute',
    right:20,
    top:50
  },
  text:{
    fontWeight:'700',
    textAlign:'center',
  },
  descriptionBox:{
    width: '80%',
    flexDirection:'row',
    flexWrap:'wrap',
    marginLeft:'8%',
    marginBottom:'20%'
  },
  textFoodName:{
    marginLeft:'10%' ,
    marginTop:'5%',
    fontSize: 22,
    fontWeight: '700',
  },
  textdescription:{
    marginRight:'4%',
    marginBottom:'4%',
    marginTop:'4%',
  },
  textFoodD:{
    width:'90%',
    marginLeft:'10%' 
  },
  darkOverlay: {
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    display: 'flex',
    borderRadius: 10,
  },
  modalText: {
    textAlign:'center',
    marginTop: 35,
    marginBottom: 25,
    fontSize: 22,
    fontWeight: '700',
  },
  xSvg:{
    position:'absolute',
    top:20,
    right:20
  },
  BgUnbox:{
    height:'36%'
  },
  noBox:{
    marginTop:50,
    marginLeft:20,
    width:'100%',
    position:'relative'
  },
  noIcon:{
    position:'absolute',
    bottom:7,
    left:30,
    zIndex:10
  },
  container: {
    flex: 1,
    width:'100vw',
    height:'100vh',
    position:'relative'
  },
  backgroundImg: {
    position:'absolute'
  },
  unMainBox:{
    width:'100%',
    height:'57%',
  },
  logo: {
    width:'50%',
    zIndex:10,
    flexDirection:'row',
    marginLeft:'5%'
  },
  logoText:{
    position: 'relative',
    left: '15%',
    top: '5%',
    color: "#FFF",
    fontSize: 32,
    fontWeight: '500',
  },
  main:{
    flex:1.3,
    height:height*0.47,
    bottom:'8%',
    width:'100%',
    backgroundColor: "#FFF",
    position:'absolute',
    borderTopRightRadius: 100,
  },
  mainText:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainBox:{
    flex:1,
    width:'85%',
    marginTop:'10%',
    marginHorizontal:'auto'
  },
  mainSmallText:{
    marginTop:'2%',
    fontSize: 16.2,
  },
  section:{
    flex:4,
    bottom:'-15%',
    position: 'relative',
    alignItems: 'center',
  },
  But:{
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 5.995,
    paddingLeft:'5%',
    margin: 10,
    alignContent:'center',
    alignItems: 'center',
    gap: 18.735,
    backgroundColor: '#0075FF',
  },
  find: {
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 6,
    paddingLeft:'5%',
    margin: '3%',
    alignItems: 'center',
    gap: 18.735,
    borderWidth:2,
    borderStyle: 'solid',
    borderColor:'#0075FF',
    backgroundColor: '#FFF',
  },
  textBox:{
    flexDirection:'row',
  },
  Cam_text:{
    color: '#FFF',
    fontSize: 17.4,
    fontWeight: 'bold',
  },
  Cam_smallText:{
    marginLeft: 9,
    marginTop: 2,
    color:'#FFF',
    fontSize: 11.4,
    fontWeight: '400',
  },
  input:{
    marginRight:-8,
    width:170,
    height:50,
    fontSize: 17.986,
    fontWeight: "bold",
  }
  
});