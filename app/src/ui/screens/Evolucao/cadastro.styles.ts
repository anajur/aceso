import styled from "styled-components";
import { Box, Card } from "@mui/material";

export const Container = styled(Box)`
  max-width: 820px;
  margin: 0 auto;
`;

export const HeaderRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const FormCard = styled(Card)`
  && {
    padding: 24px;
  }
`;

export const SectionLabel = styled(Box)`
  color: #6b6880;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const ButtonRow = styled(Box)`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;