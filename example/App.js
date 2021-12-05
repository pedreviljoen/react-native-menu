/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MenuDrawer from 'react-native-side-drawer'

const Drawer = (props) => {
  const overlay = true
  const drawerContent = () => {
    const overlayStyle = {paddingTop: 45}
    const baseStyle = {flex: 1, backgroundColor: 'orange', borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}

    return(
      <View style={baseStyle}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, maxHeight: '30%', margin: 10}}>
          { overlay &&
            <>
              <Text>Overlay=true</Text>
              <TouchableOpacity onPress={props.toggleDrawer}>
                <Text style={{color: 'blue'}}>I will disappear if you click here</Text>
              </TouchableOpacity>
              <Text>When using overlay you will need to account for SafeAreView and it needs unique styling</Text>
            </>
          }
          { !overlay &&
            <>
              <Text>Overlay=false</Text>
              <Text>Generally the styling of the original page should be respected,
              The animated view is placed inside the original content</Text>
            </> }
        </View>
      </View>
    )
  }

  return (
    <MenuDrawer
      open={props.open}
      drawerContent={drawerContent()}
      position={'right'}
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer}>
        <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', padding: 30}}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text style={{color: 'blue'}}>Press me to open the drawer</Text>
          </TouchableOpacity>
        </View>
      </Drawer>
    </SafeAreaView>
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
