//에스파손로션 <<<<<<<
//훼리맘큐연질캡슐 아티클1짤림
//쿠에타핀정
//마그밀정
//오로디핀정
//휴니즈에페리손염산염정
//칼비타디정

//푸링정
//

//https://devbirdfeet.tistory.com/50
//http://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService02
//https://openapi.naver.com
// item_name:
// typeof param === "undefined"
//   ? searchkeyword
//       .replace("mg", "밀리그")
//       .replace(" ", "")
//       .replace(" ", "")
//   : param.replace("mg", "밀리그").replace(" ", "").replace(" ", ""),

import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DrugComponent = ({ searchkeyword }) => {
  const [sk, setS] = useState(searchkeyword);

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [testimg, setTestImg] = useState("");
  const [testheader, setTestHeader] = useState("");
  const [headerLink, setHeaderLink] = useState("");
  const [testCHART, setTestCHART] = useState("");
  const [productType, setProductType] = useState("");
  const [productIngr, setProductIngr] = useState("");
  const [code, setCode] = useState("");
  const [print, setPrint] = useState("");
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [naverApiData, setNaverApiData] = useState([]);

  //
  const [isResultState, setIsResultState] = useState(["("]);
  const [isImgResultState, setIsImgResultState] = useState([]);
  const [i, setI] = useState(0);

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
    test();
  }, [searchkeyword]);

  useEffect(() => {
    if (i !== 0) {
      RenderHandler(isResultState[i]);
      ImgRenderHandler(isImgResultState[i]);
    }
  }, [i]);

  useEffect(() => {
    if (error) {
      ErrorHandler(searchkeyword);
    }
  }, [error]);

  const ErrorHandler = (param) => {
    //엑시마정 같은 경우
    // 그냥 네이버 검색결과 보여줘
    if (param.includes("mg")) {
      console.log(
        param.replace(
          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]/g,
          ""
        )
      );
    }
    if (param.includes("캡슐")) {
      console.log(param.replace("캡슐", "캅셀"));
    }
  };

  const DataDownload = async (param) => {
    setImgLoading(true);
    let axiosData;
    try {
      axiosData = await axios.get(URL1, {
        params: {
          pageNo: 1,
          numOfRows: 5,
          item_name:
            typeof param === "undefined"
              ? searchkeyword
                  .replace(
                    /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                    ""
                  )
                  .replace(" ", "")
                  .replace(" ", "")
              : param
                  .replace(
                    /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                    ""
                  )
                  .replace(" ", "")
                  .replace(" ", ""),
          type: "json",
        },
        withCredentials: false,
      });
      if (axiosData.status === 200) {
        if (axiosData.data.body.items.length > 1) {
          setIsResultState(axiosData.data.body.items);
        } else {
          setIsResultState("");
        }
        RenderHandler(axiosData.data.body.items[0]);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const imgDownload = async (param) => {
    setLoading(true);

    let imgData;
    try {
      imgData = await axios.get(URL3, {
        params: {
          pageNo: 1,
          numOfRows: 5,
          item_name:
            typeof param === "undefined"
              ? searchkeyword
                  .replace(
                    /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]/g,
                    ""
                  )
                  .replace(" ", "")
                  .replace(" ", "")
              : param
                  .replace(
                    /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]/g,
                    ""
                  )
                  .replace(" ", "")
                  .replace(" ", ""),
          type: "json",
        },
        withCredentials: true,
      });
      if (imgData.status === 200) {
        ImgRenderHandler(imgData.data.body.items[0]);
        if (imgData.data.body.items[0].BIG_PRDT_IMG_URL === "") {
          // test();
          setImgError(true);
        } else {
          setTestImg(imgData.data.body.items[0].BIG_PRDT_IMG_URL);
          setImgLoading(false);
          setImgError(false);
        }
        setIsImgResultState(imgData.data.body.items);
        setProductIngr(imgData.data.body.items[0].ITEM_INGR_NAME);
        setProductType(imgData.data.body.items[0].PRDUCT_TYPE.split("]")[1]);
      }
    } catch (error) {
      console.log(error);
      setImgError(true);
    }
  };

  const RenderHandler = (axiosData) => {
    setCode(ReturnCode(axiosData.ETC_OTC_CODE));
    ArticleNotBlankHandler2(axiosData.EE_DOC_DATA);
    setTestHeader(axiosData.ITEM_NAME.split("(")[0]);
    setTestCHART(axiosData.CHART);
    setHeaderLink(axiosData.ITEM_SEQ);
    setError(false);
    setLoading(false);
  };

  const ImgRenderHandler = (imgData) => {
    setTestImg(imgData.BIG_PRDT_IMG_URL);
    setProductIngr(imgData.ITEM_INGR_NAME);
    setProductType(imgData.PRDUCT_TYPE.split("]")[1]);
  };

  const test = async () => {
    axios
      .get(URL, {
        params: {
          query: searchkeyword,
          display: 7,
        },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
        },
        withCredentials: true,
      })
      .then((res) => {
        setNaverApiData(res.data.items);
      });
  };

  const ArticleNotBlankHandler2 = (param) => {
    //param은 효능효과만
    // console.log(param);
    let onlyArticle = param.substring(param.indexOf("<ARTICLE title="));
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
      // console.log(resultArray.filter((item) => item !== "\n").join(""));

      setPrint(resultArray.join(""));
    } else {
      //아티클 있음
      if (onlyArticle.includes(`<ARTICLE title=""`)) {
        let arr = onlyArticle.split("![CDATA");
        arr.map((a) => {
          resultArray.push(
            `${a
              .substring(a.indexOf(`]]`), a.indexOf(`[`))
              .replace("[", " ")
              .replace(/(<([^>]+)>)/gi, "")
              .replace(/(&([^;]+);)/gi, "")}\n`
          );
        });
        setPrint(resultArray.filter((item) => item !== "\n").join(""));
      } else {
        // 아티클이 =1, =2.. 있는경우
        let arr = onlyArticle.split("![CDATA");
        arr.map((a) => {
          if (a.includes(`<ARTICLE title="`)) {
            let temp = a
              .substring(a.indexOf(`title="`))
              .replace(/(<([^>]+)>)/gi, "");

            let first = temp
              .substring(temp.indexOf(`="`), temp.indexOf(">"))
              .replace(`="`, "")
              .replace(`"`, "")
              .replace(`"`, "")
              .replace(`/`, "")
              .replace(/(&([^;]+);)/gi, "")
              .replace(/(#([^;]+);)/gi, "")
              .replace(/(nbsp;)/gi, "");

            // console.log(first);
            // console.log(a);
            resultArray.push(`${first}\n`);

            //아래 없으면 오류남...
            if (a.split(first.trim())[1]) {
              if (a.split(first.trim())[1].includes("<ARTICLE title=")) {
                let second = a
                  .split(first.trim())[1]
                  .split("<ARTICLE title=")[1]
                  .replace(/(<([^>]+)>)/gi, "")
                  .replace(`"`, "")
                  .replace(`"`, "")
                  .replace(">", "")
                  .replace("<", "")
                  .trim()
                  .replace(/(&([^;]+);)/gi, "")
                  .replace(/(#([^;]+);)/gi, "")
                  .replace(/(nbsp;)/gi, "");

                resultArray.push(`${second}\n`);
              }
            }
          }
          resultArray.push(
            `${a
              .substring(a.indexOf(`]]`), a.indexOf(`[`))
              .replace("[", " ")
              .replace(/(<([^>]+)>)/gi, "")
              .replace(/(&([^;]+);)/gi, "")}\n`
          );
        });
        setPrint(resultArray.filter((item) => item !== "\n").join(""));
        //
        //
        //
        //
        //
      }
    }
  };

  const ReturnCode = (code) => {
    // 코드만 출력
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
            style={{ color: "#F04452", marginRight: "15px" }}
            size="2x"
          />
          <ErrorLinkDiv>
            <ErrorText>
              {searchkeyword}은(는) 검색할 수 없어요.{" "}
              {naverApiData.length === 0 ? (
                <ErrorADiv>
                  {" "}
                  <DrugKeywordA
                    href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchkeyword}`}
                    target="_blank"
                  >
                    <img
                      width={"15px"}
                      style={{ paddingRight: "5px" }}
                      src={require("./btnG_아이콘원형.png")}
                    ></img>
                    네이버 검색
                  </DrugKeywordA>
                  <DrugKeywordA
                    href={`https://www.google.co.kr/search?q=${searchkeyword}`}
                    target="_blank"
                  >
                    <img
                      width={"15px"}
                      style={{ paddingRight: "4px" }}
                      src={require("./Google.svg.png")}
                    ></img>
                    구글 검색
                  </DrugKeywordA>
                </ErrorADiv>
              ) : (
                "대신 네이버 지식백과와 포털 검색 결과를 보여드릴게요."
              )}
            </ErrorText>

            {naverApiData.length === 0 ? (
              ""
            ) : (
              <ErrorADiv>
                {naverApiData.map((item, index) => (
                  <DrugKeywordA href={item.link} key={index} target="_blank">
                    {item.title
                      .replace("<b>", "")
                      .replace("</b>", "")
                      .replace("<b>", "")
                      .replace("</b>", "")}
                  </DrugKeywordA>
                ))}
                <DrugKeywordA
                  href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchkeyword}`}
                  target="_blank"
                >
                  <img
                    width={"15px"}
                    style={{ paddingRight: "5px" }}
                    src={require("./btnG_아이콘원형.png")}
                  ></img>
                  네이버 검색
                </DrugKeywordA>
                <DrugKeywordA
                  href={`https://www.google.co.kr/search?q=${searchkeyword}`}
                  target="_blank"
                >
                  <img
                    width={"15px"}
                    style={{ paddingRight: "4px" }}
                    src={require("./Google.svg.png")}
                  ></img>
                  구글 검색
                </DrugKeywordA>
              </ErrorADiv>
            )}
          </ErrorLinkDiv>
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
                      duration={1}
                    />
                  </>
                ) : (
                  <DrugImg src={testimg} style={{ marginBottom: "-8px" }} />
                )}
              </DrugImgDiv>
            )}

            <DrugHeaderDiv>
              <>
                {loading ? (
                  <div style={{ marginBottom: "10px" }}>
                    <Skeleton
                      width={"70%"}
                      height={"37px"}
                      duration={1}
                      borderRadius={"5px"}
                    />
                  </div>
                ) : (
                  <DrugHeader
                    href={`https://nedrug.mfds.go.kr/pbp/CCBBB01/getItemDetail?itemSeq=${headerLink}`}
                    target="_blank"
                  >
                    {testheader}
                  </DrugHeader>
                )}
              </>
              <DrugChart>
                {loading ? (
                  <>
                    <Skeleton
                      width={"40%"}
                      height={"33px"}
                      borderRadius={"5px"}
                      duration={1}
                    />
                  </>
                ) : (
                  <HeaderDiv>
                    <P style={{ marginTop: "5px", marginBottom: "3px" }}>
                      {testCHART}
                    </P>
                  </HeaderDiv>
                )}
              </DrugChart>
              <DrugChart>
                {loading ? (
                  <>
                    <Skeleton
                      width={"30%"}
                      height={"33px"}
                      borderRadius={"5px"}
                      duration={1}
                    />
                  </>
                ) : (
                  <HeaderDiv>
                    <HeaderP
                      backgroundColor={code === "일반" ? "#e8f3ff" : "#FFEEEE"}
                      color={code === "일반" ? "#3182F6" : "#F04452"}
                    >
                      {code}
                    </HeaderP>
                    <HeaderP backgroundColor={"#f2f4f6"} color={"#333D4B"}>
                      {productIngr}
                    </HeaderP>
                    <HeaderP backgroundColor={"#f2f4f6"} color={"#333D4B"}>
                      {productType}
                    </HeaderP>
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
                    height={"27px"}
                    borderRadius={"5px"}
                    inline={true}
                    duration={1}
                    count={1}
                  />
                </>
              ) : (
                print
              )}
            </DrugText>
          </div>
          {isResultState === "" ? (
            <>
              {loading ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"45px"}
                    borderRadius={"5px"}
                    duration={1}
                  />
                </>
              ) : (
                <DrugSearchBar>
                  <SearchBarDiv>
                    <DrugKeywordP>
                      {searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}
                      (으)로 검색됨
                    </DrugKeywordP>
                    <DrugKeywordA
                      href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}`}
                      target="_blank"
                    >
                      <img
                        width={"15px"}
                        style={{ paddingRight: "5px" }}
                        src={require("./btnG_아이콘원형.png")}
                      ></img>
                      네이버 검색
                    </DrugKeywordA>
                    <DrugKeywordA
                      href={`https://www.google.co.kr/search?q=${searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}`}
                      target="_blank"
                    >
                      <img
                        width={"15px"}
                        style={{ paddingRight: "4px" }}
                        src={require("./Google.svg.png")}
                      ></img>
                      구글 검색
                    </DrugKeywordA>
                  </SearchBarDiv>
                </DrugSearchBar>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <>
                  <Skeleton
                    width={"100%"}
                    height={"45px"}
                    borderRadius={"5px"}
                    duration={1}
                  />
                </>
              ) : (
                <DrugSearchBar>
                  <SearchBarDiv>
                    <DrugKeywordP>
                      {searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}
                      (으)로 검색됨
                    </DrugKeywordP>
                    {isResultState.map((item, index) => (
                      <DrugKeywordButton
                        key={index}
                        onClick={() => {
                          setI(index);
                          RenderHandler(isResultState[index]);
                          ImgRenderHandler(isImgResultState[index]);
                        }}
                      >
                        {item.ITEM_NAME}
                      </DrugKeywordButton>
                    ))}
                    <DrugKeywordA
                      href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}`}
                      target="_blank"
                    >
                      <img
                        width={"15px"}
                        style={{ paddingRight: "5px" }}
                        src={require("./btnG_아이콘원형.png")}
                      ></img>
                      네이버 검색
                    </DrugKeywordA>
                    <DrugKeywordA
                      href={`https://www.google.co.kr/search?q=${searchkeyword
                        .replace(
                          /[0-9]|[a-z]|[A-Z]|(밀리그램)|(밀리그람)|[mg]|[.]|[,]|[/]|[(]|[)]/g,
                          ""
                        )
                        .replace(" ", "")
                        .replace(" ", "")}`}
                      target="_blank"
                    >
                      <img
                        width={"15px"}
                        style={{ paddingRight: "4px" }}
                        src={require("./Google.svg.png")}
                      ></img>
                      구글 검색
                    </DrugKeywordA>
                  </SearchBarDiv>
                </DrugSearchBar>
              )}
            </>
          )}
        </ScreenSizeControlDiv>
      )}
    </DrugWrapper>
  );
};

const ErrorDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorLinkDiv = styled.div`
  width: 100%;
