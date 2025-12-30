import Cards from '../../components/Cards'
import Image1 from '../../assets/how-to-use/1.png'
import Image2 from '../../assets/how-to-use/2.png'
import Image3 from '../../assets/how-to-use/3.png'
import Image4 from '../../assets/how-to-use/4.png'
import Image5 from '../../assets/how-to-use/5.png'
import Image6 from '../../assets/how-to-use/6.png'
import Image7 from '../../assets/how-to-use/7.png'
import Image8 from '../../assets/how-to-use/8.png'
const cardData = [
  {
    header: "1-1. ガクチカ",
    instruction: `志望動機/自己PR生成`,
    image: Image1,
  },
  {
    header: "1-2. ガクチカ",
    instruction: `志望動機/自己PR生成`,
    image: Image2,
  },
  {
    header: `2-1. 志望企業`,
    instruction: "質問1、2では自分に当てはまると思うものを選択してください。",
    image: Image3,
  },
  {
    header: `2-2. 志望企業`,
    instruction: "質問3からは自由記述形式です。書き方の助言も参考に。",
    image: Image4,
  },
    {
    header: `2-3. ガクチカ/志望動機/
自己PR生成`,
    instruction: `書き方の助言を参考にしながら
入力することも可能です。`,
    image: Image5,
  },
    {
    header: `2-4. ガクチカ/志望動機/
自己PR生成`,
    instruction: `終了したらAIの応答を少し待ちましょう。`,
    image: Image6,
  },
      {
    header: `2-5. ガクチカ/志望動機/
自己PR生成`,
    instruction: `終了したらお好みの方法でAIの
生成文章を保存をしましょう。`,
    image: Image7,
  },
   {
    header: `3-1. 友達に紹介`,
    instruction: `回答お疲れ様でした。就活仲間
にも共有してみてください。`,
    image: Image8,
  },
];

function Main() {
  return (
    <div className="w-screen h-screen">
      <Cards cards={cardData} />
    </div>
  )
}

export default Main
