import React from 'react'

const Header = () => {
    return (
        <div className=' h-full  pl-20 pr-10 flex justify-end align-middle items-center'>

            <div>
                <div className='bg-[#fde3cf] py-2.5 px-4 rounded-full shadow-neutral-600 cursor-pointer'
                    style={{
                        boxShadow:
                            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
                    }}
                >K</div>
            </div>
        </div>
    )
}

export default Header