`;

const ErrorText = styled.div`
  margin-left: 0px;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.2;
  color: #333d4b;

  @media screen and (max-width: 768px) {
    font-size: 17px;
  }
`;

const ErrorADiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  margin-top: 12px;
  padding: 5px 10px;
  background-color: #f2f4f6;
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
  animation: 0.5s ease-in-out loadEffect1;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  min-width: 220px;

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
  @keyframes smoothAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: smoothAppear 1s;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  max-width: 1100px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: white;
`;

const DrugChart = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  animation: 0.5s ease-in-out loadEffect1;
  margin-top: 0px;
  margin-bottom: 1px;

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 2px;
    margin-bottom: 5px;
  }
`;

// drug 아래 그 외 결과

const SearchBarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  margin-top: 12px;

  padding: 5px 10px;
  background-color: #f2f4f6;
`;

const DrugSearchBar = styled.div``;

const DrugKeywordButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  min-height: 25px;
  margin: 0px;
  padding: 0px 8px;
  margin-right: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background-color: white;
  color: #6b7684;
  cursor: pointer;
`;

const DrugKeywordA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  min-height: 25px;
  margin: 0px;
  padding: 0px 8px;
  margin-right: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background-color: white;
  color: #6b7684;
  cursor: pointer;
  text-decoration: none;
`;

