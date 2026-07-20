import styled from "styled-components";
import { AppBar, Box, Toolbar, Avatar, ListItemButton } from "@mui/material";

export const drawerWidth = 260;

export const Root = styled(Box)`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const StyledAppBar = styled(AppBar)`
  && {
    z-index: 1201;
    @media (min-width: 900px) {
      width: calc(100% - ${drawerWidth}px);
      margin-left: ${drawerWidth}px;
    }
  }
`;

export const DenseToolbar = styled(Toolbar)`
  && {
    min-height: 56px;
  }
`;

export const Spacer = styled(Box)`
  flex: 1;
`;

export const HeaderAvatar = styled(Avatar)`
  && {
    margin-left: 12px;
    width: 32px;
    height: 32px;
    background-color: #10b981;
    font-size: 13px;
  }
`;

export const Nav = styled(Box)`
  @media (min-width: 900px) {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

export const BrandWrap = styled(Box)`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #ece9f4;
`;

export const BrandAvatar = styled(Avatar)`
  && {
    background-color: #10b981;
    width: 36px;
    height: 36px;
  }
`;

export const DrawerColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const NavList = styled(Box)`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
`;

export const NavItemButton = styled(ListItemButton)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    border-radius: 8px;
  }
`;

export const Main = styled(Box)`
  flex-grow: 1;
  min-width: 0;
  overflow-y: auto;
  background-color: #faf9fc;
  padding: 72px 16px 24px;
  @media (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (min-width: 900px) {
    padding: 80px 32px 32px;
  }
`;

export const MainInner = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const LogoutBox = styled(Box)`
  padding: 12px;
  border-top: 1px solid #ece9f4;
`;
