export const mobileNavbarStyle = {
  display: { base: "flex", md: "none" },
  position: "sticky",
  top: "0",
  h: "3rem",
  align: "center",
  px: "1rem",
  columnGap: "0.5rem",
  borderBottom: "1px solid gray",
  w: "100%",
  justifyContent: "space-between",
};

export const sidebarStyle = {
  position: { base: "fixed", md: "sticky" },
  bottom: 0,
  h: { base: "fit-content", md: "100vh" },
  flexDirection: { base: "row", md: "column" },
  w: { base: "100%", md: "5rem", lg: "15rem" },
  top: { base: "auto", md: "0" },
  py: "0.5rem",
  pl: { lg: "1rem" },
  borderTop: { base: "1px solid gray", md: "none" },
  borderRight: { base: "none", md: "1px solid gray" },
  justifyContent: "space-between",
};

export const navRoutesStyle = {
  gap: "1.5rem",
  fontSize: "2rem",
  flexDir: { base: "row", md: "column" },
  align: "center",
  w: { base: "100%", md: "auto" },
  p: { base: "1rem", md: "2rem", lg: "0rem" },
  py: { lg: "2rem" },
  alignItems: { base: "center", lg: "baseline" },
  justifyContent: { base: "space-between", md: "center" },
};

export const desktopLogoStyles = {
  cursor: "pointer",
  justifyContent: { base: "center", lg: "flex-start" },
  align: "center",
  w: "100%",
  py: "2rem",
  fontSize: "2rem",
  display: { base: "none", md: "flex" },
};
