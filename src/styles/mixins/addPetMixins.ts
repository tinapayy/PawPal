import constants from '../constants';

// addPet and edit Pet Mixins

export const addPetMixins={
    input:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 18,
        fontFamily: constants.$fontFamily,
    },
    align:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',

    },
    align1:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    align3:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    align4:{
        alignContent: 'center',
        alignSelf: 'center',

    },
    align5:{
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontFamily: constants.$fontFamilyRegular,
    },
}