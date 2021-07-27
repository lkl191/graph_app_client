import React from "react";

const About = () => {
  //このアプリを作ろうと思った理由
  //使用技術と選定理由
  //こだわったところ
  //難しかったところ
  //できなかったところ
  //githubのソースコード
  return (
    <div className="container about_h3">
      <h2>About Page</h2>
      <div>
        <h3>使用技術と選定理由</h3>
        <ol>
          <li>Nextjs</li>
          <ul>
            <li>ssr/ssg</li>
            <li>特定のライブラリに注意</li>
          </ul>
          <li>GraphQL</li>
          <ul>
            <li>単一のエンドポイント</li>
            <li>Restよりは少しすっきりする</li>
            <li>勉強用</li>
          </ul>
          <li>MongoDB</li>
          <ul>
            <li>勉強用</li>
          </ul>
          <li>scss</li>
          <ul>
            <li>ネスト</li>
            <li>変数</li>
            <li>勉強用</li>
          </ul>
          <li>Firebase</li>
          <ul>
            <li>ログイン認証</li>
            <li>セキュリティが強固</li>
            <li>勉強用</li>
          </ul>
        </ol>
      </div>
      <div>
          <h3>使用したライブラリ</h3>
          <ol>
              <li>Chart.js（react-chartjs-2）</li>
              <li>react-datasheet</li>
          </ol>
      </div>
      <div>
        <h3>難しかったところ</h3>
        <li>Apollo Serverのライブラリ</li>
        <li>FirebaseとBackendの非同期通信</li>
        <li>Spread Sheetをどうするか</li>
      </div>
      <div>
        <h3>こだわったところ</h3>
      </div>
      <div>
        <h3>githubのソースコード</h3>
        <a href="https://github.com/lkl191/graph_app">https://github.com/lkl191/graph_app</a>
      </div>
    </div>
  );
};

export default About;
