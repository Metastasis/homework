import React from 'react'
import {isClient} from '@features/next'


const bp = {
  mobile: '(max-width: 799.99px)',
  laptop: '(min-width: 800px) and (max-width: 1359.99px)'
}

export function withBreakpoints(
  WrappedComponent
) {
  const Component = (props) => {
    const [media, setMedia] = React.useState('desktop')
    React.useEffect(() => {
      const updateBp = () => {
        setMedia(match(bp))
      }
      const global = isClient() ? window : null
      updateBp()
      global?.addEventListener('resize', updateBp)
      return () => {
        global?.removeEventListener('resize', updateBp)
      }
    }, [setMedia])
    return (<WrappedComponent {...props} media={media} />)
  }
  const displayName = (
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  )
  Component.displayName = `withBreakpointProps(${displayName})`
  return Component
}

function match(bps) {
  const global = isClient() ? window : null
  if (global?.matchMedia(bps.mobile).matches) {
    return 'mobile'
  } else if (global?.matchMedia(bps.laptop).matches) {
    return 'laptop'
  } else return 'desktop'
}
