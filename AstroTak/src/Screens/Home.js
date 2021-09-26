import React from 'react';
import {View, Text, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView, FlatList, ImageBackground, RefreshControl, ToastAndroid} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SplashScreen from 'react-native-splash-screen';
import { scale, verticalScale } from '../Components/Exports';
import Header from '../Components/Header';
import LoadingHome from '../Components/LoadingHome';

class Home extends React.Component {
    state={
        showDropDown : true,
        bannerdata : [],
        horoscopedata : [],
        astrodata : [],
        reportdata : [],
        questiondata : [],
        testimonialdata : [],
        refreshing : false
    }

    async componentDidMount(){
        console.log("mounted");
        SplashScreen.hide();
        await this.fetchDetails("banner-data", "bannerdata");
        await this.fetchDetails("horoscope-data", "horoscopedata");
        await this.fetchDetails("astrologer-data", "astrodata");
        await this.fetchDetails("report-data", "reportdata");
        await this.fetchDetails("question-data", "questiondata");
        await this.fetchDetails("testimonial-data", "testimonialdata")
    }

    async fetchDetails(endPoint, stateKey){
        console.log("called : ", endPoint);
        const response = await fetch("http://192.168.202.14:5000/"+endPoint, {
            method: "GET",
        });
        const res = await response.json();
        console.log(res);
        this.setState({ [stateKey] : [...res] }, () => {
            return;
        })
    }

    onRefresh = () => {
        this.setState({ refreshing : true }, async() => {
            await this.fetchDetails("banner-data", "bannerdata");
            await this.fetchDetails("horoscope-data", "horoscopedata");
            await this.fetchDetails("astrologer-data", "astrodata");
            await this.fetchDetails("report-data", "reportdata");
            await this.fetchDetails("question-data", "questiondata");
            await this.fetchDetails("testimonial-data", "testimonialdata")
            this.setState({ refreshing : false })
        })
    }

