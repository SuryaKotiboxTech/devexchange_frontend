import { CustomLink } from './custom-link'
import { useLocation, useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { isMobile } from 'react-device-detect'
import Fav from './fav'

const NavMobileMenu = (props: any) => {
  const location = useLocation()
  const [headerMessage, setHeaderMessage] = React.useState<any>()
  const { sportId, status } = useParams()
  const [matchList, setMatchList] = React.useState([])

  React.useEffect(() => {
    axios.get(`headerMessage.json?v=${Date.now()}`).then((res: AxiosResponse) => {
      setHeaderMessage(res.data)
    })

  }, [])

  return (
    <div className='header-mobile'>
      <Fav />
      {/* <div className=' header-b-menu'>
        <a href={headerMessage?.headerMessageLink}>{headerMessage?.headerMessage}</a>
      </div> */}
      {isMobile && !location.pathname.includes('/odds') && !location.pathname.includes('/casino') && <ul className='list-unstyled navbarnav'>

        <li className={'nav-item'}>
          <img className='blink_me' src="https://aviator-next.spribegaming.com/assets/images/canvas/plane/spribe/plane-0.svg?v=4.2.101" style={{width: "35px", marginRight: "0px"}} alt="" />
          <CustomLink
            className={location.pathname == '/wc-crash/wc-crash' ? 'active' : ''}
           to='/wc-crash/wc-crash'
          >
            Crash
          </CustomLink>
        </li>

        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname.includes('in-play') ? 'active' : ''}
            to='/match/4/in-play'
          >
            Lottery
          </CustomLink>
        </li>
        {/* <li className={'nav-item'}>
          <CustomLink
            className={location.pathname.includes('sports') ? 'active' : ''}
            to='/match/4/sports'
          >
            Sports
          </CustomLink>
        </li> */}
        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/inout-wc/wc-sports' ? 'active' : ''}
            to='/inout-wc/wc-sports'
          >
            Sports
          </CustomLink>
        </li>

        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-casino/wc-casino' ? 'active' : ''}
           to='/wc-casino/wc-casino'
          >
            Our
            Casino
          </CustomLink>
        </li>

        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-casino/wc-casino' ? 'active' : ''}
           to='/wc-casino/wc-casino'
          >
            live
            Casino
          </CustomLink>
        </li>

        {/* <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-mini/wc-mini' ? 'active' : ''}
           to='/wc-mini/wc-mini'
          >
            Mini Games
          </CustomLink>
        </li> */}


        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-slots/wc-slots' ? 'active' : ''}
           to='/wc-slots/wc-slots'
          >
            Slots
          </CustomLink>
        </li>

        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-mini/wc-mini' ? 'active' : ''}
           to='/wc-mini/wc-mini'
          >
            Mini
          </CustomLink>
        </li>

        

        <li className={'nav-item'}>
          <CustomLink
            className={location.pathname == '/wc-providers/wc-providers' ? 'active' : ''}
           to='/wc-providers/wc-providers'
          >
            Fantasy
          </CustomLink>
        </li>
        
        {/* <li className='nav-item'>
          <CustomLink to='#'>Others</CustomLink>
        </li> */}
      </ul>}
    </div>
  )
}
export default NavMobileMenu
