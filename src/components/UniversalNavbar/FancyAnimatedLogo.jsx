import React from 'react'

import fancyE from './assets/fancy-e'
import fancyT from './assets/fancy-t'
import fancyH from './assets/fancy-h'
import fancyO from './assets/fancy-o'
import fancyS from './assets/fancy-s'

const FancyAnimatedLogo = () => {
  return (
    <div
      role="img"
      aria-label="Ethos"
      style={{ position: 'relative', width: 86.6, height: 16 }}
    >
      {fancyE({ className: 'letter fancyE', alt: '' })}
      {fancyT({ className: 'letter fancyT', alt: '' })}
      {fancyH({ className: 'letter fancyH', alt: '' })}
      {fancyO({ className: 'letter fancyO', alt: '' })}
      {fancyS({ className: 'letter fancyS', alt: '' })}
    </div>
  )
}

export default FancyAnimatedLogo
