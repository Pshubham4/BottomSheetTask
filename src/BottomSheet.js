import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MaxHeight = -screenHeight * 0.8;

const BottomSheet = ({showstate, children}) => {
  //Prop validation
  showstate = typeof showstate == 'boolean' && showstate ? true : false;

  children = children ? children : <Text>No valid component provided</Text>;

  const heightVal = useSharedValue(0);
  const context = useSharedValue(0);
  const [childSize, setChildsize] = useState(0);

  const gesture = Gesture.Pan()
    .onStart(event => {
      context.value = heightVal.value;
    })
    .onUpdate(event => {
      heightVal.value = event.translationY + context.value;
      heightVal.value = Math.max(heightVal.value, MaxHeight);
    });
  
  //Execution on state change
  useEffect(() => {
    if (showstate) {
      heightVal.value = withSpring(Math.max(-childSize, MaxHeight), {
        damping: 30,
      });
    } else {
      heightVal.value = withSpring(0, {damping: 30});
    }
  }, [showstate]);

  const bottomsheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: heightVal.value}],
    };
  });

  //Listening childeren size change
  const onLayoutChange = event => {
    const {width, height} = event.nativeEvent.layout;
    setChildsize(height);
    return;
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.maincontainer, bottomsheetStyle]}>
        <View
          style={{height: 'auto'}}
          onLayout={event => onLayoutChange(event)}>
          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'white',
    top: screenHeight,
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    zIndex: 5,
    overflow: 'hidden',
  },
});

export default BottomSheet;
