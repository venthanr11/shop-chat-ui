import styled from "@emotion/styled"

const config = {
  primary: {
    color: "#707070",
  },
  success: {
    color: "#089458",
  },
  error: {
    color: "#ff3b3b",
  },
  secondary: {
    color: "#b1b1b1",
  },
}

export const PrimaryText = styled("p")`
  color: ${({ type = "primary" }) => config[type].color};
  font-size: ${({size = 14}) => `${size}px`};
  font-weight: ${({weight = 400}) => weight};
  line-height: 1.5;
  margin: 0;
`

export const BlockText = styled("p")`
  color: rgb(82, 82, 82);
  font-size: ${({size = 16}) => `${size}px`};
  font-weight: ${({weight = 600}) => weight};
  font-weight: 600;
  margin: 0;
`

export const SectionHeading = styled("p")`
  color: rgb(82, 82, 82);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`

export const CalloutText = styled("p")`
  color: #ff3b3b;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
  font-size: 13px;
`
