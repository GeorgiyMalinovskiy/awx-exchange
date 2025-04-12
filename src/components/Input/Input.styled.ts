import styled from "styled-components";

export const InputRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing);
  max-width: 100%;
  @media (min-width: 425px) {
    max-width: 381px;
  }
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
  top: 0;
  bottom: 0;
  left: 0;
  font-size: 42px;
  font-weight: 600;
  opacity: 0;
  z-index: 1;
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
  z-index: -1;
`;

export const InputProgress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing);
`;

export const InputProgressButton = styled("button")<{
  "data-index": number;
  "data-steps": number;
  "data-progress": number;
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
    width: calc(100% / ${({ "data-steps": dataSteps }) => dataSteps});
  }
  &:before {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    color: var(--text-color);
    z-index: 1;
  }
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--primary-color);
    z-index: 2;
  }
  & > span {
    position: absolute;
    inset: 0;
    color: var(--text-inverse-color);
    z-index: 3;
    clip-path: inset(0 ${({
      "data-progress": dataProgress,
      "data-index": dataIndex,
      "data-steps": dataSteps,
    }) => {
      const progress = Math.max(
        0,
        (dataProgress - dataIndex * (100 / dataSteps)) * dataSteps
      );
      return progress ? `calc(100% - ${progress}%)` : `100%`;
    }} 0 0);
  }
  ${({
    "data-progress": dataProgress,
    "data-steps": dataSteps,
    "data-index": dataIndex,
  }) => {
    const progress = Math.max(
      0,
      (dataProgress - dataIndex * (100 / dataSteps)) * dataSteps
    );

    return `
        &:after {
          width: ${progress}%;
        }
      `;
  }}}
`;
