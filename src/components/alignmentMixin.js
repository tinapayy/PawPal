import constants from '../styles/constants';

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
    marginLeft: -5,
  },
  alignClinic: {
    paddingTop: '3%',
    paddingLeft: '11%',
    fontSize: 21,
    color: constants.$secondaryColor,
    fontFamily: constants.$fontFamilyMedium,
  },
  align: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // chatpage customized

  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  measurements: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  measurements1: {
    width: 30,
    height: 30,
  },
};
