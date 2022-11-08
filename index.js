import React, { useEffect, useState, useRef } from "react"
import {
  Animated,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"

const MenuDrawer = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const window = useWindowDimensions()
  const screenHeight = props.fullSize ? Dimensions.get('screen').height : window.height;
  const screenWidth = props.fullSize?  Dimensions.get('screen').width: window.width;

  const initialDrawerWidth = screenWidth * (props.drawerPercentage / 100)
  const drawerWidthRef = useRef(initialDrawerWidth)

  const leftOffsetRef = useRef(new Animated.Value(0))

  useEffect(() => {
    const newDrawerWidth = screenWidth * (props.drawerPercentage / 100)
    drawerWidthRef.current = newDrawerWidth
    if (props.open) {
      leftOffsetRef.current = new Animated.Value(determineNewLeftOffset(drawerWidthRef.current))
    } else {
      leftOffsetRef.current = new Animated.Value(0)
    }
  }, [screenWidth])

  const determineNewLeftOffset = drawerWidth => {
    return props.position === "left" ? drawerWidth : -drawerWidth
  }

  useEffect(() => {
    props.open ? openDrawer() : closeDrawer()
  }, [props.open])

  const openDrawer = () => {
    const { drawerPercentage, animationTime, opacity } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: determineNewLeftOffset(drawerWidth),
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: opacity,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start()
  }

  const closeDrawer = () => {
    const { drawerPercentage, animationTime } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start()
  }

  const drawerFallback = () => {
    return (
      <TouchableOpacity onPress={closeDrawer}>
        <Text>Close</Text>
      </TouchableOpacity>
    )
  }

  const renderPush = () => {
    const { children, drawerContent, position, drawerPercentage } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current
    const animated = { transform: [{ translateX: leftOffset }] }

    return (
      <Animated.View
        style={[
          animated,
          styles.pushMain,
          {
            flexDirection: position === "left" ? "row" : "row-reverse",
            left: position === "left" ? -drawerWidth : 0,
            height: screenHeight,
            width: drawerWidth + screenWidth
          }
        ]}
      >
        <View
          style={[
            {
              height: screenHeight,
              width: drawerWidth
            }
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </View>
        <Animated.View
          style={[
            {
              height: screenHeight,
              width: screenWidth,
              opacity: fadeAnim
            }
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    )
  }

  const renderOverlay = () => {
    const { children, position, drawerContent, drawerPercentage } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current
    const animated = { transform: [{ translateX: leftOffset }] }

    return (
      <>
        <Animated.View
          style={[
            animated,
            styles.drawerOverlay,
            { height: screenHeight, width: drawerWidth, [position]: -drawerWidth }
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </Animated.View>
        <Animated.View style={[styles.containerOverlay, { opacity: fadeAnim }]}>
          {children}
        </Animated.View>
      </>
    )
  }

  return props.overlay ? renderOverlay() : renderPush()
}

MenuDrawer.defaultProps = {
  open: false,
  drawerPercentage: 45,
  animationTime: 200,
  overlay: true,
  opacity: 0.4,
  position: "left",
  fullSize: false
}

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  drawerPercentage: PropTypes.number,
  animationTime: PropTypes.number,
  overlay: PropTypes.bool,
  opacity: PropTypes.number,
  position: PropTypes.oneOf(["left", "right"]),
  fullSize: PropTypes.bool,
}

const styles = StyleSheet.create({
  mainPush: {
    position: "absolute",
    flex: 1
  },
  containerOverlay: {
    flex: 1,
    elevation: 0, // better for android
    zIndex: 0
  },
  drawerOverlay: {
    position: "absolute",
    elevation: 1, // better for android
    zIndex: 1
  }
})

export default MenuDrawer
