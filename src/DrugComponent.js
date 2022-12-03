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
  const [print, setPrint] = useState("");
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        console.log(axiosData.data.body.items[0]);
        ArticleNotBlankHandler2(axiosData.data.body.items[0].EE_DOC_DATA);
        setTestHeader(axiosData.data.body.items[0].ITEM_NAME);
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
      if (imgData.status === 200) {
        if (imgData.data.body.items[0].BIG_PRDT_IMG_URL === "") {
          console.log("이미지가 없네...");
          setImgError(true);
        } else {
          setTestImg(imgData.data.body.items[0].BIG_PRDT_IMG_URL);
          setImgLoading(false);
          setImgError(false);
        }
      }
    } catch (error) {
      console.log(error);
      setImgError(true);
    }
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
                      duration={0.8}
                    />
                  </>
                ) : (
                  <DrugImg src={testimg} />
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
                      height={"23px"}
                      borderRadius={"5px"}
                    />
                  </>
                ) : (
                  testCHART
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

const DrugHeaderDiv = styled.div`
  width: 100%;
  margin: 0;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    text-align: center;
    margin-left: 0;
    margin-top: 15px;
  }
`;

const DrugImgDiv = styled.div`
  @media screen and (min-width: 769px) {
    min-width: 220px;
    width: 220px;
    height: 120px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 0px;
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
  @media screen and (min-width: 769px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 120px;
    border-radius: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin-top: 0px;
    margin-right: 0px;
    border-radius: 10px;
    aspect-ratio: 11 / 6;
  }
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

  /* &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  } */
`;

const DrugHeader = styled.p`
  font-size: 35px;
  margin: 0;
  font-weight: 800;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const DrugChart = styled.div`
  height: 30px;
  margin-top: 2px;

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const DrugText = styled.p`
  font-size: 17px;
`;

export default DrugComponent;
