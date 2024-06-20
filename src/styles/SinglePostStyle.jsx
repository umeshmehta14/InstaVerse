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
  height: { base: "100vh", md: "100%" },
};

export const mobileCommentHeading = {
  p: "0.5rem",
  align: "center",
  gap: "1rem",
  display: { base: "flex", md: "none" },
};

export const mobileFooterStyle = {
  pos: "relative",
  p: "0",
  justifyContent: "flex-start",
  display: { base: "flex", md: "none" },
  pos: "fixed",
  bottom: 0,
  width: "100%",
};

export const addCommentMainBox = {
  pos: "relative",
  p: "4px 8px",
  borderTop: "1px solid gray",
  alignItems: "center",
  w: "100%",
};

export const mobilePostMainBoxStyle = {
  maxH: "92vh",
  zIndex: "5",
  pos: "fixed",
  top: "0",
  align: "flex-start",
  gap: "0.3rem",
  w: "100vw",
  overflowY: "auto",
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
  h: "100%",
  overflow: "auto",
  mb: { base: "3rem", md: "0" },
};

export const commentTextStyle = {
  fontWeight: 0,
  width: "100%",
  overflowWrap: "break-word",
  whiteSpace: "normal",
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

export const commentLoaderStyle = {
  pos: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const replyPopup = {
  pos: "absolute",
  bgColor: "#cccccc",
  w: "100%",
  top: "-3.6rem",
  padding: "0.9rem 0.5rem",
  fontWeight: "700",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#414141",
};
