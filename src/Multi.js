import { BrowserRouter, Route, Link, Routes, json } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DotWave, Orbit, Ring } from "@uiball/loaders";
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

  const [axiosData, setAxiosData] = useState([]);
  const [axiosImg, setAxiosImg] = useState([]);

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
    ImageDownload();
    DataDownload();
  }, [searchkeyword]);

  const DataDownload = async (parm) => {
    axios
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
        guzi(res.data.body.items[0].EE_DOC_DATA);

        setAxiosData(res.data.body.items);

        setTestHeader(res.data.body.items[0].ITEM_NAME);
        setTestCHART(res.data.body.items[0].CHART);
        setLoading(false);
      });
  };

  const ImageDownload = async () => {
    setImgLoading(true);
    setLoading(true);
    axios
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
        setAxiosImg(res.data.body.items);
        setTestImg(res.data.body.items[0].BIG_PRDT_IMG_URL);
        setImgLoading(false);
        DataDownload();
      });
  };

  const guzi = (param) => {
    // console.log(param);
    // if (param.includes(`<ARTICLE title=""`)) {
    //   ArticleBlankHandler(param);
    // } else {
    //   ArticleNotBlankHandler(param);
    // }
    ArticleNotBlankHandler2(param);
  };

  // const ArticleBlankHandler = (param) => {
  //   let firstString = param
  //     .substring(param.indexOf("<![CDATA"), param.indexOf("</PARAGRAPH>"))
  //     .replace("<![CDATA[", "")
  //     .replace("]]>", "")
  //     .replace("&nbsp", "")
  //     .replace(";", " ");

  //   //first : 첫번째로 만난 CDATA 부분 추출
  //   // console.log(firstString);

  //   //CDATA 첫줄에 nbsp가 있을경우
  //   if (param.includes("&nbsp")) {
  //     // console.log("nbsp있음");
  //     let c = param.substring(param.indexOf("</PARAGRAPH>"));
  //     setPrint(c.substring(c.indexOf("ATA["), c.indexOf("]]")).substring(4));
  //     // console.log(c);
  //     // console.log(c.substring(c.indexOf("ATA["), c.indexOf("]]")).substring(4));
  //   } else {
  //     // console.log("왜글로가");
  //     setPrint(firstString);
  //   }
  // };

  // const ArticleNotBlankHandler = (param) => {
  //   let firstString;
  //   if (
  //     param
  //       .substring(param.indexOf("<ARTICLE title="), param.indexOf(`<PARA`))
  //       .includes("<PARA")
  //   ) {
  //     firstString = param.substring(
  //       param.indexOf("<ARTICLE title="),
  //       param.indexOf(`<PARA`)
  //     );
  //   } else {
  //     firstString = param.substring(param.indexOf("<ARTICLE title="));
  //   }

  //   let ssap = firstString
  //     .replace(`<ARTICLE title="`, "")
  //     .replace(`"`, "")
  //     .replace(`"`, "")
  //     .replace(">", "")
  //     .replace(`">`, "")
  //     .replace("<ARTICLE title=", "");

  //   // console.log(
  //   //   firstString
  //   //     .replace("<ARTICLE title=", "")
  //   //     .replace(`"`, "")
  //   //     .replace(`"`, "")
  //   //     .replace(">", "")
  //   // );

  //   if (param.includes("</ARTICLE>")) {
  //     console.log("article이 여러개");

  //     //두번째거
  //     // console.log(param.substring(param.indexOf("</ARTICLE>")));

  //     // //ARTICLE부터
  //     // console.log(param.substring(param.indexOf(`<ARTICLE title`)));

  //     ////
  //     let temp = param
  //       .substring(param.indexOf(`<ARTICLE title`))
  //       .substring(param.indexOf("<ARTICLE title"));

  //     console.log(temp);
  //     let ssap2 = temp
  //       .substring(temp.indexOf(`<ARTICLE title`))
  //       .replace(`<ARTICLE title="`, "")
  //       .replace("</SECTION>", "")
  //       .replace("</DOC>", "")
  //       .replace("<", "")
  //       .replace(">", "")
  //       .replace(`"`, "")
  //       .replace(`/`, "");
  //     setPrint(`${ssap},${ssap2}`);
  //     //
  //   } else {
  //     console.log("article 여러개아님");
  //     setPrint(ssap);
  //   }
  // };

  const ArticleNotBlankHandler2 = (param) => {
    let onlyArticle = param.substring(param.indexOf("<ARTICLE title="));
    let temp = onlyArticle;
    let resultArray = [];

    // console.log(onlyArticle);

    if (onlyArticle.indexOf("</ARTICLE>") === -1) {
      // console.log("</ARTICLE> 이없어요");

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
      // console.log("</ARTICLE> 있음!!!!!!!!!!!!!!!");
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

      // console.log(resultArray.join(""));
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
      멀티<Link to="/">홈으로</Link>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="검색어를 입력하세요"
        />
      </form>
      <DrugDiv>
        <DrugWrapper>
          <div>
            <div style={{ display: "flex" }}>
              <div>
                {imgLoading ? (
                  <LoadingContainer>
                    <Skeleton
                      width={"220px"}
                      height={"100px"}
                      borderRadius={"10px"}
                    />
                  </LoadingContainer>
                ) : (
                  <DrugImg src={testimg} style={{ height: "100px" }} />
                )}
              </div>
              <div style={{ width: "100%" }}>
                <DrugHeader>
                  {loading ? (
                    <Skeleton
                      width={"500px"}
                      height={"42px"}
                      borderRadius={"5px"}
                    />
                  ) : (
                    testheader
                  )}
                </DrugHeader>
                <div style={{ marginTop: "5px" }}>
                  {loading ? (
                    <Skeleton
                      width={"500px"}
                      height={"25px"}
                      borderRadius={"5px"}
                    />
                  ) : (
                    testCHART
                  )}
                </div>
              </div>
            </div>

            <div>
              <DrugText>{loading ? "로딩중" : print}</DrugText>
            </div>
          </div>
        </DrugWrapper>
      </DrugDiv>
    </div>
  );
};

const DrugDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const DrugImg = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1px 0px;
  width: 220px;
  height: 90px;
  border-radius: 10px;
  margin-right: 25px;

  &:hover {
    transform: scale(1.5);
    transition: all 0.2s;
  }

  &:not(:hover) {
    transform: scale(1);
    transition: 0.2s;
  }
`;

const DrugWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  max-width: 1100px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  &:hover {
    background-color: rgba(231, 231, 231, 0.3);
    transition: 0.3s;
  }
`;

const DrugContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DrugHeader = styled.p`
  font-size: 35px;
  margin: 0;
  font-weight: 800;
`;

const DrugText = styled.p`
  font-size: 17px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 100px;
  background-color: #f7f7f9;
  border-radius: 10px;
  margin-right: 25px;
`;

export default Multi;
