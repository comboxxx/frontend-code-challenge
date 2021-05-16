import React from "react";

export const CoinLogo: React.FC<{ logo: string }> = ({ logo }) => {
  return (
    <div>
      <img src={logo} style={{ width: 42, height: 42 }} alt="zmt_logo" />
    </div>
  );
};
