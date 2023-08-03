import React from "react";
import Search from "../components/Search";
import ListingsComponent from '../components/ListingsComponent';
import '../css/listings.css'


export default function Listings() {
  return (
    <div>
      <Search />
      <ListingsComponent></ListingsComponent>
    </div>
  );
}
