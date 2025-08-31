import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import CarouselQuestion from "./CarouselQuestion";
import CarouselOperation from "./CarouselOperation";
import CarouselDosDonts from "./CarouselDosDonts";

import ImageA from "./questions/1.png";
import ImageB from "./questions/2.png";
import ImageC from "./questions/3.png";
import ImageD from "./questions/4.png";
import ImageE from "./questions/5.png";
import ImageF from "./questions/6.png";
import ImageG from "./questions/7.png";
import ImageH from "./questions/8.png";
import ImageI from "./questions/9.png";
// import ImageJ from "./questions/10.png";
// import ImageK from "./questions/11.png";
// import ImageL from "./questions/12.png";
// import ImageM from "./questions/13.png";
// import ImageN from "./questions/14.png";
// import ImageO from "./questions/15.png";
// import ImageP from "./questions/16.png";
// import ImageQ from "./questions/17.png";
// import ImageR from "./questions/18.png";
// import ImageS from "./questions/19.png";

import OperationalA from "./operational/1.png";
import OperationalB from "./operational/2.png";
import OperationalC from "./operational/3.png";
import OperationalD from "./operational/4.png";
import OperationalE from "./operational/5.png";
import OperationalF from "./operational/6.png";
import OperationalG from "./operational/7.png";
import OperationalH from "./operational/8.png";
import OperationalI from "./operational/9.png";
import OperationalJ from "./operational/10.png";
// import OperationalK from "./operational/11.png";
// import OperationalL from "./operational/12.png";
// import OperationalM from "./operational/13.png";

import DosDonts1 from "./dosdonts/1.png";
import DosDonts2 from "./dosdonts/2.png";
import DosDonts3 from "./dosdonts/3.png";
import DosDonts4 from "./dosdonts/4.png";

const slides = [
  { text: "質問1：強み", image: ImageA, alt: "Slide 1" },
  { text: "質問2：強み", image: ImageB, alt: "Slide 2" },
  { text: "質問3：大学の活動", image: ImageC, alt: "Slide 3" },
  { text: "質問3：補足", image: ImageD, alt: "Slide 4" },
  { text: "質問4：活動の目標", image: ImageE, alt: "Slide 5" },
  { text: "質問4：補足", image: ImageF, alt: "Slide 6" },
  { text: "質問5：あなたのの役割", image: ImageG, alt: "Slide 7" },
  { text: "質問5：補足", image: ImageH, alt: "Slide 8" },
  { text: "質問6：あなたの課題", image: ImageI, alt: "Slide 9" },
  // { text: "質問6：補足", image: ImageJ, alt: "Slide 10" },
  // { text: "質問7：課題への取り組み", image: ImageK, alt: "Slide 11" },
  // { text: "質問7：補足", image: ImageL, alt: "Slide 12" },
  // { text: "質問8：取り組みの結果", image: ImageM, alt: "Slide 13" },
  // { text: "質問8：補足", image: ImageN, alt: "Slide 14" },
  // { text: "質問9：志望企業名", image: ImageO, alt: "Slide 15" },
  // { text: "質問10：志望企業情報", image: ImageP, alt: "Slide 16" },
  // { text: "質問11：志望企業情報", image: ImageQ, alt: "Slide 17" },
  // { text: "質問11：補足", image: ImageR, alt: "Slide 18" },
  // { text: "質問12：志望企業情報", image: ImageS, alt: "Slide 19" }
];

const slidess = [
  { text: "やるべきこと", image: DosDonts1, alt: "Slide 1" },
  { text: "やるべきこと", image: DosDonts2, alt: "Slide 2" },
  { text: "やるべきこと", image: DosDonts3, alt: "Slide 3" },
  { text: "してはいけないこと", image: DosDonts4, alt: "Slide 4" },
];

const slide = [
  { text: "メニュー", image: OperationalA, alt: "Slide 1" },
  {
    text: "メニュー",
    image: OperationalB,
    alt: "Slide 2",
  },
  {
    text: "ガクチカ/志望動機/自己PR 生成",
    image: OperationalC,
    alt: "Slide 3",
  },
  {
    text: "ガクチカ/志望動機/自己PR 生成",
    image: OperationalD,
    alt: "Slide 4",
  },
  {
    text: "ガクチカ/志望動機/自己PR 生成",
    image: OperationalE,
    alt: "Slide 5",
  },
  {
    text: "ガクチカ/志望動機/自己PR 生成",
    image: OperationalF,
    alt: "Slide 6",
  },
  {
    text: "ガクチカ/志望動機/自己PR 生成",
    image: OperationalG,
    alt: "Slide 7",
  },
  {
    text: "友達に紹介",
    image: OperationalH,
    alt: "Slide 8",
  },
  {
    text: "友達に紹介",
    image: OperationalI,
    alt: "Slide 8",
  },
  {
    text: "友達に紹介",
    image: OperationalJ,
    alt: "Slide 9",
  },
  // {
  //   text: "友達に紹介",
  //   image: OperationalK,
  //   alt: "Slide 10",
  // },
  // {
  //   text: "友達に紹介",
  //   image: OperationalL,
  //   alt: "Slide 11",
  // },
  // {
  //   text: "友達に紹介",
  //   image: OperationalM,
  //   alt: "Slide 12",
  // },
];

function Carousel() {
  return (
    <div className="App">
      <h2 style={{ fontSize: '2em' }}>【操作マニュアル】</h2>
      <p className="font-bold">AIと一緒に良いESを作成しましょう！</p>
      <a href="https://liff.line.me/2006819941-ENbBdgWN?path=/home">TEST</a>
      <div className="questions text-center">
        <h4 className="font-bold">1. 質問一覧</h4>
        {/* <p>強み・経験をAIが質問してくれるのでこちらに一つずつ回答しましょう</p> */}
        <CarouselQuestion slides={slides} />
      </div>

      <div className="operational text-center pt-5">
        <h4 className="font-bold">2. 使い方</h4>
        <p className="text-center">実際の使い方はこちらから</p>
        <CarouselOperation slide={slide} />
      </div>

      <div className="operational text-center pt-5">
        <h4 className="font-bold">3. すべきこととすべきでないこと</h4>
        <CarouselDosDonts slidess={slidess} />
      </div>
    </div>
  );
}

export default Carousel;
