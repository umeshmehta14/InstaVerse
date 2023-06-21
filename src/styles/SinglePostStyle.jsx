export const modalContentStyle = {
  p: 0,
  maxW: "896px !important",
  w: "100%",
  maxH: { base: "auto", md: "750px" },
};

export const singlePostModalClose = {
  display: { base: "none", md: "flex" },
  _hover: { bg: "red" },
  pos: "absolute",
  right: "0",
  top: "-3rem",
};

export const mediaPostBox = {
  display: { base: "none", md: "flex" },
  height: "100%",
  flex: 1,
  alignItems: "center",
};

export const commentSectionMain = {
  flexDir: "column",
  gap: "0.5rem",
  width: "100%",
  maxW: { base: "100%", md: "400px" },
};

export const mobileCommentHeading = {
  p: "0.5rem",
  align: "center",
  gap: "1rem",
  display: { base: "flex", md: "none" },
};

export const mobileFooterStyle = {
  p: "0",
  justifyContent: "flex-start",
  display: { base: "flex", md: "none" },
  pos: "fixed",
  bottom: 0,
  width: "100%",
};
