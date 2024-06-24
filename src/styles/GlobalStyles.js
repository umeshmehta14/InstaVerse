import { color } from "framer-motion";

export const heroContentBox = {
  gap: "1rem",
  w: "100%",
  flexDir: { base: "column", lg: "row-reverse" },
  justifyContent: "center",
  mt: "1rem",
  alignItems: { base: "center", lg: "flex-start" },
  mb: { base: "4rem", md: "0.4rem" },
};

export const emptyMessageStyle = {
  justifyContent: "center",
  h: "70%",
  textAlign: "center",
  align: "center",
  fontSize: "2xl",
  gap: "0.5rem",
  p: "1rem",
  minW: { md: "468px" },
};

export const followedByUser = {
  color: "gray",
  px: "1rem",
  pb: "0.5rem",
};

export const emojiPickerButton = {
  fontSize: "1.2rem",
  cursor: "pointer",
  color: "gray",
  _hover: { color: "#464646" },
};

export const emojiPickerButtonNew = {
  background: "transparent",
  fontSize: "1.2rem",
  justifyContent: "flex-start",
  p: "0",
  color: "gray",
  _hover: { background: "transparent", color: "#464646" },
  cursor: "pointer",
};

export const emojiPickerSinglePost = {
  fontSize: "2rem",
};

export const commentInput = {
  border: "none",
  flex: "1",
  fontSize: "14px",
  px: "2",
  _focus: {
    outline: "none",
    boxShadow: "none",
    border: "none",
  },
};

export const inputLengthReader = {
  pos: "absolute",
  bottom: "-1rem",
  right: "0.5rem",
  fontSize: "0.7rem",
};

export const simpleButton = {
  w: "100%",
  bg: "transparent",
  _hover: { bg: "transparent", color: "inherit" },
  fontWeight: "0",
};

export const editFormInput = {
  border: "none",
  borderRadius: "0",
  borderBottom: "1px solid",
  px: 0,
  _focusVisible: {
    border: "none",
    borderBottom: "1px solid",
  },
};

export const editFormLabel = {
  m: 0,
  fontWeight: 200,
  color: "gray",
};

export const hideScrollbar = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
};

export const userNameStyle = {
  fontFamily: "boldFont",
  cursor: "pointer",
  _hover: { color: "gray" },
};

export const likeHeartStyle = {
  cursor: "pointer",
  color: "red",
};

export const userMentionListMain = {
  pos: "absolute",
  maxH: "300px",
  overflow: "scroll",
  w: "70%",
  p: "0.5rem",
  zIndex: 9999,
};

export const userMentionUsers = {
  gap: "2",
  my: "2",
  cursor: "pointer",
  w: "100%",
  _hover: { bg: "#1f1f1f6a" },
};

export const smTextModalStyle = {
  color: "gray",
  fontSize: "0.8rem",
  textAlign: "center",
  mb: "0.5rem",
  px: "1rem",
};

export const aboutAccountIconMain = {
  gap: "1rem",
  flexDir: "column",
  alignSelf: "flex-start",
  padding: "1rem",
};

export const clearModalSmText = {
  color: "gray",
  fontSize: "0.8rem",
  textAlign: "center",
  mb: "0.5rem",
  px: "1rem",
};

export const userViewBoxStyle = {
  gap: "2",
  my: "2",
  cursor: "pointer",
  w: "100%",
  _hover: { bg: "#1f1f1f6a" },
};

export const commentBtnMain = {
  fontSize: "1rem",
  variant: "link-button",
  size: "sm",
  _disabled: { color: "gray.400", cursor: "default" },
};
