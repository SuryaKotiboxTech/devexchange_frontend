import React, { MouseEvent } from 'react'
import { isMobile } from 'react-device-detect'
import { selectCasinoMatchList } from '../../redux/actions/casino/casinoSlice'
import { useAppSelector } from '../../redux/hooks'
import ICasinoMatch from '../../models/ICasinoMatch'
import { useNavigateCustom } from '../_layout/elements/custom-link'
import { toast } from 'react-toastify'
const CasinoListItem = (props: any) => {
  const gamesList = useAppSelector<any>(selectCasinoMatchList)
  const navigate = useNavigateCustom()
  const casinoWidth = isMobile ? 'col-3' : 'col11'

  const onCasinoClick = (e: MouseEvent<HTMLAnchorElement>, Item: ICasinoMatch) => {
    e.preventDefault()
    if (!Item.isDisable && Item.match_id!=-1 ) navigate.go(`/casino/${Item.slug}/${Item.match_id}`)
      else toast.warn('This game is suspended by admin, please try again later')
  }
  return (
    <>
          {/* {gamesList &&
            gamesList.map((Item: any, key: number) => {
              return (
                <div className={`casino-list-item`} key={key}>
                  <a href='#' onClick={(e) => onCasinoClick(e, Item)} className=''>
                      <div className="casino-list-item-banner" 
                        style={{ backgroundImage: `url(${Item.image})`}}>
                      </div>
                      <div className='casino-list-name'>{Item.title}</div>
               
                  </a>
                </div>
              )
            })} */}


           
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/worli3.gif"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Matka</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teen62.gif"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">V VIP Teenpatti 1-day</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/dolidana.gif"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Dolidana</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/mogambo.gif"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Mogambo</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teen20v1.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">20-20 Teenpatti VIP1</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/lucky5.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Lucky 6</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/roulette12.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Beach Roulette</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/roulette13.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Roulette</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/roulette11.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Golden Roulette</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/poison.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Teenpatti Poison One Day</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teenunique.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Unique Teenpatti</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/poison20.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Teenpatti Poison 20-20</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/joker120.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Unlimited Joker 20-20</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/joker20.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Teenpatti Joker 20-20</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/joker1.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Unlimited Joker Oneday</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teen20c.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">20-20 Teenpatti C</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/btable2.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Bollywood Casino 2</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/ourroullete.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Unique Roulette</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/superover3.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Mini Superover</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/goal.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Goal</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/ab4.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">ANDAR BAHAR 150 cards</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/lucky15.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Lucky 15</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/superover2.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Super Over2</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teen41.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Queen Top Open Teenpatti</div>
    </a>
  </div>
  <div className="casino-list-item">
    <a href="/casino-in/live-dmd">
      <div
        className="casino-list-item-banner"
        style={{
          backgroundImage:
            'url("https://dataobj.ecoassetsservice.com/casino-icons/lc/teen42.jpg"), url("https://dataobj.ecoassetsservice.com/casino-icons/default.jpg")'
        }}
      />
      <div className="casino-list-name">Jack Top Open Teenpatti</div>
    </a>
  </div>
  



    </>
  )
}
export default React.memo(CasinoListItem)
