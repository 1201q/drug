import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [sibal, setSibal] = useState([]);
  const [keyword, setKeyword] = useState("타이레놀");
  const [searchkeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    test();
  }, [searchkeyword]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const test = async (parm) => {
    setLoading(true);
    axios
      .get("api/v1/search/encyc", {
        params: {
          query: keyword,
          display: 30,
        },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.items.map((data) => data.title));
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
      <MainContainer>
        <FormDiv>
          <p
            style={{
              margin: 0,
              marginTop: 0,
              fontSize: "30px",
              fontWeight: 600,
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
        <DrugContainer>
          {sibal.map((data, index) => (
            <DrugDiv
              key={index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <DrugImg>
                {data.thumbnail.includes("dthumb") || data.thumbnail === "" ? (
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
                    src={data.thumbnail}
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
      </MainContainer>
    </MainDiv>
  );
}

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
    flex-direction: column;
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
`;

const DrugContainer = styled.div``;

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

  &:hover {
    font-weight: 700;
  }
`;

const DrugSubDiv = styled.div`
  margin-top: 10px;
  display: flex;
`;

export default App;
