import { BrowserRouter, Route, Link, Routes, json } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Multi = () => {
  const [keyword, setKeyword] = useState("");
  const [testimg, setTestImg] = useState("");
  const [testheader, setTestHeader] = useState("");
  const [searchkeyword, setSearchKeyword] = useState("타이레놀");
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
    test2();
    test3();
  }, [searchkeyword]);

  const test2 = async (parm) => {
    axios
      .get(URL1, {
        params: {
          pageNo: 1,
          numOfRows: 3,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.body.items[0]);
        // console.log(res.data.body.items[0].ITEM_NAME);
        // console.log(res.data.body.items[0].EE_DOC_DATA);
        setPrint(res.data.body.items[0].EE_DOC_DATA);
        setTestHeader(res.data.body.items[0].ITEM_NAME);
      });
  };

  const test3 = async () => {
    axios
      .get(URL3, {
        params: {
          pageNo: 1,
          numOfRows: 3,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.body.items[0]);
        // console.log(res.data.body.items[0].ITEM_NAME);
        // console.log(res.data.body.items[0].EE_DOC_DATA);
        setTestImg(res.data.body.items[0].BIG_PRDT_IMG_URL);
      });
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
      <p>{testheader}</p>
      <img src={testimg} style={{ width: "200px" }} />
      <p>{print}</p>
      <br></br>
    </div>
  );
};

export default Multi;
