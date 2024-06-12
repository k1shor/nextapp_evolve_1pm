'use client'
import CategoryCheckbox from '@/app/components/CategoryCheckbox'
import React from 'react'

const page = () => {
  return (
    <>
    <div className="grid grid-cols-5">
        <div className="col-span-1 p-3">
            <CategoryCheckbox/>
        </div>
        <div className="col-span-4">Products</div>
    </div>
    </>
  )
}

export default page