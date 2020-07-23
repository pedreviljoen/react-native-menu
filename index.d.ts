import React from "react";

declare module "react-native-side-drawer" {
  interface MenuDrawerProps {
    /**
     * Value toggling open and close of drawer
     * @type boolean
     * @memberof MenuDrawerProps
     */
    open?: boolean;

    /**
     * Drawer contents
     * @type number
     * @memberof MenuDrawerProps
     */
    drawerContent?: React.ReactElement;

    /**
     * Value between 0 - 100, depicting the percentage of the screen the drawer will open
     * @type number
     * @memberof MenuDrawerProps
     */
    drawerPercentage?: number;

    /**
     * Value depicting the time (in ms) the menu will slide open & close
     * @type number
     * @memberof MenuDrawerProps
     */
    animationTime?: number;

    /**
     * Value toggling menu overlay or push. When overlay is true, the menu will overlay the background screen. When overlay is false, the menu will push the background screen to the side
     * @type bool
     * @memberof MenuDrawerProps
     */
    overlay?: boolean;

    /**
     * Value between 0-1 for the opacity fade of background when the menu is open
     * @type number
     * @memberof MenuDrawerProps
     */
    opacity?: number;

    /**
     * position when the menu is closed and opened
     * @type string
     * @memberof MenuDrawerProps
     */
    position?: string;
  }

  /**
   * Simple & lightweight customisable menu drawer component
   */
  export default class MenuDrawer extends React.Component<MenuDrawerProps, {}> {
    new(props: MenuDrawerProps);
  }
}
