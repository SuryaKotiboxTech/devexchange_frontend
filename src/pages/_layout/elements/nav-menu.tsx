import { useParams } from 'react-router-dom'
import ISport from '../../../models/ISport'
import { useAppSelector } from '../../../redux/hooks'
import { selectSportList } from '../../../redux/actions/sports/sportSlice'
import { CustomLink } from './custom-link'

const allowedSports = ['Cricket','Tennis', 'Football', ];

const NavMenu = () => {
  const sportListState = useAppSelector<{ sports: ISport[] }>(selectSportList)
  const { sportId } = useParams()
  return (
    <div className='header-bottom m-t-10 col-md-12'>
      <nav className='navbar navbar-expand-md btco-hover-menu'>
        <button
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
          className='navbar-toggler'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse'>
          <ul className='list-unstyled navbar-nav'>
            <li className='nav-item active'>
              <CustomLink to={'/'} className='router-link-exact-active router-link-active'>
                <b>Home</b>
              </CustomLink>
            </li>
            <li className='nav-item active'>
              <CustomLink to={'/match/4/in-play'} className='router-link-exact-active router-link-active'>
                <b>Lottery</b>
              </CustomLink>
            </li>

          {sportListState.sports
            .filter((sport: ISport) => allowedSports.includes(sport.name))
            .map((sport: ISport) => (
              <li key={sport._id} className="nav-item">
                <CustomLink
                  to={`/match/${sport.sportId}`}
                  className={`nav-link ${sportId == sport.sportId ? 'router-link-active' : ''}`}
                >
                  {sport.name}
                </CustomLink>
              </li>
            ))}


             <li className='nav-item active'>
              <CustomLink to={'/wc-casino/wc-casino'} className='router-link-exact-active router-link-active'>
                <b>Baccarat</b>
              </CustomLink>
            </li>

            



            <li className='nav-item active'>
              <CustomLink to={'/wc-mini/wc-mini'} className='router-link-exact-active router-link-active'>
                <b>32 Cards</b>
              </CustomLink>
            </li>

             <li className='nav-item active'>
              <CustomLink to={'/wc-slots/wc-slots'} className='router-link-exact-active router-link-active'>
                <b>Teenpatti</b>
              </CustomLink>
            </li>


            <li className='nav-item active'>
              <CustomLink to={'/wc-slots/wc-slots'} className='router-link-exact-active router-link-active'>
                <b>Poker</b>
              </CustomLink>
            </li>


             

             <li className='nav-item active'>
              <CustomLink to={'/wc-providers/wc-providers'} className='router-link-exact-active router-link-active'>
                <b>Lucky 7</b>
              </CustomLink>
            </li>


            <li className="nav-item ">
              <CustomLink to={'/wc-crash/wc-crash'} 
              className='router-link-exact-active router-link-active d-flex align-items-center'>
                <img className='blink_me' src="https://aviator-next.spribegaming.com/assets/images/canvas/plane/spribe/plane-0.svg?v=4.2.101" style={{width: "35px", marginRight: "5px"}} alt="" />
                <span className="ms-1">Crash</span>
             </CustomLink>
            </li>


          </ul>
        </div>
      </nav>
    </div>
  )
}
export default NavMenu
