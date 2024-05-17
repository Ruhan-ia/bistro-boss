import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import Cover from '../../Shared/Cover';
import coverImg from '../../../assets/shop/banner2.jpg'
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  
    const [menu] = useMenu()
    const categories = ['salad', 'soup', 'pizza', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    
    const desserts = menu.filter(item => item.category ==='dessert')
    const soup = menu.filter(item => item.category ==='soup')
    const salad = menu.filter(item => item.category ==='salad')
    const pizza = menu.filter(item => item.category ==='pizza')
    const drinks = menu.filter(item => item.category ==='drinks')
    const [tabIndex, setTabIndex] = useState(initialIndex);
    return (
        <div>
        <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
        
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <Cover img={coverImg} title='Order Food'></Cover>

      <TabList>

        <Tab>Salad</Tab>
        <Tab>Soup</Tab>
        <Tab>Pizza</Tab>
        <Tab>Dessert</Tab>
        <Tab>Drinks</Tab>
      </TabList>
      <TabPanel>
        <OrderTab items={salad}></OrderTab>
      </TabPanel>
      <TabPanel>
      <OrderTab items={soup}></OrderTab>

      </TabPanel>
      <TabPanel>
      <OrderTab items={pizza}></OrderTab>

      </TabPanel>
      <TabPanel>
      <OrderTab items={desserts}></OrderTab>

      </TabPanel>
      <TabPanel>
      <OrderTab items={drinks}></OrderTab>

      </TabPanel>
    </Tabs>
    </div>
    );
};

export default Order;