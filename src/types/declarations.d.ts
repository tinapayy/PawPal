declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Update the type definition for NativeStackNavigationOptions
type CustomStackNavigationOptions = NativeStackNavigationOptions & { tabBarVisible?: boolean };

// Export the custom type for reuse
export type { CustomStackNavigationOptions };

declare module 'deprecated-react-native-prop-types';