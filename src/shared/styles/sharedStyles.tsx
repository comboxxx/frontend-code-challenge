import { Button } from "react-bootstrap";
import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
`;

export const FlexContainerSpaceBetween = styled(FlexContainer)`
  justify-content: space-between;
`;

export const FlexContainerSpaceAround = styled(FlexContainer)`
  justify-content: space-around;
`;

type TFlexColumn = {
  flex?: string;
};

export const FlexColumn = styled.div`
  flex: ${(props: TFlexColumn) => props.flex || "3"};
`;

export const DividerWhite = styled.hr`
  border-color: white;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;
