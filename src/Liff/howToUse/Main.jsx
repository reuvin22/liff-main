import Cards from '../../components/Cards'
import Image1 from '../../assets/how-to-use/1.jpg'
import Image2 from '../../assets/how-to-use/2.jpg'
import Image3 from '../../assets/how-to-use/3.jpg'
import Image4 from '../../assets/how-to-use/4.jpg'
import Image5 from '../../assets/how-to-use/5.jpg'
const cardData = [
  {
    header: "1/5. 能力ボタンを選択！",
    image: Image1,
  },
  {
    header: "2/5. 助言が見えるよ！",
    image: Image2,
  },
  {
    header: `3/5.助言が見えるよ！`,
    image: Image3,
  },
  {
    header: `4/5.志望企業入力！`,
    image: Image4,
  },
    {
    header: `5/5.URLもね！`,
    image: Image5,
  }
];

function Main() {
  return (
    <div className="w-screen h-screen">
      <Cards cards={cardData} />
    </div>
  )
}

export default Main
