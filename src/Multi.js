import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DrugComponent from "./DrugComponent";

const Multi = () => {
  const [keyword, setKeyword] = useState("");
  const [searchkeyword, setSearchKeyword] = useState([
    "세티정25밀리",
    "훼로바",
  ]);

  //https://velog.io/@mochapoke/TIL-netlify%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-proxy-%EC%85%8B%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  //https://libertegrace.tistory.com/entry/Milestone-Week-3-%EB%B3%B5%EC%95%BD-%EC%A0%95%EB%B3%B4-%EC%A0%9C%EA%B3%B5-%EB%B0%8F-%EA%B4%80%EB%A6%AC
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  const URL = `${PROXY}/v1/search/encyc.json`;

  const testarr = [
    "실버셉트정10밀리",
    "쿠에타핀정50밀리",
    "20밀리",
    "아고틴",
    "파피온서방정",
    "서방정",
    "훼로바",
    "25밀리",
    "0.25밀리",
  ];
  const [inputCountA, setInputCountA] = useState([""]);

  const onSubmit = (e) => {
    if (e.target.name === "headerI") {
      e.preventDefault();
      setSearchKeyword([keyword]);
    } else {
      e.preventDefault();
      setSearchKeyword(inputCountA);
    }
  };

  return (
    <Sibal>
      <div>
        <Header>
          <HeaderDiv>
            <a href="/">
              <HeaderImage src={require(`./LOGO.png`)}></HeaderImage>
            </a>
            <form onSubmit={onSubmit} name="headerI">
              <HeaderInput
                type="text"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                placeholder="검색어를 입력하세요."
              />
            </form>
          </HeaderDiv>
        </Header>
        <div>
          <Drug>
            <InputWrapper>
              <InputForm onSubmit={onSubmit} name="underI">
                <Input
                  type="text"
                  onChange={(e) => {
                    setInputCountA(e.target.value.split(","));
                  }}
                  placeholder="여러개의 약품을 검색해보세요."
                />
                <Button>검색</Button>
              </InputForm>
            </InputWrapper>
          </Drug>
          <Drug>
            {searchkeyword.map((data, index) => (
              <DrugComponent searchkeyword={data} key={index} />
            ))}
          </Drug>
        </div>
      </div>
      <div>
        <Footer>
          <a href="http://developers.naver.com" target="_blank">
            <img
              src={require(`./NAVEROpenAPI_k.png`)}
              alt="NAVER 오픈 API"
              style={{ width: "150px", paddingTop: "12px" }}
            />
          </a>
          <FooterP>|</FooterP>
          <a href="https://www.data.go.kr/index.do" target="_blank">
            <img
              src={require("./gonggong.png")}
              style={{ width: "120px", paddingTop: "7px" }}
            />
          </a>
        </Footer>
      </div>
    </Sibal>
  );
};

const Sibal = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.footer`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 0.6px solid rgb(214, 214, 214, 0.6);
`;

const FooterP = styled.p`
  margin: 0px 20px;
  color: gray;
  font-size: 22px;
`;

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
    width: 100%;
  }
`;

const HeaderInput = styled.input`
  outline: none;
  border: 1px solid #dddddd;
  background-color: #fafafa;
  border-radius: 50px;
  padding: 7px 17px;
  margin-right: 22px;
  font-size: 20px;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    width: 180px;
    font-size: 15px;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  outline: none;
  width: 90%;
  height: 30px;
  border: 1px solid #dddddd;
  background-color: #fafafa;
  border-radius: 50px;
  padding: 3px 10px;
  font-size: 20px;
  font-weight: 400;

  margin-right: 10px;
  @media screen and (max-width: 768px) {
    width: 80%;
    font-size: 15px;
    margin-right: 10px;
  }
`;

const Button = styled.button`
  background-color: #fafafa;
  border-radius: 50px;
  width: 10%;
  height: 40px;
  padding: 3px 10px;
  cursor: pointer;
  outline: none;
  border: 1px solid #dddddd;
  font-size: 15px;
  font-weight: 400;

  @media screen and (max-width: 768px) {
    width: 20%;
  }
`;

const HeaderImage = styled.img`
  width: 150px;
  margin-top: 16px;

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`;

const Drug = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DrugWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  max-width: 1100px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;

  &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  }
`;

const InputWrapper = styled.div`
  display: block;
  width: 85%;
  max-width: 1100px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;

  &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  }
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Multi;
