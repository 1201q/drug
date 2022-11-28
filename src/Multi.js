import { BrowserRouter, Route, Link, Routes, json } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Multi = () => {
  const [keyword, setKeyword] = useState("");
  const [searchkeyword, setSearchKeyword] = useState("");
  //https://velog.io/@mochapoke/TIL-netlify%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-proxy-%EC%85%8B%ED%8C%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
  //https://libertegrace.tistory.com/entry/Milestone-Week-3-%EB%B3%B5%EC%95%BD-%EC%A0%95%EB%B3%B4-%EC%A0%9C%EA%B3%B5-%EB%B0%8F-%EA%B4%80%EB%A6%AC
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  // const URL = `${PROXY}/v1/search/encyc.json`;
  const URL2 = `${PROXY}`;
  // useEffect(() => {
  //   test2();
  // }, []);

  useEffect(() => {
    test2();
  }, [searchkeyword]);

  const test2 = async (parm) => {
    axios
      .get(URL2, {
        params: {
          pageNo: 1,
          numOfRows: 1,
          item_name: searchkeyword,
          type: "json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.body);
        console.log(res.data.body.items[0].ITEM_NAME);
        console.log(res.data.body.items[0].EE_DOC_DATA);
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
    </div>
  );
};

export default Multi;
