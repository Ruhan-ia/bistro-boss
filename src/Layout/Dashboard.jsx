import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BsCart4, BsWalletFill, BsCalendar, BsBookmarkCheckFill } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';


const Dashboard = () => {
  const [cart] = useCart()

    // const isAdmin = true;

    const [isAdmin] = useAdmin()
    return (
        <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  ">
            <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">

            {
              isAdmin ? <>
               <li><NavLink to='/dashboard/home'><AiOutlineHome></AiOutlineHome>Admin Home</NavLink></li>
            <li><NavLink to='/dashboard/addItem'><GiForkKnifeSpoon></GiForkKnifeSpoon>Add Items</NavLink></li>

            <li><NavLink to='/dashboard/manageItems'><BiFoodMenu></BiFoodMenu>Manage Items</NavLink></li>
            <li><NavLink to='/dashboard/history'><BsBookmarkCheckFill></BsBookmarkCheckFill>Manage Bookings</NavLink></li>
            <li><NavLink to='/dashboard/allUsers'><FaUsers></FaUsers>All Users</NavLink></li>

              </>:
              <>
               <li><NavLink to='/dashboard/home'><AiOutlineHome></AiOutlineHome>User Home</NavLink></li>
            <li><NavLink to='/dashboard/reservations'><BsCalendar></BsCalendar>Reservations</NavLink></li>

            <li><NavLink to='/dashboard/history'><BsWalletFill></BsWalletFill>Payment History</NavLink></li>

            <li><NavLink to='/dashboard/myCart'><BsCart4></BsCart4>My Cart
            <div className="badge badge-secondary">+{cart.length || 0}</div>

            </NavLink></li>
              </>
            }


           
            <div className="divider"></div>
            <li><NavLink to='/'><AiOutlineHome></AiOutlineHome>User Home</NavLink></li>
            <li><NavLink to='/menu'><BiFoodMenu></BiFoodMenu>Menu</NavLink></li>
            <li><NavLink to='/order/salad'><BiFoodMenu></BiFoodMenu>Order Food</NavLink></li>
            
          </ul>
        
        </div>
      </div>
    );
};

export default Dashboard;