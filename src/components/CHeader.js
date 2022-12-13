import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CHeader = () => {
  return (
    <Header>
      <HeaderDiv>
        <a href="/">
          <HeaderImage src={require(`./LOGO.png`)}></HeaderImage>
        </a>
        <HeaderInputForm onSubmit={onSearch} name="headerI">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color="#333d4b"
            style={{
              paddingRight: "10px",
            }}
          ></FontAwesomeIcon>
          <HeaderInput
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="검색어를 입력하세요."
          />
        </HeaderInputForm>
      </HeaderDiv>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  margin-bottom: 20px;
  background-color: white;
  border-bottom: 0.6px solid rgb(214, 214, 214, 0.6);
`;

const HeaderDiv = styled.div`
  width: 90%;
  height: 100%;
  max-width: 1180px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 97%;
  }
`;

const HeaderInputForm = styled.form`
  display: flex;
  align-items: center;
  width: 260px;
  height: 24px;
  background-color: #f2f4f6;
  border-radius: 10px;
  padding: 7px 17px;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    margin-right: 14px;
    width: 170px;
  }
`;

const HeaderInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background-color: #f2f4f6;
  font-size: 18px;
  font-weight: 300;
  color: #333d4b;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const HeaderImage = styled.img`
  width: 140px;
  margin-top: 16px;

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`;

export default CHeader;
