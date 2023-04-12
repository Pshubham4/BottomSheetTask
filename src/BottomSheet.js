import React, { useEffect , useState } from 'react'
import {View,Text, StyleSheet,Dimensions} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const {width:screenWidth , height : screenHeight} = Dimensions.get('window')
const MaxHeight = - screenHeight * 0.8

const BottomSheet = ({showstate , children}) => {


    const heightVal = useSharedValue(0)
    const context = useSharedValue(0)
    const [childSize , setChildsize] = useState(0)

    const gesture = Gesture.Pan()
    .onStart((event)=> {
        context.value = heightVal.value
    })
    .onUpdate((event)=>{
        heightVal.value = event.translationY + context.value ;
        heightVal.value = Math.max(heightVal.value,MaxHeight)
    })

    useEffect(() => {
      if (showstate) {
        heightVal.value = withSpring(-childSize, {damping: 30});
      } else {
        heightVal.value = withSpring(0, {damping: 30});
      }
    }, [showstate]);

    const bottomsheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: heightVal.value}],
      };
    });

    const onLayoutChange = (event) => {
      const {width , height} = event.nativeEvent.layout
      setChildsize(height)
      return
    }
    
    return (
    <GestureDetector gesture={gesture}>
    <Animated.View
    onLayout={event => onLayoutChange(event)}
    style={[styles.maincontainer,bottomsheetStyle]}> 
        {children}
    </Animated.View>
    </GestureDetector>
    )
}

const styles = StyleSheet.create({
    maincontainer : {
        position:'absolute',
        width : screenWidth,
        borderWidth :1,
        borderColor:'red',
        backgroundColor:'white',
        top:screenHeight,
        borderTopStartRadius : 22,
        borderTopEndRadius : 22,
        zIndex :5
    }
})

export default BottomSheet