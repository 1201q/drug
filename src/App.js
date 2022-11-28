import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  faCircleExclamation,
  faExclamation,
  faMagnifyingGlass,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DotWave, Orbit } from "@uiball/loaders";

//https://velog.io/@mochapoke/TIL-netlify%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-proxy-%EC%85%8B%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const URL = `${PROXY}/v1/search/encyc.json`;

function App() {
  const [sibal, setSibal] = useState([]);
  const [keyword, setKeyword] = useState("타이레놀");
  const [searchkeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    test();
  }, [searchkeyword]);

  const modalOpenHandler = () => {
    setModalOpen(!modalOpen);
  };

  const test = async (parm) => {
    setLoading(true);
    axios
      .get(URL, {
        params: {
          query: keyword,
          display: 15,
        },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
        },
        withCredentials: true,
      })
      .then((res) => {
        setSibal(res.data.items);
        setLoading(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchKeyword(keyword);
  };

  return (
    <MainDiv className="App">
      {modalOpen ? (
        <Modal>
          <ModalBtn onClick={modalOpenHandler}>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              size="2x"
              style={{ marginTop: "0px", color: "lightgray" }}
            />
          </ModalBtn>
          {/* <img src={require(`./error1.png`)} style={{ width: "50%" }} /> */}
          {/* <hr style={{ noshade: "noshade", size: "1" }}></hr> */}

          <p>네이버API와의 통신과정에서 SSL인증서에 문제가 생긴 것 같아요.</p>
          <p>
            1.{" "}
            <a href="https://openapi-dbscthumb.phinf.naver.net/3323_000_9/20180225231600784_Z54DWI5RG.jpg/A11ABBBBB160703.jpg?type=m160_160">
              클릭해주세요.
            </a>
          </p>
          <p>2. 고급을 클릭하세요.</p>
          <img src={require(`./error3.png`)} style={{ width: "100%" }} />
          <p>3. 링크를 클릭하세요.</p>
          <img src={require(`./error4.png`)} style={{ width: "100%" }} />
          <p>4. 이미지가 나타나면 뒤로가기를 누르세요.</p>
        </Modal>
      ) : (
        ""
      )}
      <MainContainer>
        <FormDiv>
          <p
            style={{
              margin: 0,
              marginTop: 0,
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            의약품정보검색
          </p>

          <FormForm onSubmit={onSubmit}>
            <FormInput
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="검색어를 입력하세요"
            />
            <button
              type="submit"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="2x"
                style={{ marginTop: "0px", color: "gray" }}
              />
            </button>
          </FormForm>
        </FormDiv>
        <ModalOpenDiv onClick={modalOpenHandler}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="1x"
            style={{ marginTop: "0px", marginRight: "10px", color: "white" }}
          />
          이미지가 출력되지 않을 때 , 해결방법
        </ModalOpenDiv>
        {!loading ? (
          <DrugContainer>
            {sibal.map((data, index) => (
              <DrugDiv
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <DrugImg>
                  {data.thumbnail.includes("dthumb") ||
                  data.thumbnail === "" ? (
                    <img
                      style={{
                        width: "160px",
                        height: "100px",
                        borderRadius: "10px",
                      }}
                      src={require(`./imageA.png`)}
                    />
                  ) : (
                    <img
                      style={{
                        width: "160px",
                        height: "100px",
                        borderRadius: "10px",
                      }}
                      src={data.thumbnail.replace("http", "https")}
                    />
                  )}
                </DrugImg>

                <div style={{ width: "500px" }}>
                  <DrugP>
                    <DrugA href={`${data.link}`} target="_blank">
                      {data.title
                        .replace("<b>", "")
                        .replace("</b>", "")
                        .replace("<b>", "")
                        .replace("</b>", "")}
                    </DrugA>
                  </DrugP>
                  <DrugSubDiv>
                    <DrugP>
                      <DrugA
                        href={`https://search.naver.com/search.naver?query=site:health.kr+${data.title
                          .replace("<b>", "")
                          .replace("</b>", "")}`}
                        target="_blank"
                      >
                        약학정보원
                      </DrugA>
                    </DrugP>
                    <DrugP>
                      <DrugA
                        href={`https://nedrug.mfds.go.kr/searchDrug?sort=&sortOrder=false&searchYn=true&ExcelRowdata=&page=1&searchDivision=detail&itemName=${data.title
                          .replace("<b>", "")
                          .replace("</b>", "")
                          .replace("<b>", "")
                          .replace("</b>", "")
                          .replace(
                            "mg",
                            "밀리그램"
                          )}&itemEngName=&entpName=&entpEngName=&ingrName1=&ingrName2=&ingrName3=&ingrEngName=&itemSeq=&stdrCodeName=&atcCodeName=&indutyClassCode=&sClassNo=&narcoticKindCode=&cancelCode=&etcOtcCode=&makeMaterialGb=&searchConEe=AND&eeDocData=&searchConUd=AND&udDocData=&searchConNb=AND&nbDocData=&startPermitDate=&endPermitDate=`}
                        target="_blank"
                      >
                        의약품안전나라
                      </DrugA>
                    </DrugP>
                  </DrugSubDiv>
                </div>

                <DrugDescriptionP>
                  <p style={{ margin: 0 }}>
                    {data.description.replace("<b>", "").replace("</b>", "")}
                  </p>
                </DrugDescriptionP>
              </DrugDiv>
            ))}
          </DrugContainer>
        ) : (
          <LoadingContainer>
            <DotWave size={60} color="#231F20" />
          </LoadingContainer>
        )}
      </MainContainer>
      {!loading ? (
        <Footer>
          <a href="http://developers.naver.com" target="_blank">
            <img
              src={require(`./NAVEROpenAPI_k.png`)}
              alt="NAVER 오픈 API"
              style={{ width: "100px", paddingTop: "9px" }}
            />
          </a>
          <FooterP>|</FooterP>
          <FooterP>Hosting by netlify</FooterP>
          <FooterP>|</FooterP>
          <FooterP>황준서</FooterP>
        </Footer>
      ) : (
        ""
      )}
    </MainDiv>
  );
}

const Modal = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-width: 500px;
  height: 1100px;
  border-radius: 20px;
  padding: 30px;
  position: absolute;
  z-index: 10;
  top: 50px;
  font-size: 20px;
`;

const ModalBtn = styled.button`
  width: 100%;
  border: none;
  font-size: 20px;
  padding: 5px 0px;
  text-align: center;
  background: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    transition: all 0.2s;
  }
`;

const FormInput = styled.input`
  width: 300px;
  font-size: 20px;
  font-weight: 200;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-right: 10px;
  background: none;
  outline: none;
  @media screen and (max-width: 800px) {
    margin-top: 10px;
    width: 300px;
    text-align: center;
  }
`;

const FormForm = styled.form`
  display: flex;
  align-items: center;
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  width: 100%;

  margin-bottom: 20px;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

const ModalOpenDiv = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  padding: 5px 0px;
  width: 100%;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  background-color: rgba(255, 68, 68, 0.6);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 68, 68, 0.6);
    transition: all 0.3s;
    transform: scale(1.01);
    color: white;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
`;

const MainContainer = styled.div`
  border: none;
  width: 70%;
  @media screen and (max-width: 1300px) {
    width: 95%;
  }
  margin-bottom: 20px;
`;

const DrugContainer = styled.div``;
const LoadingContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DrugDiv = styled.div`
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  }
`;

const DrugImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1px 0px;
  width: 220px;
  height: 90px;

  &:hover {
    transform: scale(1.3);
    transition: all 0.2s;
  }

  &:not(:hover) {
    transform: scale(1);
    transition: 0.2s;
  }
`;
const DrugP = styled.div`
  padding-left: 20px;
  width: auto;
  font-size: 20px;
  text-overflow: ellipsis;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

const DrugDescriptionP = styled.div`
  width: 100%;
  height: 86px;
  margin-left: 10px;
  font-size: 12px;
  border-left: 2px solid lightgray;
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (min-width: 801px) {
    width: 50%;
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const DrugA = styled.a`
  text-decoration: none;
  color: black;
  text-overflow: ellipsis;

  &:hover {
    font-weight: 700;
  }
`;

const DrugSubDiv = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const FooterP = styled.p`
  margin-left: 10px;
  color: #333333;
  font-weight: 900;
`;

export default App;
