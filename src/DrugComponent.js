//에스파손로션 <<<<<<<
//훼리맘큐연질캡슐 아티클1짤림

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DrugComponent = ({ searchkeyword }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [testimg, setTestImg] = useState("");
  const [testheader, setTestHeader] = useState("");
  const [testCHART, setTestCHART] = useState("");
  const [productType, setProductType] = useState("");
  const [productIngr, setProductIngr] = useState("");
  const [code, setCode] = useState("");
  const [print, setPrint] = useState("");
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 네이버
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  const URL = `${PROXY}/v1/search/encyc.json`;

  // 테스트 케이스 1
  const LOCALHOST_URL1 = process.env.REACT_APP_CLIENT_LOCALHOST_URL1;
  const SERVER_URL1 = process.env.REACT_APP_CLIENT_SERVER_URL1;

  // 테스트 케이스 2
  const LOCALHOST_URL2 = process.env.REACT_APP_CLIENT_LOCALHOST_URL2;
  const LOCALHOST_URL3 = process.env.REACT_APP_CLIENT_LOCALHOST_URL3;
  const SERVER_URL2 = process.env.REACT_APP_CLIENT_SERVER_URL2;
  const SERVER_URL3 = process.env.REACT_APP_CLIENT_SERVER_URL3;

  const URL1 =
    window.location.hostname === "localhost" ? LOCALHOST_URL1 : SERVER_URL1;
  const URL2 =
    window.location.hostname === "localhost" ? LOCALHOST_URL2 : SERVER_URL2;
  const URL3 =
    window.location.hostname === "localhost" ? LOCALHOST_URL3 : SERVER_URL3;

  useEffect(() => {
    imgDownload();
    DataDownload();
  }, [searchkeyword]);

  const DataDownload = async () => {
    setImgLoading(true);
    let axiosData;
    try {
      axiosData = await axios.get(URL1, {
        params: {
          pageNo: 1,
          numOfRows: 1,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: false,
      });
      if (axiosData.status === 200) {
        console.log(axiosData.data.body.items);
        setCode(ReturnCode(axiosData.data.body.items[0].ETC_OTC_CODE));
        ArticleNotBlankHandler2(axiosData.data.body.items[0].EE_DOC_DATA);
        setTestHeader(axiosData.data.body.items[0].ITEM_NAME.split("(")[0]);
        setTestCHART(axiosData.data.body.items[0].CHART);
        setError(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const imgDownload = async () => {
    setLoading(true);

    let imgData;
    try {
      imgData = await axios.get(URL3, {
        params: {
          pageNo: 1,
          numOfRows: 1,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      });
      console.log(imgData.data.body.items[0]);
      if (imgData.status === 200) {
        if (imgData.data.body.items[0].BIG_PRDT_IMG_URL === "") {
          test();
          setImgError(true);
        } else {
          setTestImg(imgData.data.body.items[0].BIG_PRDT_IMG_URL);
          setImgLoading(false);
          setImgError(false);
        }

        setProductIngr(imgData.data.body.items[0].ITEM_INGR_NAME);
        setProductType(imgData.data.body.items[0].PRDUCT_TYPE.split("]")[1]);
      }
    } catch (error) {
      console.log(error);
      setImgError(true);
    }
  };

  const test = async () => {
    axios
      .get(URL, {
        params: {
          query: searchkeyword,
          display: 15,
        },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.items);
        setLoading(false);
      });
  };

  const ArticleNotBlankHandler2 = (param) => {
    let onlyArticle = param.substring(param.indexOf("<ARTICLE title="));
    let temp = onlyArticle;
    let resultArray = [];
    if (onlyArticle.indexOf("</ARTICLE>") === -1) {
      let arr = onlyArticle.split("/>");
      arr.map((a) => {
        resultArray.push(
          a
            .substring(a.indexOf(`"`))
            .replace(`"`, "")
            .replace(`"`, " ")
            .replace("</SECTION", "")
            .replace("</DOC", "")
            .replace("</PARAGRAPH", "")
            .replace(">", "")
            .replace(">", "")
        );
      });
      console.log(resultArray.join(""));
      setPrint(resultArray.join(""));
    } else {
      if (onlyArticle.includes(`<ARTICLE title=""`)) {
        // console.log("아티클이 비었네");
      } else {
        // console.log("아티클이 여러개네..");
      }
      let arr = onlyArticle.split("![CDATA");
      arr.map((a) => {
        resultArray.push(
          a.substring(a.indexOf(`]]`), a.indexOf(`[`)).replace("[", " ")
        );
      });
      setPrint(resultArray.join(""));
    }
  };

  const ReturnCode = (code) => {
    if (code === "전문의약품") {
      return "전문";
    } else if (code === "일반의약품") {
      return "일반";
    }
  };

  return (
    <DrugWrapper>
      {error ? (
        <ErrorDiv>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ color: "red" }}
            size="2x"
          />
          <ErrorText>
            오류입니다. {searchkeyword}은(는) 검색할 수 없습니다.
          </ErrorText>
        </ErrorDiv>
      ) : (
        <ScreenSizeControlDiv>
          <IfMobileDiv>
            {imgError ? (
              <DrugImg src={require("./imageError2.png")} />
            ) : (
              <DrugImgDiv>
                {imgLoading ? (
                  <>
                    <Skeleton
                      height={"100%"}
                      borderRadius={"10px"}
                      duration={0.7}
                    />
                  </>
                ) : (
                  <DrugImg src={testimg} style={{ marginBottom: "-8px" }} />
                )}
              </DrugImgDiv>
            )}

            <DrugHeaderDiv>
              <DrugHeader>
                {loading ? (
                  <>
                    <Skeleton
                      width={"70%"}
                      height={"37px"}
                      duration={1}
                      borderRadius={"5px"}
                    />
                  </>
                ) : (
                  testheader
                )}
              </DrugHeader>
              <DrugChart>
                {loading ? (
                  <>
                    <Skeleton
                      width={"40%"}
                      height={"25px"}
                      borderRadius={"5px"}
                    />
                  </>
                ) : (
                  <HeaderDiv>
                    <HeaderP color={code === "일반" ? "#0033FF" : "#FF3333"}>
                      {code}
                    </HeaderP>
                    <HeaderP color={"black"}>{productIngr}</HeaderP>
                    <HeaderP color={"black"}>{productType}</HeaderP>
                  </HeaderDiv>
                )}
              </DrugChart>
              <DrugChart>
                {loading ? (
                  <>
                    <Skeleton
                      width={"50%"}
                      height={"25px"}
                      borderRadius={"5px"}
                    />
                  </>
                ) : (
                  <HeaderDiv>
                    <P style={{ marginTop: "5px" }}>{testCHART}</P>
                  </HeaderDiv>
                )}
              </DrugChart>
            </DrugHeaderDiv>
          </IfMobileDiv>
          <div>
            <DrugText>
              {loading ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"20px"}
                    borderRadius={"5px"}
                    inline={true}
                    count={3}
                  />
                </>
              ) : (
                print
              )}
            </DrugText>
          </div>
        </ScreenSizeControlDiv>
      )}
    </DrugWrapper>
  );
};

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorText = styled.div`
  margin-left: 15px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const DrugHeaderDiv = styled.div`
  width: 100%;
  margin: 0;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    text-align: center;
    margin-left: 0;
    margin-top: 20px;
  }
