import React from "react";
import Search from "../components/Search";
import ListingsComponent from '../components/ListingsComponent';


export default function Listings() {
  return (
    <div>
      <h1>This is listings</h1>
      <Search />
      <ListingsComponent></ListingsComponent>
    </div>
  );
}
