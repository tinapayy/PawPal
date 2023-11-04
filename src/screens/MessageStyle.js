/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #f9fafd;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  ${'' /* top: 20px;
  padding-top: 40px; */}
`;
export const CardContainer = styled.view`
  flex: 1;
  margin-top: 80px; 
`;
export const Card = styled.TouchableOpacity`
  width: 100%;
  ${'' /* margin-top: 80px;
  top: 200px; */}
`;

export const UserInfo = styled.view`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.view`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
`;

export const UserInfoText = styled.view`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.text`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Poppins-Regular';
`;

export const MessageText = styled.text`
  font-size: 16px;
  color: #5a5a5a;
  ${'' /* border-bottom-width: 20px; */}
  borderBottomWidth: 10px;
`;

export default {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  TextSection,
  UserInfoText,
  UserName,
  // PostTime,
  MessageText,
};