    render(){
        return (
            <ScrollView 
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />}
                showsVerticalScrollIndicator={false}
                style={{flex:1, backgroundColor:"white"}} >
                 <Header />

                

                 <View style={{height:verticalScale(80), backgroundColor:'white', marginTop:verticalScale(20), marginHorizontal:scale(20)}} >
                        <ImageBackground
                            source={require('../StaticImages/loadingImage.png')}
                            style={{width:'100%',height:'100%'}}
                            >
                            <Image source={require("../StaticImages/banner-home.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}}/>
                        </ImageBackground>
                 </View>

                 {this.state.bannerdata.length==0?<LoadingHome />:<FlatList
                        style={{marginTop:verticalScale(20), marginLeft:scale(5)}}
                        data={this.state.bannerdata}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    ToastAndroid.show(" Redirect to " +item.redirectUrl, ToastAndroid.SHORT)
                                }} activeOpacity={1} disabled={false} style={{width:scale(160), height:verticalScale(120), backgroundColor:'white', borderRadius:scale(10), borderWidth:scale(1), marginLeft:scale(10), borderColor:'#FAFAFA', elevation:2, overflow:'hidden', marginVertical:verticalScale(10)}} >
                                    <ImageBackground
                                        source={require('../StaticImages/loadingImage.png')}
                                        style={{width:'100%',height:'100%'}}
                                        >
                                        <Image source={{ uri : item.img }} resizeMode="cover" style={{height:'100%', width:'100%'}} />
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        }}
                    />}

                <View style={{backgroundColor:'white', marginTop:verticalScale(20), marginHorizontal:scale(10)}} >
                   <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', marginHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(17), fontWeight:'bold'}} >Daily Horoscopes</Text>
                        <TouchableOpacity>
                            <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#FF8F00'}} >{`See All >`}</Text>
                        </TouchableOpacity>
                   </View>
                   <Text allowFontScaling={false} style={{marginHorizontal:scale(10), color:'#100C10'}} >
                       Read Your daily horoscope based on your sunsign, select your zodiac sign and give the right start to your day.
                   </Text>
                   {this.state.horoscopedata.length==0?<LoadingHome />:<FlatList
                        style={{marginTop:verticalScale(20)}}
                        data={this.state.horoscopedata}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item}) => {
                            return (
                            <View style={{width:scale(110), backgroundColor:'white', height:verticalScale(150), flexDirection:'column', alignItems:'center'}} >
                                <Image source={{ uri : item.img }} resizeMode="contain" style={{width:'70%', height:'50%'}} />
                                <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#000', marginTop:verticalScale(10), marginBottom:verticalScale(8)}} >{item.name}</Text>
                                <Text allowFontScaling={false} style={{fontSize:scale(10), fontWeight:'bold', color:'#C7C7C7'}} >{item.date}</Text>
                            </View>
                            )
                        }}
                    />}
                </View>

                <View style={{backgroundColor:'white', marginTop:verticalScale(20), marginHorizontal:scale(10)}} >
                   <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', marginHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(17), fontWeight:'bold'}} >Talk to an Astrologer</Text>
                        <TouchableOpacity>
                            <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#FF8F00'}} >{`See All >`}</Text>
                        </TouchableOpacity>
                   </View>
                   <Text allowFontScaling={false} style={{marginHorizontal:scale(10), color:'#100C10'}} >
                       Leading Astrologers of India are just a phone call away. Our panel of astrologers not just provide solutions to your life problems but also guide you so that you can take right path towards growth and prosperity.
                   </Text>
                   {this.state.astrodata.length==0?<LoadingHome />:<FlatList
                        style={{marginTop:verticalScale(20)}}
                        data={this.state.astrodata}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item}) => {
                            return (
                                <View style={{width:scale(160) , backgroundColor:'white',flexDirection:'column', alignItems:'center',  borderColor:'#FAFAFA', elevation:2, borderWidth:scale(1), marginLeft:scale(10), marginBottom:verticalScale(10), borderRadius:scale(10)}} >
                                    <View style={{width:'100%', height:verticalScale(130),flexDirection:'column', alignItems:'center', justifyContent:'center' }} >
                                        <Image source={{ uri : item.profilePicUrl }} resizeMode="contain" style={{width:'100%', height:'100%', marginTop:verticalScale(20)}} />
                                    </View>
                                    <View style={{flexDirection:'row', height:verticalScale(50), backgroundColor:'white', justifyContent:'space-between', alignItems:'center',width:'100%', paddingHorizontal:scale(10), marginTop:verticalScale(15) }}>
                                        <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold'}} >{`${item.firstName} ${item.lastName}`}</Text>
                                        <Text allowFontScaling={false} style={{fontSize:scale(10), fontWeight:'bold', color:'#FF8F00'}} >{item.rating}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', height:verticalScale(40), backgroundColor:'white', justifyContent:'flex-start', alignItems:'center',width:'100%', paddingHorizontal:scale(10), marginTop:verticalScale(3) }}>
                                        <Text allowFontScaling={false} style={{fontSize:scale(10), fontWeight:'bold', width:'100%', color:'#C7C7C7'}} >{item.aboutMe}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'100%', paddingHorizontal:scale(10), height:verticalScale(50), backgroundColor:'white', marginBottom:verticalScale(10)}}>
                                        <Text allowFontScaling={false} style={{fontSize:scale(12), fontWeight:'300'}} >{`₹ ${item.minimumCallDurationCharge} / \n min`}</Text>
                                        <TouchableNativeFeedback style={{borderRadius:scale(6)}} >
                                            <View style={{width:scale(80), height:verticalScale(30), backgroundColor:'#FF8F00', borderRadius:scale(6), justifyContent:'center', alignItems:'center', overflow:'hidden'}} >
                                                <Text allowFontScaling={false} style={{fontSize:scale(12), fontWeight:'300', color:'#fff'}} >Talk Now</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>
                            )
                        }}
                    />}
                </View>

                <View style={{backgroundColor:'white', marginTop:verticalScale(20), marginHorizontal:scale(10)}} >
                   <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(17), fontWeight:'bold'}} >Reports</Text>
                        <TouchableOpacity>
                            <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#FF8F00'}} >{`See All >`}</Text>
                        </TouchableOpacity>
                   </View>
                   <Text allowFontScaling={false} style={{paddingHorizontal:scale(10)}} >
                   Astrology Reports or what is commonly known as Horoscope report is basically an in depth look at your birth chart. Horoscope report will look at various planetary positions in your birth chart and also derive relationships and angle to understand your personality and trait.
                   </Text>
                   {this.state.reportdata.length==0?<LoadingHome />:<FlatList
                        style={{marginTop:verticalScale(20)}}
                        data={this.state.reportdata}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item}) => {
                            return (
                                <View style={{width:scale(200), height:verticalScale(160), backgroundColor:'white', marginLeft:scale(10), borderRadius:scale(10), position:'relative', overflow:'hidden'}} >
                                    <Image source={{ uri : item.img }} resizeMode="stretch" style={{width:'100%', height:'100%'}} />
                                    <View style={{position:'absolute', left:0, right:0, bottom:0, height:verticalScale(40), backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:scale(10) }} >
                                        <View style={{position:'absolute', left:0, right:0, bottom:0, top:0, backgroundColor:'black', opacity:.1}}></View>
                                        <View style={{position:'absolute', left:0, right:0, bottom:0, top:0, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:scale(10)}}>
                                            <Text allowFontScaling={false} style={{fontSize:scale(12), fontWeight:'300', color:'white'}} >{`₹ ${item.price} /min`}</Text>
                                            <TouchableNativeFeedback style={{borderRadius:scale(6)}} >
                                                <View style={{width:scale(80), height:verticalScale(30), backgroundColor:'#FF8F00', borderRadius:scale(6), justifyContent:'center', alignItems:'center', overflow:'hidden'}} >
                                                    <Text allowFontScaling={false} style={{fontSize:scale(12), fontWeight:'300', color:'#fff'}} >Talk Now</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>
                                        
                                    </View>
                                </View>
                            )
                        }}
                    />}
                </View>

               
                <View style={{backgroundColor:'white', marginTop:verticalScale(20), marginHorizontal:scale(10)}} >
                   <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(17), fontWeight:'bold'}} >Ask a Question</Text>
                        <TouchableOpacity>
                            <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#FF8F00'}} >{`See All >`}</Text>
                        </TouchableOpacity>
                   </View>
                   <Text allowFontScaling={false} style={{paddingHorizontal:scale(10)}} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
                   </Text>
                   <View style={{height:verticalScale(150), backgroundColor:'#F1F2FA', marginTop:verticalScale(20), marginHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(15), fontWeight:'bold', margin:scale(10)}} >Choose Category</Text>
                        <RNPickerSelect
                            onValueChange={(value) => console.log(value)}
                            items={[
                                ...this.state.questiondata
                            ]}
                        />
                        <View style={{flex:1, backgroundColor:'transparent', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                            <Text allowFontScaling={false} style={{fontSize:scale(8), fontWeight:'bold', margin:scale(10)}} >₹ 99 (including GST)</Text>
                            <Text allowFontScaling={false} style={{fontSize:scale(8)}}>Ideas What to Ask</Text>
                            <TouchableNativeFeedback style={{borderRadius:scale(6)}} >
                                <View style={{width:scale(100), height:verticalScale(30), backgroundColor:'#FF8F00', borderRadius:scale(6), justifyContent:'center', alignItems:'center', overflow:'hidden', marginRight:scale(5)}} >
                                    <Text allowFontScaling={false} style={{fontSize:scale(9), fontWeight:'300', color:'#fff'}} >Ask a Question</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>


                

                <View style={{backgroundColor:'white', marginTop:verticalScale(30), marginHorizontal:scale(10)}} >
                   <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:scale(10)}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(17), fontWeight:'bold'}} >Hear from our Happy customers!</Text>
                   </View>
                   {this.state.testimonialdata.length==0?<LoadingHome />:<FlatList
                        style={{marginTop:verticalScale(0), marginLeft:scale(5)}}
                        data={this.state.testimonialdata}
                        keyExtractor={item => item._id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item}) => {
                            return (
                                <View style={{width:scale(200), borderRadius:scale(8), marginLeft:scale(10), overflow:'hidden',borderWidth:scale(1), borderColor:'#FAFAFA', elevation:2, marginVertical:verticalScale(10)}} >
                                    <View style={{height:verticalScale(210), backgroundColor:'white'}} >
                                        <Text allowFontScaling={false} style={{color:'blue', fontSize:scale(30),height:verticalScale(30), marginLeft:scale(10)}} >〞</Text>
                                        <Text allowFontScaling={false} style={{color:'gray', fontSize:scale(12), paddingHorizontal:scale(10)}} >{item.testimony}</Text>
                                    </View>
                                    <View style={{height:verticalScale(80), backgroundColor:'#F1F2FA', position:'relative'}} >
                                    <View style={{width:scale(40), height:scale(40), position:'relative', top:-verticalScale(20), left: scale(100)-scale(20)}} >
                                            <Image source={require('../StaticImages/profile.png')} resizeMode="contain" style={{height:'100%', width:'100%'}} /> 
                                    </View>
                                    <Text allowFontScaling={false} style={{alignSelf:'center'}} >{item.userName}</Text>
                                    <Text allowFontScaling={false} style={{alignSelf:'center', fontSize:scale(11)}} >{item.userAddress}</Text>
                                    </View>
                                </View> 
                            )
                        }}
                    />}
                </View>
                <Text style={{alignSelf:'center', marginVertical:verticalScale(20)}} >@ Copyright 2020 All Rights Reserved</Text>
            </ScrollView>
        )
    }
}

export default Home;