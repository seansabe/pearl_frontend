import React from "react";
import Search from "../components/Search";
import ListingsComponent from '../components/ListingsComponent';
import '../css/listings.css'


export default function Listings(props) {
  return (
    <div className="listing-container">
      <Search />
      <ListingsComponent handleNavClick={props.handleNavClick}></ListingsComponent>
    </div>
  );
}
