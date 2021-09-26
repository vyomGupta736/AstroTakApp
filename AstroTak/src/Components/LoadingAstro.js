import React from 'react';
import {View,Image,Text, ImageBackground} from 'react-native';
import {scale, verticalScale} from './Exports';
import styles from './Styles';

const LoadingAstro = () => {
   return (
       <View>
            <View style={{height:verticalScale(150), marginTop:verticalScale(10), borderBottomWidth:2, borderColor:'#C7C7C7', marginHorizontal:scale(20), overflow:'hidden', borderRadius:scale(10)}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), color : "gray"}} >
                        Astro Tak Astrologers....
                    </Text>
                </ImageBackground>
            </View>
            <View style={{height:verticalScale(150), marginTop:verticalScale(10), borderBottomWidth:2, borderColor:'#C7C7C7', marginHorizontal:scale(20), overflow:'hidden', borderRadius:scale(10)}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), color : "gray"}} >
                        Astro Tak Astrologers....
                    </Text>
                </ImageBackground>
            </View>
            <View style={{height:verticalScale(150), marginTop:verticalScale(10), borderBottomWidth:2, borderColor:'#C7C7C7', marginHorizontal:scale(20), overflow:'hidden', borderRadius:scale(10)}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), color : "gray"}} >
                        Astro Tak Astrologers....
                    </Text>
                </ImageBackground>
            </View>
            <View style={{height:verticalScale(150), marginTop:verticalScale(10), borderBottomWidth:2, borderColor:'#C7C7C7', marginHorizontal:scale(20), overflow:'hidden', borderRadius:scale(10)}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), color : "gray"}} >
                        Astro Tak Astrologers....
                    </Text>
                </ImageBackground>
            </View>
       </View>
        
   )
}

export default LoadingAstro;