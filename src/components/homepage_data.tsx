//homepage array of information

export interface data3 {
    id: number;
    img1: string; 
    img2: string;
    img3: string;
    imageSome: string;
    title: string;
    description: string;
    imageSource: string;
}
export const data3 = [
    {
        id: 1,
        img1: require('../images/Ellipse17.png'),
        img2: require('../images/Vector_11.png'),
        img3: require('../images/Ellipse18.png'),
        imageSome: require('../images/defaultIcon.png'),
        title: 'Are cats allowed to eat chocolates?',
        description: 'Click Here',
        imageSource: require('../images/kitty.png'),
    },
    {
        id: 2,
        img1: require('../images/Ellipse17.png'),
        img2: require('../images/Vector_11.png'),
        img3: require('../images/Ellipse18.png'),
        imageSome: require('../images/defaultIcon.png'),
        title: 'Are dogs allowed to eat grapes?',
        description: 'Click Here',
        imageSource: require('../images/doggy.png'),
    },
    {
        id: 3,
        img1: require('../images/Ellipse17.png'),
        img2: require('../images/Vector_11.png'),
        img3: require('../images/Ellipse18.png'),
        imageSome: require('../images/defaultIcon.png'),
        title: 'Are cats allowed to eat peanut butter?',
        description: 'Click Here',
        imageSource: require('../images/kitty.png'),
    },
];