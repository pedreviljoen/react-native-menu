import React from 'react'
import { Animated, Dimensions, StyleSheet, View, SafeAreaView, Platform } from 'react-native'
import PropTypes from 'prop-types'

const SCREEN_WIDTH = (Dimensions.get('window').width * 0.55)
const SCREEN_HEIGHT = Dimensions.get('window').height
const DURATION     = 200
const isIOS = Platform.OS === 'ios'
const VERSION = parseInt(Platform.Version, 10)

class MenuDrawer extends React.Component{
    constructor(props){
        super(props)
        this.leftOffset = new Animated.Value(0)
        this.state = {
            expanded: false
        }
    }

    openDrawer = () => {
        Animated.timing(this.leftOffset, {
            toValue: SCREEN_WIDTH,
            duration: DURATION,
            useNativeDriver: true
        }).start()
    }

    closeDrawer = () => {
        Animated.timing(this.leftOffset, {
            toValue: -SCREEN_WIDTH,
            duration: DURATION,
            useNativeDriver: true
        }).start()
    }

    componentDidUpdate () {
        const { open } = this.props

        open ? this.openDrawer() : this.closeDrawer()
    }

    render() {
        const { children, containerStyle } = this.props
        const animated = { transform: [{ translateX: this.leftOffset }] }

        if (isIOS && VERSION >= 11){
            return(
                <Animated.View style={[animated, styles.main]}>
                    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                        <View style={styles.container}>
                            {children}
                        </View>
                    </SafeAreaView>
                </Animated.View>
            )
        }

        return (
            <Animated.View style={[animated, styles.main]}>
                <View style={[styles.container, containerStyle]}>
                    {children}
                </View>
            </Animated.View>
        )
    }
}

MenuDrawer.defaultProps = {
    containerStyle: {}
}

MenuDrawer.propTypes = {
    containerStyle: PropTypes.object
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        height: SCREEN_HEIGHT,
        left: -SCREEN_WIDTH,
        zIndex: 1
    },
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        position: 'absolute',
        backgroundColor: '#F3F7F9',
        marginTop: 20,
        padding: 10,
        height: SCREEN_HEIGHT,
        zIndex: 1
    }
})

export default MenuDrawer