import styled from "styled-components";

export const StyledCard = styled.div`
  overflow: hidden;
  padding: 10px 32px;
  margin: 48px auto 0;
  width: ${props => (props.isPreview ? "" : "1000px")};
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  display: block;
  text-transform: uppercase;
  padding: 8px 12px;
  background-color: transparent;
  color: ${props => (props.color ? props.color : "grey")};
  border-radius: 6px;
  border: 2px solid grey;
  transition: all 300ms ease;
  margin-top: 20px;
  :hover {
    background-color: ${props => (props.color ? props.color : "grey")};
    color: white;
    border-color: ${props => (props.color ? props.color : "grey")};
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "300px")};
  margin: 70px auto;
  justify-content: space-between;
`;
export const StyledInput = styled.input`
  margin: 5px 0;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px 0 10px 7px;
  color: inherit;
  font-size: 14px;
  font-weight: inherit;
  line-height: 1.1;
  border: 1px solid grey;
  border-radius: 6px;
  transition: all 300ms ease;
  &:focus {
    border: none;
  }
`;
