
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Text,
  View
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
    <GestureHandlerRootView style={{flex : 1}}>
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity 
      onPress={()=>handleSheet()}
      style={styles.btnstyle}/>

      <BottomSheet showstate={state}>
        <View>
        <Text>Hello world</Text>
        </View>
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
