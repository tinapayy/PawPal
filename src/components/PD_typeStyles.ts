// PD_typeStyles.ts

import { StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

// Define a type alias for styles
export type PD_typeStyles = {
    container: StyleProp<ViewStyle>;
    imageContainer: StyleProp<ImageStyle>;
    item: StyleProp<ImageStyle>;
    headerContainer: StyleProp<ViewStyle>;
    image: StyleProp<ImageStyle>;
    title: StyleProp<TextStyle>;
    title1: StyleProp<TextStyle>;
    petDetail: StyleProp<TextStyle>;
    bottomTexts: StyleProp<TextStyle>;
    surface: StyleProp<ViewStyle>;
    bottomContainer: StyleProp<ViewStyle>;
    card: StyleProp<ViewStyle>;
    cardContent: StyleProp<ViewStyle>;
    userInfo: StyleProp<ViewStyle>;
    avatarContainer: StyleProp<ViewStyle>;
    userName: StyleProp<TextStyle>;
    ownerTitle: StyleProp<TextStyle>;
    descriptionContainer: StyleProp<ViewStyle>;
    iconContainer: StyleProp<ViewStyle>;
    icon: StyleProp<ViewStyle>;
    contentScroll: StyleProp<ViewStyle>;
    contentProfile: StyleProp<TextStyle>;
    seeMore: StyleProp<TextStyle>;
};
