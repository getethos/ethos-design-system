import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Reference, Popper } from 'react-popper'
import debounce from './LodashDebounce'

// From monorepo

export class PopperContainer extends React.Component {
  static propTypes = {
    tooltipText: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.togglePopup = this.togglePopup.bind(this)
  }

  state = {
    showPopup: false,
  }

  openPopup = () => {
    this.setState({
      showPopup: true,
    })
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
    })
  }

  togglePopup = debounce(
    () => {
      this.setState({
        showPopup: !this.state.showPopup,
      })
    },
    500,
    { leading: true, trailing: false }
  )

  render() {
    const { showPopup } = this.state
    const { children, tooltipText } = this.props

    return (
      <Manager>
        <div style={{ position: 'relative', zIndex: showPopup ? '1' : '0' }}>
          <Reference>
            {({ ref }) => (
              <div ref={ref}>
                <Popper placement="top">
                  {({ ref: innerRef, style, placement, ...rest }) => {
                    const finalStyle = {
                      ...style,
                      backgroundColor: 'white',
                      border: '1px solid rgb(230, 230, 230)',
                      padding: '5px',
                      pointerEvents: 'none',
                      top: '-5px',
                    }
                    if (!showPopup) finalStyle.visibility = 'hidden'
                    return (
                      <div style={finalStyle} ref={innerRef}>
                        {tooltipText}
                      </div>
                    )
                  }}
                </Popper>
                {children({
                  openPopup: this.openPopup,
                  closePopup: this.closePopup,
                  togglePopup: this.togglePopup,
                })}
              </div>
            )}
          </Reference>
        </div>
      </Manager>
    )
  }
}
