import constants from "../styles/constants";

export const buttonMixin = {
  button: {
    backgroundColor: constants.$primaryColor,
    borderRadius: 25,
    width: 150,
    height: 45,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    //top: '8%',
  },
};