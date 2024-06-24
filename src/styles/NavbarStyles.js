export const mobileNavbarStyle = {
  display: { base: "flex", md: "none" },
  position: "sticky",
  top: "0",
  h: "3rem",
  align: "center",
  zIndex: 1,
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
  w: { base: "100%", md: "5rem", lg: "100%" },
  maxW: { lg: "240px" },
  top: { base: "auto", md: "0" },
  py: { base: "0", md: "0.5rem" },
  pb: { md: "3.5rem" },
  zIndex: 1,
  borderTop: { base: "1px solid gray", md: "none" },
  borderRight: { base: "none", md: "1px solid gray" },
  justifyContent: "space-between",
};

export const navRoutesStyle = {
  gap: { base: "1.5rem", lg: "1rem" },
  fontSize: "2rem",
  flexDir: { base: "row", md: "column" },
  align: "center",
  w: { base: "100%", md: "auto" },
  p: { base: "1rem", md: "0rem" },
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

export const sidebarLogoBoxStyles = {
  flexDirection: { base: "row", md: "column" },
  h: { base: "auto", md: "70%" },
  w: { base: "100%", lg: "90%" },
  mx: "auto",
  maxH: "520px",
  justifyContent: { base: "space-between", lg: "flex-start" },
};

export const sideBarLogoMain = {
  fontFamily: "Pacifico, cursive",
  fontSize: "1.5rem",
  display: { base: "none", lg: "flex" },
  pl: "0.5rem",
};

export const navlinkStyle = {
  width: { lg: "100%" },
  borderRadius: { lg: "30px" },
  padding: { lg: "6px" },
  cursor: "pointer",
  columnGap: "0.8rem",
  justifyContent: { base: "center", lg: "flex-start" },
};

export const navPopOverMain = {
  display: { base: "none", md: "flex" },
  w: { md: "100%", lg: "90%" },
  mx: "auto",
  mt: "4rem",
  justify: "center",
  className: "nav-item",
};
