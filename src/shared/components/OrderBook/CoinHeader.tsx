import React from "react";
import { TCoinHeader } from "../../models/CoinInfo";
import { FlexContainerSpaceBetween } from "../../styles/sharedStyles";
import { CoinLogo } from "../sharedComponents";

const CoinHeader: React.FC<TCoinHeader> = ({
  coinName,
  coinAbbreviations,
  logo,
}) => {
  return (
    <div>
      <FlexContainerSpaceBetween>
        <div>
          <div style={{ color: "white", marginBottom: 5 }}>
            <span style={{ fontSize: 25 }}>{coinName}</span>
            <span style={{ fontSize: 15 }}> ({coinAbbreviations}/USD)</span>
          </div>
          <span style={{ color: "lightgray" }}>ORDER BOOK</span>
        </div>
        <div style={{ alignSelf: "center" }}>
          <CoinLogo logo={logo} />
        </div>
      </FlexContainerSpaceBetween>
    </div>
  );
};

export default CoinHeader;
