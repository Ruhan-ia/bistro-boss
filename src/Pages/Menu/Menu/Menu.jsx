import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover";
import coverImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import MenuCategory from "../../Shared/MenuCategory";

const Menu = () => {
  const [menu] = useMenu()
  const desserts = menu.filter(item => item.category ==='dessert')
  const soup = menu.filter(item => item.category ==='soup')
  const salad = menu.filter(item => item.category ==='salad')
  const pizza = menu.filter(item => item.category ==='pizza')
  const offered = menu.filter(item => item.category ==='offered')
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={coverImg} title='Our Menu'></Cover>
      <SectionTitle subHeading="Don't miss" heading="Today's offer"></SectionTitle>
      <MenuCategory items={offered}></MenuCategory>
      <MenuCategory items={desserts} title='dessert' img={dessertImg}></MenuCategory>
      <MenuCategory items={soup} title='soup' img={soupImg}></MenuCategory>
      <MenuCategory items={salad} title='salad' img={saladImg}></MenuCategory>
      <MenuCategory items={pizza} title='pizza' img={pizzaImg}></MenuCategory>
    
      
    </div>
  );
};

export default Menu;
