import constants from '../constants';

// profile details mixins

export const profDetMixins = {

    //profileDetails styling

    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: '#FFFF00',
        
    },

    //overall height of the image

    // headerContainer:{
    //     flexDirection: 'row',
    //     top: '5%',
    //     left: '10%',
    //     position: 'relative',
    //     zIndex: 1,

    // },
    // image:{
    //     resizeMode: 'cover',
    //     height: '100%',
    //     borderRadius: 10,
    //     zIndex: 999,
    //     width: '90%',
    //     alignSelf: 'center',
    //     right: '3%',

    // },

    input: {
        color: constants.$accentColor1,
        fontFamily: constants.$fontFamilyBold,
        fontSize: 13.1,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        paddingVertical:'2%',
    },
    // logo
    pawLogo:{
        resizeMode: 'contain',
        width: '15%',
        top: '-90%',
        left: '74%',
    },
    backgroundImage:{
        resizeMode: 'cover',
        position: 'relative',
        height: '24%',
        zIndex: -100,
    },
    backButton:{
        top: '2%', 
        right: '80%'
    },
    profDetText:{
        fontSize: 24,
        fontFamily: constants.$fontFamilyBold,
        color: constants.$primaryColor,
    },
    // horizontal line
    horizontalLine: {
        height: 2,
        backgroundColor: constants.$primaryColor,
        top: '67%',
        zIndex: 1,
        
    },
    titlePet:{
        fontFamily: constants.$fontFamilyBold,
        color: constants.$secondaryColor,
        fontSize: 24,
        position: 'relative',
        padding: '2.5%',
        textAlign: 'left',
    },
    // petDetail: {
    //     fontFamily: constants.$fontFamily,
    //     color: constants.$senaryColor,
    //     fontSize: 15,
    //     top: '9%',
    //     marginHorizontal: '6%',
    //     left: '10%',

    // },
    // surface:{
    //     backgroundColor: constants.$quinaryColor,
    //     padding: '2%',
    //     // height: '95%',
    //     width: '19%',
    //     top: '25%',
    //     marginHorizontal: 5,
    //     borderRadius: 20,
    //     left: '4%',
    // },
    // card:{
    //     width: '130%',
    //     alignSelf: 'center',
    //     height: '47%',
    //     top: '-18%',
    //     position: 'relative',
    //     zIndex: -1,
    //     backgroundColor: constants.$backgroundColor,
    // },
    // cardContent: {
    //     position: 'relative',
    //     // flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     // alignItems: 'center',
    //     padding: '4%',
    //     // backgroundColor: '#FFFF00',
    // },
    // userInfo:{
    //     bottom: '15%',
    //     zIndex: 99,
    //     position: 'relative',
    //     right:'70%',
    //     // backgroundColor: '#FFFF00',
    // },

    //for profile 
    avatarContainer:{
        left: '50%',
        position: 'relative',
        marginRight: '-10%',
        top:'15%',
    },
    userName: {
        fontFamily: constants.$fontFamilyBold,
        color: constants.$secondaryColor,
        zIndex: 99,
        position: 'relative',
        fontSize: 18,
    },
    // ownerTitle:{
    //     fontFamily: constants.$fontFamily,
    //     color: constants.$accentColor,
    //     fontSize: 16,
    // },

    // for name and title
    descriptionContainer:{
        flex: 1,
        position: 'relative',
        marginLeft: '1%',
        zIndex: 99,
        top: '-10%',
        left: '117%',
    },
    // iconContainer:{
    //     flexDirection: 'row',
    //     position: 'relative',
    //     left: '170%',
    //     top: '-35%',
    //     zIndex: 5,
    //     marginRight: '2%',
    // },
    // icon: {
    //     color: constants.$senaryColor,
    //     paddingHorizontal: '4.5%',
    //     zIndex: 999,
    //     position: 'relative',
    // },
    // contentScroll:{
    //     color: constants.$textColor2,
    //     textAlign: 'justify',
    //     paddingHorizontal: '3.9%',
    //     top: '15%',
    //     right: '320%',
    //     zIndex: 99,

    // },
    // contentProfile: {
    //     fontSize: 16,
    //     fontFamily: constants.$fontFamily,
    //     color: constants.$textColor1,
    //     textAlign: 'left',
    //     lineHeight: 24,
    //     right: '-50%',
    //     maxWidth: '40%',
    //     maxHeight: '40%',
    //     // backgroundColor: '#FFFF00',

    // },
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