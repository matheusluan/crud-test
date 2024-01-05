import styled from "styled-components/native";
import {styles}  from "../../global/styles_global";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 20px 0;
  padding: 2px;
`;

export const Username = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.heading};
  color: ${styles.colors.heading};
`;

export const Subtitle = styled.Text`
  font-family: ${styles.fonts.regular};
  font-size: ${styles.sizes.highlight};
  color: ${styles.colors.body};
`;

export const Logo = styled.TouchableHighlight`
  background: white; 
  height: 60px;
  width: 60px;
  border-radius: 30px;
  overflow: hidden;

  align-items: center;
  justify-content: center;
`;