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
  fontSize: "1.1rem",
  minW: "30px",
  justifyContent: "flex-start",
  p: "0",
  color: "gray",
  _hover: { background: "transparent", color: "#464646" },
};

export const commentInput = {
  border: "none",
  flex: "1",
  fontSize: "0.8rem",
  p: 0,
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
