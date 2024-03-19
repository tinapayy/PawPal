//homepage array of information


export interface data1 {
    id: number;
    imageSource: string;
    title: string;
    description: string;
    info1: string;
    info2: string;
}

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

export const data1 = [
    {
        id: 1,
        imageSource: require('../images/rebadulla.jpg'),
        title: 'Rebadulla Animal Hospital',
        description: '88 Commission Civil St, Jaro, Iloilo City',
        info1: 'Open Now',
        info2: 'Wednesday 9:00 AM - 5:00 PM',
    },
    {
        id: 2,
        imageSource: require('../images/cornerstone.jpg'),
        title: 'Cornerstone Veterinary Clinic',
        description: 'Faith Bldg, Jalandoni St., Jaro, Iloilo City',
        info1: 'Open Now',
        info2: 'Wednesday 9:00 AM - 5:00 PM',
    },
    {
        id: 3,
        imageSource: require('../images/rebadulla.jpg'),
        title: 'Rebadulla Animal Hospital',
        description: '88 Commission Civil St, Jaro, Iloilo City',
        info1: 'Open Now',
        info2: 'Wednesday 9:00 AM - 5:00 PM',
    },
];

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