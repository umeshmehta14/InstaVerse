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

export const addCommentMainBox = {
  pos: "relative",
  py: "1",
  borderTop: "1px solid gray",
  alignItems: "center",
  w: "100%",
};

export const mobilePostMainBoxStyle = {
  h: "92vh",
  zIndex: "5",
  pos: "fixed",
  top: "0",
  align: "flex-start",
  gap: "0.3rem",
  w: "100vw",
};

export const mobileSinglePostHeading = {
  p: "0.5rem",
  align: "center",
  gap: "1rem",
  display: { base: "flex", md: "none" },
  w: "100%",
};

export const displayCommentMainBox = {
  flexDir: "column",
  p: "0.5rem",
  align: "flex-start",
  gap: "1rem",
  w: "100%",
  maxH: { base: "none", md: "275px" },
  minH: { base: "none", md: "275px" },
  overflow: "auto",
  mb: { base: "3rem", md: "0" },
};

export const commentTextStyle = {
  fontWeight: 0,
  width: "100%",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  wordBreak: "break-all",
};

export const commentFooterInputMain = {
  pos: "relative",
  py: "1",
  borderTop: "1px solid gray",
  borderBottom: "1px solid gray",
  alignItems: "center",
  display: { base: "none", md: "flex" },
  w: "100%",
};
