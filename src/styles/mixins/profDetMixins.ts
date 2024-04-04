import constants from '../constants';

// profile details mixins

export const profDetMixins = {

    //profileDetails styling

    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    item: {
        height: '88%',
        zIndex: 1,
        resizeMode: 'contain',
    },
    headerContainer:{
        flexDirection: 'row',
        top: '-40%',
        left: '9%',
        position: 'relative',
        zIndex: 15,

    },
    image:{
        resizeMode: 'cover',
        height: '100%',
        borderRadius: 10,
        zIndex: 999,
        width: '90%',
        alignSelf: 'center',
        right: '3%',

    },

    input: {
        color: constants.$accentColor1,
        fontFamily: constants.$fontFamilyBold,
        fontSize: 13.1,
    },
    pawLogo:{
        resizeMode: 'contain',
        width: '20%',
        height: '-10%',
        top: '-500%',
        left: '70%',
    },
    backgroundImage:{
        resizeMode: 'cover',
        position: 'relative',
        height: '24%',
        zIndex: -100,
    },
    backButton:{
        top: '2%', 
        right: '550%'
    },
    profDetText:{
        fontSize: 24,
        fontFamily: constants.$fontFamilyBold,
        color: constants.$tertiaryColor,
        left: '-50%',
    },
    horizontalLine: {
        alignSelf: 'center',
        height: 3,
        backgroundColor: constants.$quinaryColor,
        top: '43%',
        zIndex: 5,
    },
    titlePet:{
        fontFamily: constants.$fontFamily,
        color: constants.$secondaryColor,
        fontSize: 32,
        fontWeight: constants.$fontWeightBold,
        position: 'relative',
        top: '1%',
        padding: '2.5%',
        textAlign: 'left',
        borderRadius: 30,
    },
    petDetail: {
        fontFamily: constants.$fontFamily,
        color: constants.$senaryColor,
        fontSize: 15,
        top: '9%',
        marginHorizontal: '6%',
        left: '10%',

    },
    surface:{
        backgroundColor: constants.$quinaryColor,
        padding: '2%',
        height: '95%',
        width: '19%',
        top: '15%',
        marginHorizontal: 5,
        borderRadius: 20,
        left: '4%',
    },
    card:{
        width: '130%',
        alignSelf: 'center',
        height: '42%',
        top: '-20%',
        position: 'relative',
        zIndex: -1,
        backgroundColor: constants.$backgroundColor,
    },
    cardContent: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4%',
    },
    userInfo:{
        bottom: '15%',
        zIndex: 99,
        position: 'relative',
    },
    avatarContainer:{
        left: '60%',
        position: 'relative',
        marginRight: '-10%',
    },
    userName: {
        fontFamily: constants.$fontFamilyBold,
        color: constants.$secondaryColor,
        fontWeight: constants.$fontWeightBold,
        zIndex: 99,
        position: 'relative',
        fontSize: 18,
    },
    ownerTitle:{
        fontFamily: constants.$fontFamily,
        color: constants.$accentColor2,
        fontSize: 16,
    },
    descriptionContainer:{
        flex: 1,
        position: 'relative',
        marginLeft: '1%',
        zIndex: 99,
        top: '-30%',
        left: '160%',
    },
    iconContainer:{
        flexDirection: 'row',
        position: 'relative',
        left: '190%',
        top: '-35%',
        zIndex: 5,
        marginRight: '2%',
    },
    icon: {
        color: constants.$senaryColor,
        paddingHorizontal: '4.5%',
        zIndex: 999,
        position: 'relative',
    },
    contentScroll:{
        color: constants.$textColor2,
        textAlign: 'justify',
        paddingHorizontal: '3.9%',
        bottom: '5%',
        right: '390%',
        zIndex: 99,

    },
    contentProfile: {
        fontSize: 16,
        fontFamily: constants.$fontFamily,
        color: constants.$textColor1,
        textAlign: 'left',
        lineHeight: 24,
        right: '-50%',
        maxWidth: '40%',
        maxHeight: '40%',

    },
    seeMore:{
        fontFamily: constants.$fontFamily,
        fontSize: 14,
        textDecorationStyle: 'solid',
        color: constants.$octonaryColor,
        top: '-40%',
        left: '130%',
        textAlign: 'center',
        textDecorationLine: 'underline',
        position: 'relative',
    },
     // alignments
  align: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}