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
