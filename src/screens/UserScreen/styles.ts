import styled from "styled-components/native";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #F5A44D;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border-radius: 8px;
  padding: 2px;
`;

export const HeaderText = styled.Text`
  color: white;
  font-weight: 700;
`;

export const Container = styled.View`
  flex: 1;
  justifyContent: 'center';
  alignItems: 'center';
`;

export const ModalContainer = styled.View`
  flex: 1;
  justifyContent: 'center';
  alignItems: 'center';
  backgroundColor: 'rgba(229,229,229, 0.9)';
`;

export const ModalContent = styled.View`
  backgroundColor: 'white';
  padding: 20px;
  borderRadius: 10px;
  alignItems: 'center';
`;

