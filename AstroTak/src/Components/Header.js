import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { scale, verticalScale } from '../Components/Exports';

export default Header = () => {
    return(
        <View style={{flexDirection:'row', height:verticalScale(50), backgroundColor:"white", marginTop:verticalScale(20), justifyContent:'space-between', marginHorizontal:scale(20), alignItems:'flex-end'}} >
            <View style={{backgroundColor:"white",height:verticalScale(40), width:scale(40)}} >
                    <TouchableOpacity style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:"white"}} >
                    <Image source={require("../StaticImages/hamburger.png")} resizeMode="contain" style={{width:'60%', height:'60%'}} />
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"white", justifyContent:'center', height:verticalScale(50), width:scale(60)}} >
                    <TouchableOpacity disabled={true} >
                    <Image source={require("../StaticImages/logo.png")} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor:"white", justifyContent:'center', height:verticalScale(40), width:scale(40)}} >
                    <TouchableOpacity style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:"white"}} >
                    <Image source={require("../StaticImages/profile.png")} resizeMode="contain" style={{width:'70%', height:'70%'}} />
                    </TouchableOpacity>
            </View>
        </View>
    )
}