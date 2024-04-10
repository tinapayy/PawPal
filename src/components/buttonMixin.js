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
  },
  settingsButton:{
    width: '105%',
    margin: '5%',
    padding: '4%',
    borderRadius: 15,
    position: 'relative',
    elevation: 5,
  },
  settingsButtonText:{
    marginLeft: '4%',
    fontSize: 20,
    paddingVertical: '2%',
  },
};