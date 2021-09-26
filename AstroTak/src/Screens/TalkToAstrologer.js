import React from 'react';
import {View, Text, ScrollView, Image, TextInput, FlatList, ToastAndroid, TouchableNativeFeedback, TouchableOpacity, Touchable} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { scale, verticalScale } from '../Components/Exports';
import FilterOption from '../Components/FilterOption';
import Header from '../Components/Header';
import LoadingAstro from '../Components/LoadingAstro';
import LoadingHome from '../Components/LoadingHome';

class TalkToAstrologer extends React.Component {
    state={
        showSearchBar : false,
        filterView : false,
        astrologers : [],
        mainData : [],
        q : "",
        timeout : null,
        filterQ : "",
        autoFocus : false
    }
    async componentDidMount(){
        console.log('Talk to Astro mounted');
        SplashScreen.hide();
        const response = await fetch("http://192.168.202.14:5000/astrologer-data", {
            method: "GET",
        });
        const res = await response.json();
        console.log(res);
        this.setState({ astrologers : [...res], mainData : [...res] })
    }

    filterResult = (q, type) => {
        switch(type){
            case 1:
                console.log("called here")
                var temp = this.state.astrologers.sort((a, b) => {
                    return Number(b.experience) - Number(a.experience)
                })
                console.log(temp)
                this.setState({filterQ : q, astrologers : [...temp]})
            break;
            case 2:
                console.log("called here")
                var temp = this.state.astrologers.sort((a, b) => {
                    return Number(a.experience) - Number(b.experience)
                })
                console.log(temp)
                this.setState({filterQ : q, astrologers : [...temp]})
            break;
            case 3:
                console.log("called here")
                var temp = this.state.astrologers.sort((a, b) => {
                    return Number(b.minimumCallDurationCharge) - Number(a.minimumCallDurationCharge)
                })
                console.log(temp)
                this.setState({filterQ : q, astrologers : [...temp]})
            break;
            case 4:
                console.log("called here")
                var temp = this.state.astrologers.sort((a, b) => {
                    return Number(a.minimumCallDurationCharge) - Number(b.minimumCallDurationCharge)
                })
                console.log(temp)
                this.setState({filterQ : q, astrologers : [...temp]})
            break;
        }
        
    }

