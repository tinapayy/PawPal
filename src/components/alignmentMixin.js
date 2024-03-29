import constants from "../styles/constants";

export const alignmentMixin = {
  alignment: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  alignment1: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  alignClinic: {
    paddingTop: '5%',
    paddingLeft: '10%',
    fontSize: 25,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilyMedium,
  }
};