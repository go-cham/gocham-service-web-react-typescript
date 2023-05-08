/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import react, { useEffect, useState } from "react";
import React from "react";
import styled from "@emotion/styled";
import palette from "../../style/color";

const SelectMyPostType = ({
  postType,
  setPostType,
}: {
  postType: string;
  setPostType: React.Dispatch<any>;
}) => {
  console.log(postType);
  const TempPostCount = 12;
  return (
    <SelectMyPostTypeWrap>
      <SelectMyPostTypeBar>
        {postType === "내 게시글" ? (
          <SelectMyPostTypeBox selected={true}>
            내 게시글 {TempPostCount}
          </SelectMyPostTypeBox>
        ) : (
          <SelectMyPostTypeBox onClick={() => setPostType("내 게시글")}>
            내 게시글 {TempPostCount}
          </SelectMyPostTypeBox>
        )}
        {postType === "참여한 게시글" ? (
          <SelectMyPostTypeBox selected={true}>
            참여한 게시글 {TempPostCount}
          </SelectMyPostTypeBox>
        ) : (
          <SelectMyPostTypeBox onClick={() => setPostType("참여한 게시글")}>
            참여한 게시글 {TempPostCount}
          </SelectMyPostTypeBox>
        )}
      </SelectMyPostTypeBar>
    </SelectMyPostTypeWrap>
  );
};

export default SelectMyPostType;

const SelectMyPostTypeWrap = styled.div`
  margin-top: 1.9rem;
  border-top: 0.1rem solid ${palette.Gray3};
  height: 7.7rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectMyPostTypeBar = styled.div`
  width: 34rem;
  height: 4.1rem;
  background-color: #eaeaeb;
  border-radius: 2.35rem;
  //display: grid;
  //grid-template-columns: repeat(2, 1fr);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const fadeIn = keyframes`
  
`;

const SelectMyPostTypeBox = styled.div<{ selected?: boolean }>`
  width: 17rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  font-size: 1.4rem;
  color: ${({ selected }) => (selected ? "white" : palette.Text3)};
  border-radius: ${({ selected }) => (selected ? "2.35rem" : "0")};
  background-color: ${({ selected }) =>
    selected ? palette.Secondary : "rgba(0, 0, 0, 0)"};
  animation: ${({ selected }) => (selected ? `fadeIn .3s linear` : "")};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;