const DrugKeywordP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  min-height: 25px;
  margin: 0px;
  padding: 0px 8px;
  margin-right: 5px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background-color: white;
  color: #333d4b;
  text-decoration: none;
`;

// 차트
const DrugText = styled.p`
  animation: 0.5s ease-in-out loadEffect1;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  border-top: 0.6px solid rgb(214, 214, 214, 0.6);
  margin: 0;
  margin-top: 15px;

  padding-top: 13px;
  font-size: 19px;
  font-weight: 300;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

// 제목
const DrugHeader = styled.a`
  text-decoration: none;
  animation: 0.5s ease-in-out loadEffect1;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  font-size: 40px;
  margin: 0;
  color: #333d4b;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 35px;
  }
`;

// 박스제목
const HeaderP = styled.p`
  animation: 0.5s ease-in-out loadEffect1;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 38px;
  min-height: 30px;
  margin: 0px;
  padding: 0px 8px;
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor || "white"};
  color: ${(props) => props.color || "white"};

  @media screen and (max-width: 768px) {
    margin-left: 3px;
    margin-right: 3px;
  }
`;

// 아래 설명
const P = styled.p`
  animation: 0.5s ease-in-out loadEffect1;
  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  margin: 0;
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 2px;
  color: #333d4b;
`;

export default DrugComponent;
