import styled from "styled-components";
import { Box, Card, TextField, Typography } from "@mui/material";

export const Container = styled(Box)`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PatientSelect = styled(TextField)`
  && {
    width: 100%;
    @media (min-width: 600px) {
      width: 260px;
    }
  }
`;

export const InfoCard = styled(Card)`
  && {
    padding: 24px;
    margin-bottom: 24px;
  }
`;

export const InfoSection = styled(Box)`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const HighlightSection = styled(Box)`
  padding: 16px;
  border-radius: 10px;
  background-color: #f5f3ff;
  border-left: 4px solid #a78bfa;
  margin-bottom: 20px;
`;

export const SectionLabel = styled("span")`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #6b6880;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

export const SectionText = styled(Typography)`
  && {
    white-space: pre-wrap;
    color: #1e1b2e;
    line-height: 1.5;
  }
`;

export const StatusLabel = styled("span")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #6b6880;
  text-transform: capitalize;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #10b981;
  }
`;

export const StatusSelect = styled(TextField)`
  && {
    width: 180px;
    .MuiInputBase-root {
      font-size: 13px;
    }
  }
`;
