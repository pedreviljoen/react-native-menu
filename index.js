import React, { useEffect, useState, useRef } from "react"
import {
  Animated,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native"
import PropTypes from "prop-types"

const MenuDrawer = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const isLeftPosition = props.position === "left"
  const window = useWindowDimensions()
  const screenHeight = window.height
  const screenWidth = window.width

  const initialDrawerWidth = screenWidth * (props.drawerPercentage / 100)
  const drawerWidthRef = useRef(initialDrawerWidth)

  const initialLeftOffset = isLeftPosition ? 0 : screenWidth + initialDrawerWidth
  const leftOffsetRef = useRef(new Animated.Value(initialLeftOffset))


  useEffect(() => {
    const newDrawerWidth = screenWidth * (props.drawerPercentage / 100)
    const newLeftOffset = isLeftPosition ? 0 : screenWidth + newDrawerWidth
    drawerWidthRef.current = newDrawerWidth

    leftOffsetRef.current = new Animated.Value(newLeftOffset)

    if (props.open) {
      closeDrawer() & openDrawer()
    }
  }, [screenWidth])

  useEffect(() => {
    props.open ? openDrawer() : closeDrawer()
  }, [props.open])

  const openDrawer = () => {
    const { drawerPercentage, animationTime, opacity, position } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: isLeftPosition ? drawerWidth : screenWidth,
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
    const { drawerPercentage, animationTime, position } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: isLeftPosition ? 0 : screenWidth + drawerWidth,
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
    const { children, drawerContent, drawerPercentage } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current
    const animated = { transform: [{ translateX: leftOffset }] }

    return (
      <Animated.View style={[animated, styles.main]}>
        <View
          style={[
            styles.drawer,
            {
              height: screenHeight,
              width: drawerWidth,
              left: -drawerWidth
            }
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </View>
        <Animated.View
          style={[
            styles.container,
            {
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
    const { children, drawerContent, drawerPercentage } = props
    const drawerWidth = drawerWidthRef.current
    const leftOffset = leftOffsetRef.current
    const animated = { transform: [{ translateX: leftOffset }] }

    return (
      <>
        <Animated.View
          style={[
            animated,
            styles.drawer,
            { height: screenHeight, width: drawerWidth, left: -drawerWidth }
          ]}
        >
          {drawerContent ? drawerContent : drawerFallback()}
        </Animated.View>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>{children}</Animated.View>
      </>
    )
  }

  return props.overlay ? renderOverlay() : renderPush()
}

MenuDrawer.defaultProps = {
  open: false,
  drawerPercentag: 45,
  animationTime: 200,
  overlay: true,
  opacity: 0.4,
  position: "left"
}

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  drawerPercentage: PropTypes.number,
  animationTime: PropTypes.number,
  overlay: PropTypes.bool,
  opacity: PropTypes.number,
  position: PropTypes.oneOf(["left", "right"])
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    left: 0,
    top: 0
  },
  container: {
    flex: 1,
    zIndex: 0
  },
  drawer: {
    position: "absolute",
    zIndex: 1
  }
})

export default MenuDrawer
