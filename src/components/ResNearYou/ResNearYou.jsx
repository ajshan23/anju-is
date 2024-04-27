import React from 'react'
import ResCard from '../resCard/ResCard'

const ResNearYou = () => {
  return (
    <div className="w-full px-[120px] flex flex-col">
    <div className="text-3xl font-bold mb-4">Restaurant's near you</div>
    <div className="text-lg font-medium mb-9">
      Find the best food from the best spot in your location
    </div>
    <div className="grid grid-cols-4">
      <ResCard title="Warehouse Cafe Fortkochi" image="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707300752/anju/mpqdwylbkcbwz9wuvswt.jpg"/>
      <ResCard title="Mary's Kitchen" image="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707300823/anju/sztfywxkm2tzsew68sj9.jpg"/>
      <ResCard title="Dew Art" image="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707300961/anju/sxb9bwcfiiwqluahentm.jpg"/>
      <ResCard title="Oottupura" image="https://res.cloudinary.com/ditx1ptoe/image/upload/v1707301042/anju/uuydugj3qwxdmnati5pt.jpg"/>
      
    </div>
  </div>
  )
}

export default ResNearYou
