
import "./css.css"
import { useParams } from 'react-router-dom'
import ICasinoMatch from '../../../models/ICasinoMatch'
import ISport from '../../../models/ISport'
import { selectCasinoMatchList } from '../../../redux/actions/casino/casinoSlice'
import { selectSportList } from '../../../redux/actions/sports/sportSlice'
import { useAppSelector } from '../../../redux/hooks'
import { CustomLink, useNavigateCustom } from './custom-link'
import { MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'

const SidebarMobile = ({ isOpen, closeSidebar }: any) => {

   const sportListState = useAppSelector<{ sports: ISport[] }>(selectSportList)
      const { sportId, matchId } = useParams()
      const gamesList = useAppSelector<any>(selectCasinoMatchList)
    

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        {/* YOUR SIDEBAR CONTENT */}
       
        {/* menu items */}

        <div className="d-xl-none p-2 sidebar-search search-box-container">
          <div className="form-group">
            <input
              type="search"
              placeholder="Search here"
              className="form-control"
              defaultValue=""
            />
            <div className="search-box" />
          </div>
          <div className="close-sidebar" onClick={closeSidebar}>
            <i className="far fa-times-circle" />
          </div>
        </div>


       <div data-toggle='collapse' data-target='.racing' className='sidebar-title'>
              <h5 className='d-inline-block m-b-0'>Racing</h5>
            </div>

      <nav className='collapse racing show'>
                    <ul>
                      {sportListState.sports.map((sport: ISport) => {
                      if (sport.sportId != 7 && sport.sportId != 4339) return
                      return  <li key={sport._id} className='nav-item'>
                          <CustomLink
                            to={`/match/${sport.sportId}`}
                          className={`nav-link ${parseInt(sportId || "0") == sport.sportId ? 'router-link-active' : ''}`}
                          >
                            <span className='new-launch-text'>{sport.name}</span>
                          </CustomLink>
                        </li>
                      }
                      )}
                    </ul>
                  </nav>


                  <div data-toggle='collapse' data-target='.casino' className='sidebar-title'>
                                <h5 className='d-inline-block m-b-0'>Others</h5>
                              </div>
                              <nav className='collapse casino show'>
                                <ul>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-in/live-dmd`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text blink_me'>Our Casino</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-in/live-dmd`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text blink_me'>Our VIP Casino</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-in/live-dmd`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text blink_me'>Our Premium Casino</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-int/virtual-casino`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text blink_me'>Our Virtual</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-int/live-casino`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Live Casino</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/wc-casino/wc-casino`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Casino</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/wc-mini/wc-mini`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Mini</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/wc-slots/wc-slots`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Slots</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/wc-crash/wc-crash`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Crash</span>
                                    </CustomLink>
                                  </li>
                                  
                                  {/* <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-wc/wc-casino`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Wc Casino</span>
                                    </CustomLink>
                                  </li> */}
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/inout-wc/wc-inout`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text '>Sports</span>
                                    </CustomLink>
                                  </li>
                                  
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-int/slots`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text'>Slot Game</span>
                                    </CustomLink>
                                  </li>
                                  <li className='nav-item'>
                                    <CustomLink
                                      to={`/casino-int/fantasy`}
                                      className={`nav-link`}
                                    >
                                      <span className='new-launch-text'>Fantasy Game</span>
                                    </CustomLink>
                                  </li>
                                </ul>
                              </nav>
                              <div data-toggle='collapse' data-target='.sports' className='sidebar-title'>
                                <h5 className='d-inline-block m-b-0'>Sports</h5>
                              </div>
                              <nav className='collapse sports show'>
                                <ul>
                                  {sportListState.sports.map((sport: ISport) => (
                                    <li key={sport._id} className='nav-item'>
                                      <CustomLink
                                        to={`/match/${sport.sportId}`}
                                        className={`nav-link ${sportId == sport.sportId ? 'router-link-active' : ''}`}
                                      >
                                        <i className="far fa-plus-square me-1"></i>
                                        <span className='new-launch-text'>{sport.name}</span>
                                      </CustomLink>
                                    </li>
                                  ))}
                                </ul>
                              </nav>
         
      </div>
    </>
  )
}

export default SidebarMobile
