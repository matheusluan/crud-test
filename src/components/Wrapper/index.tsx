import { ColorValue } from "react-native";
import { Container, Content } from "./styles";

type WrapperProps = {
  children: React.ReactNode;
  backgroundColor?: ColorValue;
};

export function Wrapper({ children, backgroundColor = '#F5F5F5' }: WrapperProps) {
  return (
    <Container style={{ backgroundColor }}>
      <Content>{children}</Content>
    </Container>
  );
}