`;

const DrugImgDiv = styled.div`
  @media screen and (min-width: 769px) {
    min-width: 220px;
    width: 220px;
    height: 120px;
  }
  @media screen and (max-width: 768px) {
    margin-top: -2px;

    aspect-ratio: 11 / 6;
  }
`;

const ScreenSizeControlDiv = styled.div`
  width: 100%;
`;

const IfMobileDiv = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const DrugImg = styled.img`
  animation: 1s ease-in-out loadEffect1;
  min-width: 220px;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (min-width: 769px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 123px;
    border-radius: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin-top: 3px;
    margin-right: 0px;
    border-radius: 10px;
    aspect-ratio: 1299 / 709;
  }
`;

const DrugWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  max-width: 1100px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: white;

  /* &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  } */
`;

const DrugChart = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  animation: 0.5s ease-in-out loadEffect1;
  margin-top: 2px;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const DrugText = styled.p`
  animation: 0.5s ease-in-out loadEffect1;
  border-top: 0.6px solid rgb(214, 214, 214, 0.6);
  margin: 0;
  margin-top: 15px;
  padding-top: 13px;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  font-size: 17px;
`;

const DrugHeader = styled.p`
  animation: 0.5s ease-in-out loadEffect1;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  font-size: 35px;
  margin: 0;
  font-weight: 800;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeaderP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 22px;
  margin: 0px;
  padding: 0px 5px;
  margin-right: 4px;
  margin-top: 5px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.color || "white"};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color || "white"};

  @media screen and (max-width: 768px) {
    margin-left: 3px;
    margin-right: 3px;
  }
`;

const P = styled.p`
  margin: 0;
  font-size: 18px;
`;

export default DrugComponent;
