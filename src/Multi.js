import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Multi = () => {
  const [keyword, setKeyword] = useState("");
  const [searchkeyword, setSearchKeyword] = useState("세티정25밀리");

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [testimg, setTestImg] = useState("");
  const [testheader, setTestHeader] = useState("");
  const [testCHART, setTestCHART] = useState("");
  const [print, setPrint] = useState("");

  //https://velog.io/@mochapoke/TIL-netlify%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-proxy-%EC%85%8B%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  //https://libertegrace.tistory.com/entry/Milestone-Week-3-%EB%B3%B5%EC%95%BD-%EC%A0%95%EB%B3%B4-%EC%A0%9C%EA%B3%B5-%EB%B0%8F-%EA%B4%80%EB%A6%AC
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  // 테스트 케이스 1
  const LOCALHOST_URL1 = `/getDrugPrdtPrmsnDtlInq01?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  const SERVER_URL1 = `/proxy1?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;

  // 테스트 케이스 2
  const LOCALHOST_URL2 = `/getDrugPrdtMcpnDtlInq?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  const LOCALHOST_URL3 = `/getDrugPrdtPrmsnInq02?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  const SERVER_URL2 = `/proxy2?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  const SERVER_URL3 = `/proxy3?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;

  const URL1 =
    window.location.hostname === "localhost" ? LOCALHOST_URL1 : SERVER_URL1;
  const URL2 =
    window.location.hostname === "localhost" ? LOCALHOST_URL2 : SERVER_URL2;
  const URL3 =
    window.location.hostname === "localhost" ? LOCALHOST_URL3 : SERVER_URL3;
  //이거다~!
  // const URL =
  //   window.location.hostname === "localhost" ? LOCALHOST_URL1 : SERVER_URL1;

  // const URL = `${PROXY}/v1/search/encyc.json`;
  // const URL2 = `${PROXY}?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  // const URL3 = `${PROXY}/getDrugPrdtPrmsnDtlInq01?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D`;
  // useEffect(() => {
  //   test2();
  // }, []);

  useEffect(() => {
    DataDownload();
  }, [searchkeyword]);

  const DataDownload = async (parm) => {
    setImgLoading(true);
    setLoading(true);
    await axios
      .get(URL1, {
        params: {
          pageNo: 1,
          numOfRows: 1,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.body.items[0]);
        ArticleNotBlankHandler2(res.data.body.items[0].EE_DOC_DATA);

        setTestHeader(res.data.body.items[0].ITEM_NAME);
        setTestCHART(res.data.body.items[0].CHART);
        setLoading(false);
      });

    await axios
      .get(URL3, {
        params: {
          pageNo: 1,
          numOfRows: 1,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.body.items[0]);

        setTestImg(res.data.body.items[0].BIG_PRDT_IMG_URL);
        setImgLoading(false);
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

    //셀벡스캡슐
    //환인벤즈
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchKeyword(keyword);
  };
  return (
    <div>
      <Header>
        <HeaderDiv>
          <a href="/">
            <img
              src={require(`./LOGO.png`)}
              style={{ width: "150px", marginTop: "16px" }}
            ></img>
          </a>

          <form onSubmit={onSubmit}>
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
      <DrugDiv>
        <DrugWrapper>
          <ScreenSizeControlDiv>
            <IfMobileDiv>
              <DrugImgDiv>
                {imgLoading ? (
                  <Skeleton
                    minWidth={"220px"}
                    width={"100%"}
                    height={"100%"}
                    borderRadius={"10px"}
                  />
                ) : (
                  <DrugImg src={testimg} />
                )}
              </DrugImgDiv>
              <DrugHeaderDiv>
                <DrugHeader>
                  {loading ? (
                    <Skeleton
                      width={"70%"}
                      height={"42px"}
                      borderRadius={"5px"}
                    />
                  ) : (
                    testheader
                  )}
                </DrugHeader>
                <DrugChart>
                  {loading ? (
                    <Skeleton
                      width={"40%"}
                      height={"25px"}
                      borderRadius={"5px"}
                    />
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
      </DrugDiv>
    </div>
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
`;

const DrugDiv = styled.div`
  display: flex;
  justify-content: center;
`;

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

export default Multi;
