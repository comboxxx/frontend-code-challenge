import styled, { css } from "styled-components";
import { FlexContainer } from "./sharedStyles";
import { Card } from "react-bootstrap";
import {
  mainGreen,
  mainGreenRGB,
  mainRed,
  mainRedRGB,
} from "../defaultValues";

const leftPosition = "-100";
const rightPosition = "200";

export const Container = styled.div`
  padding: 13px;
  border-radius: 5px;
  padding-bottom: 78px;
`;

export const Divider = styled.hr`
  border-color: #26bdca;
`;

type TCurrentPriceCardContainer = {
  mode: string;
};

export const CurrentPriceCardContainer = styled.div`
  border-radius: 3px;

  ${(props: TCurrentPriceCardContainer) => {
    // DEFAULT RED
    let textColor = "red";
    let bgColor = mainRed;

    if (props.mode === "increment") {
      bgColor = mainGreen;
      textColor = "#21a0ab";
    }

    return css`
      background: linear-gradient(
        90deg,
        ${bgColor} ${leftPosition}%,
        white 50%,
        ${bgColor} ${rightPosition}%
      );
      color: ${textColor};
    `;
  }}
  padding: 6px;
  font-weight: bold;
  text-align: center;
`;

interface TSubTableColumn {
  position?: string; //left, right
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
}

interface TSubTableRow extends TSubTableColumn {
  transactionPercent?: string; //1-100
}

export const SubTableColumn = styled.div`
  flex: 6;
  text-align: ${(props: TSubTableColumn) => props.position || "left"};
  color: ${(props: TSubTableColumn) => props.color || ""};
`;

export const SubTableRow = styled(FlexContainer)`
  ${(props: TSubTableColumn) => {
    if (props.position === "right")
      return css`
        flex-direction: row-reverse;
      `;

    return css`
      flex-direction: row;
    `;
  }}

  font-size: ${(props: TSubTableColumn) => props.fontSize};
  line-height: ${(props: TSubTableColumn) => props.lineHeight};
  color: ${(props: TSubTableColumn) => props.color || ""};
  font-weight: ${(props: TSubTableColumn) => props.fontWeight || "normal"};

  ${(props: TSubTableRow) => {
    if (props.transactionPercent) {
      let percentPosition = "left";
      let percentColor = mainRedRGB;

      if (props.position === "left") {
        percentPosition = "right";
        percentColor = mainGreenRGB;
      }

      return css`
        background: linear-gradient(
          to ${percentPosition},
          rgba(${percentColor}, 0.2) ${props.transactionPercent}%,
          rgba(255, 255, 255, 0) 0%
        );
      `;
    }
  }}
`;

export const OrderBookDivider = styled.hr`
  margin-bottom: 3px;
  margin-top: 3px;
`;

export const BuyAndSellBottomButtonsContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 13px;
  margin-top: 10px;
  right: 0px;
  padding-left: 13px;
  padding-right: 13px;
`;

export const BuyAndSellBottomButtonsCard = styled(Card)`
  padding: 7px;
`;
