import { AxiosResponse } from 'axios'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import casinoService from '../../services/casino.service'
import {
  selectCasinoMatchList,
} from '../../redux/actions/casino/casinoSlice'

import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { CustomLink } from '../_layout/elements/custom-link'
import CasinoListItemInt from '../CasinoList/CasinoListItemInt'
import authService from '../../services/auth.service'
import { isMobile } from 'react-device-detect'

import dataJson from './wc_casino_response.json';
import { WcCasinoResponse } from './wcCasinoTypes';
import CasinoListItemWc from '../CasinoList/CasinoListItemWc'
import LoaderIcon from './loaderIcon'

const wc_casino_response = dataJson as WcCasinoResponse;

const CasinoWc = () => {
  const queryp = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = searchParams.get("category");

  const [providers, setProviders] = React.useState<any>([]);
  const [games, setGames] = React.useState<any>([]);
  const [activeProvider, setActiveProvider] = React.useState<string>("");
  const [gamePlay, setGamePlay] = React.useState<any>(null);
  const [gameUrl, setGameUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const getTitleWB = (gType: number) => {
    switch (gType) {
      case 1:
        return { first: "Evolution", second: "Asia", third: "Games" };
      case 17:
        return { first: "Ezugi", second: "Live", third: "Games" };
     case 11:
        return { first: "Live", second: "88", third: "Games" };
      case 105:
        return { first: "BTI", second: "Sports", third: "Games" };
      case 300:
        return { first: "Spribe", second: "All", third: "Games" };
      case 263:
        return { first: "JiLi", second: "All", third: "Games" };
      default:
        return { first: "WB", second: "Other", third: "Games" };
    }
  };

  React.useEffect(() => {
    const gameList = wc_casino_response.game_list;

    const ALLOWED_PROVIDERS = [1, 17];

    const provArr = Object.keys(gameList)
      .map(Number)
      .filter((provId) => ALLOWED_PROVIDERS.includes(provId))
      .map((provId) => {
        const title = getTitleWB(provId);
        return {
          _id: String(provId),
          title_first: title.first,
          title_second: title.second,
          title_third: title.third,
        };
      });

    setProviders(provArr);

    const defaultProv = category || provArr[0]?._id || "1";
    setActiveProvider(defaultProv);

    // If on root path without category, redirect to casino with default category
    if (location.pathname === '/' && !category && provArr[0]?._id) {
      navigate(`/wc-casino/wc-casino?category=${provArr[0]._id}`, { replace: true });
      return;
    }

    const providerGames = (gameList[defaultProv] || []).map(g => ({
      ...g,
      gType: defaultProv
    }));

    setGames(providerGames);
  }, [category, location.pathname, navigate]);

  // When clicking provider from <CustomLink>
  React.useEffect(() => {
    const gameList = wc_casino_response.game_list;

    if (activeProvider) {
      const providerGames = (gameList[activeProvider] || []).map(g => ({
        ...g,
        gType: activeProvider
      }));

      setGames(providerGames);
    }
  }, [activeProvider]);

  React.useEffect(() => {
    const launchGame = async () => {
      if (!gamePlay) {
        setGameUrl('');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setGameUrl(''); // Clear old URL immediately

      console.log("Launching game:", gamePlay);

      const userInfo = await authService.getUser?.() || null;
      const uid = userInfo?.data?.data?.user?._id || '123456789';

      let prd;

      // Live table games use table_id
      if (gamePlay.table_id) {
        prd = {
          id: Number(gamePlay.gType),
          type: 0,
          table_id: gamePlay.table_id,
          is_mobile:  isMobile ? 1 : 0,
        };
      } 
      // Others use game_id
      else {
        prd = {
          id: Number(gamePlay.gType),
          type: gamePlay.game_id,
          is_mobile:  isMobile ? 1 : 0,
        };
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASEURL_V1}authWBGames`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`
          },
          body: JSON.stringify({
            user_code: String(uid),
            prd,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result?.data?.launch_url) {
          setGameUrl(result?.data?.launch_url);
        } else {
          throw new Error("Invalid WB response");
        }

      } catch (err: any) {
        console.error("WB Game Launch Error:", err);
        alert(err.message || "Game launch failed");
        setGamePlay(null);
        setIsLoading(false);
      }
    };

    launchGame();
  }, [gamePlay]);

  // Function to close game - clears all states
  const closeGame = () => {
    setGameUrl('');
    setGamePlay(null);
    setIsLoading(false);
  };

  const providerLogos: Record<string, string> = {
  "1": "https://companieslogo.com/img/orig/EVO.ST_BIG.D-3c55b290.png?t=1720244491",
  "17": "https://conf.ezassets.io/CustomAssets/operator_logo/ezugi_new.png",
};


  return (
    <>
      <div className='container-fluid container-fluid-5 cas-in-list'>
        <div className='row row5'>
          
          {/* Provider Sidebar */}
          <div className='col-xl-2 d-none d-xl-flex' style={{ marginTop: "5px" }}>
            <ul className="nav nav-pills casino-sub-tab">
              {providers.map((prov: any, key: number) => (
                <li className="nav-item" key={key}>
                  <CustomLink
                    className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                    to={`/wc-casino/${queryp.type}?category=${prov._id}`}
                  >
                    <span>{prov.title_first} {prov.title_second}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-xl-10 col-12 d-xl-none'>
            <div className="casino-sub-tab-list" style={{marginTop:"5px"}}>
              <ul className="nav nav-pills casino-sub-tab" id="casino-sub-tab">
                {providers.map((prov: any, key: number) => (
                <li className="nav-item" key={key}>
                  <CustomLink
                    className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                    to={`/wc-casino/${queryp.type}?category=${prov._id}`}
                  >
                    <span>{prov.title_first} {prov.title_second}</span>
                  </CustomLink>
                </li>
              ))}
               
              </ul>
            </div>
          </div>

          {/* Game list */}
          <div className='col-xl-10 col-12'>
            <div className='casino-list mt-2' style={{ marginLeft: "-6px" }}>
              {games.length > 0 && (
                <CasinoListItemWc
                  games={games}
                  onPlay={(game: any) => {
                    // Close any existing game first
                    if (gamePlay) {
                      closeGame();
                      // Small delay to ensure cleanup
                      setTimeout(() => setGamePlay(game), 100);
                    } else {
                      setGamePlay(game);
                    }
                  }}
                />
              )}
            </div>
          </div>

        </div>
      </div>

   


       {gamePlay && (
        <div className="slot-iframe show">
          
          {/* HEADER (always visible) */}
          <div className="slot-header">
            <div className="title">
              <h4 className="mb-0 slot-title">{gamePlay.game_name}</h4>
            </div>

            <div className="close-slot-frame" onClick={closeGame}>
              EXIT
            </div>
          </div>

          {/* IFRAME WRAPPER */}
          <div
            className="iframe-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Loader (ONLY inside iframe area) */}
            {isLoading && (

               <LoaderIcon
                img={providerLogos[activeProvider] || providerLogos["1"]}
                title="Please wait..."
                style={{ width: "180px", marginBottom: "40px" }}
              />
              
            )}

            {/* IFRAME */}
            {gameUrl && (
              <iframe
                src={gameUrl}
                title="Game"
                style={{
                  width: "100%",
                  // height: "100",
                  border: "none",
                }}
                onLoad={() => {
                  console.log("Game fully loaded");
                  setIsLoading(false);
                }}
              />
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default CasinoWc