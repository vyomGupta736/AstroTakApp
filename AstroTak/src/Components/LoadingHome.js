import React from 'react';
import {View,Image,Text, ImageBackground} from 'react-native';
import {scale, verticalScale} from './Exports';
import styles from './Styles';

const LoadingHome = () => {
   return (
        <View style={{width:'100%',height:verticalScale(100), marginVertical:verticalScale(20), flexDirection:'row'}} >
            <View style={{width:scale(120), backgroundColor:'white', borderRadius:scale(10), marginLeft:scale(10), overflow:'hidden'}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(14), color : "gray"}} >
                        Astro Tak
                    </Text>
                </ImageBackground>
            </View>
            <View style={{width:scale(120), backgroundColor:'white', borderRadius:scale(10), marginLeft:scale(10), overflow:'hidden'}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(14), color : "gray"}} >
                        Astro Tak
                    </Text>
                </ImageBackground>
            </View>
            <View style={{width:scale(120), backgroundColor:'white', borderRadius:scale(10), marginLeft:scale(10), overflow:'hidden'}} >
                <ImageBackground source={require("../StaticImages/loadingImage.png")} resizeMode="cover" style={{...styles.istyles, justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(14), color : "gray"}} >
                        Astro Tak
                    </Text>
                </ImageBackground>
            </View>
        </View>
   )
}

export default LoadingHome;