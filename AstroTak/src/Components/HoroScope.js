import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { scale, verticalScale } from './Exports';

export default HoroScope = ({imageSource}) => {
    return (
        <View style={{flex:1, backgroundColor:'white', height:verticalScale(150), flexDirection:'column', alignItems:'center'}} >
            <Image source={imageSource} resizeMode="contain" style={{width:'70%', height:'50%'}} />
            <Text allowFontScaling={false} style={{fontSize:scale(14), fontWeight:'bold', color:'#000', marginTop:verticalScale(10), marginBottom:verticalScale(8)}} >{horoName}</Text>
            <Text allowFontScaling={false} style={{fontSize:scale(10), fontWeight:'bold', color:'#C7C7C7'}} >{horoDate}</Text>
        </View>
    )
}