import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
  align-self: center;
  @media (min-width: 425px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
