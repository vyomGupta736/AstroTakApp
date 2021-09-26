import React from 'react';
import {View, Text, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { scale } from './Exports';

export default class FilterOption extends React.Component {
    render(){
        return(
            <TouchableNativeFeedback onPress={() => {
                this.props.onPress(this.props.filterText)
            }}
             >
                <View style={{flex:1, backgroundColor:'white', flexDirection:'row', alignItems:'center'}} >
                    <View style={{backgroundColor:'purple', width:scale(25), height:scale(25), backgroundColor:(this.props.filterText == this.props.filterQ)?'#FF6601':'transparent', borderRadius:scale(30), marginHorizontal:scale(10), borderWidth:1, borderColor:'#FF6601'}} />
                    <View style={{flex:4, backgroundColor:'transparent', height:'100%', justifyContent:'center'}} >
                        <Text allowFontScaling={false} style={{fontSize:scale(12)}} >{this.props.filterText}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}