"use client";
import React from "react";
import Blog from "../../Composants/Blog";



export default function Home(props) {
    const id = React.use(props.params).id;
    return (
      <Blog id={id} />
    )
}