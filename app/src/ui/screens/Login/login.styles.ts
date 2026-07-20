import styled from "styled-components";
import { Box, Card, Avatar } from "@mui/material";

export const Page = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #faf9fc 0%, #ede9fe 100%);
  padding: 16px;
`;

export const LoginCard = styled(Card)`
  && {
    width: 100%;
    max-width: 420px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const BrandRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BrandCircle = styled(Avatar)`
  && {
    background-color: #10b981;
    width: 44px;
    height: 44px;
  }
`;

export const Footer = styled(Box)`
  text-align: center;
  color: #6b6880;
  font-size: 12px;
`;
