import React, { useEffect } from 'react'
import {View,Text, StyleSheet,Dimensions} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const {width:screenWidth , height : screenHeight} = Dimensions.get('window')
const MaxHeight = - screenHeight * 0.8

const BottomSheet = ({showstate , children}) => {

    console.log(children)

    const heightVal = useSharedValue(0)
    const context = useSharedValue(0)

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
        heightVal.value = withSpring(-screenHeight * 0.8, {damping: 30});
      } else {
        heightVal.value = withSpring(0, {damping: 30});
      }
    }, [showstate]);

    const bottomsheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: heightVal.value}],
      };
    });

    
    return (
    <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.maincontainer,bottomsheetStyle]}> 
        <Text>Bottom sheet</Text>
    </Animated.View>
    </GestureDetector>
    )
}

const styles = StyleSheet.create({
    maincontainer : {
        position:'absolute',
        width : screenWidth,
        height : screenHeight ,
        borderWidth :1,
        borderColor:'red',
        backgroundColor:'white',
        top:screenHeight,
        borderRadius : 22,
        zIndex :5
    }
})

export default BottomSheet