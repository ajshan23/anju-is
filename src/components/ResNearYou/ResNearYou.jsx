import React from 'react'
import ResCard from '../resCard/ResCard'

const ResNearYou = () => {
  return (
    <div className="w-full px-[120px] flex flex-col">
    <div className="text-3xl font-bold mb-4">Best Restaurant's </div>
    <div className="text-lg font-medium mb-9">
      Find the best food from the best spots
    </div>
    <div className="grid grid-cols-4">
      <ResCard title="Charcoal Shake Restaurant" param="charcoalshack" image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714282406/anju/restaurant/msc37nl020dnhruckp1z.jpg"/>
      <ResCard title="Happy Cup Heritage" param="happycupheritage" image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714286826/anju/restaurant/hxktiikhzb9huemgxto4.jpg"/>
      <ResCard title="The Voyager Diner (24/7)" param="thevoyager" image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714286955/anju/restaurant/zbn5etzuk5g4jyecqnuo.jpg"/>
      <ResCard title="Diwan's Durbar" param="diwansdarbar" image="https://res.cloudinary.com/djmvsz8em/image/upload/v1714287071/anju/restaurant/ejkuo2g6kxgwwu2z2nnf.jpg"/>
      
    </div>
  </div>
  )
}

export default ResNearYou
