import React from 'react'

type Props = {
    children:React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className='min-h-screen w-full  bg-bg1 dark:bg-dark-primary pt-20 pb-10 px-4 md:px-10 lg:px-20 xl:px-32'>{props.children}</div>
  )
}

export default layout