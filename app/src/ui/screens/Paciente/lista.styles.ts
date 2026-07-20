import styled from "styled-components";
import { Box, Card, Avatar, TextField } from "@mui/material";

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

export const Actions = styled(Box)`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SearchField = styled(TextField)`
  && {
    margin-bottom: 24px;
    width: 100%;
    @media (min-width: 600px) {
      width: 360px;
    }
  }
`;

export const PacienteCard = styled(Card)`
  && {
    padding: 16px;
  }
`;

export const CardRow = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const InfoRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const PacienteAvatar = styled(Avatar)`
  && {
    background-color: #c4b5fd;
    color: #7c3aed;
    font-weight: 600;
  }
`;

export const CardActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const EvolucaoStatus = styled.span<{ $done: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background: ${(p) => (p.$done ? "#d1fae5" : "#fef3c7")};
  color: ${(p) => (p.$done ? "#047857" : "#92400e")};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => (p.$done ? "#10b981" : "#f59e0b")};
  }
`;