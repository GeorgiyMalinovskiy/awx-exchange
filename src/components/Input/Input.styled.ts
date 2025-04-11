import styled from "styled-components";

export const InputRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
`;

export const InputInner = styled.div`
  position: relative;
  height: 58px;
  display: flex;
  align-items: center;
  gap: var(--spacing);
    margin-bottom: var(--spacing);
    border-bottom: 1px solid var(--border-color);
  }
`;

export const InputInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
`;

export const InputText = styled.span`
  color: var(--primary-color);
  vertical-align: middle;
  font-size: 32px;
  font-weight: 600;
`;

export const InputValue = styled.span`
  vertical-align: middle;
  font-size: 42px;
  font-weight: 600;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const InputProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing);
  @media (min-width: 320px) {
    flex-direction: row;
  }
`;

export const InputProgressButton = styled("button")<{
  "data-index": number;
  "data-total": number;
}>`
  position: relative;
  text-align: center;
  width: 100%;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  @media (min-width: 320px) {
    width: calc(100% / ${({ "data-total": dataTotal }) => dataTotal});
  }
`;
