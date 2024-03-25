import React from 'react'
import { Vortex } from 'react-loader-spinner'

const Spinner = () => {
    return (
        <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', '#10B981', 'blue', 'yellow', 'orange', 'purple']}
        />
    )
}

export default Spinner