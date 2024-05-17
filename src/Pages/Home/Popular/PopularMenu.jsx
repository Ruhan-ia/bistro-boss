import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Component/SectionTitle/SectionTitle';
import MenuItems from '../../Shared/MenuItems';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {

    const [menu] =useMenu()
    const  popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] =useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category ==='popular')
    //         setMenu(popularItems)
    //     })
            
    // }, [])
    return (
       <section className='mb-14'>
        <SectionTitle
        subHeading="Popular Items"
        heading="From our menu">
            
        </SectionTitle>

        <div className='grid md:grid-cols-2 gap-5'>
            {
                popular.map(item => <MenuItems key={item._id} item={item}></MenuItems>)
            }
        </div>
       </section>
    );
};

export default PopularMenu;