    searchResult = (q) => {
        clearTimeout(this.state.timeout);
        this.setState({ timeout :  setTimeout(async () => {
            console.log(q);
            let result = await fetch(`http://192.168.202.14:5000/search?q=${q}`, {
                method : "GET",
            });
            const res = await result.json();
            console.log(res)
            this.setState({ astrologers : [...res], mainData : [...res] })
         }, 400)}) 
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}} >
                {this.state.filterView?<View style={{ position: 'absolute', top:0, left:0, right:0, bottom:0, zIndex:1}} >
                    <View style={{position: 'absolute', top:0, left:0, right:0, bottom:0, backgroundColor:'gray', opacity:0.4, zIndex:2}} />
                    <View style={{position: 'absolute', top:0, left:0, right:0, bottom:0, zIndex:3}} >
                        <View 
                            style={{position:'absolute', top:verticalScale(130), left:scale(120), right:scale(10), zIndex:4, backgroundColor:'red', height:verticalScale(250)}} >
                             <View style={{width:'100%', height:'100%', backgroundColor:'white', elevation:3}} >
                                 <View style={{height:verticalScale(40), backgroundColor:'white', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:scale(20), borderBottomWidth:2, borderColor:'#C7C7C7' }} >
                                      <Text style={{color:'#FF6601', fontSize:scale(12)}} >Sort By</Text>
                                      <TouchableOpacity onPress={() => this.setState({ filterView : false})} style={{width:scale(10), height:scale(10), backgroundColor:'white', justifyContent:'center', alignContent:'center'}} >
                                          <Image source={require('../StaticImages/x-button.png')} resizeMode="contain" style={{width:'100%', height:'100%'}}/>
                                      </TouchableOpacity>
                                 </View>
                                 <FilterOption onPress={(q) => this.filterResult(q, 1)} filterText="Experience - high to low" filterQ={this.state.filterQ} />
                                 <FilterOption onPress={(q) => this.filterResult(q, 2)} filterText="Experience - low to high" filterQ={this.state.filterQ} />
                                 <FilterOption onPress={(q) => this.filterResult(q, 3)} filterText="Price - high to low" filterQ={this.state.filterQ} />
                                 <FilterOption onPress={(q) => this.filterResult(q, 4)} filterText="Price - low to high" filterQ={this.state.filterQ} />
                             </View> 
                        </View>
                    </View>
                   
                </View>:null}
               <Header />
               <View style={{marginHorizontal:scale(20), height:verticalScale(40), backgroundColor:'white', marginTop:verticalScale(20), flexDirection:'row', alignItems:'center', justifyContent:'space-between', position:'relative'}} > 
                   <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold'}} >Talk to an Astrologer</Text>
                   <View style={{flexDirection:'row', height:'100%', backgroundColor:'white', position:'relative'}} >
                       <TouchableOpacity disabled={this.state.astrologers.length==0?true:false} onPress={() => this.setState({ showSearchBar : true, autoFocus : true })}
                           style={{height:'100%', width:scale(30), backgroundColor:'white', marginRight:scale(10), justifyContent:'center', alignContent:'center'}} >
                           <Image source={require('../StaticImages/search.png')} resizeMode="contain" style={{width:'60%', height:'80%'}} />
                       </TouchableOpacity> 
                       <TouchableOpacity disabled={this.state.astrologers.length==0?true:false} onPress={() => this.setState({ filterView : true })} style={{height:'100%', width:scale(30), backgroundColor:'white', marginRight:scale(10), justifyContent:'center', alignContent:'center'}} >
                           <Image source={require('../StaticImages/filter.png')} resizeMode="contain" style={{width:'60%', height:'80%'}} />
                       </TouchableOpacity> 
                       <TouchableOpacity disabled={this.state.astrologers.length==0?true:false} style={{height:'100%', width:scale(30), backgroundColor:'white', justifyContent:'center', alignContent:'center'}} >
                           <Image source={require('../StaticImages/sort.png')} resizeMode="contain" style={{width:'60%', height:'80%'}} />
                       </TouchableOpacity>                   
                   </View>
               </View>
               {this.state.showSearchBar?<View style={{marginHorizontal:scale(20), height:verticalScale(40), backgroundColor:'#FAFAFA', marginTop:verticalScale(10), flexDirection:'row'}} >
                   <View style={{width:scale(45), backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}} >
                        <Image source={require('../StaticImages/search.png')} resizeMode="contain" style={{width:'50%', height:'50%'}} />
                   </View>
                   <TextInput style={{flex:1, height:'100%'}}
                      placeholder="Search Astrologer"
                      autoFocus={this.state.autoFocus}
                      onChangeText={(q) => this.searchResult(q)}
                    />
                   <TouchableOpacity onPress={() => this.setState({ showSearchBar : false, autoFocus : false }, () => this.searchResult(''))}
                        style={{width:scale(45), backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}} >
                        <Image source={require('../StaticImages/x-button.png')} resizeMode="contain" style={{width:'30%', height:'30%'}} />
                   </TouchableOpacity>
               </View>:null}

               {this.state.astrologers.length == 0?<LoadingAstro />:<FlatList
                    style={{marginTop:verticalScale(20)}}
                    data={this.state.astrologers}
                    keyExtractor={item => item._id?item._id:item.uid}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                        return (
                            <View style={{marginHorizontal:scale(20), flexDirection:'row', minHeight:verticalScale(200), marginTop:verticalScale(10), borderBottomWidth:1, borderColor:'#C7C7C7'}} >
                                <View style={{flex:1, backgroundColor:'white'}} >
                                    <Image source={{ uri : item.profilePicUrl }} resizeMode="contain" style={{width:'100%', height: verticalScale(70), alignSelf:'flex-start', marginLeft:scale(-5), marginTop:verticalScale(10)}} />
                                </View>
                                <View style={{flex:2, paddingLeft:scale(10)}} >
                                    <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6), fontWeight:'bold'}} >{`${item.firstName} ${item.lastName}`}</Text>
                                    <Text allowFontScaling={false} >🌟 {item.skills.toString()}</Text>
                                    <Text allowFontScaling={false} >📙 {item.languages.toString()}</Text>
                                    <Text allowFontScaling={false} >🏷️ ₹ {item.minimumCallDurationCharge}/min</Text>
                                    <TouchableOpacity style={{backgroundColor:'#FF944D', width:scale(120), height:verticalScale(40), borderRadius:scale(5), justifyContent:'center', alignItems:'center', marginTop:verticalScale(20)}} >
                                        <Text allowFontScaling={false} style={{color:'white', fontSize:scale(14), fontWeight:'bold'}} >✆ Talk on Call</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:.8, backgroundColor:'white', alignItems:'center'}} >
                                    <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6)}} >{item.experience} Years</Text>
                                </View>
                            </View>   
                        )
                    }}
                />}

                <View style={{height:verticalScale(20)}} />

               {/* <View style={{marginHorizontal:scale(20), flexDirection:'row', minHeight:verticalScale(200), marginTop:verticalScale(10), borderBottomWidth:1, borderColor:'#C7C7C7'}} >
                   <View style={{flex:1, backgroundColor:'white'}} >
                      <Image source={require('../StaticImages/astrologer-1.png')} resizeMode="contain" style={{width:'100%', height: verticalScale(70), alignSelf:'flex-start', marginLeft:scale(-5), marginTop:verticalScale(10)}} />
                   </View>
                   <View style={{flex:2}} >
                       <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6), fontWeight:'bold'}} >Arvind Shulka Kumar Jagendra</Text>
                       <Text allowFontScaling={false} >🌟 Coffee Cup Reading lorem ips fdshf sdfhdhjsf sdfhjgsdjhfgdsf dsfghjs</Text>
                       <Text allowFontScaling={false} >📙englih, Hindi</Text>
                       <Text allowFontScaling={false} >🏷️ Rs 100/min</Text>
                       <TouchableOpacity style={{backgroundColor:'#FF944D', width:scale(120), height:verticalScale(40), borderRadius:scale(5), justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:verticalScale(20)}} >
                           <Text allowFontScaling={false} style={{color:'white', fontSize:scale(14), fontWeight:'bold'}} >✆ Talk on Call</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={{flex:.8, backgroundColor:'white', alignItems:'center'}} >
                      <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6)}} >25 Years</Text>
                   </View>
               </View>
               <View style={{marginHorizontal:scale(20), flexDirection:'row', minHeight:verticalScale(200), marginTop:verticalScale(10), borderBottomWidth:1, borderColor:'#C7C7C7'}} >
                   <View style={{flex:1, backgroundColor:'white'}} >
                      <Image source={require('../StaticImages/astrologer-1.png')} resizeMode="contain" style={{width:'100%', height: verticalScale(70), alignSelf:'flex-start', marginLeft:scale(-5), marginTop:verticalScale(10)}} />
                   </View>
                   <View style={{flex:2}} >
                       <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6), fontWeight:'bold'}} >Arvind Shulka Kumar Jagendra</Text>
                       <Text allowFontScaling={false} >🌟 Coffee Cup Reading lorem ips fdshf sdfhdhjsf sdfhjgsdjhfgdsf dsfghjs</Text>
                       <Text allowFontScaling={false} >📙englih, Hindi</Text>
                       <Text allowFontScaling={false} >🏷️ Rs 100/min</Text>
                       <TouchableOpacity style={{backgroundColor:'#FF944D', width:scale(120), height:verticalScale(40), borderRadius:scale(5), justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:verticalScale(20)}} >
                           <Text allowFontScaling={false} style={{color:'white', fontSize:scale(14), fontWeight:'bold'}} >✆ Talk on Call</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={{flex:.8, backgroundColor:'white', alignItems:'center'}} >
                      <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6)}} >25 Years</Text>
                   </View>
               </View>
               <View style={{marginHorizontal:scale(20), flexDirection:'row', minHeight:verticalScale(200), marginTop:verticalScale(10), borderBottomWidth:1, borderColor:'#C7C7C7'}} >
                   <View style={{flex:1, backgroundColor:'white'}} >
                      <Image source={require('../StaticImages/astrologer-1.png')} resizeMode="contain" style={{width:'100%', height: verticalScale(70), alignSelf:'flex-start', marginLeft:scale(-5), marginTop:verticalScale(10)}} />
                   </View>
                   <View style={{flex:2}} >
                       <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6), fontWeight:'bold'}} >Arvind Shulka Kumar Jagendra</Text>
                       <Text allowFontScaling={false} >🌟 Coffee Cup Reading lorem ips fdshf sdfhdhjsf sdfhjgsdjhfgdsf dsfghjs</Text>
                       <Text allowFontScaling={false} >📙englih, Hindi</Text>
                       <Text allowFontScaling={false} >🏷️ Rs 100/min</Text>
                       <TouchableOpacity style={{backgroundColor:'#FF944D', width:scale(120), height:verticalScale(40), borderRadius:scale(5), justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:verticalScale(20)}} >
                           <Text allowFontScaling={false} style={{color:'white', fontSize:scale(14), fontWeight:'bold'}} >✆ Talk on Call</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={{flex:.8, backgroundColor:'white', alignItems:'center'}} >
                      <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6)}} >25 Years</Text>
                   </View>
               </View>
               <View style={{marginHorizontal:scale(20), flexDirection:'row', minHeight:verticalScale(200), marginTop:verticalScale(10), borderBottomWidth:1, borderColor:'#C7C7C7'}} >
                   <View style={{flex:1, backgroundColor:'white'}} >
                      <Image source={require('../StaticImages/astrologer-1.png')} resizeMode="contain" style={{width:'100%', height: verticalScale(70), alignSelf:'flex-start', marginLeft:scale(-5), marginTop:verticalScale(10)}} />
                   </View>
                   <View style={{flex:2}} >
                       <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6), fontWeight:'bold'}} >Arvind Shulka Kumar Jagendra</Text>
                       <Text allowFontScaling={false} >🌟 Coffee Cup Reading lorem ips fdshf sdfhdhjsf sdfhjgsdjhfgdsf dsfghjs</Text>
                       <Text allowFontScaling={false} >📙englih, Hindi</Text>
                       <Text allowFontScaling={false} >🏷️ Rs 100/min</Text>
                       <TouchableOpacity style={{backgroundColor:'#FF944D', width:scale(120), height:verticalScale(40), borderRadius:scale(5), justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:verticalScale(20)}} >
                           <Text allowFontScaling={false} style={{color:'white', fontSize:scale(14), fontWeight:'bold'}} >✆ Talk on Call</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={{flex:.8, backgroundColor:'white', alignItems:'center'}} >
                      <Text allowFontScaling={false} style={{fontSize:scale(12), marginTop:verticalScale(6)}} >25 Years</Text>
                   </View>
               </View> */}
            </View>
        )
    }
}

export default TalkToAstrologer;