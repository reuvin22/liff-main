import Cards from '../../components/Cards'
import Image1 from '../../assets/how-to-use/1.jpg'
import Image2 from '../../assets/how-to-use/2.jpg'
import Image3 from '../../assets/how-to-use/3.jpg'
import Image4 from '../../assets/how-to-use/4.jpg'
import Image5 from '../../assets/how-to-use/5.jpg'
const cardData = [
  {
    header: "1-1 ガクチカ",
    instruction: `志望動機/自己PR生成`,
    image: Image1,
  },
  {
    header: "1-2. ガクチカ",
    instruction: `志望動機/自己PR生成`,
    image: Image2,
  },
  {
    header: `1-3. ガクチカ`,
    instruction: "志望動機/自己PR生成",
    image: Image3,
  },
  {
    header: `2-1. 志望企業`,
    image: Image4,
  },
    {
    header: `2-2. 志望企業`,
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
