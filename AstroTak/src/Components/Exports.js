import {Dimensions} from 'react-native';

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const w = Dimensions.get('window').width;
export const h = Dimensions.get('window').height;

export const scale = size => {
        return (Dimensions.get('window').width / guidelineBaseWidth * size)
};

export const verticalScale = size => {
        return (Dimensions.get('window').height / guidelineBaseHeight * size)
};

   
            



