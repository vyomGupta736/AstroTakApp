import React from 'react';
import {View,Text, Image} from 'react-native';
import {scale} from './Exports';

export default TabBarIcon = ({focused,routeName,size}) => {
    let focusedImageURL, blurredImageURL;
    switch(routeName) {
        case "Home":
            focusedImageURL = require("../StaticImages/homeFoc.png");  
            blurredImageURL = require("../StaticImages/homeBlur.png");
            break;
        case "TalkToAstrologer":
            focusedImageURL = require("../StaticImages/talkFoc.png");  
            blurredImageURL = require("../StaticImages/talkBlur.png")
            break;
        case "AskQuestion":
            focusedImageURL = require("../StaticImages/askFoc.png");  
            blurredImageURL = require("../StaticImages/askBlur.png")
            break;
        case "Report":
            focusedImageURL = require("../StaticImages/reportsFoc.png");  
            blurredImageURL = require("../StaticImages/reportsBlur.png")
            break;
    }
    
    return <View>
        {focused?
       <View style={{alignItems:'center'}}>
            <View style={{width:1.55*size,height:1.55*size,borderRadius:1.55*size,justifyContent:"center",alignItems:'center',backgroundColor:"white",marginTop:scale(0)}}>
                <Image source={focusedImageURL} resizeMode="contain" style={{width:'70%', height:'70%'}} />
            </View>
            <Text allowFontScaling={false} style={{color:"#FF6601",marginTop:scale(0),fontSize:scale(10)}}>{routeName}</Text>
       </View> :<View style={{alignItems:'center'}}>
                    <View style={{width:1.55*size,height:1.55*size,borderRadius:1.55*size,justifyContent:"center",alignItems:'center',backgroundColor:"white",marginTop:scale(0)}}>
                        <Image source={blurredImageURL} resizeMode="contain" style={{width:'70%', height:'70%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:"#C7C7C7",marginTop:scale(0),fontSize:scale(10)}}>{routeName}</Text>
           </View>}
    </View>    
}

//#FAFAFA