import React from 'react'
import { Animated, 
    Dimensions, 
    StyleSheet, 
    View, 
    SafeAreaView, 
    Platform,
    TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const SCREEN_WIDTH  = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const isIOS         = Platform.OS === 'ios'
const VERSION       = parseInt(Platform.Version, 10)

class MenuDrawer extends React.Component{
    constructor(props){
        super(props)
        this.leftOffset = new Animated.Value(0)
        this.state = {
            expanded: false
        }
    }

    openDrawer = () => {
        const { drawerPercentage, animationTime } = this.props
        const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100)
        
        Animated.timing(this.leftOffset, {
            toValue: DRAWER_WIDTH,
            duration: animationTime,
            useNativeDriver: true
        }).start()
    }

    closeDrawer = () => {
        const {animationTime} = this.props

        Animated.timing(this.leftOffset, {
            toValue: 0,
            duration: animationTime,
            useNativeDriver: true
        }).start()
    }

    drawerFallback = () => {
        return(
            <TouchableOpacity
                onPress={this.closeDrawer}
            >
                <Text>
                    Close
                </Text>
            </TouchableOpacity>
        )
    }

    componentDidUpdate () {
        const { open } = this.props

        open ? this.openDrawer() : this.closeDrawer()
    }

    render() {
        const { children, drawerContent } = this.props
        const animated = { transform: [{ translateX: this.leftOffset }] }
        const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100)

        if (isIOS && VERSION >= 11){
            return(
                <Animated.View style={[animated, styles.main]}>
                    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                        <View style={[styles.drawer, {
                                width: DRAWER_WIDTH,
                                left: -DRAWER_WIDTH
                        }]}>
                            {drawerContent ? drawerContent : this.drawerFallback()}
                        </View>
                        <View style={styles.container}>{children}</View>
                    </SafeAreaView>
                </Animated.View>
            )
        }

        return (
            <Animated.View style={[animated, styles.main]}>
                <View style={[styles.drawer, {
                    width: DRAWER_WIDTH,
                    left: -DRAWER_WIDTH
                }]}>
                    {drawerContent ? drawerContent : this.drawerFallback()}
                </View>
                <View style={styles.container}>{children}</View>
            </Animated.View>
        )
    }
}


MenuDrawer.defaultProps = {
    open: false,
    drawerPercentage: 45,
    animationTime: 200
}

MenuDrawer.propTypes = {
    open: PropTypes.bool,
    drawerPercentage: PropTypes.number,
    animationTime: PropTypes.number
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        left: 0,
        width: SCREEN_WIDTH + DRAWER_WIDTH,
        top: 5,
        zIndex: 0,
    },
    container: {
        position: "absolute",
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 0,
    },
    drawer: {
        position: "absolute",
        left: -DRAWER_WIDTH,
        width: DRAWER_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 1,
    }
})

export default MenuDrawer