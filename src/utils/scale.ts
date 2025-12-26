import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on Iphone 6.7" screen mobile device
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

const s = (size: number) => (width / guidelineBaseWidth) * size;
const vs = (size: number) => (height / guidelineBaseHeight) * size;
const ms = (size: number, factor = 0.5) => size + (s(size) - size) * factor;

export { s, vs, ms };
