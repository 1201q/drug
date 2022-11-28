import { BrowserRouter, Route, Link, Routes, json } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Multi = () => {
  const [keyword, setKeyword] = useState("타이레놀");
  //https://velog.io/@mochapoke/TIL-netlify%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-proxy-%EC%85%8B%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  //https://libertegrace.tistory.com/entry/Milestone-Week-3-%EB%B3%B5%EC%95%BD-%EC%A0%95%EB%B3%B4-%EC%A0%9C%EA%B3%B5-%EB%B0%8F-%EA%B4%80%EB%A6%AC
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  const URL = `${PROXY}/v1/search/encyc.json`;
  const URL2 = `${PROXY}/getDrugPrdtPrmsnDtlInq01?serviceKey=BXYfYLWmyQLWjO5humu5eK%2BTjxBIjj4wR%2BB7E%2Ftbwmhi1wMWLdF204NALK%2BO1iO2LMWeeu%2BZhR2KDrsDuTcVUA%3D%3D&pageNo=1&numOfRows=3&type=json&item_name=%EC%95%84%EA%B3%A0%ED%8B%B4`;
  useEffect(() => {
    test2();
  }, []);

  const test2 = async (parm) => {
    axios
      .get(URL2, {
        params: {
          pageNo: 1,
          numOfRows: 3,
          item_name: "아고틴정",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(keyword);
    console.log(keyword.split(","));
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
    </div>
  );
};

export default Multi;
