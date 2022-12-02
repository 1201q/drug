import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DrugComponent = ({ searchkeyword }) => {
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [testimg, setTestImg] = useState("");
  const [testheader, setTestHeader] = useState("");
  const [testCHART, setTestCHART] = useState("");
  const [print, setPrint] = useState("");

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
        console.log("데이터");
        ArticleNotBlankHandler2(axiosData.data.body.items[0].EE_DOC_DATA);
        setTestHeader(axiosData.data.body.items[0].ITEM_NAME);
        setTestCHART(axiosData.data.body.items[0].CHART);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
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
        console.log("이미지");
        setTestImg(imgData.data.body.items[0].BIG_PRDT_IMG_URL);
        setImgLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

    // await axios
    //   .get(URL1, {
    //     params: {
    //       pageNo: 1,
    //       numOfRows: 1,
    //       item_name: searchkeyword,
    //       type: "json",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data.body.items[0]);
    //     ArticleNotBlankHandler2(res.data.body.items[0].EE_DOC_DATA);

    //     setTestHeader(res.data.body.items[0].ITEM_NAME);
    //     setTestCHART(res.data.body.items[0].CHART);
    //     setLoading(false);
    //   });

    // await axios
    //   .get(URL3, {
    //     params: {
    //       pageNo: 1,
    //       numOfRows: 1,
    //       item_name: searchkeyword,
    //       type: "json",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data.body.items[0]);

    //     setTestImg(res.data.body.items[0].BIG_PRDT_IMG_URL);
    //     setImgLoading(false);
    //   });
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

    //셀벡스캡슐
    //환인벤즈
  };

  return (
    <DrugWrapper>
      <ScreenSizeControlDiv>
        <IfMobileDiv>
          <DrugImgDiv>
            {imgLoading ? (
              <Skeleton width={"100%"} height={"100%"} borderRadius={"10px"} />
            ) : (
              <DrugImg src={testimg} />
            )}
          </DrugImgDiv>
          <DrugHeaderDiv>
            <DrugHeader>
              {loading ? (
                <Skeleton width={"70%"} height={"42px"} borderRadius={"5px"} />
              ) : (
                testheader
              )}
            </DrugHeader>
            <DrugChart>
              {loading ? (
                <Skeleton width={"40%"} height={"25px"} borderRadius={"5px"} />
              ) : (
                testCHART
              )}
            </DrugChart>
          </DrugHeaderDiv>
        </IfMobileDiv>
        <div>
          <DrugText>{loading ? "로딩중" : print}</DrugText>
        </div>
      </ScreenSizeControlDiv>
    </DrugWrapper>
  );
};

const DrugHeaderDiv = styled.div`
  width: 100%;
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }
`;

const DrugImgDiv = styled.div`
  min-width: 220px;
  width: 25%;
  height: 120px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ScreenSizeControlDiv = styled.div`
  width: 100%;
`;

const IfMobileDiv = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const DrugImg = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 0px;
  width: 220px;
  height: 120px;
  min-width: 220px;
  min-height: 120px;
  border-radius: 10px;

  /* &:hover {
    transform: scale(1.5);
    transition: all 0.2s;
  }

  &:not(:hover) {
    transform: scale(1);
    transition: 0.2s;
  } */

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-right: 0px;
    margin-bottom: 10px;
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

  &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  }
`;

const DrugHeader = styled.p`
  font-size: 35px;
  margin: 0;
  font-weight: 800;
`;

const DrugChart = styled.div`
  margin-top: 5px;
`;

const DrugText = styled.p`
  font-size: 17px;
`;

export default DrugComponent;