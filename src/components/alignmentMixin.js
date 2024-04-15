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
    paddingTop: '3%',
    paddingLeft: '11%',
    fontSize: 23,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilyMedium,
  },
  align:{
    justifyContent: 'center',
    alignItems: 'center',
  }
};