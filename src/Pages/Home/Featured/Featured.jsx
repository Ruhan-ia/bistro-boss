import React from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import featured from "../../../assets/home/featured.jpg";
import './Featured.css'

const Featured = () => {
  return (
    <div className="text-white featured-items bg-fixed">
      <SectionTitle
        subHeading="Check it Out"
        heading="Featured Item"
      ></SectionTitle>

      <div className="md:flex bg-slate-500 bg-opacity-70   justify-center items-center pb-20 pt-16 px-40">
        <div>
          <img src={featured} alt="" />
        </div>
        <div className="md:ml-12">
          <p>Aug 20,2030</p>
          <p className="uppercase">Where can i get some?</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
            doloremque facere, voluptatem eos architecto doloribus laudantium
            nemo consectetur voluptate dolorem culpa incidunt aspernatur
            temporibus placeat repudiandae obcaecati? Qui, dolorem dolores.
          </p>
          <button className="btn btn-outline btn-info border-0 border-b-4 mt-8">Order Now</button>
        </div>
        
      </div>
    </div>
  );
};

export default Featured;
