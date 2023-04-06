import React, { useState } from "react";
import api from "../api/api.js"

function TransactionPoc() {

  let x = 0

  async function save1(){
    const _x = x++
    try{
      console.log(`save1... ${_x}`)
      const response = await api.save1(x)
      console.log(`save1 ok ${_x}`)
    } catch (e) {
      console.log(`save1 fail ${_x}`)
    }
  }

  async function save2(){
    const _x = x++
    try{
      console.log(`save2... ${_x}`)
      const response = await api.save2(x)
      console.log(`save2 ok ${_x}`)
    } catch (e) {
      console.log(`save2 fail ${_x}`)
    }
  }

  return (
    <div>
      <button onClick={save1}>save1</button>
      <button onClick={save2}>save2</button>
    </div>
  );
}

export default TransactionPoc;
