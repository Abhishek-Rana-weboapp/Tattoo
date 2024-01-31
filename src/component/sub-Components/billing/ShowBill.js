import React from 'react'

export default function ShowBill({resultantMinutes, bill, handleNext}) {
  return (
    <div className="flex flex-col gap-2 items-center">
          <h3 className="font-bold text-white">Bill</h3>
          <label className="text-xl font-semibold">Price calculation</label>
          <div className="flex gap-2 ">
            <label>Bill by : </label>
            <label>{bill?.bill_by}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Total Time : </label>
            <label>{resultantMinutes
    ? `${String(Math.floor(resultantMinutes / 3600)).padStart(2, '0')} : ${String(
      Math.floor((resultantMinutes % 3600) / 60)
    ).padStart(2, '0')}`
    : '00:00'}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Break Time : </label>
            <label>{String(Math.floor(bill?.break_time/60)).padStart(2, "0")} : {String(Math.floor(bill?.break_time%60)).padStart(2, "0")}</label>
          </div>
          <div className="flex gap-2 ">
            <label>Total Work Time : </label>
            <label>{`${String(Math.floor(bill?.totalWorkingTime / 3600)).padStart(2, '0')} : ${String(
            Math.floor((bill?.totalWorkingTime % 3600) / 60)
          ).padStart(2, '0')}`}</label>
          </div>

          <div className="flex gap-2 ">
            <label className="text-xl font-bold text-yellow-400">Total Price : </label>
            <label className="text-xl font-bold">{parseInt(bill?.price)}$</label>
          </div>

          <div>
            <button className='text-black yellowButton rounded-xl py-2 px-4 font-bold' onClick={handleNext}>Next</button>
          </div>
        </div>
  )
}