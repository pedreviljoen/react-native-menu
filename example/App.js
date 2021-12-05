/*
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MenuDrawer from 'react-native-side-drawer'

const Drawer = (props) => {
  const overlay = false
  const position = 'right'

  const drawerContent = () => {
    const edges = position == 'right' ? ['bottom', 'top', 'right'] : ['bottom', 'top', 'left']
    const baseStyle = {flex: 1, backgroundColor: 'blue', borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}

    return(
      <SafeAreaView edges={edges} style={baseStyle}>
        <View style={{flexDirection: 'column', backgroundColor: 'orange', flex: 1, padding: 20}}>
          <Text>Overlay={overlay.toString()}</Text>
          <Text style={{marginTop: 20}}>Position={position}</Text>
          <TouchableOpacity style={{marginTop: 20}} onPress={props.toggleDrawer}>
            <Text style={{color: 'blue'}}>I will disappear if you click here</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 20}}>When using overlay you will need to account for SafeAreView and it needs unique styling</Text>
          </View>
      </SafeAreaView>
    )
  }

  return (
    <MenuDrawer
      open={props.open}
      drawerContent={drawerContent()}
      position={position}
      drawerPercentage={40}
      animationTime={250}
      overlay={overlay}
      opacity={0.5}>
    {props.children}
    </MenuDrawer>
  );
}
const App: () => Node = () => {
  const [openDrawer, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer)
  }

  return (
    <SafeAreaProvider>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
          <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', padding: 30}}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Text style={{color: 'blue'}}>Press me to open the drawer</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Drawer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
