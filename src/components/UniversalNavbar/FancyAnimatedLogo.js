import React from 'react'

import fancyE from './assets/fancy-e.svg'
import fancyT from './assets/fancy-t.svg'
import fancyH from './assets/fancy-h.svg'
import fancyO from './assets/fancy-o.svg'
import fancyS from './assets/fancy-s.svg'

const FancyAnimatedLogo = (props) => {
  return (
    <div role="img" aria-label="Ethos" style={{ position: 'relative', width: 86.6, height: 16 }}>
      <img src={fancyE} className={'letter fancyE'} alt="" />
      <img src={fancyT} className={'letter fancyT'} alt="" />
      <img src={fancyH} className={'letter fancyH'} alt="" />
      <img src={fancyO} className={'letter fancyO'} alt="" />
      <img src={fancyS} className={'letter fancyS'} alt="" />
    </div>
  )
}

export default FancyAnimatedLogo
