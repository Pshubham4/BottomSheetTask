
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image ,
  View , 
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex : 1,
    borderWidth :1,
    alignItems:'center',
    justifyContent : 'flex-start'
  };


  const [state , setState] = React.useState(false)
  const handleSheet = () => setState(!state) 

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TouchableOpacity
          onPress={() => handleSheet()}
          style={styles.btnstyle}
        />
        <Text style={{color:'white'}}>Press to open</Text>
        <BottomSheet showstate={state}>
           {Array(10).fill(1).map((item,index)=>{
            return <Text key={index}>Hello world</Text>
           })}
      
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  btnstyle : {
    borderWidth:2,
    width : 50,
    height : 50,
    borderRadius : 25,
    backgroundColor:'grey'
  }
});

export default App;
