import constants from '../constants';

// profile details mixins

export const profDetMixins = {
  //profileDetails styling

  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  input: {
    color: constants.$accentColor1,
    fontFamily: constants.$fontFamilyBold,
    fontSize: 13.1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: '2%',
  },
  // logo
  pawLogo: {
    resizeMode: 'contain',
    width: '15%',
    top: '-75%',
    left: '74%',
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'relative',
    height: '24%',
    zIndex: -100,
  },
  backButton: {
    top: '2%',
    right: '80%',
  },
  profDetText: {
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
  titlePet: {
    fontFamily: constants.$fontFamilyBold,
    color: constants.$secondaryColor,
    fontSize: 24,
    position: 'relative',
    padding: '2.5%',
    textAlign: 'left',
  },

  //for profile
  avatarContainer: {
    left: '50%',
    position: 'relative',
    marginRight: '-10%',
    top: '15%',
  },
  // alignments
  align: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};
