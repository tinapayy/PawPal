import constants from '../constants';

// profile details mixins

export const profDetMixins = {
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
        // position: 'absolute',
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
    }
}